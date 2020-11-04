const add = (v1, v2) => [v1[0] + v2[0], v1[1] + v2[1]];
const sub = (v1, v2) => [v1[0] - v2[0], v1[1] - v2[1]];
const scale = (v, s) => [v[0] * s, v[1] * s];
const scaleAndAdd = (v1, v2, s) => [v1[0] + v2[0] * s, v1[1] + v2[1] * s];
const mulElem = (v1, v2) => [v1[0] * v2[0], v1[1] * v2[1]];
const divElem = (v1, v2) => [v1[0] / v2[0], v1[1] / v2[1]];
const len = (v) => Math.sqrt(v[0] ** 2 + v[1] ** 2);
const angle = (v) => Math.atan2(v[1], v[0]);
const normalize = (v) => {
  const length = Math.sqrt(v[0] ** 2 + v[1] ** 2);
  return [v[0] / length, v[1] / length];
};
const dot = (v1, v2) => v1[0] * v2[0] + v1[1] * v2[1];
const dist = (v1, v2) => Math.sqrt((v1[0] - v2[0]) ** 2 + (v1[1] - v2[1]) ** 2);
const distSqr = (v1, v2) => (v1[0] - v2[0]) ** 2 + (v1[1] - v2[1]) ** 2;
const clone = (v) => [v[0], v[1]];
const cartesianToPolar = (v) => [len(v), angle(v)];
const polarToCartesian = (v) => [v[0] * Math.cos(v[1]), v[0] * Math.sin(v[1])];

export default {
  add,
  sub,
  scale,
  scaleAndAdd,
  mulElem,
  divElem,
  len,
  normalize,
  angle,
  dot,
  dist,
  distSqr,
  clone,
  cartesianToPolar,
  polarToCartesian,
};
