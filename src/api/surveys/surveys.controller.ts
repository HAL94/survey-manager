import { NextFunction, Request, Response } from 'express';

import {
  addSurvey,
  addSurveyQuestion,
  getAllSurvyes,
  removeSurveyQuestion,
} from './surveys.service';
import { PrismaClient, Prisma, Survey, Question } from '@prisma/client';
import {
  ParamsWithId,
  QuestionAddBody,
  QuestionUpdateBody,
  QuestionParamsInput,
  SurveyAddBody,
} from './survey.model';
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

export async function createSurveyRequest(
  req: Request<{}, {}, SurveyAddBody>,
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

export async function updateQuestionRequest(
  req: Request<{}, {}, QuestionUpdateBody>,
  res: Response<OperationResponse>,
  next: NextFunction,
) {
  try {
    console.log('passed body', req.body);
    res.status(200).json({
      message: 'ok',
      success: true,
    });
  } catch (error) {
    next(error);
  }
}
export async function addQuestionRequest(
  req: Request<any, {}, QuestionAddBody>,
  res: Response<OperationResponse<Question>>,
  next: NextFunction,
) {
  try {
    const params = req.params as ParamsWithId;
    const surveyId = params.id;
    console.log('addSurveyBody', req.body);
    const question = await addSurveyQuestion(+surveyId, req.body);
    res.status(200).json({
      message: 'added a question successfully',
      success: true,
      result: question,
    });
  } catch (error) {
    next(error);
  }
}

export async function removeQuestionRequest(
  req: Request<any, {}, {}>,
  res: Response<OperationResponse<any>>,
  next: NextFunction,
) {
  try {
    const { id: surveyId, qid: questionId } =
      req.params as QuestionParamsInput;
    const question = await removeSurveyQuestion(+surveyId, questionId);
    return res.status(200).json({
      result: question,
      success: true,
      message: 'Successfully removed the question from survey',
    });
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
