import { Asset, IncidentAlert, RiskRegisterItem, TelemetryPoint, ThreatScenario, InvestorCalculatorInputs } from '../types';

export const INITIAL_ASSETS: Asset[] = [
  {
    id: 'FARM-SENSOR-001',
    name: 'Sector 4 Valley Multi-Depth Soil Moisture Probe',
    category: 'Soil Sensor',
    facility: 'Smart Farm',
    location: 'North Vineyard - Block 4B',
    vendor: 'Sentek Technologies',
    model: 'Drill & Drop Tri-Scan 60cm',
    firmwareVersion: 'v2.14.8',
    networkZone: 'Zone 1 (Field Sensors)',
    protocol: 'LoRaWAN',
    connectionStatus: 'online',
    authCapability: 'Ed25519 Signed',
    authStatus: 'verified',
    currentReading: '31.2% VWC',
    baseline: '28.0% - 33.0% VWC',
    safeEnvelopeMin: 26.0,
    safeEnvelopeMax: 35.0,
    riskScore: 14,
    lastReported: '24s ago',
    findingsCount: 0,
    description: 'High-precision capacitive sensor measuring volumetric water content at 10cm, 30cm, and 50cm depths.'
  },
  {
    id: 'FARM-SENSOR-002',
    name: 'Sector 4 Ridge Reference Soil Sensor',
    category: 'Soil Sensor',
    facility: 'Smart Farm',
    location: 'North Vineyard - Block 4A',
    vendor: 'Sentek Technologies',
    model: 'Drill & Drop Tri-Scan 60cm',
    firmwareVersion: 'v2.14.8',
    networkZone: 'Zone 1 (Field Sensors)',
    protocol: 'LoRaWAN',
    connectionStatus: 'online',
    authCapability: 'Ed25519 Signed',
    authStatus: 'verified',
    currentReading: '29.8% VWC',
    baseline: '27.5% - 32.5% VWC',
    safeEnvelopeMin: 26.0,
    safeEnvelopeMax: 35.0,
    riskScore: 12,
    lastReported: '42s ago',
    findingsCount: 0,
    description: 'Adjacent reference probe providing spatial correlation against Sector 4 Valley probe.'
  },
  {
    id: 'IRRIGATION-CTRL-001',
    name: 'West Quad Center Pivot Variable-Rate PLC',
    category: 'Irrigation PLC',
    facility: 'Smart Farm',
    location: 'Pump Station Bravo - Sector 2',
    vendor: 'Schneider / Valley',
    model: 'Modicon M241 Logic Controller',
    firmwareVersion: 'v4.0.6.2 (Unpatched)',
    networkZone: 'Zone 2 (Control LAN)',
    protocol: 'Modbus TCP',
    connectionStatus: 'online',
    authCapability: 'HMAC-SHA256',
    authStatus: 'verified',
    currentReading: '380 L/min @ 4.2 Bar',
    baseline: 'Max 450 L/min (Daytime Tariff limit)',
    safeEnvelopeMin: 200,
    safeEnvelopeMax: 450,
    riskScore: 38,
    lastReported: '12s ago',
    findingsCount: 2,
    description: 'Variable-rate irrigation pump controller governing hydraulic pressure and distribution volume.'
  },
  {
    id: 'WEATHER-STN-001',
    name: 'Micro-climate Agro-Meteorological Station',
    category: 'Weather Station',
    facility: 'Smart Farm',
    location: 'Central Field Perimeter',
    vendor: 'Campbell Scientific',
    model: 'CR300 Micrologger',
    firmwareVersion: 'v1.08',
    networkZone: 'Zone 1 (Field Sensors)',
    protocol: 'MQTT / TLS',
    connectionStatus: 'online',
    authCapability: 'TLS 1.3 PSK',
    authStatus: 'verified',
    currentReading: '22.4°C, 58% RH, 0.0 mm Rain',
    baseline: 'Normal ambient diurnal cycle',
    riskScore: 8,
    lastReported: '1m ago',
    findingsCount: 0,
    description: 'Measures solar radiation, wind speed, ambient temperature, relative humidity, and precipitation.'
  },
  {
    id: 'COLDSTORE-TEMP-001',
    name: 'Cold-Storage Vault Unit 3 (Vaccine & High-Value Produce)',
    category: 'Refrigeration Unit',
    facility: 'Cold Storage',
    location: 'Distribution Depot Alpha - Chamber 3',
    vendor: 'Carel Industries',
    model: 'pCO5+ Refrigeration Controller',
    firmwareVersion: 'v3.1.2',
    networkZone: 'Zone 2 (Control LAN)',
    protocol: 'Modbus TCP',
    connectionStatus: 'online',
    authCapability: 'HMAC-SHA256',
    authStatus: 'verified',
    currentReading: '-18.4°C (Normal)',
    baseline: '-20.0°C to -16.0°C Safe Zone',
    safeEnvelopeMin: -21.0,
    safeEnvelopeMax: -16.0,
    riskScore: 22,
    lastReported: '18s ago',
    findingsCount: 1,
    description: 'Ultra-low temperature chamber controller protecting ₹28 Lakhs worth of perishable biologics, export apples, and certified seed stock.'
  },
  {
    id: 'COLDSTORE-TEMP-002',
    name: 'Pre-Cooling Blast Chiller Tunnel 1',
    category: 'Refrigeration Unit',
    facility: 'Cold Storage',
    location: 'Receiving Dock Bravo',
    vendor: 'Bitzer / Danfoss',
    model: 'MCX08M Controller',
    firmwareVersion: 'v2.8.1',
    networkZone: 'Zone 2 (Control LAN)',
    protocol: 'Modbus TCP',
    connectionStatus: 'online',
    authCapability: 'HMAC-SHA256',
    authStatus: 'verified',
    currentReading: '1.8°C',
    baseline: '0.0°C to 4.0°C Target',
    safeEnvelopeMin: 0.0,
    safeEnvelopeMax: 4.0,
    riskScore: 18,
    lastReported: '35s ago',
    findingsCount: 0,
    description: 'Rapid pull-down chiller lowering post-harvest core temperature of soft fruits.'
  },
  {
    id: 'COLD-GATEWAY-001',
    name: 'Facility Cold-Chain Edge Gateway',
    category: 'Industrial Gateway',
    facility: 'Cold Storage',
    location: 'Plant Telecom Closet 2',
    vendor: 'Moxa',
    model: 'UC-8112-LX Industrial Gateway',
    firmwareVersion: 'v1.4.0',
    networkZone: 'Zone 3 (Plant Network)',
    protocol: 'MQTT / TLS',
    connectionStatus: 'online',
    authCapability: 'Ed25519 Signed',
    authStatus: 'verified',
    currentReading: '100% Uplink Integrity',
    baseline: 'TLS Mutual Authentication',
    riskScore: 19,
    lastReported: '5s ago',
    findingsCount: 1,
    description: 'Bridge between refrigeration subnet and cloud telemetry ingest pipeline.'
  },
  {
    id: 'BIOPOWER-GATEWAY-001',
    name: 'Anaerobic Digester Methane Control Gateway',
    category: 'Bio-Power Digester',
    facility: 'Bio-Power Facility',
    location: 'Biogas Generation Sector - Enclosure 1',
    vendor: 'WAGO',
    model: 'PFC200 Telecontroller',
    firmwareVersion: 'v03.07.14(19)',
    networkZone: 'Zone 2 (Control LAN)',
    protocol: 'OPC UA',
    connectionStatus: 'online',
    authCapability: 'Ed25519 Signed',
    authStatus: 'verified',
    currentReading: '1.24 Bar (Safe Methane Pressure)',
    baseline: '0.80 - 1.60 Bar Permitted',
    safeEnvelopeMin: 0.80,
    safeEnvelopeMax: 1.60,
    riskScore: 28,
    lastReported: '8s ago',
    findingsCount: 2,
    description: 'Supervises biological digestion gas pressure, thermal jacket heat exchange, and safety flaring valves.'
  },
  {
    id: 'BIOMASS-FEED-001',
    name: 'Feedstock Auger Variable Frequency Drive',
    category: 'Bio-Power Digester',
    facility: 'Bio-Power Facility',
    location: 'Silage Reception Pit',
    vendor: 'ABB',
    model: 'ACS580 Industrial Drive',
    firmwareVersion: 'v2.16 (CVE-2023-38545)',
    networkZone: 'Zone 2 (Control LAN)',
    protocol: 'PROFINET',
    connectionStatus: 'online',
    authCapability: 'Unsigned / Legacy',
    authStatus: 'unverified',
    currentReading: '42.5 Hz (Feed Rate 1.2 t/h)',
    baseline: '30 - 55 Hz Operational Range',
    riskScore: 46,
    lastReported: '15s ago',
    findingsCount: 3,
    description: 'Controls organic feedstock input rate into primary biomass combustion boiler.'
  },
  {
    id: 'SCADA-SERVER-001',
    name: 'Central Supervisory Operations SCADA Host',
    category: 'SCADA Server',
    facility: 'SCADA Operations',
    location: 'Primary Operations NOC Rack A1',
    vendor: 'Siemens / Dell',
    model: 'SIMATIC WinCC Open Architecture',
    firmwareVersion: 'WinCC v3.19 P004',
    networkZone: 'Zone 3 (Plant Network)',
    protocol: 'OPC UA',
    connectionStatus: 'online',
    authCapability: 'Ed25519 Signed',
    authStatus: 'verified',
    currentReading: 'Polling 48 OT nodes',
    baseline: 'Zero unauthenticated egress packets',
    riskScore: 24,
    lastReported: '2s ago',
    findingsCount: 1,
    description: 'Aggregates plant-wide control loops and acts as the central operator human-machine interface.'
  },
  {
    id: 'SILO-AERATION-001',
    name: 'Grain Silo Moisture & Aeration Fan PLC',
    category: 'Soil Sensor',
    facility: 'Smart Farm',
    location: 'Grain Storage Complex - Silo 2',
    vendor: 'Rockwell Automation',
    model: 'Micro850 Programmable Controller',
    firmwareVersion: 'v12.011',
    networkZone: 'Zone 2 (Control LAN)',
    protocol: 'Modbus TCP',
    connectionStatus: 'online',
    authCapability: 'HMAC-SHA256',
    authStatus: 'verified',
    currentReading: '13.1% Grain Moisture',
    baseline: '12.0% - 14.0% Safe Storage',
    riskScore: 16,
    lastReported: '50s ago',
    findingsCount: 0,
    description: 'Monitors grain moisture levels and regulates automated cooling fan cycling to prevent fungal growth.'
  },
  {
    id: 'DOSING-PLC-001',
    name: 'Precision Fertigation Micro-Dosing Controller',
    category: 'Irrigation PLC',
    facility: 'Smart Farm',
    location: 'Hydroponic & Fertigation Rig Alpha',
    vendor: 'Netafim',
    model: 'NMC Pro Fertigation Unit',
    firmwareVersion: 'v5.33',
    networkZone: 'Zone 2 (Control LAN)',
    protocol: 'Modbus TCP',
    connectionStatus: 'online',
    authCapability: 'HMAC-SHA256',
    authStatus: 'verified',
    currentReading: 'pH 6.2, EC 1.8 mS/cm',
    baseline: 'pH 5.8-6.5, EC 1.5-2.2',
    riskScore: 21,
    lastReported: '28s ago',
    findingsCount: 1,
    description: 'Injects nitrogen, phosphorus, potassium, and micronutrients directly into the drip irrigation main.'
  }
];

