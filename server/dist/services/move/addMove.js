"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function addMove(gameId, userId, move) {
    try {
        const context = await prisma.user_Game.findFirst({
            where: {
                gameId,
                userId
            }
        });
        if (!context)
            throw new Error("Context wasn't found");
        console.log(move);
        const newMove = await prisma.move.create({
            data: {
                time: move.time,
                commandId: move.commandId,
                contextId: context.id
            }
        });
        return newMove;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
    finally {
        await prisma.$disconnect();
    }
}
exports.default = addMove;
