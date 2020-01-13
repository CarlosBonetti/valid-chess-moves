import React, { useCallback, useEffect, useReducer, useMemo } from "react"
import reducer, { getBoardSquares, highlightValidMoves, initialState, selectSquare } from "../ducks/knight-moves"
import { Board, Position } from "../components/chess"

export function GamePage() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const squares = useMemo(() => getBoardSquares(state), [state])
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

  return <Board squares={squares} onSquareClick={handleSquareClick} />
}