export const INITIAL_TELEMETRY: TelemetryPoint[] = [
  { timestamp: '10:00:00', timeLabel: '10:00', soilMoisture: 30.5, soilMoistureBaseline: 30.0, soilMoistureMin: 27.0, soilMoistureMax: 33.0, temperature: 21.0, tempThresholdMax: 26.0, humidity: 62, irrigationFlow: 350, irrigationLimit: 450, digesterPressure: 1.20 },
  { timestamp: '10:15:00', timeLabel: '10:15', soilMoisture: 30.8, soilMoistureBaseline: 30.0, soilMoistureMin: 27.0, soilMoistureMax: 33.0, temperature: 21.5, tempThresholdMax: 26.0, humidity: 61, irrigationFlow: 360, irrigationLimit: 450, digesterPressure: 1.21 },
  { timestamp: '10:30:00', timeLabel: '10:30', soilMoisture: 31.0, soilMoistureBaseline: 30.0, soilMoistureMin: 27.0, soilMoistureMax: 33.0, temperature: 22.1, tempThresholdMax: 26.0, humidity: 60, irrigationFlow: 380, irrigationLimit: 450, digesterPressure: 1.22 },
  { timestamp: '10:45:00', timeLabel: '10:45', soilMoisture: 31.2, soilMoistureBaseline: 30.0, soilMoistureMin: 27.0, soilMoistureMax: 33.0, temperature: 22.8, tempThresholdMax: 26.0, humidity: 59, irrigationFlow: 375, irrigationLimit: 450, digesterPressure: 1.24 },
  { timestamp: '11:00:00', timeLabel: '11:00', soilMoisture: 31.1, soilMoistureBaseline: 30.0, soilMoistureMin: 27.0, soilMoistureMax: 33.0, temperature: 23.4, tempThresholdMax: 26.0, humidity: 57, irrigationFlow: 390, irrigationLimit: 450, digesterPressure: 1.23 },
  { timestamp: '11:15:00', timeLabel: '11:15', soilMoisture: 30.9, soilMoistureBaseline: 30.0, soilMoistureMin: 27.0, soilMoistureMax: 33.0, temperature: 23.9, tempThresholdMax: 26.0, humidity: 56, irrigationFlow: 385, irrigationLimit: 450, digesterPressure: 1.25 },
  { timestamp: '11:30:00', timeLabel: '11:30', soilMoisture: 31.3, soilMoistureBaseline: 30.0, soilMoistureMin: 27.0, soilMoistureMax: 33.0, temperature: 24.3, tempThresholdMax: 26.0, humidity: 55, irrigationFlow: 370, irrigationLimit: 450, digesterPressure: 1.24 },
  { timestamp: '11:45:00', timeLabel: '11:45', soilMoisture: 31.2, soilMoistureBaseline: 30.0, soilMoistureMin: 27.0, soilMoistureMax: 33.0, temperature: 24.8, tempThresholdMax: 26.0, humidity: 54, irrigationFlow: 380, irrigationLimit: 450, digesterPressure: 1.26 },
  { timestamp: '12:00:00', timeLabel: '12:00', soilMoisture: 31.0, soilMoistureBaseline: 30.0, soilMoistureMin: 27.0, soilMoistureMax: 33.0, temperature: 25.1, tempThresholdMax: 26.0, humidity: 53, irrigationFlow: 395, irrigationLimit: 450, digesterPressure: 1.24 },
  { timestamp: '12:15:00', timeLabel: '12:15', soilMoisture: 30.7, soilMoistureBaseline: 30.0, soilMoistureMin: 27.0, soilMoistureMax: 33.0, temperature: 25.4, tempThresholdMax: 26.0, humidity: 52, irrigationFlow: 410, irrigationLimit: 450, digesterPressure: 1.23 },
  { timestamp: '12:30:00', timeLabel: '12:30', soilMoisture: 30.5, soilMoistureBaseline: 30.0, soilMoistureMin: 27.0, soilMoistureMax: 33.0, temperature: 25.2, tempThresholdMax: 26.0, humidity: 51, irrigationFlow: 400, irrigationLimit: 450, digesterPressure: 1.25 },
  { timestamp: '12:45:00', timeLabel: '12:45', soilMoisture: 31.2, soilMoistureBaseline: 30.0, soilMoistureMin: 27.0, soilMoistureMax: 33.0, temperature: 24.9, tempThresholdMax: 26.0, humidity: 53, irrigationFlow: 380, irrigationLimit: 450, digesterPressure: 1.24 },
];

