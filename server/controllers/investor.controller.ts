import { Request, Response, NextFunction } from 'express';
import { investorService } from '../services/investor.service';

export const getInvestorModel = (req: Request, res: Response, next: NextFunction) => {
  try {
    const inputs = investorService.getInputs();
    const metrics = investorService.computeMetrics(inputs);
    res.json({
      success: true,
      data: { inputs, metrics },
    });
  } catch (err) {
    next(err);
  }
};

export const updateInvestorInputs = (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = investorService.updateInputs(req.body);
    res.json({
      success: true,
      data: result,
      message: 'Unit economics parameters updated successfully.',
    });
  } catch (err) {
    next(err);
  }
};

export const submitBriefingLead = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, firm, role, focusArea, message } = req.body;
    if (!name || !firm) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_INPUT', message: 'Name and Firm are required fields.' },
      });
    }

    const lead = investorService.recordLead({
      name,
      firm,
      role: role || 'Venture Partner',
      focusArea: focusArea || 'OT Security & AI Anomaly Detection',
      message: message || '',
    });

    res.status(201).json({
      success: true,
      data: lead,
      message: 'Briefing request logged successfully with AgriShield Founding Team.',
    });
  } catch (err) {
    next(err);
  }
};

export const getLeads = (req: Request, res: Response, next: NextFunction) => {
  try {
    const leads = investorService.getLeads();
    res.json({
      success: true,
      data: leads,
      meta: { count: leads.length },
    });
  } catch (err) {
    next(err);
  }
};
