import express, {Router} from 'express';

import userRoute from './user';
import user_userIdRoute from './user.userId';
import user_userId_gameRoute from './user.userId.game';
import user_userId_game_currentRoute from './user.userId.game.current';

const userRouter:Router = express.Router();

userRouter
    .use(userRoute)
    .use(user_userIdRoute)
    .use(user_userId_gameRoute)
    .use(user_userId_game_currentRoute)

export default userRouter