import { commandService } from "../services";
import { Maze } from "./createMaze";
export default async function mazeState(maze:Maze, moves:{
    id: number;
    time: Date;
    commandId: number;
    contextId: number;
}[]) : Promise<{
    body: Maze["body"];
    winnerId: number | null;
}> {
    const commands = await commandService.commandAll()
    console.log(commands)
    const playerIds: {[contextId:number]:number} = moves.reduce((obj,el,i)=> obj[el.contextId]?obj:({...obj, [el.contextId]:10+i}),{} as {[contextId:number]:number})
    const mazeBody = [...maze.body]
    const mazeParams: {
        width: number;
        length: number;
    } = {width:maze.width, length:maze.length}
    const state = moves.reduce((mazeState, currMove)=> {
        return countMove(mazeState.body, currMove.commandId, playerIds[currMove.contextId], mazeParams)
    }, {body: mazeBody, winnerId:null} as {body:Maze["body"], winnerId:number|null})
    if(state.winnerId !== null) {
        let contextId = Object.entries(playerIds)
                              .find(([key,value])=>value===state.winnerId)?.[0]
        if(!contextId) throw new Error("Context wasn't found")
        state.winnerId = Number(contextId)
    }
    function countMove(maze:Maze["body"], commandId:number, playerId:number, mazeParams:{
        width: number;
        length: number;
    }) {
        let winnerId:number|null=null
        const command = commands.find(el=>el.id===commandId)
        if(!command) throw new Error("Command wasn't found")
        const Position:number = maze.flat(2).indexOf(playerId)
        
        const xPosition:number = Position%mazeParams.width
        const yPosition:number = Math.floor(Position/mazeParams.width) //inverted
        const {xChange, yChange} = command
        const searchedX:number = xPosition+xChange
        const searchedY:number = yPosition-yChange
        console.log(searchedX, searchedY, Position, command, playerId)
        if(searchedX<0 || searchedY<0 || searchedX>=mazeParams.width || searchedY>=mazeParams.length) return {body: maze, winnerId}
        const searchedElement:number = maze[searchedY][searchedX]
        const resultMaze:Maze["body"] = [...maze]
        switch(searchedElement) {
            case -1:
                resultMaze[searchedY][searchedX] ++
                break;
            case 1:
                resultMaze[searchedY][searchedX] = playerId
                resultMaze[yPosition][xPosition] = 2
                break;
            case 2:
                resultMaze[searchedY][searchedX] = playerId
                resultMaze[yPosition][xPosition] = searchedElement
                break;
            case 1000:
                resultMaze[searchedY][searchedX] = playerId
                resultMaze[yPosition][xPosition] = 2
                winnerId = playerId
                break;
            case 0:
                break;
            default:
                break
        }
        console.log(resultMaze)

        return {body: resultMaze, winnerId}
    }
    return state
}