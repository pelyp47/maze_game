/*
  Warnings:

  - You are about to drop the column `winnerId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the `Game_Message` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `maze` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `online` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `winner` to the `User_Game` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_winnerId_fkey";

-- DropForeignKey
ALTER TABLE "Game_Message" DROP CONSTRAINT "Game_Message_gameId_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "winnerId",
ADD COLUMN     "maze" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "online" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "User_Game" ADD COLUMN     "winner" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "Game_Message";

-- DropEnum
DROP TYPE "ValueType";

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "text" TEXT NOT NULL,
    "contextId" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Move" (
    "id" SERIAL NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "commandId" INTEGER NOT NULL,
    "contextId" INTEGER NOT NULL,

    CONSTRAINT "Move_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Command" (
    "id" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "xChange" INTEGER NOT NULL,
    "yChange" INTEGER NOT NULL,

    CONSTRAINT "Command_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_contextId_fkey" FOREIGN KEY ("contextId") REFERENCES "User_Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_commandId_fkey" FOREIGN KEY ("commandId") REFERENCES "Command"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_contextId_fkey" FOREIGN KEY ("contextId") REFERENCES "User_Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
