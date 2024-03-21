import express, { Router } from "express";
import {getHandler} from "../../controllers/game/game.gameId.player.playerId"

const game_gameId_player_playerIdRoute:Router = express.Router()

game_gameId_player_playerIdRoute.route("/game/:gameId/player/:playerId")
    .get(getHandler)

export default game_gameId_player_playerIdRoute