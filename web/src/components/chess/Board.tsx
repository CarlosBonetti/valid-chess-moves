import React, { useCallback } from "react";
import styled from "styled-components";
import { ALL_POSITIONS, Position, Piece } from "./types";
import { Square } from "./Square";

export type BoardState = {
  [key in Position]?: {
    piece?: Piece;
    highlighted?: boolean;
    marked?: boolean;
  };
};

export interface BoardProps {
  state: BoardState;
  onSquareClick(position: Position): void;
}

export function Board(props: BoardProps) {
  const { state, onSquareClick } = props;

  const handleSquareClick = useCallback(
    position => () => {
      onSquareClick(position);
    },
    [onSquareClick]
  );

  return (
    <BoardContainer>
      {ALL_POSITIONS.map(position => (
        <Square
          key={position}
          position={position}
          onClick={handleSquareClick(position)}
          {...state[position]}
        />
      ))}
    </BoardContainer>
  );
}

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 80px);
  grid-template-rows: repeat(8, 80px);
`;
