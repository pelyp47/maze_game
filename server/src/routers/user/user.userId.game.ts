import express, { Router } from "express";
import {getHandler} from "../../controllers/user/user.userId.game"

const user_userId_gameRoute:Router = express.Router()

user_userId_gameRoute.route("/user/:userId/game")
    .get(getHandler)

export default user_userId_gameRoute