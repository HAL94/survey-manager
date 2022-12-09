import express from 'express';
import { validateRequest } from '../../middlewares';

import * as QuestionAnswerController from './question-answer.controller';
import {
  QuestionAnswerIdParam,
  QuestionAnswerInput,
  QuestionAnswerUpdate,
} from './question-answer.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest({
    body: QuestionAnswerInput,
  }),
  QuestionAnswerController.addQuestionAnswerRequest,
);

router.get(
  '/:qaid',
  validateRequest({
    params: QuestionAnswerIdParam,
  }),
  QuestionAnswerController.getQuestionAnswerRequest,
);

router.delete(
  '/:qaid',
  validateRequest({
    params: QuestionAnswerIdParam,
  }),
  QuestionAnswerController.removeQuestionAnswerRequest,
);

router.patch(
  '/:qaid',
  validateRequest({
    params: QuestionAnswerIdParam,
    body: QuestionAnswerUpdate,
  }),
  QuestionAnswerController.updateQuestionAnswerRequest,
);



export default router;
