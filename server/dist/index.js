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
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const WSServer = new ws_1.default.Server({ server });
WSServer.on('connection', (ws) => {
    console.log('New WebSocket client connected');
    const userState = {
        id: 0,
        online: false
    };
    ws.send(JSON.stringify({ messageObj: userState }));
    ws.on('message', async (message) => {
        await sleep(1000);
        const messageObj = JSON.parse(message);
        if (!(userState.online && userState.id)) {
            const newUser = await services_1.userService.updateUser(messageObj.userState.id, "", true);
            if (!newUser)
                return ws.send(`${JSON.stringify(userState)}`);
            userState.id = newUser.id;
            userState.online = newUser.online;
        }
        ws.send(`${JSON.stringify(messageObj)}`);
    });
    ws.on('close', async () => {
        console.log(userState);
        const newUser = await services_1.userService.updateUser(userState.id, "", false);
        console.log(newUser);
        return newUser;
    });
    ws.on('error', async () => {
        const newUser = await services_1.userService.updateUser(userState.id, "", false);
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
