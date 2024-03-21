"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const game_gameId_1 = require("../../controllers/game/game.gameId");
const game_gameIdRoute = express_1.default.Router();
game_gameIdRoute.route("/game/:gameId")
    .get(game_gameId_1.getHandler);
exports.default = game_gameIdRoute;
