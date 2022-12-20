import { PrismaClient } from '@prisma/client';
import { QuestionOptionInput } from './question-option.validation';

const prisma = new PrismaClient();
export async function getManyQuestionOptionByQid(qid: string) {
  return await prisma.questionOption.findMany({
    where: {
      questionId: qid,
    },
  });
}

export async function getQuestionOptionByQid(qid: string) {
  return await prisma.questionOption.findFirst({
    where: {
      questionId: qid,
    },
  });
}

export async function createQuestionOption(input: QuestionOptionInput) {
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
}

export async function findAllQuestionOptions(qid: string) {
  const result = await prisma.questionOption.findMany({
    where: {
      questionId: qid,
    },
  });
  if (typeof result === 'undefined') {
    throw new Error(
      `Could not find the question options for question id ${qid}`
    );
  }
  return result;
}

export async function findQuestionOptionById(qoid: number) {
  const questionOption = await prisma.questionOption.findUnique({
    where: { id: qoid },
  });

  if (!questionOption) {
    throw new Error(`Could not find a question option with id: ${qoid}`);
  }

  return questionOption;
}

export async function deleteQuestionOption(qoid: number) {
  const questionOption = await prisma.questionOption.delete({
    where: { id: qoid },
  });

  if (!questionOption) {
    throw new Error(`Could not find a question option with id: ${qoid}`);
  }

  return questionOption;
}

export async function updateQuestionOption(qoid: number, value: string) {
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
}
