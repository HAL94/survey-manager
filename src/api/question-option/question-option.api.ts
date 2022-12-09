import express from 'express';
import { validateRequest } from '../../middlewares';
import { QuestionIdParam } from '../questions/question.validation';


import * as QuestionOptionController from './question-option.controller';
import {
  QuestionOptionIdParam,
  QuestionOptionInput,
  QuestionOptionUpdate,
} from './question-option.validation';

const router = express.Router();

router.post(
  '/all',
  validateRequest({
    body: QuestionIdParam,
  }),
  QuestionOptionController.getAllQuestionOptionsRequest,
);
router.get(
  '/:qoid',
  validateRequest({
    params: QuestionOptionIdParam,
  }),
  QuestionOptionController.getQuestionOptionRequest,
);
router.delete(
  '/:qoid',
  validateRequest({
    params: QuestionOptionIdParam,
  }),
  QuestionOptionController.removeQuestionOptionsRequest,
);

router.patch(
  '/:qoid',
  validateRequest({
    params: QuestionOptionIdParam,
    body: QuestionOptionUpdate,
  }),
  QuestionOptionController.updateQuestionOptionsRequest,
);
router.post(
  '/',
  validateRequest({
    body: QuestionOptionInput,
  }),
  QuestionOptionController.addQuestionOptionRequest,
);



export default router;
