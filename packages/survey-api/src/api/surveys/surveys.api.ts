import express from 'express';
import { validateRequest } from '../../middlewares';
import { SurveyIdParam, SurveyInput } from './survey.validation';

const router = express.Router();

import * as SurveyController from './surveys.controller';

router
  .get('/', SurveyController.getSurveysRequest)
  .get('/:surveyId', validateRequest({
    params: SurveyIdParam
  }), SurveyController.fetchSurveyById);


router.post(
  '/',
  validateRequest({
    body: SurveyInput,
  }),
  SurveyController.createSurveyRequest
);

router.post(
  '/:surveyId',
  validateRequest({
    params: SurveyIdParam,
    body: SurveyInput,
  }),
  SurveyController.updateSurveyRequest
);

router.delete(
  '/:surveyId',
  validateRequest({
    params: SurveyIdParam,
  }),
  SurveyController.deleteSurveyRequest

)
router.get('/seed', SurveyController.seed);

export default router;
