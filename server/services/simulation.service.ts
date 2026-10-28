import { store } from '../data/store';
import { ThreatScenario, ScenarioId, IncidentAlert } from '../types';
import { telemetryService } from './telemetry.service';

export class SimulationService {
  private activeTimer: NodeJS.Timeout | null = null;

  public getScenarios(): ThreatScenario[] {
    return store.getScenarios();
  }

  public getScenarioById(id: ScenarioId): ThreatScenario | undefined {
    return store.getScenarioById(id);
  }

  public getStatus() {
    return store.getScenarioState();
  }

  public runScenario(id: ScenarioId, autoProgress: boolean = true): {
    scenario: ThreatScenario;
    step: number;
    alertCreated: IncidentAlert;
  } {
    const scenario = store.getScenarioById(id);
    if (!scenario) {
      throw new Error(`Scenario ${id} not found.`);
    }

    if (this.activeTimer) {
      clearTimeout(this.activeTimer);
      this.activeTimer = null;
    }

    // Set initial state
    store.setScenarioState(id, 0, true);

    // Create dynamic alert matching scenario
    const newAlert: IncidentAlert = {
      id: `ALT-SIM-${Date.now()}`,
      alertId: `SEC-SIM-${Math.floor(100 + Math.random() * 900)}`,
      title: scenario.name,
      severity: id === 'B' ? 'critical' : 'high',
      assetId: scenario.targetAssetId,
      assetName: scenario.targetAssetName,
      facility: scenario.facility,
      category: id === 'A' ? 'Sensor Spoofing' : id === 'B' ? 'Operational Logic Breach' : 'Cold-Chain Excursion',
      timestamp: new Date().toISOString(),
      timeAgo: 'Just now',
      status: 'open',
      observedMetric: scenario.suspiciousReading,
      configuredBaseline: scenario.originalReading,
      physicalImpact: scenario.physicalConsequence,
      financialImpact: scenario.financialConsequence,
      whatHappened: scenario.summary,
      whyItMatters: scenario.whyDangerous,
      whatToDoNext: [
        'Engage hardware fail-safe interlock on targeted PLC.',
        'Quarantine packet sequence at Zero-Trust Edge Gateway.',
        'Dispatch field instrumentation engineer for hardware diagnostic.',
      ],
      operatorNotes: [],
      timeline: [
        { time: 'T+0s', event: 'Simulated cyber-physical threat triggered by operator.', type: 'operator' },
        { time: 'T+1.2s', event: `Ingestion engine flagged ${scenario.suspiciousReading}`, type: 'detection' },
      ],
    };

    store.addAlert(newAlert);

    // Update target asset status to critical/warning
    const targetAsset = store.getAssetById(scenario.targetAssetId);
    if (targetAsset) {
      targetAsset.connectionStatus = 'critical';
      targetAsset.currentReading = scenario.suspiciousReading;
      targetAsset.findingsCount += 1;
    }

    // Broadcast through SSE
    telemetryService.broadcastSSE('scenario_start', { scenarioId: id, alert: newAlert });

    if (autoProgress) {
      this.scheduleAutoProgression(id, 1);
    }

    return { scenario, step: 0, alertCreated: newAlert };
  }

  public stepForward(): { scenarioId: ScenarioId | null; currentStep: number } {
    const state = store.getScenarioState();
    if (!state.activeScenario) return { scenarioId: null, currentStep: 0 };

    const nextStep = Math.min(state.scenarioStep + 1, 4);
    store.setScenarioState(state.activeScenario, nextStep, nextStep < 4);
    telemetryService.broadcastSSE('scenario_step', { scenarioId: state.activeScenario, step: nextStep });

    return { scenarioId: state.activeScenario, currentStep: nextStep };
  }

  public stepBackward(): { scenarioId: ScenarioId | null; currentStep: number } {
    const state = store.getScenarioState();
    if (!state.activeScenario) return { scenarioId: null, currentStep: 0 };

    const prevStep = Math.max(state.scenarioStep - 1, 0);
    store.setScenarioState(state.activeScenario, prevStep, true);
    telemetryService.broadcastSSE('scenario_step', { scenarioId: state.activeScenario, step: prevStep });

    return { scenarioId: state.activeScenario, currentStep: prevStep };
  }

  public resetSimulation(): void {
    if (this.activeTimer) {
      clearTimeout(this.activeTimer);
      this.activeTimer = null;
    }
    store.resetToDefaults();
    telemetryService.broadcastSSE('scenario_reset', { message: 'All operational assets reset to calibrated baseline.' });
  }

  private scheduleAutoProgression(id: ScenarioId, step: number): void {
    if (step > 4) {
      store.setScenarioState(id, 4, false);
      telemetryService.broadcastSSE('scenario_complete', { scenarioId: id });
      return;
    }

    this.activeTimer = setTimeout(() => {
      const state = store.getScenarioState();
      if (state.activeScenario === id && state.isScenarioRunning) {
        store.setScenarioState(id, step, step < 4);
        telemetryService.broadcastSSE('scenario_step', { scenarioId: id, step });
        this.scheduleAutoProgression(id, step + 1);
      }
    }, 2800);
  }
}

export const simulationService = new SimulationService();
