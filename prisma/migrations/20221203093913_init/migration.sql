-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('COMMENTQUESTION', 'RADIOGROUP');

-- CreateTable
CREATE TABLE "RadioQuestion" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "type" "QuestionType" NOT NULL DEFAULT 'RADIOGROUP',
    "choices" TEXT[],
    "isRequired" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RadioQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentQuestion" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "QuestionType" NOT NULL DEFAULT 'COMMENTQUESTION',
    "comment" TEXT NOT NULL,
    "isRequired" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommentQuestion_pkey" PRIMARY KEY ("id")
);
