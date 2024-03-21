import express, { Router } from "express";
import {getHandler, postHandler} from "../../controllers/game/game.gameId.player.playerId.message"

const game_gameId_player_playerId_messageRoute:Router = express.Router()

game_gameId_player_playerId_messageRoute.route("/game/:gameId/player/:playerId/message")
    .get(getHandler)
    .post(postHandler)

export default game_gameId_player_playerId_messageRoute