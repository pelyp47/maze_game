"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHandler = void 0;
const services_1 = require("../../services");
const utils_1 = require("../../utils");
const zodValidation_1 = require("../../types/zodValidation");
async function getHandler(req, res) {
    const { gameId, moveNumber } = req.params;
    try {
        zodValidation_1.parsableToNumberSchema.parse(gameId);
        zodValidation_1.parsableToNumberSchema.parse(moveNumber);
    }
    catch (err) {
        return res.status(400).json({ error: "invalid data" });
    }
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
