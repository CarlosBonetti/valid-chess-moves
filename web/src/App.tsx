import React from "react"
import styled, { createGlobalStyle, ThemeProvider } from "styled-components"
import { BrowserRouter, Route } from "react-router-dom"
import { GamePage } from "./pages/GamePage"
import { InitialPage } from "./pages/InitialPage"
import { theme } from "./theme"

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <AppContainer>
        <BrowserRouter>
          <Route exact path="/" component={InitialPage} />
          <Route exact path="/game" component={GamePage} />
        </BrowserRouter>
      </AppContainer>
    </ThemeProvider>
  )
}

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
`

const GlobalStyle = createGlobalStyle`
  body {    
    background: #312e2b;
    color: #fff;
    font-family: 'Public Sans', sans-serif;
  }

  p {
    line-height: 1.5;
  }
`
