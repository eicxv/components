import { createContext, useContext } from "react";

const SvgContext = createContext(null);
export const SvgProvider = SvgContext.Provider;

export function useSvg() {
  return useContext(SvgContext);
}

export function calcScale(svgRef) {
  const width = svgRef.current.clientWidth;
  const height = svgRef.current.clientHeight;
  const len = Math.min(width, height);
  return 100 / len;
}

const baseColors = {
  cohesion: "#ebd034",
  alignment: "#eb9934",
  separation: "#eb4034",
};

const colorScheme = {
  name: "MaterialOcean",
  black: "#546e7a",
  red: "#ff5370",
  green: "#c3e88d",
  yellow: "#ffcb6b",
  blue: "#82aaff",
  purple: "#c792ea",
  cyan: "#89ddff",
  white: "#ffffff",
  brightBlack: "#546e7a",
  brightRed: "#ff5370",
  brightGreen: "#c3e88d",
  brightYellow: "#ffcb6b",
  brightBlue: "#82aaff",
  brightPurple: "#c792ea",
  brightCyan: "#89ddff",
  brightWhite: "#ffffff",
  background: "#0f111a",
  foreground: "#8f93a2",
};

export const color = {
  main: adjustBrightness(colorScheme.yellow, -60),
  background: colorScheme.background,
  foreground: colorScheme.foreground,
  foreground2: adjustBrightness(colorScheme.foreground, 60),
  perception: {
    cohesion: adjustBrightness(colorScheme.blue, -60),
    alignment: adjustBrightness(colorScheme.green, -60),
    separation: adjustBrightness(colorScheme.red, -60),
  },
  boid: {
    none: "#333333",
    cohesion: colorScheme.blue,
    alignment: colorScheme.green,
    separation: colorScheme.red,
  },
};

function adjustBrightness(col, amt) {
  var usePound = false;

  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  var R = parseInt(col.substring(0, 2), 16);
  var G = parseInt(col.substring(2, 4), 16);
  var B = parseInt(col.substring(4, 6), 16);

  // to make the colour less bright than the input
  // change the following three "+" symbols to "-"
  R = R + amt;
  G = G + amt;
  B = B + amt;

  if (R > 255) R = 255;
  else if (R < 0) R = 0;

  if (G > 255) G = 255;
  else if (G < 0) G = 0;

  if (B > 255) B = 255;
  else if (B < 0) B = 0;

  var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
  var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
  var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

  return (usePound ? "#" : "") + RR + GG + BB;
}
