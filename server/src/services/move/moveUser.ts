import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function moveUser(gameId:number, userId:number): Promise<{
    id: number;
    time: Date;
    commandId: number;
    contextId: number;
}[]> {
    try {
        const context = await prisma.user_Game.findFirst({
            where: {
                gameId,
                userId
            }
        })
        if(!context) throw new Error("Context wasn't found")
        const moves = await prisma.move.findMany({
            where: {
                contextId: context.id
            }
        })
        return moves
    } catch (err) {
        console.log(err);
        throw err
    } finally {
        await prisma.$disconnect();
    }
}

export default moveUser