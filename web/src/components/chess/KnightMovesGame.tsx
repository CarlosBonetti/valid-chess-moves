import React from "react";
import { Board } from "./Board";

export function KnightMovesGame() {
  return (
    <Board
      state={{
        d5: {
          highlighted: true,
          piece: "Knight"
        },
        e3: { marked: true },
        f4: { marked: true },
        e7: { marked: true },
        f6: { marked: true },
        c3: { marked: true },
        b4: { marked: true },
        c7: { marked: true },
        b6: { marked: true }
      }}
      onSquareClick={console.log}
    />
  );
}
