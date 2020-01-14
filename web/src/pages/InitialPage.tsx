import React from "react"
import styled from "styled-components"
import { Knight } from "../components/chess"
import { ButtonLink, ButtonsContainer } from "../components/ui"

export function InitialPage() {
  return (
    <Container>
      <p>
        <Knight height="6rem" />
      </p>

      <h1>Welcome to valid-chess-moves!</h1>

      <p>
        An interactive playground to showcase chess pieces and their valid moves{" "}
        <em>(currently supporting only the Knight)</em>.
      </p>

      <Divider />

      <p>
        <b>Take the tour</b> to see how this app works or <b>start the game</b> directly.
      </p>

      <ButtonsContainer>
        <ButtonLink to="/tour/1">Take the tour</ButtonLink>
        <ButtonLink to="/game" primary>
          Start game
        </ButtonLink>
      </ButtonsContainer>
    </Container>
  )
}

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #666;
  margin: 2rem 0;
`
