import { Router } from 'express';
import {
  getInvestorModel,
  updateInvestorInputs,
  submitBriefingLead,
  getLeads,
} from '../controllers/investor.controller';

const router = Router();

router.get('/model', getInvestorModel);
router.post('/model', updateInvestorInputs);
router.post('/leads', submitBriefingLead);
router.get('/leads', getLeads);

export default router;
