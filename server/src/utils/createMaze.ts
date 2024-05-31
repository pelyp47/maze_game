import { mazeSchema } from "../types/zodValidation";

export type Maze = {width: number, length: number, body:number[][]}
const MAZES: Maze[]= [
    {
        width: 10,
        length: 10,
        body: [
            [-1,  0,  1,  1, 2,  1, -1, -1, -1, -1],
            [-1, -1,  1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1,  1, -1,  1, -1, -1, -1, -1, -1],
            [-1, -1,  1, -1,  1, 11,  1,  1,  1,  1],
            [-1, -1,  1, -1, -1, -1, -1, -1, -1, 1],
            [-1, -1,  1,  1,  1,  1,  1,  1,  1,  1],
            [-1, -1,  1, -1, -1, -1, -1, -1,  1, -1],
            [-1, -1,  1, -1, -1, -1, -1, -1,  1, -1],
            [-1, -1,  1, -1, -1, -1, -1, -1,  1, -1],
            [-1, -1,  1,  1,  1,  1,  1,  1,  10, 1000]
        ]
    },
    {
        width: 10,
        length: 10,
        body: [
            [-1,  0, -1, -1, -1, 11,  1,  1,  1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1,  1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1,  1, -1],
            [ 1,  1,  1,  1,  1,  1,  1, -1,  1, -1],
            [ 1, -1, -1, -1, -1, -1,  1, -1,  1, -1],
            [ 1, -1, -1, -1, -1, -1,  1, -1,  1, -1],
            [ 1,  1,  1, 2, -1, -1,  1, -1,  1, -1],
            [-1, -1, -1, -1, -1, -1,  1, -1,  1, -1],
            [-1, -1, -1, -1, -1, -1,  1, -1,  1, -1],
            [-1, -1, -1, -1, -1, -1,  1,  10, 1000, -1]
        ]
    },
    {
        width: 10,
        length: 10,
        body: [
            [11,  0, -1, -1, -1, -1, -1,  1, 2, -1],
            [ 1,  1,  1, -1, -1, -1, -1,  1, -1, -1],
            [ 1, -1,  1, -1, -1, -1, -1,  1, -1, -1],
            [ 1, -1,  1,  1,  1, -1, -1,  1, -1, -1],
            [ 1, -1,  1, -1,  1,  1, -1,  1,  1, -1],
            [ 1,  1,  1,  1, -1,  1, -1, -1,  1, -1],
            [-1, -1, -1, -1, -1,  1, -1,  1,  1,  1],
            [1000, 10, 1,  1,  1,  1,  1,  1, -1,  1],
            [-1, -1, -1, -1, -1, -1,  1, -1, -1,  1],
            [-1, -1, -1, -1, -1, -1,  1,  1, -1,  1]
        ]
    }
];
function createMaze():Maze {
    const mazeNumber:number = Math.floor(Math.random()*MAZES.length)
    const resultMaze = MAZES[mazeNumber]
    mazeSchema.parse(resultMaze)
    return resultMaze
}

export default createMaze