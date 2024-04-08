import {Request, Response} from "express";
import { gameService } from "../../services";


export async function getHandler(req:Request, res:Response) {
    const {gameId, playerId} = req.params
    const games = await gameService.gameAll()
    const game = games.find(el=>el.id === Number(gameId))
    console.log(game)
    if(!game) return res.status(401).json({error: "game wasn't found"})
    if(game.users.some(el=>el.winner===true)) return res.status(402).json({error:"game was finished"})
    const context = game.users.find(el=>el.userId !== Number(playerId))
    if(!context) return res.status(403).json({error: "context wasn't found"})
    const messages = await gameService.setWinner(context.id)
    return res.json(messages)
}