import express, { Router } from "express";
import {getHandler} from "../../controllers/game/game.gameId.player.playerId.move.moveNumber"

const game_gameId_player_playerId_move_moveNumberRoute:Router = express.Router()

game_gameId_player_playerId_move_moveNumberRoute.route("/game/:gameId/player/:playerId/move/:moveNumber")
    .get(getHandler)
export default game_gameId_player_playerId_move_moveNumberRoute