import React from "react"
import styled from "styled-components"
import { Position, Piece } from "./types"
import { getPositionColor } from "./util"
import * as pieces from "./pieces"

export interface SquareProps {
  /**
   * The Square position in algebraic notation, e.g.: 'a1', 'g4'
   */
  position: Position

  /**
   * The current Piece that should be rendered inside the Square.
   */
  piece?: Piece

  /**
   * Whether the Square should be render as a highlighted Square.
   * @default false
   */
  highlighted?: boolean

  /**
   * Whether the Square should be rendered as a special marked Square
   * @default false
   */
  marked?: boolean

  /**
   * Whether the Square should render a label showing its column position
   * @default false
   */
  showColumn?: boolean

  /**
   * Whether the Square should render a label showing its row position
   * @default false
   */
  showRow?: boolean

  /**
   * Called when the Square is clicked or touched
   */
  onClick?(): void
}

export function Square(props: SquareProps) {
  const { piece, position, showColumn, showRow } = props
  const PieceComponent = piece ? pieces[piece] : null

  return (
    <SquareDiv {...props}>
      {PieceComponent && <PieceComponent />}
      {showColumn && <ColumnLabel>{position.charAt(0)}</ColumnLabel>}
      {showRow && <RowLabel>{position.charAt(1)}</RowLabel>}
    </SquareDiv>
  )
}

const SquareDiv = styled.div`
  position: relative;
  cursor: pointer;
  background: ${(props: SquareProps) =>
    props.highlighted
      ? "#ff9"
      : getPositionColor(props.position) === "white"
      ? "rgb(237, 238, 209)"
      : "rgb(119, 153, 82)"};
  border-width: 6px;
  border-style: solid;
  border-color: ${(props: SquareProps) => (props.marked ? "rgba(49, 46, 43, 0.65)" : "transparent")};
  transition: background 0.1s ease-out, border-color 0.1s ease;
`

const ColumnLabel = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
  font-weight: bold;
  color: rgba(49, 46, 43);
  font-size: 14px;
`

const RowLabel = styled(ColumnLabel)`
  top: 0;
  left: 0;
`
