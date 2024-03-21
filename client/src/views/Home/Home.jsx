import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logOut } from "../../globalState/LogIn"
import { reportWSError, setWSObject } from "../../globalState/WebSocket"
import { updateGameList } from "../../globalState/GameList"
import GameList from "../GameList/GameList"
import CurrGame from "../CurrGame/CurrGame"
import { currGameChatUpdate, currGameStateUpdate, currGameUpdate } from "../../globalState/CurrGame"
import "./Home.css"

export default function Home() {
    const dispatch = useDispatch()
    const {messageObj} = useSelector(state=>state.ws)
    const {name, id} = useSelector(state=>state.logIn)
    const {currGameId, gameStarted} = useSelector(state=>state.currGame)
    const [updates, setUpdates] = useState(0)
    useEffect(()=>{
        async function checkUser() {
            const userData = await fetch(`http://localhost:3000/user/${id}`)
            const user = await userData.json()
            if(user.name!==name) {
                dispatch(logOut())
            }
        }
        checkUser()
        
        const ws = new WebSocket("ws://localhost:3000")
        async function createWSConnection() {
            ws.addEventListener("open", ()=>{
                ws.send(JSON.stringify(messageObj))
            })
            ws.addEventListener("message",(e)=>{
                dispatch(setWSObject({messageObj:JSON.parse(e.data)}))
                //adding all queries that always should be up-to-date
                ws.send(JSON.stringify(messageObj))
            })
            ws.addEventListener("close", (e)=>{
                dispatch(reportWSError({error: e.reason}))
            })
            ws.addEventListener("error", (e)=>{
                dispatch(reportWSError({error: e.message}))
            })
        }
        createWSConnection()
        return ()=>{
            ws.close()
        }
    }, [])
    useEffect(()=>{
        function update() {
            dispatch(currGameUpdate(id))
            .then(()=>{
                dispatch( updateGameList()).then(()=>{
                    dispatch(currGameUpdate()).then(()=>{
                        dispatch(currGameStateUpdate(id)).then(()=>{
                            dispatch(currGameChatUpdate(id)).then(()=>{
                                setUpdates(updates+1)
                            })
                        })
                    })
                })
            }).finally(()=>{
                setUpdates(updates+1)
            })
            
            }
        update()
    }, [updates])
    return <div className="home">
        {currGameId===0?
        <><p className="home__greetings">Hello, <span className="_highlighted">{name}</span></p>
        <GameList/></>:
        <CurrGame/>
        }
        
    </div>
}