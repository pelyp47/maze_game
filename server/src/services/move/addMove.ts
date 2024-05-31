import prisma from "../../lib/prisma";

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
        
        const newMove = await prisma.move.create({
            data: {
                time: move.time,
                commandId: move.commandId,
                contextId: context.id
            }
        })
        return newMove
    } catch (err) {
        
        throw err
    } finally {
        await prisma.$disconnect();
    }
}

export default addMove