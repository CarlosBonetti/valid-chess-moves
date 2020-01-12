import React, { useCallback, useReducer, useState, useEffect } from "react"

import { Board } from "./Board"
import { Position, ALL_POSITIONS } from "./types"
import reducer, { selectSquare, highlightValidMoves } from "../../ducks/knight-moves"

export function KnightMovesGame() {
  const [state, dispatch] = useReducer(reducer, {
    selected: null,
    knightPosition: null,
    validMoves: []
  })

  const handleSquareClick = useCallback((position: Position) => dispatch(selectSquare(position)), [])

  useEffect(() => {
    if (state.knightPosition && state.selected === state.knightPosition) {
      fetch(`/api/valid-moves?piece=Knight&from=${state.knightPosition}`)
        .then(res => res.json())
        .then(data => dispatch(highlightValidMoves(data.validMoves)))
    } else {
      dispatch(highlightValidMoves([]))
    }
  }, [state.knightPosition, state.selected])

  return (
    <Board
      squares={ALL_POSITIONS.reduce(
        (prev, curr) => ({
          ...prev,
          [curr]: {
            highlighted: state.selected === curr,
            piece: state.knightPosition === curr ? "Knight" : null,
            marked: state.validMoves.indexOf(curr) >= 0
          }
        }),
        {}
      )}
      onSquareClick={handleSquareClick}
    />
  )
}
