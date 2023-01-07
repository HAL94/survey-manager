import { PrismaClient } from '@prisma/client';
import { QuestionTypeInput } from './question-type.validation';

const prisma = new PrismaClient();

export async function createQuestionType(input: QuestionTypeInput) {
  return await prisma.questionType.create({
    data: {
      type: input.type,
      title: input.title
    },
  });
}

export async function findAllQuestionTypes() {
  return await prisma.questionType.findMany();
}

export async function findQuestionTypeById(qtid: string) {
  const questionType = await prisma.questionType.findUnique({
    where: {
      id: qtid,
    },
  });

  if (!questionType) {
    throw new Error(`Could not find a question type with id: ${qtid}`);
  }

  return questionType;
}
