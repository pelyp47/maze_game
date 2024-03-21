/*
  Warnings:

  - Added the required column `time` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "time" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "online" SET DEFAULT false;

-- AlterTable
ALTER TABLE "User_Game" ALTER COLUMN "winner" SET DEFAULT false;
