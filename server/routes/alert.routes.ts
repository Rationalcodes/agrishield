import { Router } from 'express';
import {
  getAlerts,
  getAlertById,
  acknowledgeAlert,
  resolveAlert,
  addOperatorNote,
} from '../controllers/alert.controller';

const router = Router();

router.get('/', getAlerts);
router.get('/:id', getAlertById);
router.post('/:id/acknowledge', acknowledgeAlert);
router.post('/:id/resolve', resolveAlert);
router.post('/:id/note', addOperatorNote);

export default router;
