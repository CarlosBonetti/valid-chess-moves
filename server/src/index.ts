import express from "express";

const port = process.env.SERVER_PORT || 8000;

const app = express();
app.use(express.json());

app.get("/api/valid-moves", (req, res) => {
  res.json({ moves: ["a1"] });
});

app.listen(port, () =>
  console.log(`valid-chess-moves server listening on port ${port}!`)
);
