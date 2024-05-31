import {Request, Response} from "express"
import { gameService, userService } from "../../services"
import { parsableToNumberSchema } from "../../types/zodValidation";

export async function getHandler(req:Request, res:Response) {
    const {userId} = req.params
    try {
        parsableToNumberSchema.parse(userId);
    } catch(err) {
        return res.status(400).json({error: "invalid data"})
    }
    const games = await gameService.gameAll()
    const userGames = games.filter(el=>
                                   el.users.some(context=>
                                                 context.userId === Number(userId)))
    return res.json(userGames)
}
