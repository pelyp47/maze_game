"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandService = exports.moveService = exports.messageService = exports.gameService = exports.userService = void 0;
//user services
const addUser_1 = __importDefault(require("./user/addUser"));
const getUserById_1 = __importDefault(require("./user/getUserById"));
const getUserByName_1 = __importDefault(require("./user/getUserByName"));
const updateUser_1 = __importDefault(require("./user/updateUser"));
//game services
const gameAll_1 = __importDefault(require("./game/gameAll"));
const addGame_1 = __importDefault(require("./game/addGame"));
const addPlayer_1 = __importDefault(require("./game/addPlayer"));
//message services
const messageGame_1 = __importDefault(require("./message/messageGame"));
const messageUser_1 = __importDefault(require("./message/messageUser"));
const addMessage_1 = __importDefault(require("./message/addMessage"));
//move services
const moveGame_1 = __importDefault(require("./move/moveGame"));
const moveUser_1 = __importDefault(require("./move/moveUser"));
const addMove_1 = __importDefault(require("./move/addMove"));
const setWinner_1 = __importDefault(require("./game/setWinner"));
//command services
const commandAll_1 = __importDefault(require("./command/commandAll"));
exports.userService = { addUser: addUser_1.default, getUserById: getUserById_1.default, getUserByName: getUserByName_1.default, updateUser: updateUser_1.default };
exports.gameService = { gameAll: gameAll_1.default, addGame: addGame_1.default, addPlayer: addPlayer_1.default, setWinner: setWinner_1.default };
exports.messageService = { messageGame: messageGame_1.default, messageUser: messageUser_1.default, addMessage: addMessage_1.default };
exports.moveService = { moveGame: moveGame_1.default, moveUser: moveUser_1.default, addMove: addMove_1.default };
exports.commandService = { commandAll: commandAll_1.default };
