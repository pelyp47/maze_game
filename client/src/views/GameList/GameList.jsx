import { useDispatch, useSelector } from "react-redux";
import { CurrGameJoin } from "../../globalState/CurrGame";
import "./GameList.css"

export default function GameList() {
    const dispatch = useDispatch()
    const {gameArray} = useSelector(state=>state.gameList)
    const {id} = useSelector(state=>state.logIn)
    async function addGame() {
        const contextData = await fetch("http://localhost:3000/game", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId:id
            })
        })
        const {gameId} = await contextData.json()
        dispatch(CurrGameJoin(gameId))
    }
    async function joinGame(gameId) {
        fetch(`http://localhost:3000/game/${gameId}/player`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: id
            })
        })
    }
    return <div className="game-list">
        {gameArray.map(game=>{
            const time= new Date(game.time)
            return <div className="game-list__item" key = {game.id}>
                <time className="game-list__time">{time.getDate()+"."+(time.getMonth()+1)+" "+time.getHours()+":"+time.getMinutes()}</time>
                <p className="game-list__name">{game.users[0].user.name}</p>
                <button className="game-list__join" onClick={()=>joinGame(game.id)}>Join</button>
            </div>
        })}
        <button className="game-list__new" onClick={()=>addGame()}>New game</button>
    </div>
}