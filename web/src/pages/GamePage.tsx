import React, { useCallback, useEffect, useReducer, useMemo, useState } from "react"
import reducer, { getBoardSquares, setValidMoves, initialState, selectSquare, restart } from "../ducks/knight-moves"
import { Board, Position } from "../components/chess"
import styled from "styled-components"
import { Button } from "../components/ui"
import { WithTheme } from "../theme"
import { Link } from "react-router-dom"

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
  const handleTurnsChange = useCallback(e => setTurns(e.target.value), [])

  return (
    <Container>
      <Board squares={squares} onSquareClick={handleSquareClick} />
      <Controls>
        <p>
          Showing next <TurnsInput type="number" min={1} max={10} value={turns} onChange={handleTurnsChange} /> turns of
          valid moves.
        </p>

        {state.knightPosition === null && (
          <Message>Click or touch a square to select Knight's initial position</Message>
        )}

        {state.knightPosition !== null && state.selected === state.knightPosition && (
          <Message>Click on a valid position to move the Knight</Message>
        )}

        {state.knightPosition !== null && state.selected === null && <Message>Select a square</Message>}

        {state.selected !== null && state.selected !== state.knightPosition && (
          <Message>Select the Knight's position to see its valid moves</Message>
        )}

        <Button primary block onClick={handleRestartClick}>
          Restart game
        </Button>
        <Link to="/">Back to initial page</Link>
      </Controls>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-column-gap: 1rem;
  justify-items: center;
`

const Controls = styled.div`
  color: ${(props: WithTheme) => props.theme.bg};
  font-size: 0.875rem;
  background: #fff;
  border-radius: 3px;
  padding: 1rem 1rem;
`

const TurnsInput = styled.input`
  width: 3rem;
`

const Message = styled.p`
  background: #eee;
  border-radius: 3px;
  padding: 0.5rem 1rem;
`
