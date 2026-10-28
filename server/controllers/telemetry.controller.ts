import { Request, Response, NextFunction } from 'express';
import { telemetryService } from '../services/telemetry.service';

export const getTelemetryHistory = (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = parseInt(req.query.limit as string, 10) || 30;
    const history = telemetryService.getHistory(limit);
    res.json({
      success: true,
      data: history,
      meta: { timestamp: new Date().toISOString(), count: history.length },
    });
  } catch (err) {
    next(err);
  }
};

export const getRecentMessages = (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = parseInt(req.query.limit as string, 10) || 20;
    const messages = telemetryService.getRecentMessages(limit);
    res.json({
      success: true,
      data: messages,
      meta: { timestamp: new Date().toISOString(), count: messages.length },
    });
  } catch (err) {
    next(err);
  }
};

export const ingestTelemetryReading = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { point, signature, assetId } = req.body;
    if (!point) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_PAYLOAD', message: 'Field "point" object is required.' },
      });
    }

    const result = telemetryService.ingestTelemetry(point, signature, assetId);
    res.status(201).json({
      success: true,
      data: result,
      meta: { timestamp: new Date().toISOString() },
    });
  } catch (err) {
    next(err);
  }
};

export const streamTelemetrySSE = (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  telemetryService.addSseClient(res);
};
