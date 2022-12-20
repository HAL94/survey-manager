/*
  Warnings:

  - Changed the type of `type` on the `QuestionType` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "QType" AS ENUM ('TEXT', 'TEXT_EMAIL', 'TEXT_URL', 'TEXT_PASSWORD', 'TEXT_DATE', 'TEXT_NUMBER', 'TEXT_TEL', 'RADIO', 'DROPDOWN', 'CHECKBOX', 'BOOLEAN', 'COMMENT');

-- DropIndex
DROP INDEX "QuestionType_type_key";

-- AlterTable
ALTER TABLE "QuestionType" DROP COLUMN "type",
ADD COLUMN     "type" "QType" NOT NULL;
