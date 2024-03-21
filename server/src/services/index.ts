//user services
import addUser from "./user/addUser";
import getUserById from "./user/getUserById";
import getUserByName from "./user/getUserByName";
import updateUser from "./user/updateUser";
//game services
import gameAll from "./game/gameAll";
import addGame from "./game/addGame";
import addPlayer from "./game/addPlayer";
//message services
import messageGame from "./message/messageGame";
import messageUser from "./message/messageUser";
import addMessage from "./message/addMessage";
//move services
import moveGame from "./move/moveGame";
import moveUser from "./move/moveUser";
import addMove from "./move/addMove";
import setWinner from "./game/setWinner";
//command services
import commandAll from "./command/commandAll";

export const userService = {addUser, getUserById, getUserByName, updateUser};
export const gameService = {gameAll, addGame, addPlayer, setWinner};
export const messageService = {messageGame, messageUser, addMessage};
export const moveService = {moveGame, moveUser, addMove};
export const commandService = {commandAll}