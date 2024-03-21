"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_userId_game_current_1 = require("../../controllers/user/user.userId.game.current");
const user_userId_game_currentRoute = express_1.default.Router();
user_userId_game_currentRoute.route("/user/:userId/game/current")
    .get(user_userId_game_current_1.getHandler);
exports.default = user_userId_game_currentRoute;
