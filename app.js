import http from 'http';
import axios from "axios";
import https from 'https';
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

const PORT = process.env.PORT || 3000;

app.get("/ffdata", async (request, response) => {
    https.get("https://fantasy.premierleague.com/api/bootstrap-static/", (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => data += chunk);

        // The whole response has been received. Send the result as JSON.
        resp.on('end', () => {
            let JSONData = JSON.parse(data);
            let customResponse = {
                "players": JSONData.elements,
                "teams": JSONData.teams
            };
            response.send(customResponse);
        });        
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
})


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

// 3. Finally! Listen on your port
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
// app.listen(8080);