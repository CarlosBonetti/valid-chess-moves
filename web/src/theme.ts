export const theme = {
  fontFamily: "'Public Sans', sans-serif",
  bg: "#312e2b",
  board: {
    whiteBg: "rgb(237, 238, 209)",
    blackBg: "rgb(119, 153, 82)",
    highlightBg: "#ff9"
  }
}

export type Theme = typeof theme

export interface WithTheme {
  theme: Theme
}
