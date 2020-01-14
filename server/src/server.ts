import express from "express"
import path from "path"
import { getValidKnightMovesInTurns, isValidPosition } from "./chess"

export const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, "../../web/build")))

app.get("/api/valid-moves", (req, res) => {
  const { piece, from, turns } = req.query

  if (!piece || !from) {
    return res.status(400).json({
      message: `Missing "piece" and "from" parameters`
    })
  }

  if (piece !== "Knight") {
    return res.status(400).json({
      message: `Pieces other than the Knight are not supported yet`
    })
  }

  if (!isValidPosition(from)) {
    return res.status(400).json({
      message: `Position "${from}" is not a valid chess position in algebraic notation`
    })
  }

  return res.json({ validMoves: getValidKnightMovesInTurns(from, turns) })
})
