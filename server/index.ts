import http from 'node:http';
import { createApp } from './app';
import { ENV } from './config/env';
import { telemetryService } from './services/telemetry.service';

const app = createApp();
const server = http.createServer(app);

server.listen(ENV.PORT, ENV.HOST, () => {
  console.log(`\n======================================================`);
  console.log(`🛡️  AGRISHIELD ENTERPRISE OT DEFENSE BACKEND [MVP]`);
  console.log(`======================================================`);
  console.log(`🟢 Status: Active & Operational`);
  console.log(`🌐 Server URL: http://localhost:${ENV.PORT}`);
  console.log(`📡 API Base:   http://localhost:${ENV.PORT}${ENV.API_PREFIX}`);
  console.log(`🏥 Health:     http://localhost:${ENV.PORT}${ENV.API_PREFIX}/health`);
  console.log(`⚡ SSE Feed:   http://localhost:${ENV.PORT}${ENV.API_PREFIX}/telemetry/stream`);
  console.log(`🇮🇳 Market:     India (Nashik, Sonipat, Baramati)`);
  console.log(`📋 Standards:  BIS IS/IEC 62443 (SL-2) | CERT-In NTP Synced`);
  console.log(`======================================================\n`);
});

// Graceful Shutdown
const handleShutdown = (signal: string) => {
  console.log(`\n[${signal}] Initiating graceful shutdown of AgriShield Edge Server...`);
  telemetryService.destroy();

  server.close(() => {
    console.log('✅ HTTP server closed. All pending connections terminated.');
    process.exit(0);
  });

  // Force close if graceful shutdown hangs
  setTimeout(() => {
    console.error('⚠️ Forcefully terminating after timeout.');
    process.exit(1);
  }, 5000);
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));
