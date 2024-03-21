"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHandler = void 0;
const services_1 = require("../../services");
async function getHandler(req, res) {
    const { userId } = req.params;
    const games = await services_1.gameService.gameAll();
    const userGames = games.filter(el => el.users.some(context => context.userId === Number(userId)));
    return res.json(userGames);
}
exports.getHandler = getHandler;
