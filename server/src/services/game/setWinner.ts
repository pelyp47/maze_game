import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient()

async function setWinner(contextId:number) {
    try {
        const updatedContext = await prisma.user_Game.update({
            where: {
                id:contextId
            },
            data: {
                winner: true
            }
        })
        return updatedContext
    } catch (error) {
        console.error( error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

export default setWinner