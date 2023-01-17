# valid-chess-moves

An interactive playground to showcase chess pieces and their valid moves (currently supporting only the Knight).

Live version: https://valid-chess-moves-app.herokuapp.com/

## Architecture

This app is separated in two different packages:

- `server/`: A node/express web server with a REST API;
- `web/`: A react/typescript project (boilerplated with [CRA](https://github.com/facebook/create-react-app)) containing the HTML client of the app.

## Server REST endpoints

### `GET /api/valid-moves`

Returns a list of valid moves of a piece given a start position.

Query parameters:

| Parameter | Description                                  | Value example | Required |
| --------- | -------------------------------------------- | ------------- | -------- |
| `piece`   | The name of the piece                        | `Knight`      | yes      |
| `from`    | The starting position, in algebraic notation | `d5`          | yes      |
| `turns`   | How many turns ahead to calculate            | `2`           | no       |

Example of a valid request:

```
/api/valid-moves?piece=Knight&from=h8&turns=2

# Response:
# {
#   validMoves: [
#     ["f7", "g6"],
#     ["d6", "d8", "e5", "e7", "f4", "f8", "g5", "h4", "h6", "h8"]
#   ]
# }
```

## Knight moves algorithm

The algorithm used to find the Knight moves was built thinking in clarity and ease of understanding instead of performance. So it is based in a _predicate_.

A predicate called `isValidKnightMove` was built. It receives a start and finish chess positions in algebraic notation and returns whether that move is valid for the Knight.

The predicate is used to retrieve all valid Knight moves, by passing the current Knight position and all 64 possible positions of the chess board to the predicate. The ones that return true are the valid moves for the Knight given its current position.

This process is repeated to retrieve the moves _n_ turns ahead.

All this logic is placed in the `server/src/chess.ts` file.

## Contributing

See [Contributing](./CONTRIBUTING.md) file.

## Deployments

The `master` branch is automatically deployed on Heroku and lives on: https://valid-chess-moves-app.herokuapp.com/
