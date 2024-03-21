"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../../controllers/user/user");
const userRoute = express_1.default.Router();
userRoute.route("/user")
    .get(user_1.getHandler)
    .post(user_1.postHandler);
exports.default = userRoute;
