import { Router } from 'express';
import {
  getAssets,
  getAssetById,
  getPurdueModelDistribution,
  toggleInterlock,
  runPostureScan,
} from '../controllers/asset.controller';

const router = Router();

router.get('/', getAssets);
router.get('/purdue-model', getPurdueModelDistribution);
router.get('/:id', getAssetById);
router.post('/:id/interlock', toggleInterlock);
router.post('/scan', runPostureScan);

export default router;
