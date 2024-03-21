"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
const createMaze_1 = __importDefault(require("./createMaze"));
const mazeSate_1 = __importDefault(require("./mazeSate"));
const hideMaze_1 = __importDefault(require("./hideMaze"));
exports.utils = { createMaze: createMaze_1.default, mazeState: mazeSate_1.default, hideMaze: hideMaze_1.default };
