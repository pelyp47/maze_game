"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
async function mazeState(maze, moves) {
    const commands = await services_1.commandService.commandAll();
    console.log(commands);
    const playerIds = moves.reduce((obj, el, i) => obj[el.contextId] ? obj : ({ ...obj, [el.contextId]: 10 + i }), {});
    const mazeBody = [...maze.body];
    const mazeParams = { width: maze.width, length: maze.length };
    const state = moves.reduce((mazeState, currMove) => {
        return countMove(mazeState.body, currMove.commandId, playerIds[currMove.contextId], mazeParams);
    }, { body: mazeBody, winnerId: null });
    if (state.winnerId !== null) {
        let contextId = Object.entries(playerIds)
            .find(([key, value]) => value === state.winnerId)?.[0];
        if (!contextId)
            throw new Error("Context wasn't found");
        state.winnerId = Number(contextId);
    }
    function countMove(maze, commandId, playerId, mazeParams) {
        let winnerId = null;
        const command = commands.find(el => el.id === commandId);
        if (!command)
            throw new Error("Command wasn't found");
        const Position = maze.flat(2).indexOf(playerId);
        const xPosition = Position % mazeParams.width;
        const yPosition = Math.floor(Position / mazeParams.width); //inverted
        const { xChange, yChange } = command;
        const searchedX = xPosition + xChange;
        const searchedY = yPosition - yChange;
        console.log(searchedX, searchedY, Position, command, playerId);
        if (searchedX < 0 || searchedY < 0 || searchedX >= mazeParams.width || searchedY >= mazeParams.length)
            return { body: maze, winnerId };
        const searchedElement = maze[searchedY][searchedX];
        const resultMaze = [...maze];
        switch (searchedElement) {
            case -1:
                resultMaze[searchedY][searchedX]++;
                break;
            case 1:
                resultMaze[searchedY][searchedX] = playerId;
                resultMaze[yPosition][xPosition] = 2;
                break;
            case 2:
                resultMaze[searchedY][searchedX] = playerId;
                resultMaze[yPosition][xPosition] = searchedElement;
                break;
            case 1000:
                resultMaze[searchedY][searchedX] = playerId;
                resultMaze[yPosition][xPosition] = 2;
                winnerId = playerId;
                break;
            case 0:
                break;
            default:
                break;
        }
        console.log(resultMaze);
        return { body: resultMaze, winnerId };
    }
    return state;
}
exports.default = mazeState;
