import React, { Fragment, useEffect } from "react";
import Force from "./Force";
import { useSpring } from "@react-spring/web";
import v2 from "../v2";
import { color } from "./utility";
import useThrottle from "../useThrottle";

function adjustAngle(prev, next) {
  if (next[0] === 0) {
    next[1] = prev.get()[1];
    return;
  }
  let start = prev.get()[1];
  let end = next[1];
  if (end < start) {
    end += 2 * Math.PI;
  }
  next[1] = ((end - start + Math.PI) % (2 * Math.PI)) - Math.PI + start;
}

export default function Forces({ boidForces }) {
  const strengths = {
    cohesion: 1,
    alignment: 1,
    separation: 1,
  };
  const [forcesPolar, setForcesPolar] = useSpring(() => ({
    cohesion: [0, 0],
    alignment: [0, 0],
    separation: [0, 0],
    net: [0, 0],
  }));

  const updateForces = useThrottle(() => {
    let cohesion = [0, 0];
    let alignment = [0, 0];
    let separation = [0, 0];
    let alignmentCount = 0;
    let cohesionCount = 0;
    boidForces.forEach(({ type, force }) => {
      switch (type) {
        case "cohesion":
          cohesion = v2.add(cohesion, force);
          cohesionCount++;
          break;
        case "alignment":
          alignment = v2.add(alignment, force);
          alignmentCount++;
          break;
        case "separation":
          separation = v2.add(separation, force);
          break;
      }
    });
    if (cohesionCount > 0) {
      cohesion = v2.scale(cohesion, 1 / cohesionCount);
    }
    if (alignmentCount > 0) {
      alignment = v2.scale(alignment, 1 / alignmentCount);
    }
    separation = v2.scale(separation, 20 * strengths.separation);
    alignment = v2.scale(alignment, 20 * strengths.alignment);
    cohesion = v2.scale(cohesion, strengths.cohesion);

    let net = v2.add(v2.add(cohesion, alignment), separation);
    cohesion = v2.cartesianToPolar(cohesion);
    alignment = v2.cartesianToPolar(alignment);
    separation = v2.cartesianToPolar(separation);
    net = v2.cartesianToPolar(net);
    adjustAngle(forcesPolar.cohesion, cohesion);
    adjustAngle(forcesPolar.alignment, alignment);
    adjustAngle(forcesPolar.separation, separation);
    adjustAngle(forcesPolar.net, net);

    setForcesPolar({ cohesion, alignment, separation, net });
  }, 100);
  useEffect(updateForces, [boidForces]);

  return (
    <Fragment>
      <Force force={forcesPolar.net} fill={color.main} width={1} />
      <Force
        force={forcesPolar.cohesion}
        fill={color.perception.cohesion}
        width={0.6}
      />
      <Force
        force={forcesPolar.alignment}
        fill={color.perception.alignment}
        width={0.6}
      />
      <Force
        force={forcesPolar.separation}
        fill={color.perception.separation}
        width={0.6}
      />
    </Fragment>
  );
}
