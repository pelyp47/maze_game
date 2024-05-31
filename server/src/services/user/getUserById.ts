import prisma from "../../lib/prisma";

async function getUserById(id:number) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                id
            }
        });
        return user
    } catch(err) {
        
    } finally {
        await prisma.$disconnect()
    }
}

export default getUserById