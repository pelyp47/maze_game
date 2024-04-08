"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postHandler = exports.getHandler = void 0;
const services_1 = require("../../services");
const utils_1 = require("../../utils/");
async function getHandler(req, res) {
    const { gameId } = req.params;
    const moves = await services_1.moveService.moveGame(Number(gameId));
    const games = await services_1.gameService.gameAll();
    const game = games.find(el => el.id === Number(gameId));
    const winnerId = game?.users.find((user) => user.winner === true)?.id || null;
    if (!game)
        return res.status(401).json({ error: "game wasn't found" });
    const currState = await utils_1.utils.mazeState(game.maze, moves);
    return res.json({ currState: { ...currState, winnerId }, moves });
}
exports.getHandler = getHandler;
async function postHandler(req, res) {
    const { gameId, playerId } = req.params;
    const { time, commandId } = req.body;
    //check if already moved
    const games = await services_1.gameService.gameAll();
    const game = games.find(el => el.id === Number(gameId));
    console.log(game);
    if (!game)
        return res.status(401).json({ error: "game wasn't found" });
    if (game.users.some(el => el.winner === true))
        return res.status(402).json({ error: "game was finished" });
    const context = game.users.find(el => el.userId === Number(playerId));
    if (!context)
        return res.status(403).json({ error: "context wasn't found" });
    const gameMoves = await services_1.moveService.moveGame(Number(gameId));
    const lastMove = gameMoves.at(-1);
    if (!lastMove && game.users[0].userId !== Number(playerId))
        return res.status(400).json({ error: "non players turn" });
    if (lastMove?.contextId === context.id)
        return res.status(404).json({ error: "not player's turn" });
    const moveObj = { time: new Date(time), commandId: Number(commandId) };
    console.log(req.body);
    const newMove = await services_1.moveService.addMove(Number(gameId), Number(playerId), moveObj);
    const currState = await utils_1.utils.mazeState(game.maze, [...gameMoves, newMove]);
    if (currState.winnerId) {
        services_1.gameService.setWinner(currState.winnerId);
    }
    return res.json(currState);
}
exports.postHandler = postHandler;
