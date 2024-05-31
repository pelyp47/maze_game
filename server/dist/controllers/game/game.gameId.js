"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHandler = void 0;
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
    return res.json(game);
}
exports.getHandler = getHandler;
