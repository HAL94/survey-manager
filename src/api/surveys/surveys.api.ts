import express from 'express';
import { validateRequest } from '../../middlewares';
import {
  ParamsWithIntId,  
  QuestionBodyAddSchema,  
  QuestionBodyUpdateSchema,  
  QuestionParamsSchema,
  SurveySchema,
} from './survey.model';

const router = express.Router();

import * as SurveyController from './surveys.controller';

router.get('/', SurveyController.getSurveysRequest);
router.post(
  '/add',
  validateRequest({
    body: SurveySchema,
  }),
  SurveyController.createSurveyRequest,
);


router.get('/seed', SurveyController.seed);
router.post(
  '/:id/add',
  validateRequest({
    params: ParamsWithIntId,
    body: QuestionBodyAddSchema,
  }),
  SurveyController.addQuestionRequest,
);
router.post(
  '/:id/update/:qid',
  validateRequest({
    params: QuestionParamsSchema,
    body: QuestionBodyUpdateSchema,
  }),
  SurveyController.updateQuestionRequest,
);
router.post(
  '/:id/remove/:qid',
  validateRequest({
    params: QuestionParamsSchema,
  }),
  SurveyController.removeQuestionRequest,
);

export default router;
