import { PrismaClient } from '@prisma/client';
import { QuestionTypeInput } from './question-type.validation';

const prisma = new PrismaClient();

export async function createQuestionType(input: QuestionTypeInput) {
  try {
    return await prisma.questionType.create({
      data: {
        type: input.type,
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function findAllQuestionTypes() {
  try {
    return await prisma.questionType.findMany();
  } catch (error) {
    throw error;
  }
}

export async function findQuestionTypeById(qtid: string) {
  try {
    const questionType = await prisma.questionType.findUnique({
      where: { id: qtid },
    });

    if (!questionType) {
      throw new Error(`Could not find a question type with id: ${qtid}`);
    }

    return questionType;
  } catch (error) {
    throw error;
  }
}
