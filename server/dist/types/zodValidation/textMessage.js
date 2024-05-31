"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textMessageSchema = void 0;
const zod_1 = require("zod");
exports.textMessageSchema = zod_1.z.string().nonempty();