export const INITIAL_ALERTS: IncidentAlert[] = [
  {
    id: 'INC-2026-081',
    alertId: 'SEC-MODBUS-UNAUTH-01',
    title: 'Unauthenticated Modbus Coil Write on Field Irrigation PLC',
    severity: 'high',
    assetId: 'IRRIGATION-CTRL-001',
    assetName: 'West Quad Center Pivot Variable-Rate PLC',
    facility: 'Smart Farm',
    category: 'Operational Logic Breach',
    timestamp: 'Today at 09:14 UTC',
    timeAgo: '2h ago',
    status: 'open',
    observedMetric: 'Write Single Coil (FC 0x05) from IP 192.168.4.112',
    configuredBaseline: 'Whitelisted SCADA Master IP 192.168.2.10 only',
    physicalImpact: 'Risk of manual valve cycle causing hydraulic hammer and branch overpressurization.',
    financialImpact: 'Estimated ₹1,25,000 pump impeller overhaul and motor rewinding if run dry.',
    whatHappened: 'An unexpected write coil command was transmitted across the field control network from an uncataloged maintenance laptop IP.',
    whyItMatters: 'If untracked maintenance overrides are allowed without authentication, pump schedules can be misaligned or run dry, degrading pump impellers.',
    whatToDoNext: [
      'Verify whether Field Tech Team A was conducting manual line priming.',
      'Check firewall NAT rule on Industrial Gateway 001.',
      'Isolate IP 192.168.4.112 pending technician authentication confirmation.'
    ],
    operatorNotes: ['System logged automatic MAC query. Awaiting confirmation from irrigation crew.'],
    timeline: [
      { time: '09:14:02', event: 'Inbound TCP connection on port 502 from 192.168.4.112', type: 'system' },
      { time: '09:14:03', event: 'Modbus FC 0x05 (Write Single Coil) sent to Register 00014', type: 'telemetry' },
      { time: '09:14:05', event: 'AgriShield Rule AG-OT-MODBUS-04 flagged unexpected origin IP', type: 'detection' },
      { time: '09:14:06', event: 'Alert INC-2026-081 created with High severity', type: 'system' }
    ]
  },
  {
    id: 'INC-2026-079',
    alertId: 'SEC-FIRMWARE-CVE-02',
    title: 'Outdated Firmware with Known Vulnerabilities on Feedstock VFD',
    severity: 'medium',
    assetId: 'BIOMASS-FEED-001',
    assetName: 'Feedstock Auger Variable Frequency Drive',
    facility: 'Bio-Power Facility',
    category: 'Unsegmented Traffic',
    timestamp: 'Yesterday at 16:40 UTC',
    timeAgo: '20h ago',
    status: 'investigating',
    observedMetric: 'Firmware v2.16 (Vulnerable to CVE-2023-38545 denial-of-service)',
    configuredBaseline: 'Vendor patched release v2.24+ required for Zone 2 assets',
    physicalImpact: 'VFD reboot or denial of service could choke biomass feed to the thermal boiler.',
    financialImpact: 'Estimated ₹45,000/hr grid power export downtime and SATAT tariff penalty.',
    whatHappened: 'Annual OT vulnerability baseline scan identified unpatched firmware on older serial-to-ethernet bridge.',
    whyItMatters: 'Legacy VFDs on flat subnets are vulnerable to broadcast packet storms causing motor trips.',
    whatToDoNext: [
      'Schedule maintenance window during Friday plant turnaround for firmware flash.',
      'Apply micro-segmentation rule in Zone 2 switch to drop unapproved multicast packets.'
    ],
    operatorNotes: ['Lead plant engineer notified. Firmware scheduled for flash on Friday 18:00.'],
    acknowledgedBy: 'Lead OT Tech R. Davies',
    acknowledgedAt: 'Yesterday at 17:10 UTC',
    timeline: [
      { time: '16:40:11', event: 'OT Asset Fingerprinting detected firmware v2.16 hash', type: 'system' },
      { time: '16:40:15', event: 'Advisory CVE-2023-38545 matched against asset profile', type: 'detection' },
      { time: '17:10:00', event: 'Operator R. Davies marked alert as under investigation', type: 'operator' }
    ]
  }
];

