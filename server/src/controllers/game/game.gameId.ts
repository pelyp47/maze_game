import {Request, Response} from "express"
import { gameService, userService } from "../../services"

export async function getHandler(req:Request, res:Response) {
    const {gameId} = req.params
    const games = await gameService.gameAll()
    const game = games.find(el=>el.id===Number(gameId))
    return res.json(game)
}