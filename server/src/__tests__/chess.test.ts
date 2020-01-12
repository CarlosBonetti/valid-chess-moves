import { getPositionX, getPositionY, isValidKnightMove, getValidKnightMoves, isValidPosition } from "../chess"

describe("getPositionX", () => {
  it("should return the numeric X position given an algebraic notation position", () => {
    expect(getPositionX("a1")).toEqual(1)
    expect(getPositionX("c4")).toEqual(3)
    expect(getPositionX("h8")).toEqual(8)
  })
})

describe("getPositionY", () => {
  it("should return the numeric X position given an algebraic notation position", () => {
    expect(getPositionY("a1")).toEqual(1)
    expect(getPositionY("d4")).toEqual(4)
    expect(getPositionY("h8")).toEqual(8)
  })
})

describe("isValidPosition", () => {
  it("should return true if the parameter is a valid chess position in algebraic notation", () => {
    expect(isValidPosition("a1")).toEqual(true)
    expect(isValidPosition("x5")).toEqual(false)
    expect(isValidPosition("a9")).toEqual(false)
    expect(isValidPosition("")).toEqual(false)
    expect(isValidPosition(undefined)).toEqual(false)
  })
})

describe("isValidKnightMove", () => {
  it("should whther the move is a valid chess move for a kight piece", () => {
    expect(isValidKnightMove("a8", "b6")).toEqual(true)
    expect(isValidKnightMove("a8", "c7")).toEqual(true)
    expect(isValidKnightMove("a8", "c6")).toEqual(false)
    expect(isValidKnightMove("a8", "b7")).toEqual(false)

    expect(isValidKnightMove("h1", "g3")).toEqual(true)
    expect(isValidKnightMove("h1", "f2")).toEqual(true)
    expect(isValidKnightMove("h1", "f3")).toEqual(false)
    expect(isValidKnightMove("h1", "g2")).toEqual(false)
  })
})

describe("getValidKnightMove", () => {
  it("should return an array of all valid knight move starting from a given position", () => {
    expect(getValidKnightMoves("a1")).toEqual(["b3", "c2"])
    expect(getValidKnightMoves("a8")).toEqual(["b6", "c7"])
    expect(getValidKnightMoves("h1")).toEqual(["f2", "g3"])
    expect(getValidKnightMoves("h8")).toEqual(["f7", "g6"])
    expect(getValidKnightMoves("d5")).toEqual(["b4", "b6", "c3", "c7", "e3", "e7", "f4", "f6"])
  })
})
