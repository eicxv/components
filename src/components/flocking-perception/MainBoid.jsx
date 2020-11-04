import React from "react";
import { color } from "./utility";

export default function MainBoid() {
  const s = 2;
  const path = `M ${2 * s} 0 L  ${-s} ${s}  ${-s}  ${-s} Z`;
  return (
    <path
      d={path}
      fill={color.main}
      transform={`rotate(-90)`}
      pointerEvents="none"
    />
  );
}
