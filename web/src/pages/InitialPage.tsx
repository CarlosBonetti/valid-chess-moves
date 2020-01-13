import React from "react"
import styled from "styled-components"
import { Knight } from "../components/chess"
import { ButtonLink } from "../components/ui"

export function InitialPage() {
  return (
    <Container>
      <h1>
        Welcome to valid-chess-moves <Knight height="1.7em" />!
      </h1>

      <p>
        An interactive playground to show chess pieces valid moves <em>(currently supporting only the Knight)</em>.
      </p>

      <p>
        <ButtonLink to="/game">Start game</ButtonLink>
        <ButtonLink to="/tour/1" primary>
          Take the tour
        </ButtonLink>
      </p>
    </Container>
  )
}

const Container = styled.div`
  max-width: 600px;
`
