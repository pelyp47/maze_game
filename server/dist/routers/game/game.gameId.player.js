"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const game_gameId_player_1 = require("../../controllers/game/game.gameId.player");
const game_gameId_playerRoute = express_1.default.Router();
game_gameId_playerRoute.route("/game/:gameId/player")
    .get(game_gameId_player_1.getHandler)
    .post(game_gameId_player_1.postHandler);
exports.default = game_gameId_playerRoute;
