import express, { Router } from "express"

import gameRouter from "./game"
import userRouter from "./user"

const mainRouter:Router = express.Router()

mainRouter.use(gameRouter)
mainRouter.use(userRouter)

export default mainRouter