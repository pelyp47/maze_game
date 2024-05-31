import {Request, Response} from "express"
import { gameService, userService } from "../../services"
import { parsableToNumberSchema } from "../../types/zodValidation";

export async function getHandler(req:Request, res:Response) {
    const {gameId} = req.params
    try {
        parsableToNumberSchema.parse(gameId);
    } catch(err) {
        return res.status(400).json({error: "invalid data"})
    }
    const games = await gameService.gameAll()
    const game = games.find(el=>el.id===Number(gameId))
    return res.json(game)
}