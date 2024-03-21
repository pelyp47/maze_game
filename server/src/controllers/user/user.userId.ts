import {Request, Response} from "express"
import { gameService, userService } from "../../services"

export async function getHandler(req:Request, res:Response) {
    const {userId} = req.params
    const user = await userService.getUserById(Number(userId))
    return res.json(user)
}

export async function patchHandler(req:Request, res:Response) {
    const {userId} = req.params
    const {name, online} = req.body
    const updatedUser = await userService.updateUser(Number(userId), name, online)
    return res.json(updatedUser)
}