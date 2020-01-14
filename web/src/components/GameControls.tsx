import React, { useCallback } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Button } from "../components/ui"
import { KnightMovesState } from "../ducks/knight-moves"
import { WithTheme } from "../theme"

export interface GameControlsProps {
  state: KnightMovesState
  turns: number
  onTurnsChange(turns: number): void
  onRestartClick(): void
}

export function GameControls(props: GameControlsProps) {
  const { state, turns, onTurnsChange, onRestartClick } = props

  const handleRestartClick = useCallback(() => onRestartClick(), [onRestartClick])
  const handleTurnsChange = useCallback(e => onTurnsChange(e.target.value), [onTurnsChange])

  return (
    <Controls>
      <p>
        Showing next <TurnsInput type="number" min={1} max={10} value={turns} onChange={handleTurnsChange} /> turns of
        valid moves.
      </p>

      {state.knightPosition === null && <Message>Click or touch a square to select Knight's initial position</Message>}

      {state.knightPosition !== null && state.selected === state.knightPosition && (
        <Message>Click on a valid position to move the Knight</Message>
      )}

      {state.knightPosition !== null && state.selected === null && <Message>Select a square</Message>}

      {state.selected !== null && state.selected !== state.knightPosition && (
        <Message>Select the Knight's position to see its valid moves</Message>
      )}

      <MovementList></MovementList>

      <Footer>
        <Button primary block onClick={handleRestartClick}>
          Restart game
        </Button>
        <Link to="/">Back to initial page</Link>
      </Footer>
    </Controls>
  )
}

const Controls = styled.div`
  color: ${(props: WithTheme) => props.theme.bg};
  font-size: 0.875rem;
  background: #fff;
  border-radius: 3px;
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;

  a {
    color: ${(props: WithTheme) => props.theme.bg};
  }
`

const MovementList = styled.div`
  flex: 1;
`

const TurnsInput = styled.input`
  width: 3rem;
`

const Message = styled.p`
  background: #eee;
  border-radius: 3px;
  padding: 0.5rem 1rem;
`

const Footer = styled.div`
  text-align: center;
  align-self: flex-end;

  & > * {
    margin: 0.5rem 0;
  }
`
