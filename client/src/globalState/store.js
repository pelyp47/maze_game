import { configureStore } from "@reduxjs/toolkit";
import LogInReducer from "./LogIn";
import WSReducer from "./WebSocket";
import GameListReducer from "./GameList";
import CurrGameReducer from "./CurrGame";
const store = configureStore({
    reducer:{
        logIn : LogInReducer,
        ws: WSReducer,
        gameList: GameListReducer,
        currGame: CurrGameReducer,
    }
})

export default store

