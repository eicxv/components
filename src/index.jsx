import React from "react";
import { render } from "react-dom";

import "./style.css";
import FlockingPerception from "./components/flocking-perception";

render(
  <FlockingPerception className="perception" />,
  document.getElementById("root")
);
