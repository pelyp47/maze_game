import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const updateGameList = createAsyncThunk("gameList/update", async ()=>{
    const GameListData = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/game`)
    return GameListData.json()
})

const GameListSlice = createSlice({
    name: "gameList",
    initialState: {
        gameArray: []
    },
    extraReducers: (build)=>{
        build.addCase(updateGameList.fulfilled, (state, action)=>{
            state.gameArray = action.payload
        })
    }
})

export default GameListSlice.reducer
// export const {} = GameListSlice.actions