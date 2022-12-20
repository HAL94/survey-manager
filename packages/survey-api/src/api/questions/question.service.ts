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

export async function getQuestionById(qid: string, includeOpts: any = {}) {
  try {
    return await findQuestionById(qid, includeOpts);
  } catch (error) {
    throw error;
  }
}

export async function getAllSurveyQuestions(surveyId: number, includeOpts: any = {}) {
  try {
    return await findAllSurveyQuestion(surveyId, includeOpts);
  } catch (error) {
    throw error;
  }
}
