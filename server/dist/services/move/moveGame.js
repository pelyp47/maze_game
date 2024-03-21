"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function moveGame(gameId) {
    try {
        const context = await prisma.user_Game.findMany({
            where: {
                gameId
            }
        });
        if (!context)
            throw new Error("Context wasn't found");
        const moves = await prisma.move.findMany({
            where: {
                contextId: {
                    in: context.map(el => el.id)
                }
            }
        });
        return moves;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
    finally {
        await prisma.$disconnect();
    }
}
exports.default = moveGame;
