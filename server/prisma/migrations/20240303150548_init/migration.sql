/*
  Warnings:

  - A unique constraint covering the columns `[text]` on the table `Command` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Command_text_key" ON "Command"("text");
