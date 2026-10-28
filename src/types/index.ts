export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type AssetStatus = 'online' | 'warning' | 'critical' | 'offline';
export type FacilityType = 'Smart Farm' | 'Cold Storage' | 'Bio-Power Facility' | 'SCADA Operations';
export type AlertStatus = 'open' | 'investigating' | 'resolved';

export interface Asset {
  id: string;
  name: string;
  category: 'Soil Sensor' | 'Irrigation PLC' | 'Refrigeration Unit' | 'Bio-Power Digester' | 'Industrial Gateway' | 'Weather Station' | 'SCADA Server';
  facility: FacilityType;
  location: string;
  vendor: string;
  model: string;
  firmwareVersion: string;
  networkZone: 'Zone 1 (Field Sensors)' | 'Zone 2 (Control LAN)' | 'Zone 3 (Plant Network)' | 'Zone 4 (Enterprise DMZ)';
  protocol: 'Modbus TCP' | 'MQTT / TLS' | 'LoRaWAN' | 'OPC UA' | 'PROFINET';
  connectionStatus: AssetStatus;
  authCapability: 'Ed25519 Signed' | 'HMAC-SHA256' | 'TLS 1.3 PSK' | 'Unsigned / Legacy';
  authStatus: 'verified' | 'unverified' | 'failing';
  currentReading: string;
  baseline: string;
  safeEnvelopeMin?: number;
  safeEnvelopeMax?: number;
  riskScore: number; // 0 - 100
  lastReported: string;
  findingsCount: number;
  description: string;
}

export interface TelemetryPoint {
  timestamp: string;
  timeLabel: string;
  soilMoisture: number; // % VWC
  soilMoistureBaseline: number;
  soilMoistureMin?: number;
  soilMoistureMax?: number;
  temperature: number; // °C
  tempThresholdMax: number;
  tempSafeMin?: number;
  tempSafeMax?: number;
  humidity: number; // %
  irrigationFlow: number; // L/min
  irrigationLimit: number;
  irrigationSafeMax?: number;
  digesterPressure: number; // Bar
  isAnomaly?: boolean;
}

export interface TelemetryMessage {
  id: string;
  assetId: string;
  timestamp: string;
  sequence: number;
  payload: Record<string, any>;
  signature: string;
  signatureValid: boolean;
  validationStatus: 'verified' | 'signature_mismatch' | 'threshold_breach' | 'logic_violation';
  details: string;
}

export interface IncidentAlert {
  id: string;
  alertId: string;
  title: string;
  severity: RiskLevel;
  assetId: string;
  assetName: string;
  facility: FacilityType;
  category: 'Sensor Spoofing' | 'Signature Failure' | 'Operational Logic Breach' | 'Cold-Chain Excursion' | 'Unsegmented Traffic';
  timestamp: string;
  timeAgo: string;
  status: AlertStatus;
  observedMetric: string;
  configuredBaseline: string;
  physicalImpact: string;
  financialImpact?: string;
  whatHappened: string;
  whyItMatters: string;
  whatToDoNext: string[];
  operatorNotes: string[];
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  resolvedAt?: string;
  timeline: {
    time: string;
    event: string;
    type: 'telemetry' | 'system' | 'detection' | 'operator';
  }[];
}

export interface RiskRegisterItem {
  id: string;
  title: string;
  assetId: string;
  facility: FacilityType;
  severity: RiskLevel;
  likelihood: 'Low' | 'Medium' | 'High';
  impact: 'Low' | 'Moderate' | 'Severe' | 'Catastrophic';
  score: number;
  evidence: string;
  potentialConsequence: string;
  remediationStatus: 'Not Started' | 'In Progress' | 'Remediated';
  recommendation: string;
}

export type ScenarioId = 'A' | 'B' | 'C' | 'D';

export interface ThreatScenario {
  id: ScenarioId;
  name: string;
  category: string;
  targetAssetId: string;
  targetAssetName: string;
  facility: FacilityType;
  difficulty: string;
  summary: string;
  setup: string;
  originalReading: string;
  suspiciousReading: string;
  whyDangerous: string;
  howDetected: string;
  actionTaken: string;
  physicalConsequence: string;
  financialConsequence: string;
  storyStages: {
    stage: 'Normal Operation' | 'Suspicious Activity' | 'AgriShield Detection' | 'Risk Prevention' | 'Recommended Response';
    title: string;
    description: string;
    telemetryDisplay: string;
    durationMs: number;
  }[];
}

export interface InvestorCalculatorInputs {
  payingCustomers: number;
  annualContractValue: number; // ACV in INR (₹)
  monitoredDevicesPerCustomer: number;
  assessmentFee: number; // INR (₹) per assessment
  annualOperatingExpenses: number; // Annual OpEx in INR (₹)
  tamBillion: number; // TAM in INR Crores
  samBillion: number; // SAM in INR Crores
  somMillion: number; // SOM in INR Crores
}

export interface ToastNotification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  timestamp: string;
}
