"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function messageGame(gameId) {
    try {
        const context = await prisma.user_Game.findMany({
            where: {
                gameId: {
                    equals: gameId
                }
            }
        });
        console.log(context);
        if (!context)
            throw new Error("Context wasn't found");
        const messages = await prisma.message.findMany({
            where: {
                contextId: {
                    in: context.map(el => el.id)
                }
            }
        });
        return messages;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
    finally {
        await prisma.$disconnect();
    }
}
exports.default = messageGame;
