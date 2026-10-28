import { Router } from 'express';
import { queryCopilot } from '../controllers/ai.controller';

const router = Router();

router.post('/query', queryCopilot);

export default router;
