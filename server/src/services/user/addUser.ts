import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

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
        console.log(err)
    } finally {
        await prisma.$disconnect()
    }
}

export default addUser