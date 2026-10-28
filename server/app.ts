import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ENV } from './config/env';
import { requestLogger } from './middleware/requestLogger';
import { errorHandler, AppError } from './middleware/errorHandler';
import apiRouter from './routes';

export const createApp = (): Application => {
  const app = express();

  // Security & Cross-Origin
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, or server-to-server)
        if (!origin) return callback(null, true);
        callback(null, true);
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    })
  );

  // Body parsers
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // Custom structured request logger
  app.use(requestLogger);

  // Root welcome / discovery route
  app.get('/', (req: Request, res: Response) => {
    res.json({
      name: 'AgriShield OT Cyber-Physical Defense Backend',
      version: '1.0.0-mvp',
      status: 'online',
      description: 'Industrial control & telemetry cybersecurity platform for Indian agriculture & critical food chains.',
      endpoints: {
        health: '/api/health',
        telemetryHistory: '/api/telemetry/history',
        telemetryMessages: '/api/telemetry/messages',
        telemetryStreamSSE: '/api/telemetry/stream',
        assets: '/api/assets',
        purdueModel: '/api/assets/purdue-model',
        alerts: '/api/alerts',
        scenarios: '/api/simulation',
        aiCopilot: '/api/assistant/query',
        riskRegister: '/api/risk',
        investorModel: '/api/investor/model',
      },
      documentation: 'Compliant with BIS IS/ISO/IEC 62443 and CERT-In Cyber Security Directions',
    });
  });

  // Mount API router
  app.use(ENV.API_PREFIX, apiRouter);

  // 404 handler for undefined API routes
  app.use((req: Request, res: Response, next) => {
    next(new AppError(`Route ${req.method} ${req.originalUrl} not found on this server.`, 404, 'NOT_FOUND'));
  });

  // Centralized Error Handler
  app.use(errorHandler);

  return app;
};
