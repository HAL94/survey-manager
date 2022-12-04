/*
  Warnings:

  - The primary key for the `CommentQuestion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `questionId` on the `CommentQuestion` table. All the data in the column will be lost.
  - The primary key for the `RadioQuestion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `questionId` on the `RadioQuestion` table. All the data in the column will be lost.
  - Added the required column `id` to the `CommentQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `RadioQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CommentQuestion" DROP CONSTRAINT "CommentQuestion_questionId_fkey";

-- DropForeignKey
ALTER TABLE "RadioQuestion" DROP CONSTRAINT "RadioQuestion_questionId_fkey";

-- AlterTable
ALTER TABLE "CommentQuestion" DROP CONSTRAINT "CommentQuestion_pkey",
DROP COLUMN "questionId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "CommentQuestion_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "RadioQuestion" DROP CONSTRAINT "RadioQuestion_pkey",
DROP COLUMN "questionId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "RadioQuestion_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "RadioQuestion" ADD CONSTRAINT "RadioQuestion_id_fkey" FOREIGN KEY ("id") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentQuestion" ADD CONSTRAINT "CommentQuestion_id_fkey" FOREIGN KEY ("id") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
