import { Request, Response, NextFunction } from 'express';
import { alertService } from '../services/alert.service';
import { AlertStatus, FacilityType, RiskLevel } from '../types';

export const getAlerts = (req: Request, res: Response, next: NextFunction) => {
  try {
    const status = req.query.status as AlertStatus;
    const facility = req.query.facility as FacilityType | 'All';
    const severity = req.query.severity as RiskLevel;

    const alerts = alertService.getAllAlerts({ status, facility, severity });
    res.json({
      success: true,
      data: alerts,
      meta: { timestamp: new Date().toISOString(), total: alerts.length },
    });
  } catch (err) {
    next(err);
  }
};

export const getAlertById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const alert = alertService.getAlertById(id);
    if (!alert) {
      return res.status(404).json({
        success: false,
        error: { code: 'ALERT_NOT_FOUND', message: `Alert with ID "${id}" was not found.` },
      });
    }
    res.json({
      success: true,
      data: alert,
    });
  } catch (err) {
    next(err);
  }
};

export const acknowledgeAlert = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { operatorName } = req.body;
    const updated = alertService.acknowledgeAlert(id, operatorName);
    if (!updated) {
      return res.status(404).json({
        success: false,
        error: { code: 'ALERT_NOT_FOUND', message: `Alert with ID "${id}" was not found.` },
      });
    }
    res.json({
      success: true,
      data: updated,
      message: 'Alert acknowledged and moved to triage state.',
    });
  } catch (err) {
    next(err);
  }
};

export const resolveAlert = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { note } = req.body;
    const updated = alertService.resolveAlert(id, note);
    if (!updated) {
      return res.status(404).json({
        success: false,
        error: { code: 'ALERT_NOT_FOUND', message: `Alert with ID "${id}" was not found.` },
      });
    }
    res.json({
      success: true,
      data: updated,
      message: 'Alert resolved and physical interlock restored.',
    });
  } catch (err) {
    next(err);
  }
};

export const addOperatorNote = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { note, author } = req.body;
    if (!note) {
      return res.status(400).json({
        success: false,
        error: { code: 'MISSING_NOTE', message: 'Note text is required.' },
      });
    }
    const updated = alertService.addOperatorNote(id, note, author);
    if (!updated) {
      return res.status(404).json({
        success: false,
        error: { code: 'ALERT_NOT_FOUND', message: `Alert with ID "${id}" was not found.` },
      });
    }
    res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};
