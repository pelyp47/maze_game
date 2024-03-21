import express, { Router } from "express";
import {getHandler} from "../../controllers/user/user.userId.game.current"

const user_userId_game_currentRoute:Router = express.Router()

user_userId_game_currentRoute.route("/user/:userId/game/current")
    .get(getHandler)

export default user_userId_game_currentRoute