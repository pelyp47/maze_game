import { useDispatch, useSelector } from "react-redux"
import "./Maze.css"
import { currGameChatUpdate, currGameLeave, currGameStateUpdate } from "../../globalState/CurrGame"
import { updateGameList } from "../../globalState/GameList"
import { useWSContext } from "../../app/context/WSContext"
export default function Maze({mazeTranslation}) {
    const {currMaze, winner, currGameId} = useSelector(state=>state.currGame)
    const dispatch = useDispatch()
    const {id} = useSelector(state=>state.logIn)
    const {WS} = useWSContext()
    async function leave() {
        if(!winner) {
            await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/game/${currGameId}/player/${id}/giveUp`)
            
            dispatch(currGameStateUpdate(id)).then(()=>{
                dispatch(currGameChatUpdate(id)).then(()=>{
                    dispatch(updateGameList()).then(()=>{
                        dispatch(currGameLeave())
                    })
                })
            })
            WS.send(JSON.stringify({type: "MOVE", payload: {gameId: currGameId}}))
        }
        dispatch(updateGameList())
        dispatch(currGameLeave())
    }
    return <div className="maze">
        {currMaze.map((row, i)=>{
            return <div className="maze__row" key={i}>
                {row.map((el,j)=>{
                    const text = {
                        2: ".",
                        10: "A",
                        11: "B",
                        1000: "->"
                    }[el]
                    return <div key={i+""+j} className={`maze__cell ${el===0?"_block":""}`}>
                        {text}
                    </div>
                })}
            </div>
        })}
        <button className="maze__cancell-btn" onClick={()=>leave()}>{winner===null?(mazeTranslation.giveUpButton):(mazeTranslation.exitButton)}</button>
    </div>
}