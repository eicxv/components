import React, { useEffect, useRef } from "react";
import { color, useSvg, calcScale } from "./utility";
import useThrottle from "../useThrottle";
import v2 from "../v2";
import { useDrag } from "react-use-gesture";
import { useSpring, to, animated } from "@react-spring/web";

const rand = (c) => (Math.random() - 0.5) * c;

function calculateForce(position, velocity, perception, cosAngle) {
  let p = position.get();
  let v = velocity.get();
  let dist = v2.len(p);
  let cosA = p[1] / dist;
  if (cosA > cosAngle) {
    return { type: "none", force: [0, 0] };
  }
  // separation
  if (dist < perception.radius.separation) {
    let coeff = 1 / dist - 1 / perception.radius.separation;
    let force = v2.scale(p, -coeff);
    return { type: "separation", force };
  }
  if (dist < perception.radius.alignment) {
    // alignment
    return { type: "alignment", force: v };
  }
  if (dist < perception.radius.cohesion) {
    // cohesion
    return { type: "cohesion", force: p };
  }
  return { type: "none", force: [0, 0] };
}

export default function Boid({
  index,
  forces,
  setForces,
  perception,
  cosAngle,
  ...props
}) {
  const svgRef = useSvg(null);
  const viewScale = useRef(1);
  const a = Math.random() * 2 * Math.PI;
  const [{ position }, setPosition] = useSpring(() => ({
    position: [rand(100), rand(100)],
  }));
  const [{ velocity }, setVelocity] = useSpring(() => ({
    velocity: [Math.cos(a), Math.sin(a)],
  }));
  const velocityMult = 2;
  const [{ fill }, setFill] = useSpring(() => ({ fill: "#888888" }));
  const [{ scale }, setScale] = useSpring(() => ({
    scale: 1,
  }));

  const updateForce = useThrottle(() => {
    const force = calculateForce(position, velocity, perception, cosAngle);
    const newForces = [...forces];
    newForces[index] = force;
    setForces(newForces);
    setFill({ fill: color.boid[force.type] });
  }, 100);
  useEffect(updateForce, [perception]);

  const bind = useDrag(
    ({ down, movement, velocity: mouseSpeed, direction }) => {
      let mouseVel = v2.scale(direction, mouseSpeed * viewScale.current);
      let scaledMovement = v2.scale(movement, viewScale.current);
      setPosition({
        position: scaledMovement,
        immediate: down,
        config: {
          decay: !down ? 0.99 : false,
          velocity: !down ? mouseVel : [0, 0],
        },
        onRest: updateForce,
      });
      let newVelocity = v2.scaleAndAdd(velocity.get(), mouseVel, velocityMult);
      newVelocity = v2.normalize(newVelocity);
      setVelocity({
        velocity: newVelocity,
        immediate: true,
      });
    },
    {
      initial: () => {
        viewScale.current = calcScale(svgRef);
        return v2.scale(position.get(), 1 / viewScale.current);
      },
    }
  );

  const s = 2;
  const path = `M ${2 * s} 0 L  ${-s} ${s}  ${-s}  ${-s} Z`;
  return (
    <animated.path
      d={path}
      {...bind()}
      style={{
        cursor: "grab",
        transform: to(
          [position, velocity, scale],
          ([x, y], v, s) =>
            `translate3d(${x}px,${y}px,0) rotate(${v2.angle(v)}rad) scale(${s})`
        ),
      }}
      onMouseEnter={() => setScale({ scale: 1.4 })}
      onMouseLeave={() => setScale({ scale: 1 })}
      fill={fill}
    />
  );
}
