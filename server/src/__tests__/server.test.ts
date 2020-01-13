import request from "supertest"
import { app } from "../server"

describe("GET /api/valid-moves", () => {
  it("should return a list of valid moves for the Knight given a start position", async () => {
    const res = await request(app).get("/api/valid-moves?piece=Knight&from=h8")
    expect(res.status).toEqual(200)
    expect(res.body).toEqual({ validMoves: [["f7", "g6"]] })
  })
  it("should return a list of valid moves for the Knight given a start position and number of turns", async () => {
    const res = await request(app).get("/api/valid-moves?piece=Knight&from=h8&turns=2")
    expect(res.status).toEqual(200)
    expect(res.body).toEqual({
      validMoves: [
        ["f7", "g6"],
        ["d6", "d8", "e5", "e7", "f4", "f8", "g5", "h4", "h6", "h8"]
      ]
    })
  })
  it("should return an error required parameters are not given", async () => {
    const res = await request(app).get("/api/valid-moves")
    expect(res.status).toEqual(400)
    expect(res.body).toMatchInlineSnapshot(`
      Object {
        "message": "Missing \\"piece\\" and \\"from\\" parameters",
      }
    `)
  })
  it("should return an error if any piece other than Knight is given", async () => {
    const res = await request(app).get("/api/valid-moves?piece=King&from=h8")
    expect(res.status).toEqual(400)
    expect(res.body).toMatchInlineSnapshot(`
      Object {
        "message": "Pieces other than the Knight are not supported yet",
      }
    `)
  })
  it("should return an error if an invalid position in algebraic notation is given", async () => {
    const res = await request(app).get("/api/valid-moves?piece=Knight&from=x9")
    expect(res.status).toEqual(400)
    expect(res.body).toMatchInlineSnapshot(`
      Object {
        "message": "Position \\"x9\\" is not a valid chess position in algebraic notation",
      }
    `)
  })
})
