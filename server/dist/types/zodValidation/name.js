"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameSchema = void 0;
const zod_1 = require("zod");
exports.nameSchema = zod_1.z.string().min(1);
