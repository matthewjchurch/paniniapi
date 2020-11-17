import http from 'http';
import cors from 'cors';
import express from 'express';
import bodyParser from "body-parser";

import { getCollectionDocuments } from "./db.js";
import { createCollectionDocument } from "./db.js";
import { deleteCollectionDocument } from "./db.js";

// 1. Create our express API
const app = express();

// NOTE: let's allow requests from ALL ORIGINS
app.use(cors());
app.use(bodyParser.json());

app.get('/', async (request, response) => {

    const getPlayers = await getCollectionDocuments('players');
    response.send(getPlayers[Math.floor(Math.random() * Math.floor(getPlayers.length))]);
    // response.send(getPlayers)
})

app.post('/create', async (request, response) => {
    const createPlayer = request.body;
    const posting = await createCollectionDocument('players', createPlayer);
    response.send(createPlayer);
})

app.delete('/delete', async (request, response) => {
    const deletePlayer = await deleteCollectionDocument('players', request.body.name)
    response.send({response: 'delete successful'});
})

// 3. Finally! Listen on Port 8080
app.listen(8080);