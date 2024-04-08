import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logOut } from "../../globalState/LogIn"
import { setWSClient } from "../../globalState/WebSocket"
import { updateGameList } from "../../globalState/GameList"
import GameList from "../GameList/GameList"
import CurrGame from "../CurrGame/CurrGame"
import { currGameChatUpdate, currGameStateUpdate, currGameUpdate } from "../../globalState/CurrGame"
import "./Home.css"
import store from "../../globalState/store"
const WSContext = createContext()
export const useWSContext = () => {
    return useContext(WSContext);
  };
export default function Home() {
    const dispatch = useDispatch()
    const [WS, setWS] = useState()
    const [retry, setRetry] = useState(0)
    const {name, id, loggedIn} = useSelector(state=>state.logIn)
    const {currGameId, gameStarted} = useSelector(state=>state.currGame)
    useEffect(()=>{
        if(!id) return
        const ws = new WebSocket(`${import.meta.env.VITE_WS_DOMAIN}?id=${id}`)
        window.addEventListener('beforeunload', () => {
            ws.close();
        });
        
        ws.onopen=()=>{
            setWS(ws)
            console.log(id)
            ws.onmessage=(message)=>{
                console.log(message)
                const messageObj = JSON.parse(message.data)
                console.log(messageObj)
                const type = messageObj.type
                switch(type) {
                    case "GAME_CREATED":
                        dispatch(updateGameList())
                        break;
                    case "GAME_JOINED":
                        console.log(currGameId)
                        if(store.getState().currGame.currGameId===messageObj.payload.gameId) {
                            dispatch(currGameUpdate(id)).then(()=>{
                                dispatch(currGameStateUpdate(id))
                            })
                        } else {
                            dispatch(updateGameList())
                        }
                        break;
                    case "MESSAGE_SENT":
                        if(store.getState().currGame.currGameId===messageObj.payload.gameId) {
                            dispatch(currGameChatUpdate(id))
                        }
                        break;
                    case "MOVE_MADE":
                        if(store.getState().currGame.currGameId===messageObj.payload.gameId) {
                            dispatch(currGameStateUpdate(id)).then(()=>{
                                dispatch(currGameChatUpdate(id))
                            })
                        }
                        break;
                    default:
                        break;
                }
            }
            ws.onclose = ()=>{
                console.log("connection closed")
                setTimeout(()=>{
                    console.log("retrying")
                    setRetry(retry+1)
                }, 1000)
            } 
        }
        dispatch(updateGameList())
        dispatch(currGameUpdate(id)).then(()=>{
            dispatch(currGameStateUpdate(id)).then(()=>{
                dispatch(currGameChatUpdate(id))
            })
        })
        
        
        return () => {
            setWS()
            ws.close()
            window.removeEventListener('beforeunload', () => {
                ws.close();
            });
        }
    },[id, loggedIn, name, dispatch, retry])
    return <WSContext.Provider value={{WS}}><div className="home">
        {currGameId===0?
        <><p className="home__greetings">Hello, <span className="_highlighted">{name}</span></p>
        <GameList/></>:
        <CurrGame/>
        }  
        </div>
    </WSContext.Provider>
}