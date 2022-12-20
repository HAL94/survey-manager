/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `QuestionType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "QuestionType_type_key" ON "QuestionType"("type");
