import { createSlice} from "@reduxjs/toolkit";
const WSSlice = createSlice({
    name: "WS",
    initialState: {
        WSClient: {},
        error: ""
    },
    reducers: {
        setWSClient: (state, action) => {
            state.WSClient.send = action.payload.WSSend
            
        },
        sendMessage: (state,action) => {
            state.WSClient.send(JSON.stringify(action.payload))
        }
    }
})

export default WSSlice.reducer
export const {setWSClient, sendMessage} = WSSlice.actions