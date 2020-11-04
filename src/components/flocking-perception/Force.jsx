import React from "react";
import { animated } from "@react-spring/web";

function Force({ force, width, ...props }) {
  const [len, angle] = force;
  const w = 1 * width;
  const pointLen = 3;
  const x = Math.max(len - pointLen, 0);
  const path = `M 0 ${w} L ${x} ${w} ${x} ${2 * w} ${len} 0 ${x} ${
    -2 * w
  } ${x} ${-w} 0 ${-w} Z`;
  return (
    <path
      d={path}
      style={{
        transform: `rotate(${angle}rad)`,
      }}
      pointerEvents="none"
      {...props}
    />
  );
}

export default animated(Force);
