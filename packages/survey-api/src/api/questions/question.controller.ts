import { Request, Response, NextFunction } from 'express';
import OperationResponse from '../../interfaces/operation-response.interface';
import { SurveyIdParam } from '../surveys/survey.validation';
import {
  addSurveyQuestion,
  getAllSurveyQuestions,
  getQuestionById,
} from './question.service';

import {
  QuestionIdParam,
  QuestionInput,
  GetAllQuestionsBody,
  QuestionIncludeOptsFlag,
} from './question.validation';

export async function addQuestionRequest(
  req: Request<{}, {}, QuestionInput>,
  res: Response<OperationResponse>,
  next: NextFunction,
) {
  try {   
    const q = await addSurveyQuestion(req.body);
    res.status(200).json({
      message: 'Ok',
      result: q,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

export async function getQuestionRequest(
  req: Request<QuestionIdParam, {}, QuestionIncludeOptsFlag>,
  res: Response<OperationResponse>,
  next: NextFunction,
) {
  try {
    
    const question = await getQuestionById(req.params.qid, {
      options: !!req.body.includeOpts,
    });
    res.status(200).json({
      message: 'Successfully fetched question',
      result: question,
      success: true,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}
export async function getAllQuestionsRequest(
  req: Request<SurveyIdParam, {}, GetAllQuestionsBody>,
  res: Response<OperationResponse>,
  next: NextFunction,
) {
  try {
    if (req.method !== 'POST') {
      throw new Error('Incorrect Request, Should only be POST');
    }
    // req.body.includeOpts

    const questionList = await getAllSurveyQuestions(req.body.surveyId, {
      options: !!req.body.includeOpts,
    });

    res.status(200).json({
      message: 'Ok',
      result: questionList,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}
export async function updateQuestionRequest(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(200).json({
    message: 'Ok',
    result: null,
    error: null,
  });
  try {
  } catch (error) {
    next(error);
  }
}

export async function removeQuestionRequest(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    res.status(200).json({
      message: 'Ok',
      result: null,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}
