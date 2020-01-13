import React from "react"
import styled, { css } from "styled-components"
import { WithTheme } from "../../theme"
import { Link, LinkProps } from "react-router-dom"

export interface ButtonProps {
  primary?: boolean
}

export const ButtonLink = (props: ButtonProps & LinkProps) => (
  <Button as={({ primary, ...rest }: ButtonProps & LinkProps) => <Link {...rest} />} {...props} />
)

export const Button = styled.button(
  (props: ButtonProps & WithTheme) => css`
    display: inline-block;
    border-radius: 3px;
    padding: 0.75rem 2.5rem;
    margin: 0.5rem 1rem;
    background: ${props.primary ? props.theme.board.whiteBg : "transparent"};
    color: ${props.primary ? props.theme.bg : "white"};
    border-width: 2px;
    border-style: solid;
    border-color: ${props.primary ? props.theme.board.whiteBg : "white"};
    text-align: center;
    text-decoration: none;
    font-weight: bold;
  `
)
