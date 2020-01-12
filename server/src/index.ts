import { app } from "./server"

const port = process.env.SERVER_PORT || 8000

app.listen(port, () => console.log(`valid-chess-moves server listening on port ${port}!`))
