"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const game_gameId_player_playerId_1 = require("../../controllers/game/game.gameId.player.playerId");
const game_gameId_player_playerIdRoute = express_1.default.Router();
game_gameId_player_playerIdRoute.route("/game/:gameId/player/:playerId")
    .get(game_gameId_player_playerId_1.getHandler);
exports.default = game_gameId_player_playerIdRoute;
