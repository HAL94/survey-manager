/*
  Warnings:

  - The primary key for the `CommentQuestion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `CommentQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `CommentQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `isRequired` on the `CommentQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `CommentQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `CommentQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `CommentQuestion` table. All the data in the column will be lost.
  - The primary key for the `RadioQuestion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `RadioQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `RadioQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `isRequired` on the `RadioQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `RadioQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `RadioQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `RadioQuestion` table. All the data in the column will be lost.
  - Added the required column `questionId` to the `CommentQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionId` to the `RadioQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CommentQuestion" DROP CONSTRAINT "CommentQuestion_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "isRequired",
DROP COLUMN "title",
DROP COLUMN "type",
DROP COLUMN "updatedAt",
ADD COLUMN     "questionId" TEXT NOT NULL,
ADD CONSTRAINT "CommentQuestion_pkey" PRIMARY KEY ("questionId");

-- AlterTable
ALTER TABLE "RadioQuestion" DROP CONSTRAINT "RadioQuestion_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "isRequired",
DROP COLUMN "title",
DROP COLUMN "type",
DROP COLUMN "updatedAt",
ADD COLUMN     "questionId" TEXT NOT NULL,
ADD CONSTRAINT "RadioQuestion_pkey" PRIMARY KEY ("questionId");

-- CreateTable
CREATE TABLE "Survey" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Survey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "QuestionType" NOT NULL,
    "isRequired" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "surveyId" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "Survey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RadioQuestion" ADD CONSTRAINT "RadioQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentQuestion" ADD CONSTRAINT "CommentQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
