import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addMove(gameId:number, userId:number, move:{time: Date, commandId: number}) : Promise<{
    id: number;
    time: Date;
    commandId: number;
    contextId: number;
}>{
    try {
        const context = await prisma.user_Game.findFirst({
            where: {
                gameId,
                userId
            }
        })
        if (!context) throw new Error("Context wasn't found")
        console.log(move)
        const newMove = await prisma.move.create({
            data: {
                time: move.time,
                commandId: move.commandId,
                contextId: context.id
            }
        })
        return newMove
    } catch (err) {
        console.log(err);
        throw err
    } finally {
        await prisma.$disconnect();
    }
}

export default addMove