"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function addUser(name) {
    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                online: false
            }
        });
        return newUser;
    }
    catch (err) {
        console.log(err);
    }
    finally {
        await prisma.$disconnect();
    }
}
exports.default = addUser;
