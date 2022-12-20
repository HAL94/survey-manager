import express from 'express';
import { validateRequest } from '../../middlewares';

import * as QuestionTypeController from './question-type.controller';
import { QuestionTypeIdParam, QuestionTypeInput } from './question-type.validation';

const router = express.Router();

router.get('/', QuestionTypeController.getAllQuestionTypesRequest);
router.get(
  '/:id',
  validateRequest({
    params: QuestionTypeIdParam,
  }),
  QuestionTypeController.getQuestionTypeRequest,
);
router.post(
  '/',
  validateRequest({
    body: QuestionTypeInput,
  }),
  QuestionTypeController.addQuestionTypeRequest,
);

export default router;
