"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function gameAll() {
    try {
        const allGames = await prisma.game.findMany({
            include: {
                users: {
                    include: {
                        user: true
                    }
                }
            }
        });
        return allGames;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
    finally {
        await prisma.$disconnect();
    }
}
exports.default = gameAll;
