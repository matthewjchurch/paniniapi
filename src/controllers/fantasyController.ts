import dotenv from 'dotenv';
dotenv.config();
import { Request, Response } from "express";
import fetch from "node-fetch";
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
});

export const getTeamID = ( async (request: Request, response: Response) => {
    const team: string = request.body.id;
    const token: string = (process.env.FANTASY_KEY as string);

    const fetchOptions = {
        method: "GET",
        headers: {
            "X-Auth-Token": token
        },
    }

    fetch("https://api.football-data.org/v2/competitions/2021/teams", fetchOptions)
        .then((res: any) => res.json())
        .then((res: any) => {
            response.send({
                matchday: res.season.currentMatchday,
                team: res.teams.filter((resTeam: any) => resTeam.tla === team)[0]
        });
    });
});

export const getTeamFixtures = ( async (request: Request, response: Response) => {
    const teamID: string = request.body.id;
    const token: string = (process.env.FANTASY_KEY as string);

    const fetchOptions = {
        method: "GET",
        headers: {
            "X-Auth-Token": token
        },
    }

    fetch(`https://api.football-data.org/v2/teams/${teamID}/matches/?status=SCHEDULED&competitions=2021`, fetchOptions)
        .then((res: any) => res.json())
        .then((res: any) => {
            if (res.matches) {
                response.send(res.matches)
            }
        });
    });