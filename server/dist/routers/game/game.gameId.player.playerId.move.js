"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const game_gameId_player_playerId_move_1 = require("../../controllers/game/game.gameId.player.playerId.move");
const game_gameId_player_playerId_moveRoute = express_1.default.Router();
game_gameId_player_playerId_moveRoute.route("/game/:gameId/player/:playerId/move")
    .get(game_gameId_player_playerId_move_1.getHandler)
    .post(game_gameId_player_playerId_move_1.postHandler);
exports.default = game_gameId_player_playerId_moveRoute;
