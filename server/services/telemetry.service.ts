import { Response } from 'express';
import { store } from '../data/store';
import { TelemetryPoint, TelemetryMessage } from '../types';
import { cryptoService } from './crypto.service';

export class TelemetryService {
  private sseClients: Set<Response> = new Set();
  private streamInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.startStreamingSimulation();
  }

  public getHistory(limit: number = 30): TelemetryPoint[] {
    return store.getTelemetry(limit);
  }

  public getRecentMessages(limit: number = 20): TelemetryMessage[] {
    return store.getRecentMessages(limit);
  }

  /**
   * Ingest a single telemetry reading from an edge device
   */
  public ingestTelemetry(pointData: Partial<TelemetryPoint>, signature?: string, assetId?: string): {
    point: TelemetryPoint;
    verification: any;
    anomalyDetected: boolean;
  } {
    const last = store.getTelemetry(1)[0] || {
      soilMoisture: 31.2,
      soilMoistureBaseline: 30.0,
      temperature: -18.4,
      tempThresholdMax: -12.0,
      humidity: 58.0,
      irrigationFlow: 380,
      irrigationLimit: 450,
      digesterPressure: 1.24,
    };

    const now = new Date();
    const timeLabel = now.toTimeString().split(' ')[0];

    const newPoint: TelemetryPoint = {
      timestamp: now.toISOString(),
      timeLabel,
      soilMoisture: pointData.soilMoisture ?? last.soilMoisture,
      soilMoistureBaseline: 30.0,
      soilMoistureMin: 26.0,
      soilMoistureMax: 35.0,
      temperature: pointData.temperature ?? last.temperature,
      tempThresholdMax: -12.0,
      tempSafeMin: -24.0,
      tempSafeMax: -15.0,
      humidity: pointData.humidity ?? last.humidity,
      irrigationFlow: pointData.irrigationFlow ?? last.irrigationFlow,
      irrigationLimit: 450,
      irrigationSafeMax: 450,
      digesterPressure: pointData.digesterPressure ?? last.digesterPressure,
      isAnomaly: pointData.isAnomaly ?? false,
    };

    // Anomaly checks
    let anomalyDetected = false;
    if (newPoint.soilMoisture < 20 || newPoint.soilMoisture > 45) anomalyDetected = true;
    if (newPoint.temperature > -12) anomalyDetected = true;
    if (newPoint.irrigationFlow > 450) anomalyDetected = true;
    if (newPoint.digesterPressure > 1.8) anomalyDetected = true;
    newPoint.isAnomaly = anomalyDetected;

    store.addTelemetryPoint(newPoint);

    // Cryptographic verification if signature supplied
    let verification: any = { valid: true };
    if (signature && assetId) {
      verification = cryptoService.verifyTelemetryPacket(
        assetId,
        {
          soilMoisture: newPoint.soilMoisture,
          temperature: newPoint.temperature,
          irrigationFlow: newPoint.irrigationFlow,
        },
        signature,
        'Ed25519 Signed'
      );

      const msg: TelemetryMessage = {
        id: `MSG-${Math.floor(10000 + Math.random() * 90000)}`,
        assetId,
        timestamp: 'Just now',
        sequence: Math.floor(1000 + Math.random() * 90000),
        payload: {
          soilMoisture: newPoint.soilMoisture,
          temperature: newPoint.temperature,
          irrigationFlow: newPoint.irrigationFlow,
        },
        signature,
        signatureValid: verification.valid,
        validationStatus: verification.valid ? 'verified' : 'signature_mismatch',
        details: verification.reason || 'Telemetry processed by Ingestion Engine',
      };
      store.addMessage(msg);
    }

    // Broadcast to SSE clients
    this.broadcastSSE('telemetry', newPoint);

    return { point: newPoint, verification, anomalyDetected };
  }

  /**
   * Register an SSE client for real-time telemetry streaming
   */
  public addSseClient(res: Response): void {
    this.sseClients.add(res);

    // Initial snapshot
    res.write(`data: ${JSON.stringify({ type: 'snapshot', history: store.getTelemetry(15) })}\n\n`);

    res.on('close', () => {
      this.sseClients.delete(res);
    });
  }

  public getConnectedClientsCount(): number {
    return this.sseClients.size;
  }

  /**
   * Broadcast payload to all connected SSE clients
   */
  public broadcastSSE(event: string, data: any): void {
    const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
    for (const client of this.sseClients) {
      try {
        client.write(payload);
      } catch (err) {
        this.sseClients.delete(client);
      }
    }
  }

  /**
   * Background simulated tick generator
   */
  private startStreamingSimulation(): void {
    this.streamInterval = setInterval(() => {
      if (this.sseClients.size === 0) return;

      const last = store.getTelemetry(1)[0];
      if (!last) return;

      const randomJitter = (val: number, range: number) => {
        return parseFloat((val + (Math.random() * range * 2 - range)).toFixed(1));
      };

      const now = new Date();
      const point: TelemetryPoint = {
        timestamp: now.toISOString(),
        timeLabel: now.toTimeString().split(' ')[0],
        soilMoisture: randomJitter(last.soilMoisture || 31.2, 0.2),
        soilMoistureBaseline: 30.0,
        soilMoistureMin: 26.0,
        soilMoistureMax: 35.0,
        temperature: randomJitter(last.temperature || -18.4, 0.15),
        tempThresholdMax: -12.0,
        tempSafeMin: -24.0,
        tempSafeMax: -15.0,
        humidity: randomJitter(last.humidity || 58.0, 0.5),
        irrigationFlow: Math.floor(randomJitter(last.irrigationFlow || 380, 5)),
        irrigationLimit: 450,
        irrigationSafeMax: 450,
        digesterPressure: randomJitter(last.digesterPressure || 1.24, 0.02),
        isAnomaly: false,
      };

      store.addTelemetryPoint(point);
      this.broadcastSSE('tick', point);
    }, 4000);
  }

  public destroy(): void {
    if (this.streamInterval) {
      clearInterval(this.streamInterval);
    }
    for (const client of this.sseClients) {
      client.end();
    }
    this.sseClients.clear();
  }
}

export const telemetryService = new TelemetryService();
