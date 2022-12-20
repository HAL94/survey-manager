import { Answer } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import OperationResponse from '../../interfaces/operation-response.interface';
import { QuestionIdParam } from '../questions/question.validation';

import {
  addQuestionAnswer,
  getAllQuestionsAnswers,
  getQuestionAnswerById,
  removeQuestionAnswer,
  updateQuestionAns,
} from './question-answer.service';

import {
  QuestionAnswerIdParam,
  QuestionAnswerInput,
  QuestionAnswerUpdate,
} from './question-answer.validation';

export async function addQuestionAnswerRequest(
  req: Request<{}, {}, QuestionAnswerInput>,
  res: Response<OperationResponse<Answer>>,
  next: NextFunction,
) {
  try {
    console.log('got body', req.body);
    const qanswer = await addQuestionAnswer(req.body);

    res.status(201).json({
      message: `Successfully created an answer with id ${qanswer.id}`,
      result: qanswer,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

export async function getQuestionAnswerRequest(
  req: Request<QuestionAnswerIdParam, {}, {}>,
  res: Response<OperationResponse<Answer>>,
  next: NextFunction,
) {
  try {
    const qanswer = await getQuestionAnswerById(+req.params.qaid);
    res.status(200).json({
      message: 'Successfully fetched answer',
      success: true,
      error: null,
      result: qanswer,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateQuestionAnswerRequest(
  req: Request<QuestionAnswerIdParam, {}, QuestionAnswerUpdate>,
  res: Response<OperationResponse<Answer>>,
  next: NextFunction,
) {
  const questionAnswer = await updateQuestionAns(
    +req.params.qaid,
    req.body.answer,
  );

  res.status(200).json({
    message: 'Ok',
    result: questionAnswer,
    error: null,
  });
  try {
  } catch (error) {
    next(error);
  }
}

export async function removeQuestionAnswerRequest(
  req: Request<QuestionAnswerIdParam, {}, {}>,
  res: Response<OperationResponse<Answer>>,
  next: NextFunction,
) {
  try {
    const questionOption = await removeQuestionAnswer(+req.params.qaid);
    res.status(202).json({
      message: 'Ok',
      result: questionOption,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllQuestionAnswersRequest(
  req: Request<QuestionIdParam, {}, {}>,
  res: Response<OperationResponse<Answer[] | Answer | null>>,
  next: NextFunction,
) {
  try {
    const answers = await getAllQuestionsAnswers(req.params.qid);
    res.status(202).json({
      message: 'Ok',
      result: answers,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}
