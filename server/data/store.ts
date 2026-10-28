import {
  Asset,
  IncidentAlert,
  RiskRegisterItem,
  TelemetryPoint,
  ThreatScenario,
  TelemetryMessage,
  InvestorCalculatorInputs,
  InvestorBriefingLead,
  ScenarioId,
} from '../types';
import {
  INITIAL_ASSETS,
  INITIAL_TELEMETRY,
  INITIAL_ALERTS,
  THREAT_SCENARIOS,
  INITIAL_RISK_REGISTER,
  DEFAULT_INVESTOR_INPUTS,
} from './seedData';

class InMemoryStore {
  private assets: Asset[] = [];
  private alerts: IncidentAlert[] = [];
  private telemetry: TelemetryPoint[] = [];
  private riskRegister: RiskRegisterItem[] = [];
  private scenarios: ThreatScenario[] = [];
  private recentMessages: TelemetryMessage[] = [];
  private interlocks: Record<string, boolean> = {};
  private investorInputs: InvestorCalculatorInputs = { ...DEFAULT_INVESTOR_INPUTS };
  private investorLeads: InvestorBriefingLead[] = [];
  private activeScenario: ScenarioId | null = null;
  private scenarioStep: number = 0;
  private isScenarioRunning: boolean = false;
  private startTime: number = Date.now();

  constructor() {
    this.resetToDefaults();
  }

  public resetToDefaults(): void {
    this.assets = JSON.parse(JSON.stringify(INITIAL_ASSETS));
    this.alerts = JSON.parse(JSON.stringify(INITIAL_ALERTS));
    this.telemetry = JSON.parse(JSON.stringify(INITIAL_TELEMETRY));
    this.riskRegister = JSON.parse(JSON.stringify(INITIAL_RISK_REGISTER));
    this.scenarios = JSON.parse(JSON.stringify(THREAT_SCENARIOS));
    this.interlocks = {};
    this.investorInputs = { ...DEFAULT_INVESTOR_INPUTS };
    this.activeScenario = null;
    this.scenarioStep = 0;
    this.isScenarioRunning = false;

    this.recentMessages = [
      {
        id: 'MSG-98214',
        assetId: 'FARM-SENSOR-001',
        timestamp: 'Just now',
        sequence: 14920,
        payload: { vwc: 31.2, soil_temp: 18.4, battery_mv: 3580 },
        signature: '0x94f83b2184e03d44bcde784e1b8492048f041',
        signatureValid: true,
        validationStatus: 'verified',
        details: 'Ed25519 Hardware Signature verified via Secure Element Key ID #04.'
      },
      {
        id: 'MSG-98213',
        assetId: 'COLDSTORE-TEMP-001',
        timestamp: '14s ago',
        sequence: 8402,
        payload: { chamber_temp: -18.4, setpoint: -19.0, compressor_kw: 8.4 },
        signature: '0x2e11d9a56291a89c7482fce09831a31b402',
        signatureValid: true,
        validationStatus: 'verified',
        details: 'HMAC-SHA256 verified against enrolled Sonipat Gateway Secret.'
      },
      {
        id: 'MSG-98212',
        assetId: 'BIOPOWER-GATEWAY-001',
        timestamp: '28s ago',
        sequence: 4421,
        payload: { ch4_pressure_bar: 1.24, jacket_temp_c: 38.2 },
        signature: '0x88c4b104928fe8c04918e90a421bca90821',
        signatureValid: true,
        validationStatus: 'verified',
        details: 'Ed25519 signature valid. Process parameters within acceptable baseline.'
      }
    ];
  }

  // --- Assets ---
  public getAssets(): Asset[] {
    return this.assets;
  }

  public getAssetById(id: string): Asset | undefined {
    return this.assets.find((a) => a.id === id);
  }

  public updateAsset(id: string, updates: Partial<Asset>): Asset | undefined {
    const asset = this.getAssetById(id);
    if (!asset) return undefined;
    Object.assign(asset, updates);
    return asset;
  }

