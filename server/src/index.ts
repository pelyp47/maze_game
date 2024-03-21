import express, {Express, Request} from "express";
import cors from "cors";
import WS from "ws";
import dotenv from "dotenv";

import mainRouter from "./routers";
import { userService } from "./services";



dotenv.config();
const app :Express = express();
const port:number  = Number(process.env.PORT)||3000;

app.use(cors<Request>());
app.use(express.json())
app.use(mainRouter);

const server = app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
});

//adding websockets
async function sleep(ms:number): Promise<(arg0:unknown)=>void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const WSServer = new WS.Server({ server});

WSServer.on('connection', (ws) => {
  console.log('New WebSocket client connected');
  
  const userState = {
    id: 0,
    online: false
  }
  ws.send(JSON.stringify({messageObj:userState}))
  ws.on('message', async (message: string) => {
    await sleep(10000)
    const messageObj:{
      userState: {
        id: number,
        online: boolean
      }
    } = JSON.parse(message)

    if(!(userState.online&&userState.id)) {
      const newUser = await userService.updateUser(messageObj.userState.id, "", true)
      if (!newUser) return ws.send(`${JSON.stringify(userState)}`);

      userState.id = newUser.id
      userState.online = newUser.online
    }

    ws.send(`${JSON.stringify(messageObj)}`);
  });

  ws.on('close', async () => {
    console.log(userState);
    const newUser = await userService.updateUser(userState.id, "", false)
    console.log(newUser)
    return newUser
  });
  ws.on('error', async () => {
    const newUser = await userService.updateUser(userState.id, "", false)
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

