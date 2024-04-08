"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function updateUser(id, name, online) {
    try {
        console.log(id, name, online);
        if (id === 0)
            throw new Error("id can't be 0");
        const updatedUser = await prisma.user.update({
            where: {
                id
            },
            data: {
                name: name || undefined,
                online: online
            }
        });
        return updatedUser;
    }
    catch (err) {
        console.log(err);
    }
    finally {
        await prisma.$disconnect();
    }
}
exports.default = updateUser;
