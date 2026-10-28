import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3001', 10),
  HOST: process.env.HOST || '0.0.0.0',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
  API_PREFIX: '/api',
  SIMULATION_INTERVAL_MS: parseInt(process.env.SIMULATION_INTERVAL_MS || '3500', 10),
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};
