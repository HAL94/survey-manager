import { NextFunction, Request, Response } from 'express';

import {
  addSurvey,
  getAllSurvyes,
  getSurveyById,
  updateSurvey,
} from './surveys.service';
import { PrismaClient, Prisma, Survey } from '@prisma/client';
import {
  SurveyIdParam,
  SurveyInput,
} from './survey.validation';
import OperationResponse from '../../interfaces/operation-response.interface';
const prisma = new PrismaClient();

export async function getSurveysRequest(
  req: Request,
  res: Response<OperationResponse<Survey[]>>,
  next: NextFunction,
) {
  try {
    if (req.method !== 'GET') {
      throw new Error('Bad Request to Resource');
    }
    const result = await getAllSurvyes();
    return res.status(200).json({
      message: 'Successfully fetched all surveys',
      success: true,
      result: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function fetchSurveyById(
  req: Request<SurveyIdParam, {}, any>,
  res: Response<OperationResponse<Survey>>,
  next: NextFunction,
) {
  try {
    const result = await getSurveyById(+req.params.surveyId);
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 2000)
    });
    return res.status(200).json({
      message: `Successfully fetched survey with id ${req.params.surveyId}`,
      success: true,
      result: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function createSurveyRequest(
  req: Request<{}, {}, SurveyInput>,
  res: Response<OperationResponse<Survey>>,
  next: NextFunction,
) {
  try {
    const surveyInput = { ...req.body };
    const survey = await addSurvey(surveyInput);
    return res.status(200).json({
      success: true,
      message: 'Successfully created survey',
      result: survey,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateSurveyRequest(
  req: Request<SurveyIdParam, {}, SurveyInput>,
  res: Response<OperationResponse<Survey>>,
  next: NextFunction
) {
  try {
    const surveyInput = { ...req.body };
    const surveyUpdated = await updateSurvey(+req.params.surveyId, surveyInput);
    return res.status(200).json({
      error: null,
      message: 'Successfully updated survey',
      result: surveyUpdated,
      success: true
    })
  } catch (error) {
    next(error);
  }
}

export async function seed(req: Request, res: Response, next: NextFunction) {
  try {
    const surveys: Prisma.SurveyCreateInput[] = [
      {
        title: 'Product Survey',
        description: 'A survey that will gauge the satisfaction our product',
      },
      {
        title: 'Service Survey',
        description: 'A survey that will gauge the satisfaction our services',
      },
    ];
    for (const survey of surveys) {
      const surv = await prisma.survey.create({
        data: survey,
      });
      console.log(`Created user with id: ${surv.id}`);
    }
    console.log('Seeding finished.');

    return res.status(200).json({
      result: surveys,
      message: 'seeding finished',
    });
  } catch (error) {
    next(error);
  }
}
