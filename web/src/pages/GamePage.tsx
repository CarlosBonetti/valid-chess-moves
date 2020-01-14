import React, { useCallback, useEffect, useMemo, useReducer, useState } from "react"
import styled from "styled-components"
import { Board, Position } from "../components/chess"
import { GameControls } from "../components/GameControls"
import reducer, { getBoardSquares, initialState, restart, selectSquare, setValidMoves } from "../ducks/knight-moves"

export function GamePage() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [turns, setTurns] = useState(2)

  useEffect(() => {
    dispatch(setValidMoves([]))

    if (state.knightPosition && turns) {
      fetch(`/api/valid-moves?piece=Knight&from=${state.knightPosition}&turns=${turns}`)
        .then(res => res.json())
        .then(data => dispatch(setValidMoves(data.validMoves)))
    }
  }, [state.knightPosition, turns])

  const squares = useMemo(() => getBoardSquares(state), [state])
  const handleSquareClick = useCallback((position: Position) => dispatch(selectSquare(position)), [])
  const handleRestartClick = useCallback(() => dispatch(restart()), [])
  const handleTurnsChange = useCallback(turns => setTurns(turns), [])

  return (
    <Container>
      <Board squares={squares} onSquareClick={handleSquareClick} />
      <GameControls state={state} turns={turns} onTurnsChange={handleTurnsChange} onRestartClick={handleRestartClick} />
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-column-gap: 1rem;
  justify-items: center;
`
