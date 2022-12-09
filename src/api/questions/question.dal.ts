import { PrismaClient } from '@prisma/client';
import { findQuestionTypeById } from '../question-type/question-type.dal';
import { findSurveyById } from '../surveys/surveys.dal';

import { QuestionInput } from './question.validation';
const prisma = new PrismaClient();

export async function createSurveyQuestion(questionInput: QuestionInput) {
  try {
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
    return null;
  } catch (error) {
    throw error;
  }
}

export async function findAllSurveyQuestion(surveyId: number) {
  try {
    await findSurveyById(surveyId);
    const questions = await prisma.question.findMany({
      where: {
        surveyId: surveyId,
      },
    });
    return questions;
  } catch (error) {
    throw error;
  }
}

export async function findQuestionById(qid: string) {
  try {
    const question = await prisma.question.findUnique({
      where: { id: qid },
    });

    if (!question) {
      throw new Error(`Could not find a question with id: ${qid}`);
    }

    return question;
  } catch (error) {
    throw error;
  }
}
