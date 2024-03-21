import express, { Router } from "express";
import {getHandler, postHandler} from "../../controllers/user/user"

const userRoute:Router = express.Router()

userRoute.route("/user")
    .get(getHandler)
    .post(postHandler)

export default userRoute