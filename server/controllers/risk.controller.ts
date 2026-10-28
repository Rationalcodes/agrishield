import { Request, Response, NextFunction } from 'express';
import { store } from '../data/store';
import { INDIAN_REGULATORY_STANDARDS } from '../config/constants';

export const getRiskRegister = (req: Request, res: Response, next: NextFunction) => {
  try {
    const riskRegister = store.getRiskRegister();
    res.json({
      success: true,
      data: riskRegister,
      meta: { total: riskRegister.length },
    });
  } catch (err) {
    next(err);
  }
};

export const getComplianceStandards = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({
      success: true,
      data: INDIAN_REGULATORY_STANDARDS,
    });
  } catch (err) {
    next(err);
  }
};
