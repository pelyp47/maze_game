"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateSchema = void 0;
const zod_1 = require("zod");
exports.dateSchema = zod_1.z.string().transform((str) => new Date(str)).refine((date) => !isNaN(date.getTime()));
