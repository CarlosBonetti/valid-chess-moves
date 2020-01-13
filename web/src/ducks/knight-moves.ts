import { Position, ALL_POSITIONS } from "../components/chess/types"
import { BoardProps } from "../components/chess"

export interface KnightMovesState {
  /**
   * The current selected board square.
   */
  selected: Position | null

  /**
   * The current Knight position.
   */
  knightPosition: Position | null

  /**
   * The current valid moves, given the current selected position.
   */
  validMoves: Position[]
}

export const SELECT_SQUARE = "valid-chess-moves/knight-moves/SELECT_SQUARE"
export const HIGHLIGHT_VALID_MOVES = "valid-chess-moves/knight-moves/HIGHLIGHT_VALID_MOVES"

type KnightMovesAction =
  | { type: typeof SELECT_SQUARE; position: Position }
  | { type: typeof HIGHLIGHT_VALID_MOVES; validMoves: Position[] }

export const initialState: KnightMovesState = {
  selected: null,
  knightPosition: null,
  validMoves: []
}

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
    return { ...state, selected: position, knightPosition: position, validMoves: [] }
  }

  if (state.knightPosition === state.selected) {
    // Previous selection was the knight position, time to move it?

    if (position === state.knightPosition) {
      // Selected is square is the current Knight position, so just deselect the square
      return { ...state, selected: null, validMoves: [] }
    } else if (state.validMoves.indexOf(position) < 0) {
      // Not a valid move, skip the action
      return state
    } else {
      // Valid move, change Knight position
      return { ...state, selected: null, knightPosition: position, validMoves: [] }
    }
  }

  return { ...state, selected: position }
}

/**
 * Creates an action which represents a board square being selected.
 * @param position The selected position.
 */
export const selectSquare = (position: Position): KnightMovesAction => ({ type: SELECT_SQUARE, position })

/**
 * Creates an action which changes the current valid moves.
 * @param validMoves
 */
export const highlightValidMoves = (validMoves: Position[]): KnightMovesAction => ({
  type: HIGHLIGHT_VALID_MOVES,
  validMoves
})

/**
 * State selector that returns a map of the board square states, given the current game state.
 * @param state The current knight-moves game state.
 * @returns A map having the Position as key and the square state as value.
 */
export const getBoardSquares = (state: KnightMovesState): BoardProps["squares"] =>
  ALL_POSITIONS.reduce(
    (prev, curr) => ({
      ...prev,
      [curr]: {
        highlighted: state.selected === curr,
        piece: state.knightPosition === curr ? "Knight" : null,
        marked: state.validMoves?.indexOf(curr) >= 0
      }
    }),
    {}
  )
