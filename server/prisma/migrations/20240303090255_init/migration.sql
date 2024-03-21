/*
  Warnings:

  - You are about to drop the column `type` on the `Game_Message` table. All the data in the column will be lost.
  - Added the required column `gameId` to the `Game_Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Game_Message" DROP CONSTRAINT "Game_Message_type_fkey";

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "winnerId" INTEGER;

-- AlterTable
ALTER TABLE "Game_Message" DROP COLUMN "type",
ADD COLUMN     "gameId" INTEGER NOT NULL,
ADD COLUMN     "typeId" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game_Message" ADD CONSTRAINT "Game_Message_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game_Message" ADD CONSTRAINT "Game_Message_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Message_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
