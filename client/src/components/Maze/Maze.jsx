import { useDispatch, useSelector } from "react-redux"
import "./Maze.css"
import { currGameLeave } from "../../globalState/CurrGame"
export default function Maze() {
    const {currMaze, winner} = useSelector(state=>state.currGame)
    const dispatch = useDispatch()
    function giveUp() {

    }
    function exit() {
        return dispatch(currGameLeave())
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
        <button className="maze_cancell-btn" onClick={winner===null?()=>giveUp():exit()}>{winner===null?"give up":"exit"}</button>
    </div>
}