import prisma from "../../lib/prisma";

async function addUser(name: string) {
    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                online: false
            }
        })
        return newUser
    } catch(err) {
        
    } finally {
        await prisma.$disconnect()
    }
}

export default addUser