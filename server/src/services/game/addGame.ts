import {utils} from "../../utils/";
import prisma from "../../lib/prisma";

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
        
        throw err
    } finally {
        await prisma.$disconnect();
    }
}

export default addGame