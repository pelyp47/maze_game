import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function getUserById(id:number) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                id
            }
        });
        return user
    } catch(err) {
        console.log(err);
    } finally {
        await prisma.$disconnect()
    }
}

export default getUserById