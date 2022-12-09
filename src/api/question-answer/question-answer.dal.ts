import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export async function createQuestionAnswer(input: {
  qid: string;
  qoid: number;
  answer: string;
}) {
  try {
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

export async function findQuestionAnswerById(qaid: number) {
  try {
    const answer = await prisma.answer.findUnique({
      where: { id: qaid },
    });

    if (!answer) {
      throw new Error(`Could not find a question answer with id: ${qaid}`);
    }

    return answer;
  } catch (error) {
    throw error;
  }
}

export async function deleteQuestionAnswer(qaid: number) {
  try {
    const answer = await prisma.answer.delete({
      where: { id: qaid },
    });

    if (!answer) {
      throw new Error(`Could not find a question answer with id: ${qaid}`);
    }

    return answer;
  } catch (error) {
    throw error;
  }
}

export async function updateQuestionAnswer(qaid: number, answer: string) {
  try {
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
  } catch (error) {
    throw error;
  }
}
