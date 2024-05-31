"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandIdSchema = void 0;
const zod_1 = require("zod");
exports.commandIdSchema = zod_1.z.number().min(1).max(4);
