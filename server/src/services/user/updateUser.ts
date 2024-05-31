import prisma from "../../lib/prisma";

async function updateUser(id:number, name:string, online:boolean) {
    try {
        
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
        
    } finally {
        await prisma.$disconnect()
    }
}

export default updateUser