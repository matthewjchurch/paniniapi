import cors from "cors";
import express from 'express';
import bodyParser from "body-parser";
import { getFFData } from "./controllers/fantasyController";
import { getWatchlist, createUser, addPlayer, removePlayer } from "./controllers/mongoController";

// 1. Create our express API
const app: express.Application = express();

// NOTE: let's allow requests from ALL ORIGINS
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get("/ffdata", getFFData)

app.post('/getWatchlist', getWatchlist);

app.post('/createUser', createUser);

app.post('/addPlayer', addPlayer);

app.delete('/removePlayer', removePlayer)

// 3. Finally! Listen on your port
// app.listen(PORT, () => {
//     // tslint:disable-next-line:no-console
//     console.log(`Our app is running on port ${ PORT }`);
// });
app.listen(8080);