  // --- Telemetry ---
  public getTelemetry(limit: number = 30): TelemetryPoint[] {
    return this.telemetry.slice(-limit);
  }

  public addTelemetryPoint(point: TelemetryPoint): void {
    this.telemetry.push(point);
    if (this.telemetry.length > 200) {
      this.telemetry.shift();
    }
  }

  public getRecentMessages(limit: number = 20): TelemetryMessage[] {
    return this.recentMessages.slice(0, limit);
  }

  public addMessage(msg: TelemetryMessage): void {
    this.recentMessages.unshift(msg);
    if (this.recentMessages.length > 50) {
      this.recentMessages.pop();
    }
  }

  // --- Alerts ---
  public getAlerts(): IncidentAlert[] {
    return this.alerts;
  }

  public getAlertById(id: string): IncidentAlert | undefined {
    return this.alerts.find((a) => a.id === id || a.alertId === id);
  }

  public addAlert(alert: IncidentAlert): void {
    this.alerts.unshift(alert);
  }

  public updateAlert(id: string, updates: Partial<IncidentAlert>): IncidentAlert | undefined {
    const alert = this.getAlertById(id);
    if (!alert) return undefined;
    Object.assign(alert, updates);
    return alert;
  }

  // --- Risk Register ---
  public getRiskRegister(): RiskRegisterItem[] {
    return this.riskRegister;
  }

  // --- Scenarios ---
  public getScenarios(): ThreatScenario[] {
    return this.scenarios;
  }

  public getScenarioById(id: ScenarioId): ThreatScenario | undefined {
    return this.scenarios.find((s) => s.id === id);
  }

  public getScenarioState() {
    return {
      activeScenario: this.activeScenario,
      scenarioStep: this.scenarioStep,
      isScenarioRunning: this.isScenarioRunning,
    };
  }

  public setScenarioState(activeScenario: ScenarioId | null, step: number, running: boolean) {
    this.activeScenario = activeScenario;
    this.scenarioStep = step;
    this.isScenarioRunning = running;
  }

  // --- Interlocks ---
  public getInterlocks(): Record<string, boolean> {
    return this.interlocks;
  }

  public setInterlock(assetId: string, state: boolean): void {
    this.interlocks[assetId] = state;
  }

  // --- Investor Model ---
  public getInvestorInputs(): InvestorCalculatorInputs {
    return this.investorInputs;
  }

  public updateInvestorInputs(inputs: Partial<InvestorCalculatorInputs>): InvestorCalculatorInputs {
    this.investorInputs = { ...this.investorInputs, ...inputs };
    return this.investorInputs;
  }

  public addInvestorLead(lead: Omit<InvestorBriefingLead, 'id' | 'createdAt'>): InvestorBriefingLead {
    const newLead: InvestorBriefingLead = {
      id: `lead-${Date.now()}`,
      ...lead,
      createdAt: new Date().toISOString(),
    };
    this.investorLeads.push(newLead);
    return newLead;
  }

  public getInvestorLeads(): InvestorBriefingLead[] {
    return this.investorLeads;
  }

  // --- Stats & Health ---
  public getStats() {
    const uptimeSec = Math.floor((Date.now() - this.startTime) / 1000);
    const monitoredAssets = this.assets.length;
    const healthyDevices = this.assets.filter((a) => a.connectionStatus === 'online' && a.authStatus === 'verified').length;
    const openAlerts = this.alerts.filter((a) => a.status === 'open').length;
    const investigatingAlerts = this.alerts.filter((a) => a.status === 'investigating').length;
    const resolvedAlerts = this.alerts.filter((a) => a.status === 'resolved').length;
    const failingAuth = this.assets.filter((a) => a.authStatus === 'failing').length;

    return {
      uptimeSec,
      monitoredAssets,
      healthyDevices,
      openAlerts,
      investigatingAlerts,
      resolvedAlerts,
      failingAuth,
      totalRiskItems: this.riskRegister.length,
    };
  }
}

export const store = new InMemoryStore();
