import {Request, Response} from "express"
import { gameService, userService } from "../../services"
import { nameSchema } from "../../types/zodValidation";

export async function getHandler(req:Request, res:Response) {
    const {name} = req.query
    try {
        nameSchema.parse(name);
    } catch(err) {
        return res.status(400).json({error: "invalid data"})
    }
    if(!name) return res.status(401).send({error: "empty string"})
    const user = await userService.getUserByName(String(name))
    return res.json(user)
}

export async function postHandler(req:Request, res:Response) {
    console.log(req.body)
    const {name} = req.body
    try {
        nameSchema.parse(name);
    } catch(err) {
        return res.status(400).json({error: "invalid data"})
    }
    const user = await userService.addUser(String(name))
    return res.json(user)
}