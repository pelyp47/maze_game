"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function getUserById(id) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                id
            }
        });
        return user;
    }
    catch (err) {
        console.log(err);
    }
    finally {
        await prisma.$disconnect();
    }
}
exports.default = getUserById;
