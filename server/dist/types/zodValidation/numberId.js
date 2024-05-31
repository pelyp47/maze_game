"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberIdSchema = void 0;
const zod_1 = require("zod");
exports.numberIdSchema = zod_1.z.number().min(1);
