"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function addMessage(gameId, userId, message) {
    try {
        const context = await prisma.user_Game.findFirst({
            where: {
                gameId,
                userId
            }
        });
        if (!context)
            throw new Error("Context wasn't found");
        const newMessage = await prisma.message.create({
            data: {
                time: message.time,
                text: message.text,
                contextId: context.id
            }
        });
        return newMessage;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
    finally {
        await prisma.$disconnect();
    }
}
exports.default = addMessage;
