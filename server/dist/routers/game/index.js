"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const game_1 = __importDefault(require("./game"));
const game_gameId_1 = __importDefault(require("./game.gameId"));
const game_gameId_player_1 = __importDefault(require("./game.gameId.player"));
const game_gameId_player_playerId_1 = __importDefault(require("./game.gameId.player.playerId"));
const game_gameId_player_playerId_move_1 = __importDefault(require("./game.gameId.player.playerId.move"));
const game_gameId_player_playerId_move_moveNumber_1 = __importDefault(require("./game.gameId.player.playerId.move.moveNumber"));
const game_gameId_player_playerId_message_1 = __importDefault(require("./game.gameId.player.playerId.message"));
const game_gameId_player_playerId_giveUp_1 = __importDefault(require("./game.gameId.player.playerId.giveUp"));
const gameRouter = express_1.default.Router();
gameRouter
    .use(game_1.default)
    .use(game_gameId_1.default)
    .use(game_gameId_player_1.default)
    .use(game_gameId_player_playerId_1.default)
    .use(game_gameId_player_playerId_move_1.default)
    .use(game_gameId_player_playerId_move_moveNumber_1.default)
    .use(game_gameId_player_playerId_message_1.default)
    .use(game_gameId_player_playerId_giveUp_1.default);
exports.default = gameRouter;
