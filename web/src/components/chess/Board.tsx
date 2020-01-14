import React, { useCallback } from "react"
import styled, { css } from "styled-components"
import { Square, SquareProps } from "./Square"
import { ALL_POSITIONS, Position } from "./types"

export interface BoardProps {
  squares?: { [key in Position]?: Pick<SquareProps, "piece" | "highlighted" | "marked" | "label"> }
  size?: number
  onSquareClick?(position: Position): void
}

export function Board(props: BoardProps) {
  const { squares = {}, onSquareClick } = props

  const handleSquareClick = useCallback(position => () => onSquareClick && onSquareClick(position), [onSquareClick])

  return (
    <BoardContainer {...props}>
      {ALL_POSITIONS.map(position => (
        <Square
          key={position}
          position={position}
          onClick={handleSquareClick(position)}
          showColumn={position.charAt(1) === "1"}
          showRow={position.charAt(0) === "a"}
          {...squares[position]}
        />
      ))}
    </BoardContainer>
  )
}

Board.defaultProps = {
  size: 72
} as Partial<BoardProps>

const BoardContainer = styled.div(
  (props: BoardProps) => css`
    display: grid;
    grid-template-columns: repeat(8, ${props.size}px);
    grid-template-rows: repeat(8, ${props.size}px);
  `
)
