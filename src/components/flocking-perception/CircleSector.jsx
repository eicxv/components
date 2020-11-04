import React, { Fragment } from "react";
import v2 from "../v2";

export default function CircleSector({
  name,
  outerRadius,
  innerRadius,
  angle,
  ...props
}) {
  let outerStart = v2.polarToCartesian([outerRadius, angle]);
  let outerEnd = [-outerStart[0], outerStart[1]];
  let innerStart = v2.polarToCartesian([innerRadius, angle]);
  let innerEnd = [-innerStart[0], innerStart[1]];
  let largeArc = outerStart[1] > 0 ? 1 : 0;
  let sweep = outerStart[0] > 0 ? 0 : 1;
  let outerArc = `A ${outerRadius} ${outerRadius} 0 ${largeArc} ${sweep} ${outerEnd}`;
  let innerArc = `A ${innerRadius} ${innerRadius} 0 ${largeArc} ${
    sweep === 1 ? 0 : 1
  } ${innerStart}`;
  let path = `M ${outerStart} ${outerArc} L ${innerEnd} ${innerArc} Z`;
  return (
    <Fragment>
      <path
        id={`${name}-path`}
        d={path}
        {...props}
        clipPath={`url(#${name}-clip)`}
      />
      ;
      <clipPath id={`${name}-clip`}>
        <use xlinkHref={`#${name}-path`} />
      </clipPath>
    </Fragment>
  );
}
