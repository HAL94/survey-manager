import { QuestionType } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import OperationResponse from '../../interfaces/operation-response.interface';

import { addQuestionType, getAllQuestionsTypes, getQuestionTypeById } from './question-type.service';
import { QuestionTypeIdParam, QuestionTypeInput } from './question-type.validation';

export async function addQuestionTypeRequest(
  req: Request<{}, {}, QuestionTypeInput>,
  res: Response<OperationResponse<QuestionType>>,
  next: NextFunction,
) {
  try {
    console.log('got body', req.body);
    const qtype = await addQuestionType(req.body);

    res.status(201).json({
      message: 'Successfully created a question type',
      result: qtype,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

export async function getQuestionTypeRequest(
  req: Request<QuestionTypeIdParam, {}, {}>,
  res: Response<OperationResponse<QuestionType>>,
  next: NextFunction,
) {
  try {
    const qtype = await getQuestionTypeById(req.params.id);
    res.status(200).json({
      message: 'Successfully fetched question type',
      success: true,
      error: null,
      result: qtype,
    });
  } catch (error) {
    next(error);
  }
}
export async function getAllQuestionTypesRequest(
  req: Request,
  res: Response<OperationResponse<QuestionType[]>>,
  next: NextFunction,
) {
  try {
    if (req.method !== 'GET') {
      throw new Error('Incorrect Request, Should only be POST');
    }
    const qtypes = await getAllQuestionsTypes();
    res.status(200).json({
      message: 'Ok',
      result: qtypes,
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
