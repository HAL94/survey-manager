import express from 'express';

import MessageResponse from '../interfaces/message-response.interface';
import surveys from './surveys/surveys.api';

const router = express.Router();


router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/surveys', surveys);

export default router;
