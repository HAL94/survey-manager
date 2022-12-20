import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getQuestionAnswerByQid(
  qid: string,
  methodName = 'findFirst'
) {
  if (methodName === 'findMany') {
    return await prisma.answer.findMany({
      where: {
        questionId: qid,
      },
    });
  }
  return await prisma.answer.findFirst({
    where: {
      questionId: qid,
    },
  });
}

export async function createQuestionAnswer(input: {
  qid: string;
  qoid: number;
  answer: string;
}) {
  return await prisma.answer.create({
    data: {
      answer: input.answer,
      Question: {
        connect: {
          id: input.qid,
        },
      },
      QuestionOption: {
        connect: {
          id: input.qoid,
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

export async function findQuestionAnswerById(qaid: number) {
  const answer = await prisma.answer.findUnique({
    where: { id: qaid },
  });

  if (!answer) {
    throw new Error(`Could not find a question answer with id: ${qaid}`);
  }

  return answer;
}

export async function deleteQuestionAnswer(qaid: number) {
  const answer = await prisma.answer.delete({
    where: { id: qaid },
  });

  if (!answer) {
    throw new Error(`Could not find a question answer with id: ${qaid}`);
  }

  return answer;
}

export async function updateQuestionAnswer(qaid: number, answer: string) {
  const questionAnswer = await prisma.answer.update({
    where: { id: qaid },
    data: {
      answer: answer,
    },
  });

  if (!questionAnswer) {
    throw new Error(`Could not find a question answer with id: ${qaid}`);
  }

  return questionAnswer;
}
