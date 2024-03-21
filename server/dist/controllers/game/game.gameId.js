"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHandler = void 0;
const services_1 = require("../../services");
async function getHandler(req, res) {
    const { gameId } = req.params;
    const games = await services_1.gameService.gameAll();
    const game = games.find(el => el.id === Number(gameId));
    return res.json(game);
}
exports.getHandler = getHandler;
