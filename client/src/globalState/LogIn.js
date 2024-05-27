import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";


export const signUp = createAsyncThunk("logIn", async ()=>{
    const name = localStorage.getItem("name")
    const userId = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/user?name=${name}`);
    return await userId.json()
});
const LogInSlice = createSlice({
    name: "logIn",
    initialState: {
        loggedIn: false,
        name: "",
        id: ""
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
    },
    extraReducers: (build)=>{
        build.addCase(signUp.fulfilled, (state, action)=>{
            if(!action.payload) {
                return
            }
            state.name = action.payload.name
            state.id = action.payload.id
            state.loggedIn = true
        })
    }
})

export default LogInSlice.reducer
export const {logIn,logOut} = LogInSlice.actions