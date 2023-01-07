/*
  Warnings:

  - Added the required column `title` to the `QuestionType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuestionType" ADD COLUMN     "title" TEXT NOT NULL;
