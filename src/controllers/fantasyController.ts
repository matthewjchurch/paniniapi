import { Request, Response } from "express";
import https from 'https';

export const getFFData = ( async (request: Request, response: Response) => {
        https.get("https://fantasy.premierleague.com/api/bootstrap-static/", (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk: {}) => data += chunk);

        // The whole response has been received. Send the result as JSON.
        resp.on('end', () => {
            const JSONData = JSON.parse(data);
            const customResponse: {} = {
                "players": JSONData.elements,
                "teams": JSONData.teams
            };
            response.send(customResponse);
        });
    }).on("error", (err) => {
        return "Error: " + err.message;
    });
})