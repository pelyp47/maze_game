import {Request, Response} from "express";
import { gameService, moveService} from "../../services";
import { utils } from "../../utils";
import { Maze } from "../../utils/createMaze";

export async function getHandler(req:Request, res:Response) {
    const {gameId, moveNumber} = req.params
    const moves = await moveService.moveGame(Number(gameId))
    const returnedMoves = moves.slice(0, Number(moveNumber))
    const games = await gameService.gameAll()
    const game = games.find(el=>el.id === Number(gameId))
    if(!game) return res.status(401).json({error:"game wasn't found"})
    const currState = utils.mazeState(game.maze as Maze, returnedMoves)
    return res.json(currState)
}