import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient()

async function gameAll() : Promise<({
    id: number;
    maze: Prisma.JsonValue;
    users: {
        id: number;
        userId: number;
        gameId: number;
        winner: boolean;
    }[];
})[]>{
    try {
        const allGames= await prisma.game.findMany({
            include: {
                users: {
                    include: {
                        user:true
                    }
                }
            } 
        });
        return allGames;
    } catch (error) {
        console.error( error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

export default gameAll