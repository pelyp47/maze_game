"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHandler = void 0;
const services_1 = require("../../services");
const zodValidation_1 = require("../../types/zodValidation");
async function getHandler(req, res) {
    const { userId } = req.params;
    try {
        zodValidation_1.parsableToNumberSchema.parse(userId);
    }
    catch (err) {
        return res.status(400).json({ error: "invalid data" });
    }
    const games = await services_1.gameService.gameAll();
    const userGames = games.filter(el => el.users.some(context => context.userId === Number(userId)));
    return res.json(userGames);
}
exports.getHandler = getHandler;
