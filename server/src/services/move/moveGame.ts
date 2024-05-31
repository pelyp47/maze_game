import prisma from "../../lib/prisma";

async function moveGame(gameId:number): Promise<{
    id: number;
    time: Date;
    commandId: number;
    contextId: number;
}[]> {
    try {
        const context = await prisma.user_Game.findMany({
            where: {
                gameId
            }
        })
        if(!context) throw new Error("Context wasn't found")
        const moves = await prisma.move.findMany({
            where: {
                contextId: {
                    in: context.map(el=>el.id)
                }
            }
        })
        return moves
    } catch (err) {
        
        throw err
    } finally {
        await prisma.$disconnect();
    }
}

export default moveGame