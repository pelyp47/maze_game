"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function addPlayer(gameId, playerId) {
    try {
        const newPlayerGameContext = await prisma.user_Game.create({
            data: {
                userId: playerId,
                gameId,
                winner: false
            }
        });
        return newPlayerGameContext;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
    finally {
        await prisma.$disconnect();
    }
}
exports.default = addPlayer;
