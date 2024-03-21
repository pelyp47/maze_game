"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hideMaze(maze) {
    return { ...maze, body: maze.body.map(row => row.map(item => item === 1 ? -1 : item)) };
}
exports.default = hideMaze;
