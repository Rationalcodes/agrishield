import { Router } from 'express';
import {
  getTelemetryHistory,
  getRecentMessages,
  ingestTelemetryReading,
  streamTelemetrySSE,
} from '../controllers/telemetry.controller';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();

router.get('/history', getTelemetryHistory);
router.get('/messages', getRecentMessages);
router.get('/stream', streamTelemetrySSE);
router.post('/ingest', rateLimiter, ingestTelemetryReading);

export default router;
