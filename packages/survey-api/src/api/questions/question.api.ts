import express from 'express';
import { validateRequest } from '../../middlewares';
import * as QuestionController from './question.controller';

import { GetAllQuestionsBody, QuestionIdParam, QuestionIncludeOptsFlag, QuestionInput } from './question.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest({
    body: GetAllQuestionsBody,    
  }),
  QuestionController.getAllQuestionsRequest,
);
router.get(
  '/:qid',
  validateRequest({
    params: QuestionIdParam,
    body: QuestionIncludeOptsFlag,
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
