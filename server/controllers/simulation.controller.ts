import { Request, Response, NextFunction } from 'express';
import { simulationService } from '../services/simulation.service';
import { ScenarioId } from '../types';

export const getScenarios = (req: Request, res: Response, next: NextFunction) => {
  try {
    const scenarios = simulationService.getScenarios();
    res.json({
      success: true,
      data: scenarios,
    });
  } catch (err) {
    next(err);
  }
};

export const getScenarioById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const scenario = simulationService.getScenarioById(id as ScenarioId);
    if (!scenario) {
      return res.status(404).json({
        success: false,
        error: { code: 'SCENARIO_NOT_FOUND', message: `Scenario ${id} not found.` },
      });
    }
    res.json({
      success: true,
      data: scenario,
    });
  } catch (err) {
    next(err);
  }
};

export const getScenarioStatus = (req: Request, res: Response, next: NextFunction) => {
  try {
    const status = simulationService.getStatus();
    res.json({
      success: true,
      data: status,
    });
  } catch (err) {
    next(err);
  }
};

export const runScenario = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { autoProgress = true } = req.body;
    const result = simulationService.runScenario(id as ScenarioId, autoProgress);
    res.json({
      success: true,
      data: result,
      message: `Scenario ${id} initialized. Anomaly injected into telemetry stream.`,
    });
  } catch (err) {
    next(err);
  }
};

export const stepForward = (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = simulationService.stepForward();
    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const stepBackward = (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = simulationService.stepBackward();
    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const resetSimulation = (req: Request, res: Response, next: NextFunction) => {
  try {
    simulationService.resetSimulation();
    res.json({
      success: true,
      message: 'Simulation state and assets reset to normal operational baseline.',
    });
  } catch (err) {
    next(err);
  }
};
