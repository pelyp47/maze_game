import {Request, Response} from "express"
import { gameService, userService } from "../../services"

export async function getHandler(req:Request, res:Response) {
    const {userId} = req.params
    const games = await gameService.gameAll()
    const userGames = games.filter(el=>
                                   el.users.some(context=>
                                                 context.userId === Number(userId)))
    return res.json(userGames)
}
