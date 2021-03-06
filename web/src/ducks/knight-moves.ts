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
  validMoves: Position[][]
}

export const SELECT_SQUARE = "valid-chess-moves/knight-moves/SELECT_SQUARE"
export const SET_VALID_MOVES = "valid-chess-moves/knight-moves/HIGHLIGHT_VALID_MOVES"
export const RESTART = "valid-chess-moves/knight-moves/RESTART"

type KnightMovesAction =
  | { type: typeof SELECT_SQUARE; position: Position }
  | { type: typeof SET_VALID_MOVES; validMoves: Position[][] }
  | { type: typeof RESTART }

export const initialState: KnightMovesState = {
  selected: null,
  knightPosition: null,
  validMoves: []
}

export default function reducer(state: KnightMovesState, action: KnightMovesAction): KnightMovesState {
  switch (action.type) {
    case SELECT_SQUARE:
      return reduceSelectSquare(state, action.position)
    case SET_VALID_MOVES:
      return { ...state, validMoves: action.validMoves }
    case RESTART:
      return { ...initialState }
    default:
      return state
  }
}

export function reduceSelectSquare(state: KnightMovesState, position: Position): KnightMovesState {
  if (state.knightPosition === null) {
    // Knight has no position, game is starting
    return { ...state, selected: position, knightPosition: position }
  }

  if (position === state.selected) {
    // Selected is square is the previous selected square, so just deselect it
    return { ...state, selected: null }
  }

  if (state.knightPosition === state.selected) {
    // Previous selection was the knight position, time to move it?

    if (state.validMoves[0]?.indexOf(position) >= 0) {
      // Valid move, change Knight position
      return { ...state, selected: null, knightPosition: position, validMoves: [] }
    } else {
      // Not a valid move, skip the action
      return state
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
export const setValidMoves = (validMoves: Position[][]): KnightMovesAction => ({
  type: SET_VALID_MOVES,
  validMoves
})

export const restart = (): KnightMovesAction => ({ type: RESTART })

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
        marked: isKnightSelected(state) && state.validMoves[0]?.indexOf(curr) >= 0,
        label: isKnightSelected(state) ? getSquareLabel(state, curr) : null
      }
    }),
    {}
  )

/**
 * Selector that indicates whether the current selection is the Knight's position
 */
export const isKnightSelected = (state: KnightMovesState) =>
  state.selected !== null && state.selected === state.knightPosition

/**
 * Selector that returns a square label.
 * @param state The current state.
 * @param position The position to retrieve the label for.
 */
export const getSquareLabel = (state: KnightMovesState, position: Position) =>
  state.validMoves
    ?.map((arr, index) => (arr.indexOf(position) >= 0 ? index + 1 : null))
    .filter(res => !!res)
    .join(",") || null
