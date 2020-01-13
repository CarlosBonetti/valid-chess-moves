import { ALL_POSITIONS, Position } from "../../components/chess/types"
import reduce, {
  getBoardSquares,
  setValidMoves,
  SET_VALID_MOVES,
  initialState,
  selectSquare,
  SELECT_SQUARE,
  restart,
  RESTART,
  isKnightSelected,
  getSquareLabel,
  KnightMovesState
} from "../knight-moves"

describe("reducers", () => {
  describe("default reducer", () => {
    describe(`${SET_VALID_MOVES} action`, () => {
      it("should change current validMoves state", () => {
        expect(reduce(initialState, { type: SET_VALID_MOVES, validMoves: [["a3", "g4"]] })).toEqual({
          ...initialState,
          validMoves: [["a3", "g4"]]
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
          reduce(
            { knightPosition: "h4", selected: "h4", validMoves: [["g2"]] },
            { type: SELECT_SQUARE, position: "g2" }
          )
        ).toEqual({
          knightPosition: "g2",
          selected: null,
          validMoves: []
        })
      })
      it("should not move the Knight if it is not a valid move", () => {
        expect(
          reduce(
            { knightPosition: "a1", selected: "a1", validMoves: [["c2", "b3"]] },
            { type: SELECT_SQUARE, position: "a2" }
          )
        ).toEqual({
          knightPosition: "a1",
          selected: "a1",
          validMoves: [["c2", "b3"]]
        })
      })
      it("should not move Knight and deselect its square if clicked again at the same position", () => {
        expect(
          reduce(
            { knightPosition: "a1", selected: "a1", validMoves: [["c2", "b3"]] },
            { type: SELECT_SQUARE, position: "a1" }
          )
        ).toEqual({
          knightPosition: "a1",
          selected: null,
          validMoves: [["c2", "b3"]]
        })
      })
    })
    describe(`${RESTART} action`, () => {
      it("should restore to the initial state", () => {
        expect(
          reduce(
            {
              knightPosition: "a1",
              selected: "a1",
              validMoves: [["c2", "b3"]]
            },
            { type: RESTART }
          )
        ).toEqual(initialState)
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

  describe("setValidMoves", () => {
    it("should create an action that represents a change of the valid moves", () => {
      expect(setValidMoves([["a3", "b4"]])).toEqual({ type: SET_VALID_MOVES, validMoves: [["a3", "b4"]] })
      expect(setValidMoves([["g7", "c5"]])).toEqual({ type: SET_VALID_MOVES, validMoves: [["g7", "c5"]] })
    })
  })

  describe("restart", () => {
    it("should create an action that represents a restart of the game", () => {
      expect(restart()).toEqual({ type: RESTART })
    })
  })
})

describe("selectors", () => {
  describe("getBoardSquares", () => {
    it("should return a map of the board state given the initial state", () => {
      const squares = getBoardSquares(initialState)
      expect(Object.keys(squares)).toEqual(ALL_POSITIONS)
      ;(Object.keys(squares) as Position[]).forEach((position: Position) => {
        expect(squares[position]).toEqual({ highlighted: false, marked: false, piece: null, label: null })
      })
    })
    it("should return a map of the board state given a filled state", () => {
      const squares = getBoardSquares({
        knightPosition: "a1",
        selected: "a1",
        validMoves: [["a3", "a4"], ["h7", "h8"], ["h8"]]
      })

      expect(squares["a1"]).toEqual({ highlighted: true, marked: false, piece: "Knight", label: null })
      expect(squares["a2"]).toEqual({ highlighted: false, marked: false, piece: null, label: null })
      expect(squares["a3"]).toEqual({ highlighted: false, marked: true, piece: null, label: "1" })
      expect(squares["a4"]).toEqual({ highlighted: false, marked: true, piece: null, label: "1" })
      expect(squares["a5"]).toEqual({ highlighted: false, marked: false, piece: null, label: null })
      expect(squares["h7"]).toEqual({ highlighted: false, marked: false, piece: null, label: "2" })
      expect(squares["h8"]).toEqual({ highlighted: false, marked: false, piece: null, label: "2,3" })
    })
  })
  describe("isKnightSelected", () => {
    it("should return true if current selection is the same as the Knight position", () => {
      expect(isKnightSelected({ ...initialState, selected: null, knightPosition: null })).toEqual(false)
      expect(isKnightSelected({ ...initialState, selected: "a1", knightPosition: "a2" })).toEqual(false)
      expect(isKnightSelected({ ...initialState, selected: null, knightPosition: "a2" })).toEqual(false)
      expect(isKnightSelected({ ...initialState, selected: "a1", knightPosition: null })).toEqual(false)
      expect(isKnightSelected({ ...initialState, selected: "a1", knightPosition: "a1" })).toEqual(true)
    })
  })
  describe("getSquareLabel", () => {
    it("should a label indicating the valid moves of that position", () => {
      const state: KnightMovesState = {
        ...initialState,
        selected: "a1",
        knightPosition: "a1",
        validMoves: [
          ["b3", "c2"],
          ["a1", "a3"],
          ["b3", "c2"]
        ]
      }

      expect(getSquareLabel(state, "c3")).toEqual(null)
      expect(getSquareLabel(state, "b3")).toEqual("1,3")
      expect(getSquareLabel(state, "a1")).toEqual("2")
    })
  })
})
