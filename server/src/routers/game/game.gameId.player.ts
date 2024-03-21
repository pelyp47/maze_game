import express, { Router } from "express";
import {getHandler, postHandler} from "../../controllers/game/game.gameId.player"

const game_gameId_playerRoute:Router = express.Router()

game_gameId_playerRoute.route("/game/:gameId/player")
    .get(getHandler)
    .post(postHandler)

export default game_gameId_playerRoute