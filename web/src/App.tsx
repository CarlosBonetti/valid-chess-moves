import React from "react"
import styled, { createGlobalStyle, ThemeProvider, css } from "styled-components"
import { BrowserRouter, Route } from "react-router-dom"
import { GamePage } from "./pages/GamePage"
import { InitialPage } from "./pages/InitialPage"
import { theme, WithTheme } from "./theme"
import { TourPage } from "./pages/TourPage"

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <AppContainer>
        <BrowserRouter>
          <Route exact path="/" component={InitialPage} />
          <Route exact path="/game" component={GamePage} />
          <Route path="/tour" component={TourPage} />
        </BrowserRouter>
      </AppContainer>
    </ThemeProvider>
  )
}

const AppContainer = styled.div`
  padding: 1rem;
  max-width: 960px;
  margin: 0 auto;
`

const GlobalStyle = createGlobalStyle(
  ({ theme }: WithTheme) => css`
    body {
      font-family: ${theme.fontFamily};
      color: #fff;
      background: ${theme.bg};
      margin: 0;
    }

    p {
      line-height: 1.5;
    }

    a {
      color: #fff;

      &:hover {
        text-decoration: none;
      }
    }
  `
)
