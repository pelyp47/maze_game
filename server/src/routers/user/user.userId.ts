import express, { Router } from "express";
import {getHandler, patchHandler} from "../../controllers/user/user.userId"

const user_userIdRoute:Router = express.Router()

user_userIdRoute.route("/user/:userId")
    .get(getHandler)
    .patch(patchHandler)

export default user_userIdRoute