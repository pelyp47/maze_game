import prisma from "../../lib/prisma";

async function getUserByName(name:string) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                name
            }
        });
        return user
    } catch(err) {
        
    } finally {
        await prisma.$disconnect()
    }
}

export default getUserByName