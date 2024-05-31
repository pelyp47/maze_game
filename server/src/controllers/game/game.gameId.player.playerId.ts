import {Request, Response} from "express";
import { gameService, userService } from "../../services";
import { parsableToNumberSchema } from "../../types/zodValidation";

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