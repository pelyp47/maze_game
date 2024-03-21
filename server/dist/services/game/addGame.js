"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const utils_1 = require("../../utils/");
const prisma = new client_1.PrismaClient();
async function addGame() {
    try {
        const newGame = await prisma.game.create({
            data: {
                maze: utils_1.utils.createMaze(),
                time: new Date()
            }
        });
        return newGame;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
    finally {
        await prisma.$disconnect();
    }
}
exports.default = addGame;
