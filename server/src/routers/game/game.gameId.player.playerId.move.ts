import express, { Router } from "express";
import {getHandler, postHandler} from "../../controllers/game/game.gameId.player.playerId.move"

const game_gameId_player_playerId_moveRoute:Router = express.Router()

game_gameId_player_playerId_moveRoute.route("/game/:gameId/player/:playerId/move")
    .get(getHandler)
    .post(postHandler)

export default game_gameId_player_playerId_moveRoute