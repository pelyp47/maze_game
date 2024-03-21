"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postHandler = exports.getHandler = void 0;
const services_1 = require("../../services");
async function getHandler(req, res) {
    const { gameId } = req.params;
    const messages = await services_1.messageService.messageGame(Number(gameId));
    return res.json(messages);
}
exports.getHandler = getHandler;
async function postHandler(req, res) {
    const { text, time } = req.body;
    const { gameId, playerId } = req.params;
    const messageObj = { time: new Date(time), text: String(text) };
    const newMessage = await services_1.messageService.addMessage(Number(gameId), Number(playerId), messageObj);
    return res.json(newMessage);
}
exports.postHandler = postHandler;
