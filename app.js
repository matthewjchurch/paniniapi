import http from 'http';
import axios from "axios";
import https from 'https';
import cors from 'cors';
import express from 'express';
import bodyParser from "body-parser";

import { 
    getCollectionDocuments,
    createCollectionDocument,
    deleteCollectionDocument,
    updateCollectionDocument
} from "./db.js";


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

app.get('/getWatchlist', async (request, response) => {
    const user = request.body;
    console.log(user);
    response.send(getPlayers[Math.floor(Math.random() * Math.floor(getPlayers.length))]);
    // response.send(getPlayers)
})

app.post('/createUser', async (request, response) => {
    const createUser = request.body;
    const posting = await createCollectionDocument('users', createUser);
    response.send(createUser);
});

app.post('/addPlayer', async (request, response) => {
    const data = request.body;
    const posting = await updateCollectionDocument('users', data);
    response.send(data);
})

app.delete('/delete', async (request, response) => {
    const deletePlayer = await deleteCollectionDocument('users', request.body.uid)
    response.send({response: 'delete successful'});
})

// 3. Finally! Listen on your port
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
// app.listen(8080);