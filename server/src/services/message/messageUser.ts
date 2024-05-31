import prisma from "../../lib/prisma";

async function messageUser(gameId:number, userId:number) {
    try {
        const context = await prisma.user_Game.findFirst({
            where: {
                gameId,
                userId
            }
        })
        if(!context) throw new Error("Context wasn't found")
        const messages = await prisma.message.findMany({
            where: {
                contextId: context.id
            }
        })
        return messages
    } catch (err) {
        
        throw err
    } finally {
        await prisma.$disconnect();
    }
}

export default messageUser