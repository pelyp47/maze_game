"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postHandler = exports.getHandler = void 0;
const services_1 = require("../../services");
const zodValidation_1 = require("../../types/zodValidation");
async function getHandler(req, res) {
    const { gameId } = req.params;
    try {
        zodValidation_1.parsableToNumberSchema.parse(gameId);
    }
    catch (err) {
        return res.status(400).json({ error: "invalid data" });
    }
    const games = await services_1.gameService.gameAll();
    const game = games.find(el => el.id === Number(gameId));
    const users = game?.users;
    return res.json(users);
}
exports.getHandler = getHandler;
async function postHandler(req, res) {
    const { gameId } = req.params;
    const { userId } = req.body;
    try {
        zodValidation_1.parsableToNumberSchema.parse(gameId);
        zodValidation_1.numberIdSchema.parse(userId);
    }
    catch (err) {
        return res.status(400).json({ error: "invalid data" });
    }
    const games = await services_1.gameService.gameAll();
    const game = games.find(el => el.id === Number(gameId));
    if (!game)
        return res.status(401).json("game wasn't found");
    if (game.users.length === 2)
        return res.status(402).json("game invitation expired");
    if (game.users.some(el => el.userId === Number(userId)))
        return res.status(403).json("already joined");
    const newContext = await services_1.gameService.addPlayer(Number(gameId), Number(userId));
    return res.json(newContext);
}
exports.postHandler = postHandler;
