import { createSlice} from "@reduxjs/toolkit";

const [name, id] = [localStorage.getItem("name"), Number(localStorage.getItem("id"))]

const LogInSlice = createSlice({
    name: "logIn",
    initialState: {
        loggedIn: !!name&&!!id,
        name: name||"",
        id: id||""
    },
    reducers: {
        logIn: (state, action) => {
            state.name = action.payload.name
            state.id = action.payload.id
            state.loggedIn = !!state.id&&!!state.name
            if(state.loggedIn) {
                localStorage.setItem("name", state.name)
                localStorage.setItem("id", String(state.id))
            }
        },
        logOut: (state) => {
            state.name = ""
            state.id = ""
            state.loggedIn = false
            localStorage.setItem("name", "")
            localStorage.setItem("id", "")
        }
    }
})

export default LogInSlice.reducer
export const {logIn,logOut} = LogInSlice.actions