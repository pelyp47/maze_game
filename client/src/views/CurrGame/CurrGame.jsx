import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Chat from "../../components/Chat/Chat"
import Maze from "../../components/Maze/Maze"
import ControlPanel from "../../components/ControlPanel/ControlPanel"
import "./CurrGame.css"

export default function CurrGame() {
    const {gameTime, gameStarted} = useSelector(state=>state.currGame)
    const [time, setTime] = useState(new Date())
    useEffect(()=>{
        const interval = setInterval(()=>{setTime(new Date())}, 1000)
        return () =>{
            clearInterval(interval)
        }
    }, [time])
    function countTime(createdAt, currTime) {
        const createdAtTime = new Date(createdAt)
        let difference = currTime.getTime()-createdAtTime.getTime()
        const days = Math.floor(difference/(1000*3600*24))
        const dayString = days>0?
                          `${days} day${days===1?"s":""} `
                          :""
        difference-=days*3600*1000*24
        const hours = Math.floor(difference/(3600*1000))
        const hourString = hours>0?
                          `${hours} hour${hours===1?"":"s"} `
                          :""
        difference-=hours*3600*1000
        const minutes = Math.floor(difference/(60*1000))
        const minuteString = minutes>0?
                          `${minutes} minute${minutes===1?"":"s"} `
                          :""
        difference-=minutes*60*1000
        const seconds = Math.floor(difference/1000)
        const secondString = seconds>0?
                          `${seconds} second${seconds===1?"":"s"}`
                          :""
        return dayString+hourString+minuteString+secondString
    }
    return <>
        {gameStarted?
        <div className="current-game">
            <Chat/>
            <Maze/>
            <ControlPanel/>
        </div>:
        <div className="waiting-screen">
            <p className="waiting-screen__content">
                You started a new game {countTime(gameTime, time)} ago. Waiting for a second player
                <span className="waiting-screen__dot waiting-screen__dot_1">{time.getSeconds()%3>=0?".":" "}</span>
                <span className="waiting-screen__dot waiting-screen__dot_2">{time.getSeconds()%3>=1?".":" "}</span>
                <span className="waiting-screen__dot waiting-screen__dot_3">{time.getSeconds()%3>=2?".":" "}</span>
            </p>
        </div>
        }
    </>
}