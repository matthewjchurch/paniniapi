import cors from "cors";
import express from 'express';
import bodyParser from "body-parser";
import { getFFData, getTeamFixtures, getTeamID } from "./controllers/fantasyController.js";
import * as mongoController from "./controllers/mongoController.js";

// 1. Create our express API
const app: express.Application = express();

// NOTE: let's allow requests from ALL ORIGINS
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get("/ffdata", getFFData);

app.post("/getTeamID", getTeamID);

app.post("/getTeamFixtures", getTeamFixtures);

app.post('/getWatchlist', mongoController.getWatchlist);

app.post('/createUser', mongoController.createUser);

app.post('/addPlayer', mongoController.addPlayer);

app.delete('/removePlayer', mongoController.removePlayer)

// 3. Finally! Listen on your port
app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Our app is running on port ${ PORT }`);
});

// app.listen(8080);