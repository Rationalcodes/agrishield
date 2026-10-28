import { Router } from 'express';
import telemetryRoutes from './telemetry.routes';
import alertRoutes from './alert.routes';
import assetRoutes from './asset.routes';
import simulationRoutes from './simulation.routes';
import aiRoutes from './ai.routes';
import riskRoutes from './risk.routes';
import investorRoutes from './investor.routes';
import healthRoutes from './health.routes';

const apiRouter = Router();

apiRouter.use('/telemetry', telemetryRoutes);
apiRouter.use('/alerts', alertRoutes);
apiRouter.use('/assets', assetRoutes);
apiRouter.use('/simulation', simulationRoutes);
apiRouter.use('/assistant', aiRoutes);
apiRouter.use('/risk', riskRoutes);
apiRouter.use('/investor', investorRoutes);
apiRouter.use('/health', healthRoutes);

export default apiRouter;
