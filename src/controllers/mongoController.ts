import { Request, Response } from "express";
import {
    getCollectionDocuments,
    createCollectionDocument,
    deleteCollectionDocument,
    updateCollectionDocument
} from "../db";

export const getWatchlist = ( async (request: Request, response: Response) => {
    const data: {} = request.body;
    const watchlist = await getCollectionDocuments("users", data);
    response.send(watchlist)
});

export const createUser = ( async (request: Request, response: Response) => {
    const user: {} = request.body;
    const posting = await createCollectionDocument('users', user);
    response.send(user);
});

export const addPlayer = ( async (request: Request, response: Response) => {
    const data = request.body;
    const posting = await updateCollectionDocument('users', data);
    response.send(data);
});

export const removePlayer = ( async (request: Request, response: Response) => {
    const deletePlayer = await deleteCollectionDocument('users', request.body)
    response.send({response: 'delete successful'});
});