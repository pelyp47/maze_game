"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postHandler = exports.getHandler = void 0;
const services_1 = require("../../services");
async function getHandler(req, res) {
    const { name } = req.query;
    if (!name)
        return res.status(401).send({ error: "empty string" });
    const user = await services_1.userService.getUserByName(String(name));
    return res.json(user);
}
exports.getHandler = getHandler;
async function postHandler(req, res) {
    console.log(req.body);
    const { name } = req.body;
    const user = await services_1.userService.addUser(String(name));
    return res.json(user);
}
exports.postHandler = postHandler;
