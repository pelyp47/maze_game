import express, { Router } from "express";
import {getHandler} from "../../controllers/game/game.gameId.player.playerId.giveUp"

const game_gameId_player_playerId_giveUpRoute:Router = express.Router()

game_gameId_player_playerId_giveUpRoute.route("/game/:gameId/player/:playerId/giveUp")
    .get(getHandler)

export default game_gameId_player_playerId_giveUpRoute