import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient()

async function commandAll() {
    try {
        const allCommands= await prisma.command.findMany();
        return allCommands;
    } catch (error) {
        console.error( error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

export default commandAll