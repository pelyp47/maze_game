import {Request, Response} from "express";
import { messageService } from "../../services";
import { dateSchema, parsableToNumberSchema, textMessageSchema } from "../../types/zodValidation";

export async function getHandler(req:Request, res:Response) {
    const {gameId} = req.params
    try {
        parsableToNumberSchema.parse(gameId);
    } catch(err) {
        return res.status(400).json({error: "invalid data"})
    }
    const messages = await messageService.messageGame(Number(gameId))
    return res.json(messages)
}

export async function postHandler(req:Request, res:Response) {
    const {text, time} = req.body
    const {gameId, playerId} = req.params
    try {
        parsableToNumberSchema.parse(gameId);
        parsableToNumberSchema.parse(playerId);
        textMessageSchema.parse(text);
        dateSchema.parse(time)
    } catch(err) {
        return res.status(400).json({error: "invalid data"})
    }
    const messageObj = {time: new Date(time), text: String(text)}
    const newMessage = await messageService.addMessage(Number(gameId), Number(playerId), messageObj)
    return res.json(newMessage)
}