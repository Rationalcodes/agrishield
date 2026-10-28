import { Router } from 'express';
import { getRiskRegister, getComplianceStandards } from '../controllers/risk.controller';

const router = Router();

router.get('/', getRiskRegister);
router.get('/standards', getComplianceStandards);

export default router;
