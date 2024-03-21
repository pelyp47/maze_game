import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import "./Chat.css"

export default function Chat() {
    const {id} = useSelector(state=>state.logIn)
    const {currChat, currGameId, contextId, yourMove} = useSelector(state=>state.currGame)
    const messages = useRef(null)
    useEffect(()=>{
        messages.current.scrollTo(0, messages.current.scrollHeight)
    }, [currChat.length])
    console.log(contextId)
    const [message, setMessage] = useState("")
    async function sendMessage() {
        const text = message.trim()
        const commandId = ["/up", "/right", "/down", "/left"].indexOf(text)+1
        if(commandId!==0) {     
            if(!yourMove) return
            await fetch(`http://localhost:3000/game/${currGameId}/player/${id}/move`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    commandId,
                    time: new Date()
                })
            })
            setMessage("")
            return
        }
        await fetch(`http://localhost:3000/game/${currGameId}/player/${id}/message`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text,
                time: new Date()
            })
        })
        setMessage("")
    }
    console.log(currChat)
    return <div className="chat">
        <p className={`chat__indicator ${yourMove?"_yours":"_oponents"}`}>{yourMove?"It is your move": "It is your oponent's move"}</p>
        <div className="chat__container" ref={messages}>{currChat.map(mes=>{
        return <div className={`message ${contextId===mes.contextId?"_yours":"_oponents"}`} key={mes.time+mes.contextId}>
            <p className="message__header">
                {mes.contextId===null||<span>{contextId===mes.contextId?" You":" Oponent"}</span>}
                <span>{new Date(mes.time).toTimeString("HH:mm:ss").split(" ")[0]}</span>
            </p>
            <p className="message__content">{mes.text}</p>
        </div>})}</div>
        <div className="chat__control">
        <input className="chat__input" type="text" onChange={(e)=>setMessage(e.target.value)} value={message}/>
        <button className="chat__submit" onClick={()=>sendMessage()}>send</button>
    </div>
    </div>
}