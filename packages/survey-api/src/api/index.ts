import express from 'express';

import MessageResponse from '../interfaces/message-response.interface';
import surveys from './surveys/surveys.api';
import questions from './questions/question.api';
import types from './question-type/question-type.api';
import options from './question-option/question-option.api';
import answers from './question-answer/question-answer.api';

const router = express.Router();


router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/questions', questions);
router.use('/types', types);
router.use('/surveys', surveys);
router.use('/options', options);
router.use('/answers', answers);

export default router;
