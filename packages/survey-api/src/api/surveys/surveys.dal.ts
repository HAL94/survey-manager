import { PrismaClient } from '@prisma/client';
import { SurveyInput } from './survey.validation';
const prisma = new PrismaClient();

export async function findAllSurveys() {
  return await prisma.survey.findMany({
    include: {
      _count: {
        select: {
          questions: true,
        },
      },
    },
  });
}

export async function findSurveyById(surveyId: number) {
  const survey = await prisma.survey.findUnique({
    where: { id: surveyId },
    include: {
      _count: {
        select: {
          questions: true,
        },
      },
    },
  });
  if (!survey) {
    throw new Error(`Cannot find survey with id ${surveyId}`);
  }
  return survey;
}

export async function createSurvey(surveyInput: SurveyInput) {
  const survey = await prisma.survey.create({
    data: {
      title: surveyInput.title,
      description: surveyInput.description,
    },
  });
  return survey;
}


export async function updateSurveyById(surveyId: number, surveyInput: SurveyInput) {
  let survey = await findSurveyById(surveyId);
  survey = {
    ...survey,
    ...surveyInput
  }
  return await prisma.survey.update({
    where: {
      id: surveyId
    },
    data: {
      title: survey.title,
      description: survey.description
    }
  });

}

export async function removeSurveyById(surveyId: number) {
  return await prisma.survey.delete({
    where: {
      id: surveyId
    }
  });
}
