import express, { Router } from "express";
import {getHandler} from "../../controllers/game/game.gameId"

const game_gameIdRoute:Router = express.Router()

game_gameIdRoute.route("/game/:gameId")
    .get(getHandler)

export default game_gameIdRoute