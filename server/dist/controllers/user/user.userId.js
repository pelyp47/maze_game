"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchHandler = exports.getHandler = void 0;
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
    const user = await services_1.userService.getUserById(Number(userId));
    return res.json(user);
}
exports.getHandler = getHandler;
async function patchHandler(req, res) {
    const { userId } = req.params;
    const { name, online } = req.body;
    try {
        zodValidation_1.isOnlineSchema.parse(online);
        zodValidation_1.nameSchema.parse(name);
        zodValidation_1.parsableToNumberSchema.parse(userId);
    }
    catch (err) {
        return res.status(400).json({ error: "invalid data" });
    }
    const updatedUser = await services_1.userService.updateUser(Number(userId), name, online);
    return res.json(updatedUser);
}
exports.patchHandler = patchHandler;
