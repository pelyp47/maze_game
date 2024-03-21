"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const game_gameId_player_playerId_message_1 = require("../../controllers/game/game.gameId.player.playerId.message");
const game_gameId_player_playerId_messageRoute = express_1.default.Router();
game_gameId_player_playerId_messageRoute.route("/game/:gameId/player/:playerId/message")
    .get(game_gameId_player_playerId_message_1.getHandler)
    .post(game_gameId_player_playerId_message_1.postHandler);
exports.default = game_gameId_player_playerId_messageRoute;
