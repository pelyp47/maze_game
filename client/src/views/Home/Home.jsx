"use client"
import { useEffect, useState } from "react"
import { WSContext } from "../../app/context/WSContext"
import { useDispatch, useSelector } from "react-redux"
import { updateGameList } from "../../globalState/GameList"
import GameList from "../GameList/GameList"
import CurrGame from "../CurrGame/CurrGame"
import { currGameChatUpdate, currGameStateUpdate, currGameUpdate } from "../../globalState/CurrGame"
import store from "../../globalState/store"
import { useSearchParams } from "next/navigation"
import "./Home.css"
export default function Home({greetings, gameListTranslation, mazeTranslation, controlPanelTranslation, chatTranslation}) {
    const searchParams = useSearchParams()
    const dispatch = useDispatch()
    const [WS, setWS] = useState()
    const [retry, setRetry] = useState(0)
    const {name, id, loggedIn} = {
        name: searchParams.get("name"),
        id: Number(searchParams.get("id")),
        loggedIn: Boolean(searchParams.get("loggedIn"))
    }
    const {currGameId} = useSelector(state=>state.currGame)
    useEffect(()=>{
        if(!id) return
        const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_DOMAIN}?id=${id}`)
        window.addEventListener('beforeunload', () => {
            ws.close();
        });
        
        ws.onopen=()=>{
            setWS(ws)
            
            ws.onmessage=(message)=>{
                
                const messageObj = JSON.parse(message.data)
                
                const type = messageObj.type
                switch(type) {
                    case "GAME_CREATED":
                        dispatch(updateGameList())
                        break;
                    case "GAME_JOINED":
                        
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
                
                setTimeout(()=>{
                    
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
    return <WSContext.Provider value={{WS}}>
        {currGameId===0?
        <><p className="home__greetings">{greetings}<span className="_highlighted">{name}</span></p>
        <GameList id={id} gameListTranslation={gameListTranslation}/></>:
        <CurrGame id={id} mazeTranslation={mazeTranslation}
        controlPanelTranslation={controlPanelTranslation}
        chatTranslation={chatTranslation}/>
        }
    </WSContext.Provider>
}