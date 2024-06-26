"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHandler = void 0;
const services_1 = require("../../services");
async function getHandler(req, res) {
    const { gameId, playerId } = req.params;
    const games = await services_1.gameService.gameAll();
    const game = games.find(el => el.id === Number(gameId));
    console.log(game);
    if (!game)
        return res.status(401).json({ error: "game wasn't found" });
    if (game.users.some(el => el.winner === true))
        return res.status(402).json({ error: "game was finished" });
    const context = game.users.find(el => el.userId !== Number(playerId));
    if (!context)
        return res.status(403).json({ error: "context wasn't found" });
    const messages = await services_1.gameService.setWinner(context.id);
    return res.json(messages);
}
exports.getHandler = getHandler;
