"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function setWinner(contextId) {
    try {
        const updatedContext = await prisma.user_Game.update({
            where: {
                id: contextId
            },
            data: {
                winner: true
            }
        });
        return updatedContext;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
    finally {
        await prisma.$disconnect();
    }
}
exports.default = setWinner;
