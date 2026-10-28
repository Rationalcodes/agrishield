import { Request, Response } from 'express';
import { store } from '../data/store';
import { telemetryService } from '../services/telemetry.service';

export const getHealth = (req: Request, res: Response) => {
  const stats = store.getStats();
  const memory = process.memoryUsage();

  res.json({
    success: true,
    data: {
      status: 'operational',
      service: 'AgriShield OT Cyber-Physical Security Engine',
      version: '1.0.0-mvp',
      environment: process.env.NODE_ENV || 'development',
      region: 'India (Asia-South1 / Pune Edge Demarcation)',
      standardsCompliance: {
        bisIEC62443: 'SL-2 Enforced',
        certInMandate: 'Active (NTP Synced via NPL-India)',
        fssaiColdChain: 'Continuous Temperature Traceability Active',
      },
      stats,
      connectedSseClients: telemetryService.getConnectedClientsCount(),
      system: {
        nodeVersion: process.version,
        platform: process.platform,
        memoryUsageMb: {
          rss: Math.round(memory.rss / (1024 * 1024)),
          heapUsed: Math.round(memory.heapUsed / (1024 * 1024)),
          heapTotal: Math.round(memory.heapTotal / (1024 * 1024)),
        },
      },
    },
    meta: {
      timestamp: new Date().toISOString(),
      istTime: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    },
  });
};
