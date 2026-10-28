import { Request, Response, NextFunction } from 'express';
import { aiService, PersonaMode } from '../services/ai.service';

export const queryCopilot = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { prompt, mode = 'agronomic', alertId } = req.body;
    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: { code: 'MISSING_PROMPT', message: 'Field "prompt" is required.' },
      });
    }

    const response = aiService.generateResponse(prompt, mode as PersonaMode, alertId);
    res.json({
      success: true,
      data: response,
      meta: { timestamp: new Date().toISOString() },
    });
  } catch (err) {
    next(err);
  }
};
