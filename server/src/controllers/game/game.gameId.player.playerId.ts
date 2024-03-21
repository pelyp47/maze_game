import {Request, Response} from "express";
import { gameService, userService } from "../../services";

export async function getHandler(req:Request, res:Response) {
    const {userId} = req.params
    const user = await userService.getUserById(Number(userId))
    return res.json(user)
}