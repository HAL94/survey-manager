import { Prisma, Survey, Question, QuestionType } from '@prisma/client';
import { QuestionAddBody, SurveyAddBody } from './survey.model';

import {
  createSurvey,
  createSurveyQuestion,
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

export async function addSurvey(surveyInput: SurveyAddBody) {
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
  surveyQuestion: QuestionAddBody,
) {
  try {
    const survey = await findSurveyById(surveyId);
    if (survey !== null) {
      const questionInput: Prisma.QuestionCreateInput = {
        isRequired: surveyQuestion.isRequired,
        title: surveyQuestion.title,
        type: surveyQuestion.type,
        Survey: {
          connect: {
            id: surveyId,
          },
        },
      };
      if (surveyQuestion.type === QuestionType.RADIOGROUP) {
        questionInput.RadioQuestion = {
          create: {
            choices: surveyQuestion.choices,
          },
        };
      } else if (surveyQuestion.type === QuestionType.COMMENTQUESTION) {
        questionInput.CommentQuestion = {
          create: {
            comment: '',
          },
        };
      }
      return await createSurveyQuestion(questionInput);
    } else {
      throw new Error(`Could not find survey with id ${surveyId}`);
    }
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
