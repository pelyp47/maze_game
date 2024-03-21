import {Request, Response} from "express";
import { messageService } from "../../services";

export async function getHandler(req:Request, res:Response) {
    const {gameId} = req.params
    const messages = await messageService.messageGame(Number(gameId))
    return res.json(messages)
}

export async function postHandler(req:Request, res:Response) {
    const {text, time} = req.body
    const {gameId, playerId} = req.params
    const messageObj = {time: new Date(time), text: String(text)}
    const newMessage = await messageService.addMessage(Number(gameId), Number(playerId), messageObj)
    return res.json(newMessage)
}