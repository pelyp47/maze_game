/*
  Warnings:

  - You are about to drop the `Games` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Games";

-- CreateTable
CREATE TABLE "User_Game" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "User_Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game_Message" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Game_Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message_Type" (
    "id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Message_Type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User_Game" ADD CONSTRAINT "User_Game_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Game" ADD CONSTRAINT "User_Game_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game_Message" ADD CONSTRAINT "Game_Message_type_fkey" FOREIGN KEY ("type") REFERENCES "Message_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
