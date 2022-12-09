import express from 'express';
import { validateRequest } from '../../middlewares';
import { SurveyIdBody } from '../surveys/survey.validation';
import * as QuestionController from './question.controller';

import { QuestionIdParam, QuestionInput } from './question.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest({
    body: SurveyIdBody,
  }),
  QuestionController.getAllQuestionsRequest,
);
router.get(
  '/:qid',
  validateRequest({
    params: QuestionIdParam,
  }),
  QuestionController.getQuestionRequest,
);

router.post(
  '/add',
  validateRequest({
    body: QuestionInput,
  }),
  QuestionController.addQuestionRequest,
);
router.post('/:id/update', QuestionController.updateQuestionRequest);
router.post('/:id/remove/', QuestionController.removeQuestionRequest);

export default router;
