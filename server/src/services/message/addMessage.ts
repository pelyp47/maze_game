import prisma from "../../lib/prisma";;

async function addMessage(gameId:number, userId:number, message:{time: Date, text: string}): Promise<{
    id: number;
    time: Date;
    text: string;
    contextId: number;
}> {
    try {
        const context = await prisma.user_Game.findFirst({
            where: {
                gameId,
                userId
            }
        })
        if (!context) throw new Error("Context wasn't found")
        const newMessage = await prisma.message.create({
            data: {
                time: message.time,
                text: message.text,
                contextId: context.id
            }
        })
        return newMessage
    } catch (err) {
        
        throw err
    } finally {
        await prisma.$disconnect();
    }
}

export default addMessage