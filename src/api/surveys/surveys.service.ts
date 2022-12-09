import { Survey, Question } from '@prisma/client';
import { SurveyInput } from './survey.validation';

import {
  createSurvey,
  deleteSurveyQuestion,
  findAllSurveys,
  findSurveyById,
} from './surveys.dal';

export async function getAllSurvyes() {
  try {
    return await findAllSurveys();
  } catch (error) {
    throw error;
  }
}

export async function addSurvey(surveyInput: SurveyInput) {
  try {
    const survey = await createSurvey(surveyInput);
    if (!survey) {
      throw new Error('Could not create survey');
    }
    return survey;
  } catch (error) {
    throw error;
  }
}

export async function addSurveyQuestion(
  surveyId: number,
) {
  try {
    const survey = await findSurveyById(surveyId);
    return survey;
  } catch (error) {
    throw error;
  }
}

export async function removeSurveyQuestion(
  surveyId: number,
  questionId: string,
) {
  try {
    const surveyItem = (await findSurveyById(surveyId, {
      questions: true,
    })) as (Survey & { questions: Question[] }) | null;
    if (!surveyItem) {
      throw new Error(`Could not find the survey item with id ${surveyId}`);
    }
    const questionItem = surveyItem.questions.find((q) => q.id === questionId);
    if (!questionItem) {
      throw new Error(`Could not find the question item with id ${questionId}`);
    }
    return await deleteSurveyQuestion(questionId);
  } catch (error) {
    throw error;
  }
}
