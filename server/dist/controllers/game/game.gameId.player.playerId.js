"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHandler = void 0;
const services_1 = require("../../services");
async function getHandler(req, res) {
    const { userId } = req.params;
    const user = await services_1.userService.getUserById(Number(userId));
    return res.json(user);
}
exports.getHandler = getHandler;
