import { PrismaClient } from '@prisma/client';
import { findQuestionTypeById } from '../question-type/question-type.dal';
import { findSurveyById } from '../surveys/surveys.dal';

import { QuestionInput } from './question.validation';
const prisma = new PrismaClient();

export async function createSurveyQuestion(questionInput: QuestionInput) {
  await findSurveyById(questionInput.surveyId);
  await findQuestionTypeById(questionInput.type);
  return await prisma.question.create({
    data: {
      title: questionInput.title,
      isRequired: questionInput.isRequired,
      Survey: {
        connect: { id: questionInput.surveyId },
      },
      QuestionType: {
        connect: { id: questionInput.type },
      },
    },
  });
}

export async function findAllSurveyQuestion(
  surveyId: number,
  includeObj: any = {}
): Promise<any> {
  await findSurveyById(surveyId);
  const questions = await prisma.question.findMany({
    where: {
      surveyId: surveyId,
    },
    include: {
      QuestionType: { select: { type: true } },
      options: !!includeObj?.options,
    },
  });

  return questions;
}

export async function findQuestionById(qid: string, includeObj: any = {}) {
  const question = await prisma.question.findUnique({
    where: { id: qid },
    include: {
      QuestionType: { select: { type: true } },
      options: !!includeObj?.options,
    },
  });

  if (!question) {
    throw new Error(`Could not find a question with id: ${qid}`);
  }

  return question;
}
