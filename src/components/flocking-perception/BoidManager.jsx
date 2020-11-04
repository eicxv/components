import React, { useState } from "react";
import Perception from "./Perception";
import Boids from "./Boids";
import MainBoid from "./MainBoid";
import Forces from "./Forces";

export default function Main() {
  const n = 7;
  const [perception, setPerception] = useState({
    angle: Math.PI / 3,
    radius: {
      cohesion: 30,
      alignment: 20,
      separation: 10,
    },
  });
  const [boidForces, setBoidForces] = useState(
    Array.from({ length: n }, () => ({ type: "none", force: [0, 0] }))
  );
  const [forces, setForce] = useState({
    cohesion: [0, 0],
    alignment: [0, 0],
    separation: [0, 0],
  });
  return (
    <g transform={`translate(${50}, ${50})`}>
      <Perception perception={perception} setState={setPerception} />
      <Boids
        n={n}
        perception={perception}
        forces={boidForces}
        setForces={setBoidForces}
      />
      <Forces boidForces={boidForces} />
      <MainBoid />
    </g>
  );
}
