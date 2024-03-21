import express, {Router} from 'express';

import gameRoute from './game';
import game_gameIdRoute from './game.gameId';
import game_gameId_playerRoute from './game.gameId.player';
import game_gameId_player_playerIdRoute from './game.gameId.player.playerId';
import game_gameId_player_playerId_moveRoute from './game.gameId.player.playerId.move';
import game_gameId_player_playerId_move_moveNumberRoute from './game.gameId.player.playerId.move.moveNumber';
import game_gameId_player_playerId_messageRoute from './game.gameId.player.playerId.message';

const gameRouter:Router = express.Router();

gameRouter
    .use(gameRoute)
    .use(game_gameIdRoute)
    .use(game_gameId_playerRoute)
    .use(game_gameId_player_playerIdRoute)
    .use(game_gameId_player_playerId_moveRoute)
    .use(game_gameId_player_playerId_move_moveNumberRoute)
    .use(game_gameId_player_playerId_messageRoute)

export default gameRouter