import React from "react";
import Boid from "./Boid";

export default function Boids({ n, perception, ...props }) {
  const cosAngle = Math.cos(perception.angle - Math.PI / 2);
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <Boid
          key={i}
          index={i}
          perception={perception}
          cosAngle={cosAngle}
          {...props}
        />
      ))}
    </g>
  );
}
