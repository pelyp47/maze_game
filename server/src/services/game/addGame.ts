import { PrismaClient } from "@prisma/client";
import {utils} from "../../utils/";

const prisma = new PrismaClient();

async function addGame() {
    try {
        const newGame = await prisma.game.create({
            data: {
                maze: utils.createMaze(),
                time: new Date()
            }
        });
        return newGame
    } catch(err) {
        console.log(err);
        throw err
    } finally {
        await prisma.$disconnect();
    }
}

export default addGame