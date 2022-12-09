import { PrismaClient } from '@prisma/client';
import { QuestionOptionInput } from './question-option.validation';

const prisma = new PrismaClient();

export async function createQuestionOption(input: QuestionOptionInput) {
  try {
    return await prisma.questionOption.create({
      data: {
        value: input.value,
        Question: {
          connect: {
            id: input.qid,
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function findAllQuestionOptions(qid: string) {
  try {
    const result = await prisma.questionOption.findMany({
      where: {
        questionId: qid,
      },
    });
    if (typeof result === 'undefined') {
      throw new Error(
        `Could not find the question options for question id ${qid}`,
      );
    }
    return result;
  } catch (error) {
    throw error;
  }
}

export async function findQuestionOptionById(qoid: number) {
  try {
    const questionOption = await prisma.questionOption.findUnique({
      where: { id: qoid },
    });

    if (!questionOption) {
      throw new Error(`Could not find a question option with id: ${qoid}`);
    }

    return questionOption;
  } catch (error) {
    throw error;
  }
}

export async function deleteQuestionOption(qoid: number) {
  try {
    const questionOption = await prisma.questionOption.delete({
      where: { id: qoid },
    });

    if (!questionOption) {
      throw new Error(`Could not find a question option with id: ${qoid}`);
    }

    return questionOption;
  } catch (error) {
    throw error;
  }
}
 
export async function updateQuestionOption(qoid: number, value: string) {
  try {
    const questionOption = await prisma.questionOption.update({
      where: { id: qoid },
      data: {
        value: value,
      },
    });

    if (!questionOption) {
      throw new Error(`Could not find a question option with id: ${qoid}`);
    }

    return questionOption;
  } catch (error) {
    throw error;
  }
}
