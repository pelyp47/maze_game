import {Request, Response} from "express"
import { gameService, userService } from "../../services"
import { numberIdSchema } from "../../types/zodValidation"

export async function getHandler(req:Request, res:Response) {
    const games = await gameService.gameAll()
    const unstartedGames = games.filter(el=> el.users.length===1)
    return res.json(unstartedGames)
}

export async function postHandler(req:Request, res:Response) {
    const {userId} = req.body;
    try {
        numberIdSchema.parse(userId);
    } catch(err) {
        return res.status(400).json({error: "invalid data"})
    }
    const {id: gameId} = await gameService.addGame();
    const newContext = await gameService.addPlayer(gameId, userId);
    return res.json(newContext)
}