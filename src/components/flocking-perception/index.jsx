import React, { useRef } from "react";
import BoidManager from "./BoidManager";
import { color, SvgProvider } from "./utility";

export default function Main(props) {
  const svgRef = useRef(null);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 100 100"
      style={{ backgroundColor: color.background }}
      ref={svgRef}
    >
      <SvgProvider value={svgRef}>
        <BoidManager />
      </SvgProvider>
    </svg>
  );
}
