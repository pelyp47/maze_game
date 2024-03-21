/*
  Warnings:

  - You are about to drop the `Message_Type` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `Game_Message` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ValueType" AS ENUM ('message', 'command');

-- DropForeignKey
ALTER TABLE "Game_Message" DROP CONSTRAINT "Game_Message_typeId_fkey";

-- AlterTable
ALTER TABLE "Game_Message" ADD COLUMN     "type" "ValueType" NOT NULL;

-- DropTable
DROP TABLE "Message_Type";
