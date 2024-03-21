"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const user_userId_1 = __importDefault(require("./user.userId"));
const user_userId_game_1 = __importDefault(require("./user.userId.game"));
const user_userId_game_current_1 = __importDefault(require("./user.userId.game.current"));
const userRouter = express_1.default.Router();
userRouter
    .use(user_1.default)
    .use(user_userId_1.default)
    .use(user_userId_game_1.default)
    .use(user_userId_game_current_1.default);
exports.default = userRouter;
