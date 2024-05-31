"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postHandler = exports.getHandler = void 0;
const services_1 = require("../../services");
const zodValidation_1 = require("../../types/zodValidation");
async function getHandler(req, res) {
    const { name } = req.query;
    try {
        zodValidation_1.nameSchema.parse(name);
    }
    catch (err) {
        return res.status(400).json({ error: "invalid data" });
    }
    if (!name)
        return res.status(401).send({ error: "empty string" });
    const user = await services_1.userService.getUserByName(String(name));
    return res.json(user);
}
exports.getHandler = getHandler;
async function postHandler(req, res) {
    console.log(req.body);
    const { name } = req.body;
    try {
        zodValidation_1.nameSchema.parse(name);
    }
    catch (err) {
        return res.status(400).json({ error: "invalid data" });
    }
    const user = await services_1.userService.addUser(String(name));
    return res.json(user);
}
exports.postHandler = postHandler;
