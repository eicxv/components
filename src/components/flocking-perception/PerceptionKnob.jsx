import React, { Fragment, useState, useRef } from "react";
import { color, useSvg, calcScale } from "./utility";
import { useSpring, to, animated } from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import v2 from "../v2";

export default function PerceptionKnob({
  name,
  perception,
  setState,
  minRadius,
  maxRadius,
}) {
  const svgRef = useSvg(null);
  const viewScale = useRef(1);
  const { angle, radius } = perception;
  const handleRadius = 2;
  const offset = 2.2 * handleRadius;
  const clamp = (value) =>
    Math.min(Math.max(minRadius + offset, value), maxRadius - offset);

  const [dragging, setDragging] = useState(false);
  const [{ scale }, setScale] = useSpring(() => ({
    scale: 1,
  }));

  const bind = useDrag(
    ({ movement, first, last }) => {
      let polarCoord = v2.cartesianToPolar(
        v2.scale(movement, viewScale.current)
      );
      let r = clamp(polarCoord[0]);
      setState({
        angle: polarCoord[1],
        radius: {
          ...radius,
          [name]: r,
        },
      });
      if (first) {
        setDragging(true);
      } else if (last) {
        setDragging(false);
        if (v2.dist(movement, v2.polarToCartesian([radius, angle])) > 0.1) {
          setScale({ scale: 1 });
        }
      }
    },
    {
      initial: () => {
        viewScale.current = calcScale(svgRef);
        let scaledPosition = [radius[name] / viewScale.current, angle];
        return v2.polarToCartesian(scaledPosition);
      },
    }
  );

  return (
    <Fragment>
      <animated.circle
        {...bind()}
        cx={0}
        cy={0}
        r={handleRadius}
        style={{
          cursor: "grab",
          transform: to(
            [scale],
            (s) =>
              `rotate(${angle}rad) translateX(${radius[name]}px) scale(${s})`
          ),
        }}
        onMouseEnter={() => setScale({ scale: 1.5 })}
        onMouseLeave={() => {
          if (!dragging) setScale({ scale: 1 });
        }}
        fill={color.foreground}
        stroke={color.foreground2}
        strokeWidth={0.2}
      />
    </Fragment>
  );
}
