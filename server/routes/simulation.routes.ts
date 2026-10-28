import { Router } from 'express';
import {
  getScenarios,
  getScenarioById,
  getScenarioStatus,
  runScenario,
  stepForward,
  stepBackward,
  resetSimulation,
} from '../controllers/simulation.controller';

const router = Router();

router.get('/', getScenarios);
router.get('/status', getScenarioStatus);
router.get('/:id', getScenarioById);
router.post('/:id/run', runScenario);
router.post('/step/forward', stepForward);
router.post('/step/backward', stepBackward);
router.post('/reset', resetSimulation);

export default router;
