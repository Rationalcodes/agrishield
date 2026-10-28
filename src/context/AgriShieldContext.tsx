import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import {
  Asset,
  IncidentAlert,
  RiskRegisterItem,
  TelemetryPoint,
  TelemetryMessage,
  ThreatScenario,
  ScenarioId,
  InvestorCalculatorInputs,
  ToastNotification,
  FacilityType,
} from '../types';
import {
  INITIAL_ASSETS,
  INITIAL_TELEMETRY,
  INITIAL_ALERTS,
  THREAT_SCENARIOS,
  INITIAL_RISK_REGISTER,
  DEFAULT_INVESTOR_INPUTS,
} from '../data/initialData';
import { api } from '../services/api';

export type NavigationTab =
  | 'landing'
  | 'dashboard'
  | 'simulator'
  | 'telemetry'
  | 'assets'
  | 'assessment'
  | 'assistant'
  | 'investor';

interface FundingAllocation {
  engineering: number;
  testing: number;
  iotIntegrations: number;
  pilotDeployments: number;
  salesMarketing: number;
  compliance: number;
}

interface AgriShieldContextType {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  timeRange: '1H' | '6H' | '24H' | '7D';
  setTimeRange: (range: '1H' | '6H' | '24H' | '7D') => void;
  toasts: ToastNotification[];
  addToast: (message: string, type?: 'info' | 'success' | 'warning' | 'danger') => void;
  removeToast: (id: string) => void;
  assets: Asset[];
  telemetry: TelemetryPoint[];
  alerts: IncidentAlert[];
  riskRegister: RiskRegisterItem[];
  scenarios: ThreatScenario[];
  selectedAlert: IncidentAlert | null;
  setSelectedAlert: (alert: IncidentAlert | null) => void;
  selectedAsset: Asset | null;
  setSelectedAsset: (asset: Asset | null) => void;
  investorModalOpen: boolean;
  setInvestorModalOpen: (open: boolean) => void;
  activeScenario: ScenarioId | null;
  scenarioStep: number;
  isScenarioRunning: boolean;
  runScenario: (scenarioId: ScenarioId) => void;
  resetScenario: () => void;
  isLiveSimulation: boolean;
  setIsLiveSimulation: (live: boolean) => void;
  simulationSpeed: number; // in ms
  setSimulationSpeed: (speed: number) => void;
  recentMessages: TelemetryMessage[];
  investorInputs: InvestorCalculatorInputs;
  updateInvestorInputs: (inputs: Partial<InvestorCalculatorInputs>) => void;
  fundingAllocation: FundingAllocation;
  updateFundingAllocation: (key: keyof FundingAllocation, value: number) => void;
  selectedFacility: FacilityType | 'All';
  setSelectedFacility: (facility: FacilityType | 'All') => void;
  interlocks: Record<string, boolean>;
  engageInterlock: (assetId: string) => void;
  isScanningAssets: boolean;
  scanProgress: number;
  runAssetScan: () => void;
  isExportDossierOpen: boolean;
  setExportDossierOpen: (open: boolean) => void;
  isPresentationMode: boolean;
  setIsPresentationMode: (mode: boolean) => void;
  stepScenarioForward: () => void;
  stepScenarioBackward: () => void;
  pauseScenarioPlayback: () => void;
  resumeScenarioPlayback: () => void;
  // Alert workflow actions
  acknowledgeAlert: (alertId: string, operatorName?: string) => void;
  investigateAlert: (alertId: string) => void;
  resolveAlert: (alertId: string) => void;
  reopenAlert: (alertId: string) => void;
  addOperatorNote: (alertId: string, note: string) => void;
  // Manual injections
  injectManualAnomaly: (type: 'moisture_spike' | 'signature_fail' | 'flow_overload' | 'temp_excursion') => void;
  // Metrics calculation
  kpis: {
    monitoredAssets: number;
    healthyDevices: number;
    openAlerts: number;
    authFailures: number;
    assetsRequiringAttention: number;
    operationalAnomalies: number;
  };
}

const AgriShieldContext = createContext<AgriShieldContextType | undefined>(undefined);

const LOCAL_STORAGE_ALERTS_KEY = 'agrishield_alerts_state_v3_inr';
const LOCAL_STORAGE_INVESTOR_KEY = 'agrishield_investor_inputs_v3_inr';