export const THREAT_SCENARIOS: ThreatScenario[] = [
  {
    id: 'A',
    name: 'Scenario A: Suspicious Sensor Reading',
    category: 'Smart Agriculture / Physical Process Anomaly',
    targetAssetId: 'FARM-SENSOR-001',
    targetAssetName: 'Sector 4 Valley Multi-Depth Soil Moisture Probe',
    facility: 'Smart Farm',
    difficulty: 'Moderate (Sensor Spoofing / Malfunction)',
    summary: 'A soil moisture probe reports an abnormal spike to 84.5% VWC without recorded rainfall, contradicting adjacent reference sensors.',
    setup: 'Simulates a compromised field sensor or physical probe short-circuit fooling automated irrigation algorithms into starving crops of water.',
    originalReading: '31.2% VWC (Optimal Root Zone Moisture)',
    suspiciousReading: '84.5% VWC (+172% sudden jump in 60s)',
    whyDangerous: 'Autonomous irrigation algorithm misinterprets root zone as saturated, withholding scheduled watering for 72 hours during grape flowering.',
    howDetected: 'AgriShield multi-sensor correlation detected 54.7% divergence against reference probe FARM-SENSOR-002 and 0.0mm weather station rain.',
    actionTaken: 'Quarantined false reading from PLC schedule; flagged anomaly; triggered operator dispatch notification.',
    physicalConsequence: 'Severe drought stress, foliage scorching, and irreversible drop in grape cluster weight.',
    financialConsequence: 'Estimated ₹14.5 Lakhs crop yield loss on 25 vineyard acres (Nashik export cluster).',
    storyStages: [
      {
        stage: 'Normal Operation',
        title: 'Calibrated Soil Baseline',
        description: 'Sensor FARM-SENSOR-001 reports 31.2% VWC, consistent with reference sensor FARM-SENSOR-002 (29.8% VWC).',
        telemetryDisplay: '31.2% VWC (Normal)',
        durationMs: 1400
      },
      {
        stage: 'Suspicious Activity',
        title: 'Inject Spoofed Telemetry Frame',
        description: 'Compromised packet transmits artificial reading of 84.5% VWC (+172% jump). Weather station confirms zero rain (0.0mm).',
        telemetryDisplay: '84.5% VWC (Abnormal Spike)',
        durationMs: 1800
      },
      {
        stage: 'AgriShield Detection',
        title: 'Spatial Behavioral Correlation Failure',
        description: 'AgriShield AI identifies impossible rate-of-change and cross-sensor contradiction with adjacent Block 4A probe.',
        telemetryDisplay: 'Delta: +54.7% divergence flagged',
        durationMs: 2000
      },
      {
        stage: 'Risk Prevention',
        title: 'Autonomous Telemetry Quarantine',
        description: 'Spoofed reading is blocked from entering the automated irrigation PLC. Prevents 72-hour automated water shutoff.',
        telemetryDisplay: 'Ingest: Quarantined | Control: Safe',
        durationMs: 1800
      },
      {
        stage: 'Recommended Response',
        title: 'Dispatch Verification & Alert Generation',
        description: 'Alert INC-2026-092 fired. Directs field technician to inspect physical cable probe for water damage or unauthorized tap.',
        telemetryDisplay: 'Alert Dispatched -> Awaiting Tech',
        durationMs: 1500
      }
    ]
  },
  {
    id: 'B',
    name: 'Scenario B: Invalid Telemetry Signature',
    category: 'Cybersecurity / Cryptographic Integrity Breach',
    targetAssetId: 'BIOPOWER-GATEWAY-001',
    targetAssetName: 'Anaerobic Digester Methane Control Gateway',
    facility: 'Bio-Power Facility',
    difficulty: 'High (Cryptographic Ingestion Forgery)',
    summary: 'An unauthorized packet attempts to inject bogus anaerobic digester pressure telemetry using an invalid Ed25519 signature.',
    setup: 'Tests AgriShield\'s cryptographic authentication pipeline. Verifies that malformed or unauthorized telemetry is blocked before entering the control loop.',
    originalReading: '1.24 Bar (Safe Methane Pressure)',
    suspiciousReading: '0.42 Bar (Forged frame with bogus key)',
    whyDangerous: 'False low-pressure readings would abort emergency flaring and overfill the digester dome, risking hazardous methane gas venting.',
    howDetected: 'Ed25519 Curve25519 public key hash failed verification against AgriShield Hardware Security Vault.',
    actionTaken: 'Packet immediately dropped at gateway boundary; quarantine log generated; Zero-Trust bus preserved.',
    physicalConsequence: 'Dome over-pressurization, dangerous flammable methane escape, and emergency plant shutdown.',
    financialConsequence: 'Estimated ₹18.5 Lakhs in safety flaring loss, SATAT tariff penalty, and grid intertie trip.',
    storyStages: [
      {
        stage: 'Normal Operation',
        title: 'Cryptographic Origin Enrolled',
        description: 'Valid telemetry signed by enrolled secure element (ATECC608) arrives with valid Ed25519 signature.',
        telemetryDisplay: '1.24 Bar (Signature: Verified)',
        durationMs: 1400
      },
      {
        stage: 'Suspicious Activity',
        title: 'Inject Rogue Unverified Frame',
        description: 'Man-in-the-middle frame claims digester pressure dropped to 0.42 Bar, signed with an unrecognized key digest.',
        telemetryDisplay: '0.42 Bar (Key: 0xDEADBEEF...)',
        durationMs: 1800
      },
      {
        stage: 'AgriShield Detection',
        title: 'Hardware Signature Verification Fails',
        description: 'AgriShield Cryptographic Gateway compares SHA-256 payload digest with vault public key. Signature mismatch: REJECTED.',
        telemetryDisplay: 'Crypto Auth: FAIL (0x7F... != Expected)',
        durationMs: 2000
      },
      {
        stage: 'Risk Prevention',
        title: 'Zero-Trust Protocol Drop',
        description: 'Malformed packet is isolated in Message Inspector quarantine buffer. SCADA flaring threshold logic remains undisturbed.',
        telemetryDisplay: 'Packet Dropped | Loop Protected',
        durationMs: 1800
      },
      {
        stage: 'Recommended Response',
        title: 'Port Audit & Key Rotation Advisory',
        description: 'Critical alert INC-2026-093 created. Advises plant network administrator to inspect industrial switch port 14.',
        telemetryDisplay: 'Critical Incident -> SOC Review',
        durationMs: 1500
      }
    ]
  },
  {
    id: 'C',
    name: 'Scenario C: Irrigation Limits & Tariff Envelope Breach',
    category: 'Operational Policy / ICS Business Logic Deviation',
    targetAssetId: 'IRRIGATION-CTRL-001',
    targetAssetName: 'West Quad Center Pivot Variable-Rate PLC',
    facility: 'Smart Farm',
    difficulty: 'Moderate (Unauthorized Override)',
    summary: 'Irrigation controller reports hydraulic flow rate of 820 L/min for 180 minutes during peak energy tariffs, exceeding safety boundaries.',
    setup: 'Demonstrates ICS business-logic monitoring. AgriShield detects pump operation exceeding the safety envelope even when the command protocol is valid.',
    originalReading: '380 L/min @ 4.2 Bar (Standard schedule)',
    suspiciousReading: '820 L/min (182% Limit - Peak Tariff)',
    whyDangerous: 'Water hammer risks pipe blowout; excessive continuous load causes pump motor cavitation and utility penalty fees.',
    howDetected: 'AgriShield ICS Policy Engine correlated flow telemetry with electric utility time-of-use tariff schedule (14:00-18:00).',
    actionTaken: 'Flagged business-logic breach; sent throttle advisory; generated High-priority incident INC-2026-094.',
    physicalConsequence: 'Main PVC pipe rupture and severe centrifugal pump impeller cavitation.',
    financialConsequence: '₹3.2 Lakhs State DISCOM peak tariff penalty plus ₹8.5 Lakhs underground PVC pipeline replacement.',
    storyStages: [
      {
        stage: 'Normal Operation',
        title: 'Operating within Envelope',
        description: 'Center pivot running at 380 L/min within daytime threshold (max 450 L/min). Pressure steady at 4.2 Bar.',
        telemetryDisplay: '380 L/min (Within limits)',
        durationMs: 1400
      },
      {
        stage: 'Suspicious Activity',
        title: 'Ramp Command Exceeds Boundaries',
        description: 'PLC commands pump to 820 L/min (182% capacity) with run timer set to 180 min during peak cost window.',
        telemetryDisplay: '820 L/min (Overload Command)',
        durationMs: 1800
      },
      {
        stage: 'AgriShield Detection',
        title: 'ICS Business-Logic Rule Triggered',
        description: 'Rule AG-OT-FLOW-02 identifies simultaneous hydraulic limit violation and peak electric demand surcharge.',
        telemetryDisplay: 'Rule AG-OT-FLOW-02: BREACH',
        durationMs: 2000
      },
      {
        stage: 'Risk Prevention',
        title: 'Overpressure Advisory Issued',
        description: 'AgriShield alerts operator to engage pressure relief bypass before water hammer blows underground PVC joints.',
        telemetryDisplay: 'Throttle Advisory Dispatched',
        durationMs: 1800
      },
      {
        stage: 'Recommended Response',
        title: 'Operator Verification Required',
        description: 'Alert INC-2026-094 logged. Operator prompted to physically inspect Pump Station Bravo manifold and throttle VFD.',
        telemetryDisplay: 'Action Required: Operator Check',
        durationMs: 1500
      }
    ]
  },
  {
    id: 'D',
    name: 'Scenario D: Cold-Chain Temperature Excursion',
    category: 'Food Safety / Cold-Chain Integrity Threat',
    targetAssetId: 'COLDSTORE-TEMP-001',
    targetAssetName: 'Cold-Storage Vault Unit 3 (Vaccine & High-Value Produce)',
    facility: 'Cold Storage',
    difficulty: 'High (Refrigeration Failure / Thermostat Tampering)',
    summary: 'Chamber 3 temperature surges from -18.4°C to -4.2°C over 40 minutes, breaching the -16.0°C critical threshold while compressor telemetry indicates normal draw.',
    setup: 'Simulates a critical cold-chain failure or thermostatic spoofing attack threatening high-value pharmaceutical seed stock and frozen export produce.',
    originalReading: '-18.4°C (Safe Sub-Zero Holding)',
    suspiciousReading: '-4.2°C (Critical Spoilage Excursion)',
    whyDangerous: 'Exposure above -10°C triggers cellular thaw and spoilage of ₹28.5 Lakhs Controlled Atmosphere cold stock within 60 minutes.',
    howDetected: 'AgriShield Physical Impact Engine detected rapid rate-of-climb while compressor current draw was normal (indicating refrigerant loss or door ajar).',
    actionTaken: 'Calculated 60-minute spoilage horizon; sounded emergency alerts; initiated stock transfer protocol.',
    physicalConsequence: 'Total thermal degradation of vaccine supplies and export soft fruit produce.',
    financialConsequence: '₹28.5 Lakhs complete inventory loss and FSSAI regulatory food safety quarantine.',
    storyStages: [
      {
        stage: 'Normal Operation',
        title: 'Chamber Holding Deep Freeze',
        description: 'Chamber 3 steady at -18.4°C. Baseline requires temperature to remain strictly between -20.0°C and -16.0°C.',
        telemetryDisplay: '-18.4°C (Sub-Zero Safe)',
        durationMs: 1400
      },
      {
        stage: 'Suspicious Activity',
        title: 'Rapid Temperature Climb Injected',
        description: 'Temperature telemetry climbs rapidly: -16.1°C -> -11.4°C -> -4.2°C. Compressor power indicates normal draw.',
        telemetryDisplay: '-4.2°C (Thermal Excursion!)',
        durationMs: 1800
      },
      {
        stage: 'AgriShield Detection',
        title: 'Thermal Dissipation Disconnect Flagged',
        description: 'AgriShield correlates temperature climb against compressor power: power draw is normal, pointing to refrigerant loss or vault door unlatched.',
        telemetryDisplay: 'Thermal Anomaly: Rate-of-climb > 3x',
        durationMs: 2000
      },
      {
        stage: 'Risk Prevention',
        title: '60-Minute Spoilage Horizon Countdown',
        description: 'Autonomous impact engine calculates countdown to irreversible spoilage. Automated alert dispatched to maintenance pager.',
        telemetryDisplay: 'Countdown: 60m to inventory loss',
        durationMs: 1800
      },
      {
        stage: 'Recommended Response',
        title: 'Emergency Stock Relocation Protocol',
        description: 'Alert INC-2026-095 created. Directs shift supervisor to inspect door seal and prepare backup dry-ice transfer to Vault 2.',
        telemetryDisplay: 'Emergency Dispatch Active',
        durationMs: 1500
      }
    ]
  }
];

