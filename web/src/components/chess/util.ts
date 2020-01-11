import { Position } from "./types";

export const getPositionColor = (position: Position): "black" | "white" => {
  if (["a", "c", "e", "g"].indexOf(position.charAt(0)) >= 0) {
    return parseInt(position.charAt(1)) % 2 === 1 ? "black" : "white";
  } else {
    return parseInt(position.charAt(1)) % 2 === 1 ? "white" : "black";
  }
};
