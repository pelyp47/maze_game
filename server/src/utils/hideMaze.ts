import { Maze } from "./createMaze";

export default function hideMaze(maze:Maze):Maze {
    return {...maze, body: maze.body.map(row=>
        row.map(item=>
            item===1?-1:item))}
}