export const INITIAL_RISK_REGISTER: RiskRegisterItem[] = [
  {
    id: 'RISK-01',
    title: 'Unauthenticated Modbus Protocol on Field Irrigation Subnet',
    assetId: 'IRRIGATION-CTRL-001',
    facility: 'Smart Farm',
    severity: 'high',
    likelihood: 'High',
    impact: 'Severe',
    score: 78,
    evidence: 'Plaintext Modbus TCP without cryptographic authentication allowed on VLAN 40.',
    potentialConsequence: 'Attacker on local WiFi/cellular bridge can inject arbitrary coil writes to pump valves.',
    remediationStatus: 'In Progress',
    recommendation: 'Deploy AgriShield Edge Enclave proxy with HMAC validation or upgrade to Modbus Security (TLS encapsulation).'
  },
  {
    id: 'RISK-02',
    title: 'Legacy Firmware on Biomass Feedstock VFD (CVE-2023-38545)',
    assetId: 'BIOMASS-FEED-001',
    facility: 'Bio-Power Facility',
    severity: 'medium',
    likelihood: 'Medium',
    impact: 'Moderate',
    score: 54,
    evidence: 'Firmware v2.16 contains buffer overflow in legacy embedded web server.',
    potentialConsequence: 'Motor drive crash during peak power export causing unplanned generator shutdown.',
    remediationStatus: 'Not Started',
    recommendation: 'Flash vendor patch v2.24 and disable web server interface in favor of local serial commissioning.'
  },
  {
    id: 'RISK-03',
    title: 'Lack of Hardware Root-of-Trust on Soil Moisture Nodes',
    assetId: 'FARM-SENSOR-001',
    facility: 'Smart Farm',
    severity: 'low',
    likelihood: 'Low',
    impact: 'Moderate',
    score: 32,
    evidence: 'Field nodes utilize software-stored keys in microcontroller flash rather than dedicated secure elements.',
    potentialConsequence: 'Physical extraction of key material if sensor is stolen from remote vineyard plot.',
    remediationStatus: 'Not Started',
    recommendation: 'Include Microchip ATECC608 secure element in next hardware generation; enforce rate-limiting in software.'
  },
  {
    id: 'RISK-04',
    title: 'Single Point of Temperature Telemetry in Cold-Chain Chamber 3',
    assetId: 'COLDSTORE-TEMP-001',
    facility: 'Cold Storage',
    severity: 'high',
    likelihood: 'Medium',
    impact: 'Severe',
    score: 72,
    evidence: 'Only one primary RTD temperature probe actively monitored by the SCADA system.',
    potentialConsequence: 'Undetected sensor drift or spoofing could cause silent thaw of ₹28.5 Lakhs perishable inventory.',
    remediationStatus: 'In Progress',
    recommendation: 'Install secondary independent battery-backed wireless probe for automated two-out-of-two cross-validation.'
  }
];

export const DEFAULT_INVESTOR_INPUTS: InvestorCalculatorInputs = {
  payingCustomers: 35,
  annualContractValue: 360000, // ₹3.6 Lakhs ACV (₹30,000 / month / facility)
  monitoredDevicesPerCustomer: 45,
  assessmentFee: 125000, // ₹1.25 Lakhs per OT diagnostic assessment
  annualOperatingExpenses: 4800000, // ₹48 Lakhs annual OpEx
  tamBillion: 11500, // ₹11,500 Crore TAM across Indian agro-industrial OT
  samBillion: 2800, // ₹2,800 Crore SAM
  somMillion: 240 // ₹240 Crore SOM
};
