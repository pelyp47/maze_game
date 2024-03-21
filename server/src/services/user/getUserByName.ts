import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function getUserByName(name:string) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                name
            }
        });
        return user
    } catch(err) {
        console.log(err);
    } finally {
        await prisma.$disconnect()
    }
}

export default getUserByName