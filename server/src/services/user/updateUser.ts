import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function updateUser(id:number, name:string, online:boolean) {
    try {
        console.log(id, name, online);
        if(id===0) throw new Error("id can't be 0")
        const updatedUser = await prisma.user.update({
            where: {
                id
            },
            data: {
                name: name||undefined,
                online: online
            }
        });
        return updatedUser
    } catch(err) {
        console.log(err);
    } finally {
        await prisma.$disconnect()
    }
}

export default updateUser