import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addPlayer(gameId:number, playerId:number) : Promise<{
    id: number;
    userId: number;
    gameId: number;
    winner: boolean;
}> {
    try {
        const newPlayerGameContext = await prisma.user_Game.create({
            data: {
                userId:playerId,
                gameId,
                winner: false
            }
        });
        return newPlayerGameContext
    } catch (err) {
        console.log(err);
        throw err
    } finally {
        await prisma.$disconnect();
    }
}

export default addPlayer