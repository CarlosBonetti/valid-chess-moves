import React from "react"
import styled, { createGlobalStyle } from "styled-components"

import { KnightMovesGame } from "./components/chess"

export function App() {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <KnightMovesGame />
      </AppContainer>
    </>
  )
}

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
`

const GlobalStyle = createGlobalStyle`
  body {    
    background: #312e2b;
    font-family: 'Public Sans', sans-serif;
  }
`
