import { ALL_POSITIONS, Position } from "../../components/chess/types"
import reduce, {
  getBoardSquares,
  highlightValidMoves,
  HIGHLIGHT_VALID_MOVES,
  initialState,
  selectSquare,
  SELECT_SQUARE
} from "../knight-moves"

describe("reducers", () => {
  describe("default reducer", () => {
    describe(`${HIGHLIGHT_VALID_MOVES} action`, () => {
      it("should change current validMoves state", () => {
        expect(reduce(initialState, { type: HIGHLIGHT_VALID_MOVES, validMoves: ["a3", "g4"] })).toEqual({
          ...initialState,
          validMoves: ["a3", "g4"]
        })
      })
    })
    describe(`${SELECT_SQUARE} action`, () => {
      it("should set the Knight position on selected square on first square selection", () => {
        expect(reduce(initialState, { type: SELECT_SQUARE, position: "a1" })).toEqual({
          knightPosition: "a1",
          selected: "a1",
          validMoves: []
        })
      })
      it("should select the square if previous selection is not Knight position", () => {
        expect(
          reduce({ knightPosition: "h4", selected: "h3", validMoves: [] }, { type: SELECT_SQUARE, position: "g2" })
        ).toEqual({
          knightPosition: "h4",
          selected: "g2",
          validMoves: []
        })
      })
      it("should change the Knight position and clear selection and valid moves when previous selected square was the Knight position", () => {
        expect(
          reduce({ knightPosition: "h4", selected: "h4", validMoves: ["g2"] }, { type: SELECT_SQUARE, position: "g2" })
        ).toEqual({
          knightPosition: "g2",
          selected: null,
          validMoves: []
        })
      })
      it("should not move the Knight if it is not a valid move", () => {
        expect(
          reduce(
            { knightPosition: "a1", selected: "a1", validMoves: ["c2", "b3"] },
            { type: SELECT_SQUARE, position: "a2" }
          )
        ).toEqual({
          knightPosition: "a1",
          selected: "a1",
          validMoves: ["c2", "b3"]
        })
      })
    })
  })
})

describe("action creators", () => {
  describe("selectSquare", () => {
    it("should create an action that represents a selection of a square", () => {
      expect(selectSquare("a3")).toEqual({ type: SELECT_SQUARE, position: "a3" })
      expect(selectSquare("g7")).toEqual({ type: SELECT_SQUARE, position: "g7" })
    })
  })

  describe("highlightValidMoves", () => {
    it("should create an action that represents a change of the valid moves", () => {
      expect(highlightValidMoves(["a3", "b4"])).toEqual({ type: HIGHLIGHT_VALID_MOVES, validMoves: ["a3", "b4"] })
      expect(highlightValidMoves(["g7", "c5"])).toEqual({ type: HIGHLIGHT_VALID_MOVES, validMoves: ["g7", "c5"] })
    })
  })
})

describe("selectors", () => {
  describe("getBoardSquares", () => {
    it("should return a map of the board state given the initial state", () => {
      const squares = getBoardSquares(initialState)
      expect(Object.keys(squares)).toEqual(ALL_POSITIONS)
      ;(Object.keys(squares) as Position[]).forEach((position: Position) => {
        expect(squares[position]).toEqual({ highlighted: false, marked: false, piece: null })
      })
    })
    it("should return a map of the board state given a filled state", () => {
      const squares = getBoardSquares({
        knightPosition: "a1",
        selected: "a2",
        validMoves: ["a3", "a4"]
      })

      expect(squares).toEqual(
        expect.objectContaining({
          a1: { highlighted: false, marked: false, piece: "Knight" },
          a2: { highlighted: true, marked: false, piece: null },
          a3: { highlighted: false, marked: true, piece: null },
          a4: { highlighted: false, marked: true, piece: null },
          a5: { highlighted: false, marked: false, piece: null }
        })
      )
    })
  })
})
