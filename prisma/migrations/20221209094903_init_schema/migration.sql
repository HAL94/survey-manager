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
CREATE TABLE "QuestionType" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "QuestionType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "questionTypeId" TEXT NOT NULL,
    "isRequired" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "surveyId" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionOption" (
    "id" SERIAL NOT NULL,
    "questionId" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "QuestionOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" SERIAL NOT NULL,
    "questionId" TEXT NOT NULL,
    "questionOptionId" INTEGER NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuestionType_type_key" ON "QuestionType"("type");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_questionTypeId_fkey" FOREIGN KEY ("questionTypeId") REFERENCES "QuestionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "Survey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionOption" ADD CONSTRAINT "QuestionOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionOptionId_fkey" FOREIGN KEY ("questionOptionId") REFERENCES "QuestionOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
