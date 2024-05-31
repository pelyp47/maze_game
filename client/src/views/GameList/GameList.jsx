import { useDispatch, useSelector } from "react-redux";
import { CurrGameJoin, currGameStateUpdate, currGameUpdate } from "../../globalState/CurrGame";
import "./GameList.css"
import { useWSContext } from "../../app/context/WSContext";

export default function GameList({id, gameListTranslation}) {
    const dispatch = useDispatch()
    const {gameArray} = useSelector(state=>state.gameList)
    const {WS} = useWSContext()
    async function addGame() {
        const contextData = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/game`, {
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
        WS.send(JSON.stringify({type: "GAME_CREATED"}))
    }
    async function joinGame(gameId) {
        await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/game/${gameId}/player`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: id
            })
        })
        dispatch(CurrGameJoin(gameId)).then(()=>{  
            dispatch(currGameUpdate(id)).then(()=>{
                dispatch(currGameStateUpdate(id))
            })
        })
        WS.send(JSON.stringify({type:"JOIN", payload:{gameId}}))
    }
    return <div className="game-list">
        {gameArray.map(game=>{
            const time= new Date(game.time)
            return <div className="game-list__item" key = {game.id}>
                <time className="game-list__time">{time.getDate()+"."+(time.getMonth()+1)+" "+time.getHours()+":"+time.getMinutes()}</time>
                <p className="game-list__name">{game.users[0].user.name}</p>
                <button className="game-list__join" onClick={()=>joinGame(game.id)}>{gameListTranslation.joinButton}</button>
            </div>
        })}
        <button className="game-list__new" onClick={()=>addGame()}>{gameListTranslation.submitButton}</button>
    </div>
}