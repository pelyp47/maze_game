"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHandler = void 0;
const services_1 = require("../../services");
const utils_1 = require("../../utils");
async function getHandler(req, res) {
    const { gameId, moveNumber } = req.params;
    const moves = await services_1.moveService.moveGame(Number(gameId));
    const returnedMoves = moves.slice(0, Number(moveNumber));
    const games = await services_1.gameService.gameAll();
    const game = games.find(el => el.id === Number(gameId));
    if (!game)
        return res.status(401).json({ error: "game wasn't found" });
    const currState = utils_1.utils.mazeState(game.maze, returnedMoves);
    return res.json(currState);
}
exports.getHandler = getHandler;
