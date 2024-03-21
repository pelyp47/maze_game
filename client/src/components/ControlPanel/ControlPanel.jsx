import { useSelector } from "react-redux"
import "./ControlPanel.css"

export default function ControlPanel() {
    const {id} = useSelector(state=> state.logIn)
    const {currGameId, yourMove} = useSelector(state=>state.currGame)
    async function makeMove(commandId) {
        if(!yourMove) return
        await fetch(`http://localhost:3000/game/${currGameId}/player/${id}/move`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                time: new Date(),
                commandId
            })
        })
    }
    return <div className="control-panel">

        <button className="control-panel__btn control-panel__btn_left" onClick={()=>makeMove(4)}>Left</button>
        <button className="control-panel__btn control-panel__btn_down" onClick={()=>makeMove(3)}>Down</button>
        <button className="control-panel__btn control-panel__btn_right" onClick={()=>makeMove(2)}>Right</button>
        <button className="control-panel__btn control-panel__btn_up" onClick={()=>makeMove(1)}>Up</button>
    </div>
}