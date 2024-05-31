import prisma from "../../lib/prisma";

async function messageGame(gameId:number): Promise<{
    id: number;
    time: Date;
    text: string;
    contextId: number;
}[]> {
    try {
        const context = await prisma.user_Game.findMany({
            where: {
                gameId:{
                    equals: gameId
                }
            }
        })
        
        if(!context) throw new Error("Context wasn't found")
        const messages = await prisma.message.findMany({
            where: {
                contextId: {
                    in: context.map(el=>el.id)
                }
            }
        })
        return messages
    } catch (err) {
        
        throw err
    } finally {
        await prisma.$disconnect();
    }
}

export default messageGame