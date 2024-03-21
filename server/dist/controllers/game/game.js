"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postHandler = exports.getHandler = void 0;
const services_1 = require("../../services");
async function getHandler(req, res) {
    const games = await services_1.gameService.gameAll();
    const unstartedGames = games.filter(el => el.users.length === 1);
    return res.json(unstartedGames);
}
exports.getHandler = getHandler;
async function postHandler(req, res) {
    const { userId } = req.body;
    const { id: gameId } = await services_1.gameService.addGame();
    const newContext = await services_1.gameService.addPlayer(gameId, userId);
    return res.json(newContext);
}
exports.postHandler = postHandler;
