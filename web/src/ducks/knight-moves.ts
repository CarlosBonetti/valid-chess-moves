import { Position } from "../components/chess/types"

export interface KnightMovesState {
  selected: Position | null
  knightPosition: Position | null
  validMoves: Position[]
}

const SELECT_SQUARE = "valid-chess-moves/knight-moves/SELECT_SQUARE"
const HIGHLIGHT_VALID_MOVES = "valid-chess-moves/knight-moves/HIGHLIGHT_VALID_MOVES"

type KnightMovesAction =
  | { type: typeof SELECT_SQUARE; position: Position }
  | { type: typeof HIGHLIGHT_VALID_MOVES; validMoves: Position[] }

export default function reducer(state: KnightMovesState, action: KnightMovesAction): KnightMovesState {
  switch (action.type) {
    case SELECT_SQUARE:
      return reduceSelectSquare(state, action.position)
    case HIGHLIGHT_VALID_MOVES:
      return { ...state, validMoves: action.validMoves }
    default:
      return state
  }
}

export function reduceSelectSquare(state: KnightMovesState, position: Position): KnightMovesState {
  if (state.knightPosition === null) {
    // Knight has no position, game is starting
    return { selected: position, knightPosition: position, validMoves: [] }
  }

  if (state.knightPosition === state.selected) {
    // Previous selection was the knight position, time to move it
    return { ...state, selected: null, knightPosition: position }
  }

  return {
    ...state,
    selected: position
  }
}

export const selectSquare = (position: Position): KnightMovesAction => ({ type: SELECT_SQUARE, position })
export const highlightValidMoves = (validMoves: Position[]): KnightMovesAction => ({
  type: HIGHLIGHT_VALID_MOVES,
  validMoves
})
