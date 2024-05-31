import express, {Express, Request} from "express";
import cors from "cors";
import WS from "ws";
import dotenv from "dotenv";

import mainRouter from "./routers";
import { userService } from "./services";



dotenv.config();
const app :Express = express();
const port:number  = Number(process.env.PORT)||3000;
const domain: string = process.env.DOMAIN||"localhost";

app.use(cors<Request>());
app.use(express.json());
app.use(mainRouter);

const server = app.listen(port, ()=>{
    
});

//adding websockets
const WSServer = new WS.Server({ server});
let WSUsers:{id:number, ws:WS}[] = []
function findConnection(id:number) {
  return WSUsers.find((el)=>el.id=id)
}
function closeOther(id:number) {
  WSUsers = WSUsers.filter(el=>{
    if (el.id==id) {
      el.ws.close()
      return false
    }
    return true
  })
}
WSServer.on('connection', async (ws, req) => {
  
  const id = req.url?.split('?')[1]?.split('=')[1]
  if(!id) {
    ws.close()
    return false
  }
  const WSUser ={ws, id: Number(id)}
  closeOther(WSUser.id)
  WSUsers.push(WSUser)
  
  
  const newUser = await userService.updateUser(WSUser.id, "", true)
  ws.on('message', async (message: string) => {
    const messageObj = JSON.parse(message)
    const type:"GAME_CREATED"|"MOVE"|"MESSAGE"|"JOIN" = messageObj.type
    switch(type) {
      case "GAME_CREATED":
        WSUsers.forEach((WS)=>{
          WS.ws.send(JSON.stringify({type}))
        })
        break;
      case "JOIN":
        WSUsers.forEach((WS)=>{
          WS.ws.send(JSON.stringify({type:"GAME_JOINED", payload:messageObj.payload}))
        })
        break;
      case "MOVE":
        WSUsers.forEach((WS)=>{
          WS.ws.send(JSON.stringify({type:"MOVE_MADE", payload:messageObj.payload}))
        })
        break;
      case "MESSAGE":
        WSUsers.forEach((WS)=>{
          WS.ws.send(JSON.stringify({type:"MESSAGE_SENT", payload:messageObj.payload}))
        })
        break;
      default:
        break;
    }
  });

  ws.on('close', async () => {
    
    const newUser = await userService.updateUser(Number(WSUser.id), "", false)
    closeOther(WSUser.id)
    
    return newUser
  });
  ws.on('error', async () => {
    
    const newUser = await userService.updateUser(Number(WSUser.id), "", false)
    closeOther(WSUser.id)
    
    return newUser
  });
});


// /game get post
//   /gameId:
//     /player get post
//       /:playerId get 
//         /message get post
//         /move get post
//            /:moveNumber get
// /user get post
//   /:userId patch get
//     /game get
//       /current get

