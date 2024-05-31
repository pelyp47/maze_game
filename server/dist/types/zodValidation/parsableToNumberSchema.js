"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsableToNumberSchema = void 0;
const zod_1 = require("zod");
exports.parsableToNumberSchema = zod_1.z.string().refine((value) => {
    const parsed = Number(value);
    return !isNaN(parsed) && isFinite(parsed);
}, {
    message: 'String is not parsable into a number',
});
