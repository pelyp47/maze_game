import { useDispatch, useSelector } from "react-redux"
import "./ControlPanel.css"
import { useWSContext } from "../../views/Home/Home"
import { currGameChatUpdate, currGameStateUpdate } from "../../globalState/CurrGame"

export default function ControlPanel({id, controlPanelTranslation}) {
    const {currGameId, yourMove} = useSelector(state=>state.currGame)
    const {WS} = useWSContext()
    const dispatch = useDispatch()
    async function makeMove(commandId) {
        if(!yourMove) return
        const move = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/game/${currGameId}/player/${id}/move`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                time: new Date(),
                commandId
            })
        })
        WS.send(JSON.stringify({type:"MOVE", payload:{gameId: currGameId}}))
        dispatch(currGameStateUpdate(id))
        dispatch(currGameChatUpdate(id))
    }
    return <div className="control-panel">

        <button className="control-panel__btn control-panel__btn_left" onClick={()=>makeMove(4)}>{controlPanelTranslation.leftButton}</button>
        <button className="control-panel__btn control-panel__btn_down" onClick={()=>makeMove(3)}>{controlPanelTranslation.downButton}</button>
        <button className="control-panel__btn control-panel__btn_right" onClick={()=>makeMove(2)}>{controlPanelTranslation.rightButton}</button>
        <button className="control-panel__btn control-panel__btn_up" onClick={()=>makeMove(1)}>{controlPanelTranslation.upButton}</button>
    </div>
}