import React, { useCallback, useEffect, useReducer, useMemo } from "react"
import reducer, { getBoardSquares, setValidMoves, initialState, selectSquare, restart } from "../ducks/knight-moves"
import { Board, Position } from "../components/chess"
import styled from "styled-components"
import { Button } from "../components/ui"
import { WithTheme } from "../theme"
import { Link } from "react-router-dom"

export function GamePage() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch(setValidMoves([]))

    if (state.knightPosition) {
      fetch(`/api/valid-moves?piece=Knight&from=${state.knightPosition}&turns=2`)
        .then(res => res.json())
        .then(data => dispatch(setValidMoves(data.validMoves)))
    }
  }, [state.knightPosition])

  const squares = useMemo(() => getBoardSquares(state), [state])
  const handleSquareClick = useCallback((position: Position) => dispatch(selectSquare(position)), [])
  const handleRestartClick = useCallback(() => dispatch(restart()), [])

  return (
    <Container>
      <Board squares={squares} onSquareClick={handleSquareClick} />
      <Controls>
        <p>
          Showing next <input type="number" min={1} max={10} style={{ width: "3rem" }} /> valid moves
        </p>

        <p>Click or touch a square to select Knight's initial position...</p>

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