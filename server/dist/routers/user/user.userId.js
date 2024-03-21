"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_userId_1 = require("../../controllers/user/user.userId");
const user_userIdRoute = express_1.default.Router();
user_userIdRoute.route("/user/:userId")
    .get(user_userId_1.getHandler)
    .patch(user_userId_1.patchHandler);
exports.default = user_userIdRoute;
