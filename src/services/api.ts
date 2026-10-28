import {
  Asset,
  IncidentAlert,
  TelemetryPoint,
  TelemetryMessage,
  ThreatScenario,
  InvestorCalculatorInputs,
  ScenarioId,
} from '../types';

const API_BASE = '/api';

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.error?.message || `HTTP ${res.status}: ${res.statusText}`);
  }

  const json = await res.json();
  return json.data as T;
}

export const api = {
  // --- Health & Posture ---
  async getHealth() {
    return request<any>('/health');
  },

  // --- Telemetry ---
  async getTelemetryHistory(limit: number = 30): Promise<TelemetryPoint[]> {
    return request<TelemetryPoint[]>(`/telemetry/history?limit=${limit}`);
  },

  async getRecentMessages(limit: number = 20): Promise<TelemetryMessage[]> {
    return request<TelemetryMessage[]>(`/telemetry/messages?limit=${limit}`);
  },

  async ingestTelemetry(point: Partial<TelemetryPoint>, signature?: string, assetId?: string) {
    return request<{ point: TelemetryPoint; verification: any; anomalyDetected: boolean }>('/telemetry/ingest', {
      method: 'POST',
      body: JSON.stringify({ point, signature, assetId }),
    });
  },

  // --- Assets ---
  async getAssets(): Promise<Asset[]> {
    return request<Asset[]>('/assets');
  },

  async runPostureAudit() {
    return request<{
      scannedCount: number;
      anomaliesFound: number;
      auditTimestamp: string;
      standardsEvaluated: string[];
    }>('/assets/scan', { method: 'POST' });
  },

  async toggleInterlock(assetId: string, state: boolean) {
    return request<{ assetId: string; interlockActive: boolean }>(`/assets/${assetId}/interlock`, {
      method: 'POST',
      body: JSON.stringify({ state }),
    });
  },

  // --- Alerts ---
  async getAlerts(): Promise<IncidentAlert[]> {
    return request<IncidentAlert[]>('/alerts');
  },

  async acknowledgeAlert(alertId: string, operatorName: string = 'SecOps Operator') {
    return request<IncidentAlert>(`/alerts/${alertId}/acknowledge`, {
      method: 'POST',
      body: JSON.stringify({ operatorName }),
    });
  },

  async resolveAlert(alertId: string, note?: string) {
    return request<IncidentAlert>(`/alerts/${alertId}/resolve`, {
      method: 'POST',
      body: JSON.stringify({ note }),
    });
  },

  async addOperatorNote(alertId: string, note: string, author: string = 'Operator') {
    return request<IncidentAlert>(`/alerts/${alertId}/note`, {
      method: 'POST',
      body: JSON.stringify({ note, author }),
    });
  },

  // --- Threat Simulation ---
  async getScenarios(): Promise<ThreatScenario[]> {
    return request<ThreatScenario[]>('/simulation');
  },

  async runScenario(id: ScenarioId, autoProgress: boolean = true) {
    return request<{ scenario: ThreatScenario; step: number; alertCreated: IncidentAlert }>(`/simulation/${id}/run`, {
      method: 'POST',
      body: JSON.stringify({ autoProgress }),
    });
  },

  async stepForward() {
    return request<{ scenarioId: ScenarioId | null; currentStep: number }>('/simulation/step/forward', {
      method: 'POST',
    });
  },

  async stepBackward() {
    return request<{ scenarioId: ScenarioId | null; currentStep: number }>('/simulation/step/backward', {
      method: 'POST',
    });
  },

  async resetSimulation() {
    return request<{ message: string }>('/simulation/reset', {
      method: 'POST',
    });
  },

  // --- AI Copilot ---
  async queryAiCopilot(prompt: string, mode: 'forensic' | 'plc' | 'agronomic' = 'agronomic', alertId?: string) {
    return request<{
      answer: string;
      evidenceItems: { label: string; value: string }[];
      recommendedSteps: string[];
      persona: string;
    }>('/assistant/query', {
      method: 'POST',
      body: JSON.stringify({ prompt, mode, alertId }),
    });
  },

  // --- Investor ---
  async getInvestorModel() {
    return request<{ inputs: InvestorCalculatorInputs; metrics: any }>('/investor/model');
  },

  async updateInvestorInputs(inputs: Partial<InvestorCalculatorInputs>) {
    return request<{ inputs: InvestorCalculatorInputs; metrics: any }>('/investor/model', {
      method: 'POST',
      body: JSON.stringify(inputs),
    });
  },

  async submitInvestorLead(lead: {
    name: string;
    firm: string;
    role: string;
    focusArea: string;
    message: string;
  }) {
    return request<any>('/investor/leads', {
      method: 'POST',
      body: JSON.stringify(lead),
    });
  },

  // --- Live SSE Stream ---
  connectTelemetrySSE(onTick: (point: TelemetryPoint) => void, onScenarioEvent?: (event: string, data: any) => void) {
    try {
      const eventSource = new EventSource(`${API_BASE}/telemetry/stream`);

      eventSource.addEventListener('tick', (e) => {
        try {
          const point = JSON.parse(e.data);
          onTick(point);
        } catch {}
      });

      if (onScenarioEvent) {
        eventSource.addEventListener('scenario_step', (e) => {
          try {
            onScenarioEvent('scenario_step', JSON.parse(e.data));
          } catch {}
        });
        eventSource.addEventListener('scenario_start', (e) => {
          try {
            onScenarioEvent('scenario_start', JSON.parse(e.data));
          } catch {}
        });
        eventSource.addEventListener('scenario_reset', (e) => {
          try {
            onScenarioEvent('scenario_reset', JSON.parse(e.data));
          } catch {}
        });
      }

      return eventSource;
    } catch {
      return null;
    }
  },
};
