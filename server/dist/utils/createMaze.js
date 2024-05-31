"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zodValidation_1 = require("../types/zodValidation");
const MAZES = [
    {
        width: 10,
        length: 10,
        body: [
            [-1, 0, 1, 1, 2, 1, -1, -1, -1, -1],
            [-1, -1, 1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, 1, -1, 1, -1, -1, -1, -1, -1],
            [-1, -1, 1, -1, 1, 11, 1, 1, 1, 1],
            [-1, -1, 1, -1, -1, -1, -1, -1, -1, 1],
            [-1, -1, 1, 1, 1, 1, 1, 1, 1, 1],
            [-1, -1, 1, -1, -1, -1, -1, -1, 1, -1],
            [-1, -1, 1, -1, -1, -1, -1, -1, 1, -1],
            [-1, -1, 1, -1, -1, -1, -1, -1, 1, -1],
            [-1, -1, 1, 1, 1, 1, 1, 1, 10, 1000]
        ]
    },
    {
        width: 10,
        length: 10,
        body: [
            [-1, 0, -1, -1, -1, 11, 1, 1, 1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, 1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, 1, -1],
            [1, 1, 1, 1, 1, 1, 1, -1, 1, -1],
            [1, -1, -1, -1, -1, -1, 1, -1, 1, -1],
            [1, -1, -1, -1, -1, -1, 1, -1, 1, -1],
            [1, 1, 1, 2, -1, -1, 1, -1, 1, -1],
            [-1, -1, -1, -1, -1, -1, 1, -1, 1, -1],
            [-1, -1, -1, -1, -1, -1, 1, -1, 1, -1],
            [-1, -1, -1, -1, -1, -1, 1, 10, 1000, -1]
        ]
    },
    {
        width: 10,
        length: 10,
        body: [
            [11, 0, -1, -1, -1, -1, -1, 1, 2, -1],
            [1, 1, 1, -1, -1, -1, -1, 1, -1, -1],
            [1, -1, 1, -1, -1, -1, -1, 1, -1, -1],
            [1, -1, 1, 1, 1, -1, -1, 1, -1, -1],
            [1, -1, 1, -1, 1, 1, -1, 1, 1, -1],
            [1, 1, 1, 1, -1, 1, -1, -1, 1, -1],
            [-1, -1, -1, -1, -1, 1, -1, 1, 1, 1],
            [1000, 10, 1, 1, 1, 1, 1, 1, -1, 1],
            [-1, -1, -1, -1, -1, -1, 1, -1, -1, 1],
            [-1, -1, -1, -1, -1, -1, 1, 1, -1, 1]
        ]
    }
];
function createMaze() {
    const mazeNumber = Math.floor(Math.random() * MAZES.length);
    const resultMaze = MAZES[mazeNumber];
    zodValidation_1.mazeSchema.parse(resultMaze);
    return resultMaze;
}
exports.default = createMaze;
