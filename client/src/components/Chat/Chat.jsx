import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./Chat.css"
import { useWSContext } from "../../app/context/WSContext"
import { currGameChatUpdate, currGameStateUpdate } from "../../globalState/CurrGame"

export default function Chat({id, chatTranslation}) {
    const {currChat, currGameId, contextId, yourMove} = useSelector(state=>state.currGame)
    const dispatch = useDispatch()
    const messages = useRef(null)
    const {WS} = useWSContext()
    useEffect(()=>{
        messages.current.scrollTo(0, messages.current.scrollHeight)
    }, [currChat.length])
    
    const [message, setMessage] = useState("")
    async function sendMessage() {
        const text = message.trim()
        const commandId = ["/up", "/right", "/down", "/left"].indexOf(text)+1
        
        if(commandId!==0) {     
            if(!yourMove) return
            await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/game/${currGameId}/player/${id}/move`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    commandId,
                    time: new Date()
                })
            })
            WS.send(JSON.stringify({type:"MOVE", payload:{gameId: currGameId}}))
            dispatch(currGameStateUpdate(id))
            dispatch(currGameChatUpdate(id))
            setMessage("")
            return
        }
        await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/game/${currGameId}/player/${id}/message`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text,
                time: new Date()
            })
        })
        dispatch(currGameChatUpdate(id))
        WS.send(JSON.stringify({type:"MESSAGE", payload:{gameId:currGameId}}))
        setMessage("")
    }
    
    return <div className="chat">
        <p className={`chat__indicator ${yourMove?"_yours":"_oponents"}`}>{yourMove?chatTranslation.yourMoveIndicator:chatTranslation.oponentMoveIndicator}</p>
        <div className="chat__container" ref={messages}>{currChat.map(mes=>{
        return <div className={`message ${contextId===mes.contextId?"_yours":"_oponents"}`} key={mes.time+mes.contextId}>
            <p className="message__header">
                {mes.contextId===null||<span>{contextId===mes.contextId?chatTranslation.you:chatTranslation.oponent}</span>}
                <span>{new Date(mes.time).toTimeString("HH:mm:ss").split(" ")[0]}</span>
            </p>
            <p className="message__content">{mes.text}</p>
        </div>})}</div>
        <div className="chat__control">
        <input className="chat__input" type="text" onChange={(e)=>setMessage(e.target.value)} value={message}/>
        <button className="chat__submit" onClick={()=>sendMessage()}>{chatTranslation.sendMessageButton}</button>
    </div>
    </div>
}