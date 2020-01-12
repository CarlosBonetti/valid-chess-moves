import React, { useCallback } from "react"
import styled from "styled-components"
import { ALL_POSITIONS, Position, Piece } from "./types"
import { Square, SquareProps } from "./Square"

export interface BoardProps {
  squares: { [key in Position]?: Pick<SquareProps, "piece" | "highlighted" | "marked"> }
  onSquareClick(position: Position): void
}

export function Board(props: BoardProps) {
  const { squares, onSquareClick } = props

  const handleSquareClick = useCallback(
    position => () => {
      onSquareClick(position)
    },
    [onSquareClick]
  )

  return (
    <BoardContainer>
      {ALL_POSITIONS.map(position => (
        <Square key={position} position={position} onClick={handleSquareClick(position)} {...squares[position]} />
      ))}
    </BoardContainer>
  )
}

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 80px);
  grid-template-rows: repeat(8, 80px);
`
