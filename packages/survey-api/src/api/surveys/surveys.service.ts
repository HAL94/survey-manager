import { SurveyInput } from './survey.validation';

import {
  createSurvey,
  findAllSurveys,
  findSurveyById,
  removeSurveyById,
  updateSurveyById
} from './surveys.dal';

export async function getAllSurvyes() {
  return await findAllSurveys();
}

export async function getSurveyById(surveyId: number) {
  return await findSurveyById(surveyId)
}

export async function addSurvey(surveyInput: SurveyInput) {
  const survey = await createSurvey(surveyInput);
  if (!survey) {
    throw new Error('Could not create survey');
  }
  return survey;
}

export async function updateSurvey(surveyId: number, surveyInput: SurveyInput) {
  return await updateSurveyById(surveyId, surveyInput);
}

export async function deleteSurvey(surveyId: number) {
  return await removeSurveyById(surveyId);
}
