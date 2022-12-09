import {
  createSurveyQuestion,
  findAllSurveyQuestion,
  findQuestionById,
} from './question.dal';

import { QuestionInput } from './question.validation';

export async function addSurveyQuestion(questionInput: QuestionInput) {
  try {
    return await createSurveyQuestion(questionInput);
  } catch (error) {
    throw error;
  }
}

export async function getQuestionById(qid: string) {
  try {
    return await findQuestionById(qid);
  } catch (error) {
    throw error;
  }
}

export async function getAllSurveyQuestions(surveyId: number) {
  try {
    return await findAllSurveyQuestion(surveyId);
  } catch (error) {
    throw error;
  }
}
