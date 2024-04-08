"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ws_1 = __importDefault(require("ws"));
const dotenv_1 = __importDefault(require("dotenv"));
const routers_1 = __importDefault(require("./routers"));
const services_1 = require("./services");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 3000;
const domain = process.env.DOMAIN || "localhost";
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routers_1.default);
const server = app.listen(port, () => {
    console.log(`http://${domain}:${port}`);
});
//adding websockets
const WSServer = new ws_1.default.Server({ server });
let WSUsers = [];
function findConnection(id) {
    return WSUsers.find((el) => el.id = id);
}
function closeOther(id) {
    WSUsers = WSUsers.filter(el => {
        if (el.id == id) {
            el.ws.close();
            return false;
        }
        return true;
    });
}
WSServer.on('connection', async (ws, req) => {
    console.log('New WebSocket client connected');
    const id = req.url?.split('?')[1]?.split('=')[1];
    if (!id) {
        ws.close();
        return false;
    }
    const WSUser = { ws, id: Number(id) };
    closeOther(WSUser.id);
    WSUsers.push(WSUser);
    console.log(WSUsers);
    console.log(WSUser.id);
    const newUser = await services_1.userService.updateUser(WSUser.id, "", true);
    ws.on('message', async (message) => {
        const messageObj = JSON.parse(message);
        const type = messageObj.type;
        switch (type) {
            case "GAME_CREATED":
                WSUsers.forEach((WS) => {
                    WS.ws.send(JSON.stringify({ type }));
                });
                break;
            case "JOIN":
                WSUsers.forEach((WS) => {
                    WS.ws.send(JSON.stringify({ type: "GAME_JOINED", payload: messageObj.payload }));
                });
                break;
            case "MOVE":
                WSUsers.forEach((WS) => {
                    WS.ws.send(JSON.stringify({ type: "MOVE_MADE", payload: messageObj.payload }));
                });
                break;
            case "MESSAGE":
                WSUsers.forEach((WS) => {
                    WS.ws.send(JSON.stringify({ type: "MESSAGE_SENT", payload: messageObj.payload }));
                });
                break;
            default:
                break;
        }
    });
    ws.on('close', async () => {
        console.log('close connection...');
        const newUser = await services_1.userService.updateUser(Number(WSUser.id), "", false);
        closeOther(WSUser.id);
        console.log(WSUsers);
        return newUser;
    });
    ws.on('error', async () => {
        console.log('close connection...');
        const newUser = await services_1.userService.updateUser(Number(WSUser.id), "", false);
        closeOther(WSUser.id);
        console.log(WSUsers);
        return newUser;
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
