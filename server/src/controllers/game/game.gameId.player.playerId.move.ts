import {Request, Response} from "express";
import {moveService, gameService} from "../../services";
import {utils} from "../../utils/";
import { Maze } from "../../utils/createMaze";

export async function getHandler(req:Request, res:Response) {
    const {gameId} = req.params
    const moves = await moveService.moveGame(Number(gameId))
    const games = await gameService.gameAll()
    const game = games.find(el=>el.id === Number(gameId))
    if(!game) return res.status(401).json({error:"game wasn't found"})
    const currState = await utils.mazeState(game.maze as Maze, moves)
    return res.json({currState, moves})
}

export async function postHandler(req:Request, res:Response) {
    const {gameId, playerId} = req.params
    const {time, commandId} = req.body
    //check if already moved
    const games = await gameService.gameAll()
    const game = games.find(el=>el.id === Number(gameId))
    console.log(game)
    if(!game) return res.status(401).json({error: "game wasn't found"})
    if(game.users.some(el=>el.winner===true)) return res.status(402).json({error:"game was finished"})
    const context = game.users.find(el=>el.userId === Number(playerId))
    if(!context) return res.status(403).json({error: "context wasn't found"})

    const gameMoves = await moveService.moveGame(Number(gameId))
    const lastMove = gameMoves.at(-1)
    if(!lastMove && game.users[0].userId!==Number(playerId)) return res.status(400).json({error: "non players turn"})
    if(lastMove?.contextId === context.id) return res.status(404).json({error: "not player's turn"})
    const moveObj = {time: new Date(time), commandId:Number(commandId)}
    console.log(req.body)
    const newMove = await moveService.addMove(Number(gameId), Number(playerId), moveObj)
    const currState = await utils.mazeState(game.maze as Maze, [...gameMoves, newMove])
    if(currState.winnerId) {
        gameService.setWinner(currState.winnerId)
    }
    return res.json(currState)
}