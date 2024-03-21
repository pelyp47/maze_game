import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main():Promise<void> {
    await commands()
    console.log("commands added")
}

async function commands():Promise<void> {
    const up = await prisma.command.upsert({
        where:{id:1},
        update:{
            text: "(going up)",
            xChange: 0,
            yChange: 1
        },
        create:{
            id: 1,
            text: "(going up)",
            xChange: 0,
            yChange: 1
        }
    })
    const right = await prisma.command.upsert({
        where:{id: 2},
        update:{
            text: "(going right)",
            xChange: 1,
            yChange: 0
        },
        create: {
            id: 2,
            text: "(going right)",
            xChange: 1,
            yChange: 0
        }
    });
    const down = await prisma.command.upsert({
        where:{id: 3},
        update: {
            text: "(going down)",
            xChange: 0,
            yChange: -1
        },
        create:{
            id: 3,
            text: "(going down)",
            xChange: 0,
            yChange: -1
        }
    });
    const left = await prisma.command.upsert({
        where:{id:4},
        update:{
            text: "(going left)",
            xChange: -1,
            yChange: 0
        },
        create:{
            id: 4,
            text: "(going left)",
            xChange: -1,
            yChange: 0
        }
    });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })