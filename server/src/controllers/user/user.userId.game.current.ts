import {Request, Response} from "express"
import { gameService } from "../../services"

export async function getHandler(req:Request, res:Response) {
    const {userId} = req.params
    const games = await gameService.gameAll()
    const userCurrGame = games.filter(el=>
                                   el.users.some(context=>
                                                 context.userId === Number(userId))
                                   && el.users.every(context=>
                                                     context.winner === false))
    console.log(userCurrGame)
    return res.json(userCurrGame)
}