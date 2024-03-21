import express, { Router } from "express";
import {getHandler, postHandler} from "../../controllers/game/game"

const gameRoute:Router = express.Router()

gameRoute.route("/game")
    .get(getHandler)
    .post(postHandler)

export default gameRoute