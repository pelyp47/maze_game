import {Request, Response} from "express"
import { gameService, userService } from "../../services"
import { numberIdSchema, parsableToNumberSchema } from "../../types/zodValidation";

export async function getHandler(req:Request, res:Response) {
    const {gameId} = req.params
    try {
        parsableToNumberSchema.parse(gameId);
    } catch(err) {
        return res.status(400).json({error: "invalid data"})
    }
    const games = await gameService.gameAll()
    const game = games.find(el=>el.id===Number(gameId))
    const users = game?.users
    return res.json(users)
}

export async function postHandler(req:Request, res:Response) {
    const {gameId} = req.params;
    const {userId} = req.body;
    try {
        parsableToNumberSchema.parse(gameId);
        numberIdSchema.parse(userId)
    } catch(err) {
        return res.status(400).json({error: "invalid data"})
    }
    const games = await gameService.gameAll()
    const game = games.find(el=>el.id===Number(gameId))
    if(!game) return res.status(401).json("game wasn't found")
    if(game.users.length===2) return res.status(402).json("game invitation expired")
    if(game.users.some(el=>el.userId===Number(userId))) return res.status(403).json("already joined")
    const newContext = await gameService.addPlayer(Number(gameId), Number(userId));
    return res.json(newContext)
}