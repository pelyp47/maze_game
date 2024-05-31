import {Request, Response} from "express"
import { gameService, userService } from "../../services"
import { isOnlineSchema, nameSchema, parsableToNumberSchema } from "../../types/zodValidation";

export async function getHandler(req:Request, res:Response) {
    const {userId} = req.params
    try {
        parsableToNumberSchema.parse(userId);
    } catch(err) {
        return res.status(400).json({error: "invalid data"})
    }
    const user = await userService.getUserById(Number(userId))
    return res.json(user)
}

export async function patchHandler(req:Request, res:Response) {
    const {userId} = req.params
    const {name, online} = req.body
    try {
        isOnlineSchema.parse(online);
        nameSchema.parse(name);
        parsableToNumberSchema.parse(userId);
    } catch(err) {
        return res.status(400).json({error: "invalid data"})
    }
    const updatedUser = await userService.updateUser(Number(userId), name, online)
    return res.json(updatedUser)
}