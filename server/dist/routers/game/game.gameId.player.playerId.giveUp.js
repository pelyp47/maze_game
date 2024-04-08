"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const game_gameId_player_playerId_giveUp_1 = require("../../controllers/game/game.gameId.player.playerId.giveUp");
const game_gameId_player_playerId_giveUpRoute = express_1.default.Router();
game_gameId_player_playerId_giveUpRoute.route("/game/:gameId/player/:playerId/giveUp")
    .get(game_gameId_player_playerId_giveUp_1.getHandler);
exports.default = game_gameId_player_playerId_giveUpRoute;