export const AgriShieldProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [timeRange, setTimeRange] = useState<'1H' | '6H' | '24H' | '7D'>('1H');
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [telemetry, setTelemetry] = useState<TelemetryPoint[]>(INITIAL_TELEMETRY);
  const [alerts, setAlerts] = useState<IncidentAlert[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ALERTS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_ALERTS;
  });
  const [riskRegister] = useState<RiskRegisterItem[]>(INITIAL_RISK_REGISTER);
  const scenarios = THREAT_SCENARIOS;

  const [selectedAlert, setSelectedAlert] = useState<IncidentAlert | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [investorModalOpen, setInvestorModalOpen] = useState<boolean>(false);
  const [selectedFacility, setSelectedFacility] = useState<FacilityType | 'All'>('All');
  const [interlocks, setInterlocks] = useState<Record<string, boolean>>({});
  const [isScanningAssets, setIsScanningAssets] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [isExportDossierOpen, setExportDossierOpen] = useState<boolean>(false);
  const [isPresentationMode, setIsPresentationMode] = useState<boolean>(false);

  // Scenario engine state
  const [activeScenario, setActiveScenario] = useState<ScenarioId | null>(null);
  const [scenarioStep, setScenarioStep] = useState<number>(0);
  const [isScenarioRunning, setIsScenarioRunning] = useState<boolean>(false);

  // Live simulation stream
  const [isLiveSimulation, setIsLiveSimulation] = useState<boolean>(true);
  const [simulationSpeed, setSimulationSpeed] = useState<number>(3000);

  // Message Inspector buffer
  const [recentMessages, setRecentMessages] = useState<TelemetryMessage[]>([
    {
      id: 'MSG-98214',
      assetId: 'FARM-SENSOR-001',
      timestamp: 'Just now',
      sequence: 14920,
      payload: { vwc: 31.2, soil_temp: 18.4, battery_mv: 3580 },
      signature: '0x94f83b2...a4e1',
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
      signature: '0x2e11d9a...7c99',
      signatureValid: true,
      validationStatus: 'verified',
      details: 'HMAC-SHA256 verified against enrolled Gateway Secret.'
    },
    {
      id: 'MSG-98212',
      assetId: 'BIOPOWER-GATEWAY-001',
      timestamp: '28s ago',
      sequence: 4421,
      payload: { ch4_pressure_bar: 1.24, jacket_temp_c: 38.2 },
      signature: '0x88c4b10...910a',
      signatureValid: true,
      validationStatus: 'verified',
      details: 'Ed25519 signature valid. Process parameters within acceptable baseline.'
    }
  ]);

  // Investor inputs state
  const [investorInputs, setInvestorInputs] = useState<InvestorCalculatorInputs>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_INVESTOR_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_INVESTOR_INPUTS;
  });

  const [fundingAllocation, setFundingAllocation] = useState<FundingAllocation>({
    engineering: 35,
    testing: 15,
    iotIntegrations: 20,
    pilotDeployments: 15,
    salesMarketing: 10,
    compliance: 5,
  });

  const scenarioTimerRef = useRef<any>(null);

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  // Toast System
  const addToast = (message: string, type: 'info' | 'success' | 'warning' | 'danger' = 'info') => {
    const newToast: ToastNotification = {
      id: `toast-${Date.now()}-${Math.random()}`,
      message,
      type,
      timestamp: new Date().toLocaleTimeString(),
    };
    setToasts((prev) => [...prev.slice(-4), newToast]);
    setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== newToast.id));
    }, 4200);
  };

  const removeToast = (id: string) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  };

  // Sync alerts to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ALERTS_KEY, JSON.stringify(alerts));
    } catch (e) {
      console.error('Failed to save alerts to local storage', e);
    }
  }, [alerts]);

  // Sync investor inputs to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_INVESTOR_KEY, JSON.stringify(investorInputs));
    } catch (e) {
      console.error('Failed to save investor inputs', e);
    }
  }, [investorInputs]);

  // Connect to Live SSE Telemetry Feed from AgriShield Backend
  useEffect(() => {
    api.getTelemetryHistory(20).then((history) => {
      if (history && history.length > 0) {
        setTelemetry(history);
      }
    }).catch(() => {
      // Offline fallback: keep initial static telemetry
    });

    const sse = api.connectTelemetrySSE(
      (newPoint) => {
        if (!isScenarioRunning) {
          setTelemetry((prev) => [...prev.slice(-19), newPoint]);
        }
      },
      (eventName, data) => {
        if (eventName === 'scenario_step' && data?.step !== undefined) {
          setScenarioStep(data.step);
        }
      }
    );

    return () => {
      sse?.close();
    };
  }, [isScenarioRunning]);

  // Live background telemetry generator
  useEffect(() => {
    if (!isLiveSimulation || isScenarioRunning) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const timeLabel = timeStr.substring(0, 5);

      setTelemetry((prev) => {
        // small natural random fluctuations
        const jitterMoisture = +(Math.sin(Date.now() / 10000) * 0.4 + (Math.random() * 0.2 - 0.1)).toFixed(1);
        const newMoisture = +(31.0 + jitterMoisture).toFixed(1);
        const newTemp = +(24.5 + Math.sin(Date.now() / 20000) * 1.5 + (Math.random() * 0.4 - 0.2)).toFixed(1);
        const newFlow = Math.round(380 + Math.random() * 15 - 7);
        const newPressure = +(1.24 + (Math.random() * 0.04 - 0.02)).toFixed(2);

        const newPoint: TelemetryPoint = {
          timestamp: timeStr,
          timeLabel,
          soilMoisture: newMoisture,
          soilMoistureBaseline: 30.0,
          soilMoistureMin: 27.0,
          soilMoistureMax: 33.0,
          temperature: newTemp,
          tempThresholdMax: 26.0,
          tempSafeMin: 18.0,
          tempSafeMax: 26.0,
          humidity: Math.round(54 + Math.random() * 4 - 2),
          irrigationFlow: newFlow,
          irrigationLimit: 450,
          irrigationSafeMax: 450,
          digesterPressure: newPressure,
        };

        return [...prev.slice(-19), newPoint];
      });

      setAssets((prev) =>
        prev.map((a) => {
          if (a.id === 'FARM-SENSOR-001') {
            return { ...a, lastReported: 'Just now' };
          }
          return a;
        })
      );
    }, simulationSpeed);

    return () => clearInterval(interval);
  }, [isLiveSimulation, isScenarioRunning, simulationSpeed]);

  // 5-Stage Scenario Execution Engine
  const runScenario = (scenarioId: ScenarioId) => {
    if (isScenarioRunning) return;
    setIsScenarioRunning(true);
    setActiveScenario(scenarioId);
    setScenarioStep(0);

    const scenario = scenarios.find((s) => s.id === scenarioId);
    if (!scenario) return;

    addToast(`Initiated ${scenario.name}: Story execution started`, 'info');

    let currentStep = 0;
    const stepDurations = scenario.storyStages.map((st) => st.durationMs || 1600);

    const runNextStep = () => {
      if (currentStep < scenario.storyStages.length) {
        setScenarioStep(currentStep);

        if (scenarioId === 'A') handleScenarioAStep(currentStep);
        else if (scenarioId === 'B') handleScenarioBStep(currentStep);
        else if (scenarioId === 'C') handleScenarioCStep(currentStep);
        else if (scenarioId === 'D') handleScenarioDStep(currentStep);

        currentStep++;
        scenarioTimerRef.current = setTimeout(runNextStep, stepDurations[currentStep - 1] || 1600);
      } else {
        setIsScenarioRunning(false);
        addToast(`Scenario ${scenarioId} completed: Incident flagged & protected`, 'warning');
      }
    };

    runNextStep();
  };

  // Scenario A (Soil Moisture)
  const handleScenarioAStep = (step: number) => {
    const timeStr = new Date().toTimeString().split(' ')[0];
    if (step === 1) {
      // Suspicious reading injected
      setTelemetry((prev) => [
        ...prev.slice(-19),
        {
          timestamp: timeStr,
          timeLabel: timeStr.substring(0, 5),
          soilMoisture: 84.5,
          soilMoistureBaseline: 30.0,
          soilMoistureMin: 27.0,
          soilMoistureMax: 33.0,
          temperature: 24.8,
          tempThresholdMax: 26.0,
          humidity: 52,
          irrigationFlow: 380,
          irrigationLimit: 450,
          digesterPressure: 1.24,
          isAnomaly: true,
        },
      ]);

      setAssets((prev) =>
        prev.map((a) =>
          a.id === 'FARM-SENSOR-001'
            ? {
                ...a,
                connectionStatus: 'warning',
                currentReading: '84.5% VWC (Abnormal Spike)',
                riskScore: 84,
                findingsCount: a.findingsCount + 1,
              }
            : a
        )
      );
    } else if (step === 2) {
      // AgriShield Detection
      setRecentMessages((prev) => [
        {
          id: `MSG-${Math.floor(Math.random() * 90000 + 10000)}`,
          assetId: 'FARM-SENSOR-001',
          timestamp: 'Just now',
          sequence: 14925,
          payload: { vwc: 84.5, raw_adc: 3912, temp: 18.5 },
          signature: '0x94f83b2...a4e1',
          signatureValid: true,
          validationStatus: 'threshold_breach',
          details: 'Physical reading 84.5% exceeds safe envelope (+172% jump). Spatial check with neighbor failed (-54.7% divergence).',
        },
        ...prev.slice(0, 6),
      ]);
    } else if (step === 4) {
      // Recommended Response -> Incident Alert fired
      const newAlert: IncidentAlert = {
        id: `INC-2026-${Math.floor(Math.random() * 800 + 100)}`,
        alertId: 'SEC-AG-ANOMALY-01',
        title: 'Suspicious Soil Moisture Spike Contradicts Spatial Neighbors',
        severity: 'high',
        assetId: 'FARM-SENSOR-001',
        assetName: 'Sector 4 Valley Multi-Depth Soil Moisture Probe',
        facility: 'Smart Farm',
        category: 'Sensor Spoofing',
        timestamp: 'Just now',
        timeAgo: 'Just now',
        status: 'open',
        observedMetric: 'Soil Moisture 84.5% VWC (Baseline: 28.0% - 33.0% VWC)',
        configuredBaseline: 'Max Delta per 10min <= 3.5%; Reference Sensor 4A = 29.8%',
        physicalImpact: 'Risk of automated irrigation shutdown leading to crop dehydration during critical grape flowering.',
        financialImpact: 'Estimated ₹14.5 Lakhs crop loss on 25 vineyard acres (Nashik export cluster).',
        whatHappened:
          'Sensor FARM-SENSOR-001 reported volumetric water content of 84.5%, a sudden +172% surge within 60 seconds. Agro-meteorological station recorded 0.0mm precipitation.',
        whyItMatters:
          'If accepted as genuine ground moisture, the autonomous irrigation algorithm will withhold watering for 72 hours, risking severe drought stress to high-value wine grape vines.',
        whatToDoNext: [
          'AgriShield has automatically isolated telemetry from automated irrigation scheduling.',
          'Dispatch field agronomist to check capacitive probe depth and rodent cable damage.',
          'Cross-reference spatial soil electrical conductivity with Drone Thermal Imagery.'
        ],
        operatorNotes: ['Simulated Incident: Triggered via Threat Simulation Lab Scenario A.'],
        timeline: [
          { time: timeStr, event: 'Telemetry packet received with Ed25519 signature verified', type: 'telemetry' },
          { time: timeStr, event: 'Spatial correlation check with FARM-SENSOR-002 failed (-54.7% divergence)', type: 'detection' },
          { time: timeStr, event: 'Alert generated: Sensor reading quarantined from control loop', type: 'system' },
        ],
      };

      setAlerts((prev) => [newAlert, ...prev]);
    }
  };

  // Scenario B (Invalid Signature)
  const handleScenarioBStep = (step: number) => {
    const timeStr = new Date().toTimeString().split(' ')[0];
    if (step === 1) {
      setRecentMessages((prev) => [
        {
          id: `MSG-${Math.floor(Math.random() * 90000 + 10000)}`,
          assetId: 'BIOPOWER-GATEWAY-001',
          timestamp: 'Just now',
          sequence: 4425,
          payload: { ch4_pressure_bar: 0.42, jacket_temp_c: 41.0 },
          signature: '0xDEADBEEF...INVALID',
          signatureValid: false,
          validationStatus: 'signature_mismatch',
          details: 'Ed25519 Signature Verification Failed: Public key 0x4B2... mismatch with Enrolled Vault.',
        },
        ...prev.slice(0, 6),
      ]);
    } else if (step === 2) {
      setAssets((prev) =>
        prev.map((a) =>
          a.id === 'BIOPOWER-GATEWAY-001'
            ? {
                ...a,
                authStatus: 'failing',
                riskScore: 92,
                currentReading: '1.24 Bar [Spoofed Packet Quarantined]',
                findingsCount: a.findingsCount + 1,
              }
            : a
        )
      );
    } else if (step === 4) {
      const newAlert: IncidentAlert = {
        id: `INC-2026-${Math.floor(Math.random() * 800 + 100)}`,
        alertId: 'SEC-CRYPTO-FORGERY-02',
        title: 'Cryptographic Signature Verification Failure on Anaerobic Gateway',
        severity: 'critical',
        assetId: 'BIOPOWER-GATEWAY-001',
        assetName: 'Anaerobic Digester Methane Control Gateway',
        facility: 'Bio-Power Facility',
        category: 'Signature Failure',
        timestamp: 'Just now',
        timeAgo: 'Just now',
        status: 'open',
        observedMetric: 'Signature 0xDEADBEEF... Invalid Ed25519 Curve25519 digest',
        configuredBaseline: 'Hardware Root-of-Trust Public Key Hash: 0x9812A... enrolled in Vault',
        physicalImpact: 'Attacker attempting to spoof low methane pressure to trigger safety flare valve shutdown.',
        financialImpact: 'Estimated ₹18.5 Lakhs in safety flaring loss, SATAT tariff penalty, and grid intertie trip.',
        whatHappened:
          'An unauthorized telemetry frame claimed digester pressure dropped to 0.42 Bar. AgriShield cryptographic authentication rejected the packet due to signature mismatch.',
        whyItMatters:
          'If this spoofed frame had reached the SCADA host, emergency flaring logic would have aborted, potentially allowing high-pressure methane buildup in the primary biodigester dome.',
        whatToDoNext: [
          'AgriShield Zero-Trust Ingest has quarantined the packet; operational loop unaffected.',
          'Audit plant edge switch port 14 for unauthenticated TAP or rogue Ethernet drop.',
          'Verify gateway public key rotation schedule in AgriShield Key Vault.'
        ],
        operatorNotes: ['Simulated Incident: Triggered via Threat Simulation Lab Scenario B.'],
        timeline: [
          { time: timeStr, event: 'Inbound MQTT frame ingested over TLS 1.3', type: 'system' },
          { time: timeStr, event: 'Cryptographic validation failed: Ed25519 signature reject', type: 'detection' },
          { time: timeStr, event: 'Critical security alert logged. Message dropped from control bus.', type: 'system' },
        ],
      };

      setAlerts((prev) => [newAlert, ...prev]);
    }
  };

  // Scenario C (Irrigation Limits)
  const handleScenarioCStep = (step: number) => {
    const timeStr = new Date().toTimeString().split(' ')[0];
    if (step === 1) {
      setTelemetry((prev) => [
        ...prev.slice(-19),
        {
          timestamp: timeStr,
          timeLabel: timeStr.substring(0, 5),
          soilMoisture: 31.0,
          soilMoistureBaseline: 30.0,
          temperature: 25.0,
          tempThresholdMax: 26.0,
          humidity: 50,
          irrigationFlow: 820,
          irrigationLimit: 450,
          digesterPressure: 1.24,
          isAnomaly: true,
        },
      ]);

      setAssets((prev) =>
        prev.map((a) =>
          a.id === 'IRRIGATION-CTRL-001'
            ? {
                ...a,
                connectionStatus: 'warning',
                riskScore: 79,
                currentReading: '820 L/min (182% Limit - Peak Tariff)',
                findingsCount: a.findingsCount + 1,
              }
            : a
        )
      );
    } else if (step === 4) {
      const newAlert: IncidentAlert = {
        id: `INC-2026-${Math.floor(Math.random() * 800 + 100)}`,
        alertId: 'SEC-ICS-LIMIT-03',
        title: 'Hydraulic Flow & Energy Tariff Envelope Breach on Irrigation PLC',
        severity: 'high',
        assetId: 'IRRIGATION-CTRL-001',
        assetName: 'West Quad Center Pivot Variable-Rate PLC',
        facility: 'Smart Farm',
        category: 'Operational Logic Breach',
        timestamp: 'Just now',
        timeAgo: 'Just now',
        status: 'open',
        observedMetric: 'Flow 820 L/min @ 5.8 Bar; Duration 180m during Peak Tariff (14:00-18:00)',
        configuredBaseline: 'Max Allowed: 450 L/min @ 4.2 Bar; Max Single Run 60m',
        physicalImpact: 'Hydraulic main overpressurization risk, pump impeller cavitation, and ₹3.2 Lakhs peak demand surcharge.',
        financialImpact: '₹3.2 Lakhs State DISCOM peak tariff penalty plus ₹8.5 Lakhs underground PVC pipeline replacement.',
        whatHappened:
          'An unauthorized or anomalous control sequence commanded center pivot pump to 182% rated capacity for 180 continuous minutes during expensive utility peak hours.',
        whyItMatters:
          'High water velocity creates water hammer risk in underground PVC mains, threatens pump motor overheating, and dramatically spikes utility power demand penalty charges.',
        whatToDoNext: [
          'Verify whether irrigation supervisor authorized emergency leaching cycle.',
          'Instruct on-site operator to physically inspect pressure relief valve at Pump Station Bravo.',
          'Send throttle advisory to PLC to restrict maximum duty cycle to 450 L/min.'
        ],
        operatorNotes: ['Simulated Incident: Triggered via Threat Simulation Lab Scenario C.'],
        timeline: [
          { time: timeStr, event: 'Modbus command ramped pump VFD to 58 Hz', type: 'telemetry' },
          { time: timeStr, event: 'AgriShield ICS Policy Engine flagged threshold violation: Flow > 450 L/min', type: 'detection' },
          { time: timeStr, event: 'Operational Anomaly Alert generated with High Severity', type: 'system' },
        ],
      };

      setAlerts((prev) => [newAlert, ...prev]);
    }
  };

  // Scenario D (Cold-Chain Excursion)
  const handleScenarioDStep = (step: number) => {
    const timeStr = new Date().toTimeString().split(' ')[0];
    if (step === 1) {
      setAssets((prev) =>
        prev.map((a) =>
          a.id === 'COLDSTORE-TEMP-001'
            ? {
                ...a,
                connectionStatus: 'critical',
                riskScore: 96,
                currentReading: '-4.2°C (CRITICAL SPOILAGE EXCURSION)',
                findingsCount: a.findingsCount + 1,
              }
            : a
        )
      );
    } else if (step === 4) {
      const newAlert: IncidentAlert = {
        id: `INC-2026-${Math.floor(Math.random() * 800 + 100)}`,
        alertId: 'SEC-COLDCHAIN-EXCURSION-04',
        title: 'Critical Cold-Chain Temperature Excursion in Biologics Vault 3',
        severity: 'critical',
        assetId: 'COLDSTORE-TEMP-001',
        assetName: 'Cold-Storage Vault Unit 3 (Vaccine & High-Value Produce)',
        facility: 'Cold Storage',
        category: 'Cold-Chain Excursion',
        timestamp: 'Just now',
        timeAgo: 'Just now',
        status: 'open',
        observedMetric: '-4.2°C (Surpassing -16.0°C Critical Threshold by 11.8°C)',
        configuredBaseline: 'Strict range -20.0°C to -16.0°C; Max excursion time: 15 min',
        physicalImpact: 'Imminent thermal degradation and loss of ₹28.5 Lakhs perishable inventory within 60 minutes.',
        financialImpact: '₹28.5 Lakhs complete inventory loss and FSSAI regulatory food safety quarantine.',
        whatHappened:
          'Chamber 3 temperature experienced rapid thermal rise from -18.4°C to -4.2°C over 40 minutes. Compressor power telemetry indicates normal draw, pointing to physical refrigeration circuit loss or unlatched seal door.',
        whyItMatters:
          'Chamber 3 holds temperature-sensitive horticultural seed stock and biologics. Sustained exposure above -10°C triggers irreversible cellular degradation and complete commercial loss.',
        whatToDoNext: [
          'Dispatch cold-storage shift supervisor immediately to verify physical vault door seal.',
          'Deploy backup dry-ice cooling totes or initiate transfer to Vault 2 pre-cooling tunnel.',
          'Cross-reference reading with secondary wireless battery probe COLDSTORE-TEMP-002.'
        ],
        operatorNotes: ['Simulated Incident: Triggered via Threat Simulation Lab Scenario D.'],
        timeline: [
          { time: timeStr, event: 'Temperature breached -16.0°C critical threshold', type: 'telemetry' },
          { time: timeStr, event: 'AgriShield Physical Impact Engine calculated 60m spoilage horizon', type: 'detection' },
          { time: timeStr, event: 'Critical Emergency Alert dispatched to facility maintenance pager', type: 'system' },
        ],
      };

      setAlerts((prev) => [newAlert, ...prev]);
    }
  };

  // Reset scenario to baseline
  const resetScenario = () => {
    if (scenarioTimerRef.current) {
      clearTimeout(scenarioTimerRef.current);
    }
    api.resetSimulation().catch(() => {});
    setIsScenarioRunning(false);
    setActiveScenario(null);
    setScenarioStep(0);
    setAssets(INITIAL_ASSETS);
    setTelemetry(INITIAL_TELEMETRY);
    setAlerts(INITIAL_ALERTS);
    setSelectedAlert(null);
    addToast('All telemetry and asset baselines normalized to healthy state', 'success');
  };

  // Manual anomaly injection shortcut
  const injectManualAnomaly = (type: 'moisture_spike' | 'signature_fail' | 'flow_overload' | 'temp_excursion') => {
    if (type === 'moisture_spike') runScenario('A');
    else if (type === 'signature_fail') runScenario('B');
    else if (type === 'flow_overload') runScenario('C');
    else if (type === 'temp_excursion') runScenario('D');
  };

  // Emergency Hardware Safety Interlock
  const engageInterlock = (assetId: string) => {
    const asset = assets.find((a) => a.id === assetId);
    const targetName = asset?.name || assetId;
    api.toggleInterlock(assetId, true).catch(() => {});
    setInterlocks((prev) => ({ ...prev, [assetId]: true }));
    setAssets((prev) =>
      prev.map((a) => {
        if (a.id === assetId) {
          return {
            ...a,
            connectionStatus: 'warning',
            currentReading: 'ISOLATED (Safe Envelope Active)',
            riskScore: Math.max(12, Math.floor(a.riskScore * 0.3)),
          };
        }
        return a;
      })
    );
    addToast(`SAFETY INTERLOCK ENGAGED: Actuator loop isolated for ${targetName}. Physical fail-safe baseline active!`, 'warning');
  };

  // Asset Posture & Vulnerability Scan
  const runAssetScan = () => {
    if (isScanningAssets) return;
    setIsScanningAssets(true);
    setScanProgress(10);
    api.runPostureAudit().catch(() => {});
    addToast('Initiating OT Network Sweep & Purdue Model Zone Audit...', 'info');
    let current = 10;
    const interval = setInterval(() => {
      current += 22;
      if (current >= 100) {
        setScanProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsScanningAssets(false);
          addToast('Network sweep complete: 12 nodes audited across Zones 1-4. 2 firmware advisories reported.', 'success');
        }, 400);
      } else {
        setScanProgress(current);
      }
    }, 300);
  };

  // Scenario Playback Controls
  const pauseScenarioPlayback = () => {
    if (scenarioTimerRef.current) {
      clearTimeout(scenarioTimerRef.current);
      scenarioTimerRef.current = null;
    }
    setIsScenarioRunning(false);
    addToast('Simulation playback paused', 'info');
  };

  const resumeScenarioPlayback = () => {
    if (!activeScenario) return;
    setIsScenarioRunning(true);
    const scenario = scenarios.find((s) => s.id === activeScenario);
    if (!scenario) return;
    const nextStep = Math.min(scenarioStep + 1, scenario.storyStages.length - 1);
    const stepDurations = scenario.storyStages.map((st) => st.durationMs || 1800);

    const executeFrom = (idx: number) => {
      if (idx < scenario.storyStages.length) {
        setScenarioStep(idx);
        if (activeScenario === 'A') handleScenarioAStep(idx);
        else if (activeScenario === 'B') handleScenarioBStep(idx);
        else if (activeScenario === 'C') handleScenarioCStep(idx);
        else if (activeScenario === 'D') handleScenarioDStep(idx);
        scenarioTimerRef.current = setTimeout(() => executeFrom(idx + 1), stepDurations[idx] || 1800);
      } else {
        setIsScenarioRunning(false);
        addToast(`Scenario ${activeScenario} completed: Threat contained`, 'warning');
      }
    };
    executeFrom(nextStep);
  };

  const stepScenarioForward = () => {
    if (!activeScenario) return;
    const scenario = scenarios.find((s) => s.id === activeScenario);
    if (!scenario) return;
    const next = Math.min(scenarioStep + 1, scenario.storyStages.length - 1);
    setScenarioStep(next);
    if (activeScenario === 'A') handleScenarioAStep(next);
    else if (activeScenario === 'B') handleScenarioBStep(next);
    else if (activeScenario === 'C') handleScenarioCStep(next);
    else if (activeScenario === 'D') handleScenarioDStep(next);
  };

  const stepScenarioBackward = () => {
    if (!activeScenario) return;
    const prev = Math.max(scenarioStep - 1, 0);
    setScenarioStep(prev);
    if (activeScenario === 'A') handleScenarioAStep(prev);
    else if (activeScenario === 'B') handleScenarioBStep(prev);
    else if (activeScenario === 'C') handleScenarioCStep(prev);
    else if (activeScenario === 'D') handleScenarioDStep(prev);
  };
  // Alert workflow actions
  const acknowledgeAlert = (alertId: string, operatorName = 'Demo Security Analyst') => {
    const timeStr = new Date().toLocaleTimeString();
    api.acknowledgeAlert(alertId, operatorName).catch(() => {});
    setAlerts((prev) =>
      prev.map((alert) => {
        if (alert.id === alertId || alert.alertId === alertId) {
          return {
            ...alert,
            status: 'investigating',
            acknowledgedBy: operatorName,
            acknowledgedAt: timeStr,
            timeline: [
              ...alert.timeline,
              { time: timeStr, event: `Acknowledged by ${operatorName}`, type: 'operator' },
            ],
          };
        }
        return alert;
      })
    );
    if (selectedAlert && (selectedAlert.id === alertId || selectedAlert.alertId === alertId)) {
      setSelectedAlert((prev) =>
        prev
          ? {
              ...prev,
              status: 'investigating',
              acknowledgedBy: operatorName,
              acknowledgedAt: timeStr,
              timeline: [
                ...prev.timeline,
                { time: timeStr, event: `Acknowledged by ${operatorName}`, type: 'operator' },
              ],
            }
          : null
      );
    }
    addToast(`Incident ${alertId} marked as Under Investigation`, 'info');
  };

  const investigateAlert = (alertId: string) => {
    const alert = alerts.find((a) => a.id === alertId || a.alertId === alertId);
    if (alert) {
      setSelectedAlert(alert);
    }
  };

  const resolveAlert = (alertId: string) => {
    const timeStr = new Date().toLocaleTimeString();
    api.resolveAlert(alertId).catch(() => {});
    setAlerts((prev) =>
      prev.map((alert) => {
        if (alert.id === alertId || alert.alertId === alertId) {
          return {
            ...alert,
            status: 'resolved',
            resolvedAt: timeStr,
            timeline: [
              ...alert.timeline,
              { time: timeStr, event: 'Alert marked as Resolved by Operator', type: 'operator' },
            ],
          };
        }
        return alert;
      })
    );
    if (selectedAlert && (selectedAlert.id === alertId || selectedAlert.alertId === alertId)) {
      setSelectedAlert((prev) =>
        prev
          ? {
              ...prev,
              status: 'resolved',
              resolvedAt: timeStr,
              timeline: [
                ...prev.timeline,
                { time: timeStr, event: 'Alert marked as Resolved by Operator', type: 'operator' },
              ],
            }
          : null
      );
    }
    addToast(`Incident ${alertId} successfully Resolved`, 'success');
  };

  const reopenAlert = (alertId: string) => {
    const timeStr = new Date().toLocaleTimeString();
    setAlerts((prev) =>
      prev.map((alert) => {
        if (alert.id === alertId || alert.alertId === alertId) {
          return {
            ...alert,
            status: 'open',
            resolvedAt: undefined,
            timeline: [
              ...alert.timeline,
              { time: timeStr, event: 'Alert Reopened for further investigation', type: 'operator' },
            ],
          };
        }
        return alert;
      })
    );
    if (selectedAlert && (selectedAlert.id === alertId || selectedAlert.alertId === alertId)) {
      setSelectedAlert((prev) =>
        prev
          ? {
              ...prev,
              status: 'open',
              resolvedAt: undefined,
              timeline: [
                ...prev.timeline,
                { time: timeStr, event: 'Alert Reopened for further investigation', type: 'operator' },
              ],
            }
          : null
      );
    }
    addToast(`Incident ${alertId} reopened`, 'warning');
  };

  const addOperatorNote = (alertId: string, note: string) => {
    if (!note.trim()) return;
    const timeStr = new Date().toLocaleTimeString();
    setAlerts((prev) =>
      prev.map((alert) => {
        if (alert.id === alertId || alert.alertId === alertId) {
          return {
            ...alert,
            operatorNotes: [...alert.operatorNotes, `${timeStr}: ${note}`],
            timeline: [
              ...alert.timeline,
              { time: timeStr, event: `Operator note added: "${note.substring(0, 35)}..."`, type: 'operator' },
            ],
          };
        }
        return alert;
      })
    );
    if (selectedAlert && (selectedAlert.id === alertId || selectedAlert.alertId === alertId)) {
      setSelectedAlert((prev) =>
        prev
          ? {
              ...prev,
              operatorNotes: [...prev.operatorNotes, `${timeStr}: ${note}`],
              timeline: [
                ...prev.timeline,
                { time: timeStr, event: `Operator note added: "${note.substring(0, 35)}..."`, type: 'operator' },
              ],
            }
          : null
      );
    }
    addToast('Operator forensic note recorded', 'info');
  };

  const updateInvestorInputs = (inputs: Partial<InvestorCalculatorInputs>) => {
    setInvestorInputs((prev) => ({ ...prev, ...inputs }));
  };

  const updateFundingAllocation = (key: keyof FundingAllocation, value: number) => {
    setFundingAllocation((prev) => ({ ...prev, [key]: value }));
  };

  // Dynamic KPI calculation
  const monitoredAssets = assets.length;
  const healthyDevices = assets.filter((a) => a.connectionStatus === 'online' && a.riskScore < 40).length;
  const openAlerts = alerts.filter((a) => a.status !== 'resolved').length;
  const authFailures = assets.filter((a) => a.authStatus === 'failing').length;
  const assetsRequiringAttention = assets.filter((a) => a.riskScore >= 40 || a.connectionStatus !== 'online').length;
  const operationalAnomalies = alerts.filter(
    (a) =>
      a.status !== 'resolved' &&
      (a.category === 'Sensor Spoofing' || a.category === 'Operational Logic Breach' || a.category === 'Cold-Chain Excursion')
  ).length;

  return (
    <AgriShieldContext.Provider
      value={{
        activeTab,
        setActiveTab,
        sidebarCollapsed,
        toggleSidebar,
        timeRange,
        setTimeRange,
        toasts,
        addToast,
        removeToast,
        assets,
        telemetry,
        alerts,
        riskRegister,
        scenarios,
        selectedAlert,
        setSelectedAlert,
        selectedAsset,
        setSelectedAsset,
        investorModalOpen,
        setInvestorModalOpen,
        activeScenario,
        scenarioStep,
        isScenarioRunning,
        runScenario,
        resetScenario,
        isLiveSimulation,
        setIsLiveSimulation,
        simulationSpeed,
        setSimulationSpeed,
        recentMessages,
        investorInputs,
        updateInvestorInputs,
        fundingAllocation,
        updateFundingAllocation,
        selectedFacility,
        setSelectedFacility,
        interlocks,
        engageInterlock,
        isScanningAssets,
        scanProgress,
        runAssetScan,
        isExportDossierOpen,
        setExportDossierOpen,
        isPresentationMode,
        setIsPresentationMode,
        stepScenarioForward,
        stepScenarioBackward,
        pauseScenarioPlayback,
        resumeScenarioPlayback,
        acknowledgeAlert,
        investigateAlert,
        resolveAlert,
        reopenAlert,
        addOperatorNote,
        injectManualAnomaly,
        kpis: {
          monitoredAssets,
          healthyDevices,
          openAlerts,
          authFailures,
          assetsRequiringAttention,
          operationalAnomalies,
        },
      }}
    >
      {children}
    </AgriShieldContext.Provider>
  );
};

export const useAgriShield = () => {
  const context = useContext(AgriShieldContext);
  if (!context) {
    throw new Error('useAgriShield must be used within an AgriShieldProvider');
  }
  return context;
};
