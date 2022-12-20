import { QuestionOption } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import OperationResponse from '../../interfaces/operation-response.interface';
import { QuestionIdParam } from '../questions/question.validation';

import {
  addQuestionOption,
  getAllQuestionsOptions,
  getQuestionOptionById,
  removeQuestionOption,
  updateQuestionOpt,
} from './question-option.service';
import {
  QuestionOptionIdParam,
  QuestionOptionInput,
  QuestionOptionUpdate,
} from './question-option.validation';

export async function addQuestionOptionRequest(
  req: Request<{}, {}, QuestionOptionInput>,
  res: Response<OperationResponse<QuestionOption>>,
  next: NextFunction,
) {
  try {
    console.log('got body', req.body);
    const qopt = await addQuestionOption(req.body);

    res.status(201).json({
      message: `Successfully created an option for question with id ${req.body.qid}`,
      result: qopt,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

export async function getQuestionOptionRequest(
  req: Request<QuestionOptionIdParam, {}, {}>,
  res: Response<OperationResponse<QuestionOption>>,
  next: NextFunction,
) {
  try {
    const qtype = await getQuestionOptionById(+req.params.qoid);
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
export async function getAllQuestionOptionsRequest(
  req: Request<{}, {}, QuestionIdParam>,
  res: Response<OperationResponse<QuestionOption[]>>,
  next: NextFunction,
) {
  try {
    const qopts = await getAllQuestionsOptions(req.body.qid);
    res.status(200).json({
      message: 'Ok',
      result: qopts,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}
export async function updateQuestionOptionsRequest(
  req: Request<QuestionOptionIdParam, {}, QuestionOptionUpdate>,
  res: Response<OperationResponse<QuestionOption>>,
  next: NextFunction,
) {
  const questionOption = await updateQuestionOpt(
    +req.params.qoid,
    req.body.value,
  );

  res.status(200).json({
    message: 'Ok',
    result: questionOption,
    error: null,
  });
  try {
  } catch (error) {
    next(error);
  }
}

export async function removeQuestionOptionsRequest(
  req: Request<QuestionOptionIdParam, {}, {}>,
  res: Response<OperationResponse<QuestionOption>>,
  next: NextFunction,
) {
  try {
    const questionOption = await removeQuestionOption(+req.params.qoid);
    res.status(202).json({
      message: 'Ok',
      result: questionOption,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}
