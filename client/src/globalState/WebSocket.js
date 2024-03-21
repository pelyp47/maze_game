import { createSlice} from "@reduxjs/toolkit";

const WSSlice = createSlice({
    name: "WS",
    initialState: {
        messageObj:{
            userState: {
              id: Number(localStorage.getItem("id")),
              online: true
            }
        },
        error: ""
    },
    reducers: {
        setWSObject: (state, action) => {
            state.messageObj = action.payload.messageObj
        },
        reportWSError: (state, action) => {
            state.error = action.payload.error
        }
    }
})

export default WSSlice.reducer
export const {setWSObject, reportWSError} = WSSlice.actions