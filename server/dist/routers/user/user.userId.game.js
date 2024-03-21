"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_userId_game_1 = require("../../controllers/user/user.userId.game");
const user_userId_gameRoute = express_1.default.Router();
user_userId_gameRoute.route("/user/:userId/game")
    .get(user_userId_game_1.getHandler);
exports.default = user_userId_gameRoute;
