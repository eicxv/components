import React, { Fragment } from "react";
import PerceptionKnob from "./PerceptionKnob";
import CircleSector from "./CircleSector";
import { color } from "./utility";

export default function Perception({ perception, setState }) {
  return (
    <Fragment>
      <CircleSector
        name="cohesion"
        outerRadius={perception.radius.cohesion}
        innerRadius={perception.radius.alignment}
        angle={perception.angle}
        stroke={color.perception.cohesion}
        fill={color.perception.cohesion}
        fillOpacity={0.15}
        strokeWidth={1}
      />
      <CircleSector
        name="alignment"
        outerRadius={perception.radius.alignment}
        innerRadius={perception.radius.separation}
        angle={perception.angle}
        stroke={color.perception.alignment}
        fill={color.perception.alignment}
        fillOpacity={0.15}
        strokeWidth={1}
      />
      <CircleSector
        name="separation"
        outerRadius={perception.radius.separation}
        innerRadius={0}
        angle={perception.angle}
        stroke={color.perception.separation}
        fill={color.perception.separation}
        fillOpacity={0.15}
        strokeWidth={1}
      />
      <PerceptionKnob
        name="cohesion"
        perception={perception}
        setState={setState}
        minRadius={perception.radius.alignment}
        maxRadius={Infinity}
      />
      <PerceptionKnob
        name="alignment"
        perception={perception}
        setState={setState}
        minRadius={perception.radius.separation}
        maxRadius={perception.radius.cohesion}
      />
      <PerceptionKnob
        name="separation"
        perception={perception}
        setState={setState}
        minRadius={-Infinity}
        maxRadius={perception.radius.alignment}
      />
    </Fragment>
  );
}
