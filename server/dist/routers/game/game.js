"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const game_1 = require("../../controllers/game/game");
const gameRoute = express_1.default.Router();
gameRoute.route("/game")
    .get(game_1.getHandler)
    .post(game_1.postHandler);
exports.default = gameRoute;
