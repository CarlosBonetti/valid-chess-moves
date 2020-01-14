import styled from "styled-components"

export const ButtonsContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(2, 250px);
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`
