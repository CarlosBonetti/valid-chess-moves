import React from "react";
import styled from "styled-components";
import { Position, Piece } from "./types";
import { getPositionColor } from "./util";
import * as pieces from "./pieces";

export interface SquareProps {
  position: Position;
  piece?: Piece;
  highlighted?: boolean;
  marked?: boolean;
  onClick?(): void;
}

export function Square(props: SquareProps) {
  const { piece } = props;
  const PieceComponent = piece ? pieces[piece] : null;

  return (
    <SquareDiv {...props}>{PieceComponent && <PieceComponent />}</SquareDiv>
  );
}

const SquareDiv = styled.div`
  cursor: pointer;
  background: ${(props: SquareProps) =>
    props.highlighted
      ? "#ff9"
      : getPositionColor(props.position) === "white"
      ? "rgb(237, 238, 209)"
      : "rgb(119, 153, 82)"};
  border: ${(props: SquareProps) =>
    props.marked && "6px solid rgba(49, 46, 43, 0.75)"};
`;
