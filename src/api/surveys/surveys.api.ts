import express from 'express';
import { validateRequest } from '../../middlewares';
import { SurveyInput } from './survey.validation';

const router = express.Router();

import * as SurveyController from './surveys.controller';

router.get('/', SurveyController.getSurveysRequest);
router.post(
  '/',
  validateRequest({
    body: SurveyInput,
  }),
  SurveyController.createSurveyRequest,
);

router.get('/seed', SurveyController.seed);

export default router;
