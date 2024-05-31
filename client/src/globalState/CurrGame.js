import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const CurrGameJoin = createAsyncThunk("currGame/join", async (gameId)=>{
    const gameData = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/game/${gameId}`)
    return gameData.json()
})
export const currGameUpdate = createAsyncThunk("currGame/update", async (userId)=>{
    const gameData = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/user/${userId}/game/current`);
    return gameData.json()
})
export const currGameChatUpdate = createAsyncThunk("currGame/chatUpdate", async (userId, {getState})=>{
    const state = getState()
    const gameId = state.currGame.currGameId
    if(gameId === 0) throw new Error()
    const messagesData = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/game/${gameId}/player/${userId}/message`)
    const messages = await messagesData.json()
    const movesData = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/game/${gameId}/player/${userId}/move`)
    const moves = await movesData.json()
    return {messages, moves}
})
export const currGameStateUpdate = createAsyncThunk("currGame/move", async (userId, {getState})=>{
    const state = getState()
    const gameId = state.currGame.currGameId
    if(gameId === 0) throw new Error()
    const movesData = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/game/${gameId}/player/${userId}/move`)
    return movesData.json()
})

const CurrGameSlice = createSlice({
    name: "currGame",
    initialState: {
        currGameId: 0,
        gameStarted: false,
        gameTime: "",
        currMaze: [],
        currChat: [],
        yourMove: null,
        winner: null,
        contextId: 0
    },
    reducers: {
        currGameLeave: (state) =>{
            state.currGameId= 0
            state.gameStarted= false
            state.gameTime= ""
            state.currMaze= []
            state.currChat= []
            state.yourMove= null
            state.winner= null
            state.contextId= 0
        }
    },
    extraReducers: (build)=>{
        build.addCase(CurrGameJoin.fulfilled, (state, action)=>{
            state.currGameId = action.payload.id
            state.currMaze = action.payload.maze
            state.gameTime = action.payload.time
        })
        build.addCase(currGameUpdate.fulfilled, (state, action)=>{
            if (action.payload.error||state.winner!==null) return
            if(!action.payload.length) return
            const game = action.payload[0]
            
            
            
            state.currGameId = game.id || 0
            if(state.currGameId == 0) return
            if(game.users) {
                
                state.gameStarted = game.users.length===2
                const context = game.users.find(el=>el.userId === Number(localStorage.getItem("id")))
                state.contextId = context.id
                state.currMaze = game.maze.body
                if(state.yourMove===null) {
                    state.yourMove = game.users[0].id === state.contextId
                }
            }
            state.gameTime = game.time
        })

        build.addCase(currGameChatUpdate.fulfilled, (state, action)=> {
            let moves = action.payload.moves.moves.map(move=>{
                    return {
                        text: `(going ${["up", "right", "down", "left"][move.commandId-1]})`,
                        time: move.time,
                        contextId: move.contextId
                    }
            })
            if(action.payload.moves.currState.winnerId!==null) {    
                
                moves.push({text: `You ${action.payload.moves.currState.winnerId===state.contextId?"won":"lost"}!`, time: moves[moves.length-1]?moves[moves.length-1].time:state.gameTime, contextId: null});
                state.winner = action.payload.moves.currState.winnerId === state.contextId
            }
            state.currChat = [...action.payload.messages, ...moves].sort((a,b)=>new Date(a.time)- new Date(b.time))
        })
        build.addCase(currGameStateUpdate.fulfilled, (state, action)=>{
            
            if(action.payload.error) return
            if(action.payload.currState) {
                state.currMaze = action.payload.currState.body
                
                if(!action.payload.moves.length) return
                state.yourMove =action.payload.moves[action.payload.moves.length - 1].contextId !== state.contextId
            }
        })
    }
})

export default CurrGameSlice.reducer
export const {currGameLeave} = CurrGameSlice.actions