import React from "react"
import { Route } from "react-router"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { ButtonLink } from "../components/ui"
import step1 from "../images/step1.png"
import step2 from "../images/step2.png"
import step3 from "../images/step3.png"

export function TourPage() {
  return (
    <TourLayout>
      <Route exact path="/tour/1" component={Step1} />
      <Route exact path="/tour/2" component={Step2} />
      <Route exact path="/tour/3" component={Step3} />
    </TourLayout>
  )
}

function Step1() {
  return (
    <>
      <p>1. When you first start the game, an empty chess board will be shown.</p>
      <p>
        2. Click or touch a square to <b>position the Knight</b> (see image below).
        <ul>
          <li>The Knight position will be highlighted, indicating it is selected and ready to move.</li>
          <li>The squares where the Knight can move in this turn will be marked with a different border.</li>
          <li>
            Also, squares are going to show in their right upper corner the number of turns it takes for the Knight to
            reach that position.
          </li>
        </ul>
      </p>
      <p>
        <img src={step1} alt="A chess board with a Knight positioned on d5. The valid Knight moves are highlighted" />
      </p>

      <Footer>
        <Link to="/">Back to initial page</Link>
        <ButtonLink to="/game">Start game</ButtonLink>
        <ButtonLink to="/tour/2" primary>
          Next
        </ButtonLink>
      </Footer>
    </>
  )
}

function Step2() {
  return (
    <>
      <p>
        3. Click or touch a square to <b>move the Knight</b> to that position.
        <ul>
          <li>
            The Knight will not be moved if it is an illegal movement (positions that the Knight can't reach in 1 turn).
          </li>
        </ul>
      </p>
      <p>
        4. You can also <b>deselect the current square</b> by clicking/touching on it and select other squares. The
        current selected square is always hightlighted.
      </p>

      <p>
        <img src={step2} alt="A chess board with a Knight positioned on d5. The f3 position is highlighted." />
      </p>

      <Footer>
        <Link to="/tour/1">Previous</Link>
        <ButtonLink to="/game">Start game</ButtonLink>
        <ButtonLink to="/tour/3" primary>
          Next
        </ButtonLink>
      </Footer>
    </>
  )
}

function Step3() {
  return (
    <>
      <p>
        5. You can <b>Restart the game</b> by clicking the button in the helper menu.
      </p>
      <p>
        6. You can change the predicted <b>number of turns ahead</b>, shown in the squares, that takes for the Knight to
        reach that position by using the numeric input in the helper menu.
      </p>
      <p>
        <img
          src={step3}
          alt="A chess board with a Knight positioned on e6. Its valid moves are highlighted. Other squares contain the number of turns the Knight takes to reach that position"
        />
      </p>

      <Footer>
        <Link to="/tour/2">Previous</Link>
        <ButtonLink to="/game" primary>
          Start game
        </ButtonLink>
      </Footer>
    </>
  )
}

const TourLayout = styled.div`
  max-width: 720px;
  margin: 0 auto;
  font-size: 15px;

  img {
    max-width: 100%;
    display: block;
    margin: 0 auto;
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #666;
  padding: 0.5rem 0;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;

    & > * {
      margin: 0.5rem 0;
      text-align: center;
    }
  }
`
