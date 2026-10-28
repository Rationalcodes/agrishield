import { store } from '../data/store';
import { IncidentAlert } from '../types';

export type PersonaMode = 'forensic' | 'plc' | 'agronomic';

export class AiService {
  public generateResponse(
    prompt: string,
    mode: PersonaMode = 'agronomic',
    alertId?: string
  ): {
    answer: string;
    evidenceItems: { label: string; value: string }[];
    recommendedSteps: string[];
    persona: string;
  } {
    const alert = alertId ? store.getAlertById(alertId) : store.getAlerts()[0];

    if (mode === 'forensic') {
      return this.generateForensicResponse(prompt, alert);
    } else if (mode === 'plc') {
      return this.generatePlcResponse(prompt, alert);
    } else {
      return this.generateAgronomicResponse(prompt, alert);
    }
  }

  private generateAgronomicResponse(prompt: string, alert?: IncidentAlert) {
    const assetName = alert?.assetName || 'Target Field Probe';
    const impactVal = alert?.financialImpact || '₹14.5 Lakhs';

    return {
      persona: 'Agronomic Impact Specialist',
      answer:
        `Operational Agronomic Assessment:\n\n` +
        `• CROP & SOIL IMPACT: If unmitigated, false telemetry on ${assetName} tricks autonomous variable-rate drip valves into withholding irrigation during flowering or veraison.\n\n` +
        `• WATER STRESS RISK: Extended drought stress during fruit set causes irreversible flower abortion and reduces table grape bunch weight by up to 40%.\n\n` +
        `• ESTIMATED EXPOSURE: ${impactVal} in export yield write-offs across affected orchard blocks. Cold chain produce or bio-methane digester disruptions carry additional compliance penalties under FSSAI / SATAT frameworks.`,
      evidenceItems: [
        { label: 'Monitored Asset', value: alert?.assetId || 'FARM-SENSOR-001' },
        { label: 'Current Reading', value: alert?.observedMetric || '41.8% VWC (Spoofed)' },
        { label: 'Permissible Safe Range', value: alert?.configuredBaseline || '28.0% - 33.0% VWC' },
        { label: 'Financial Consequence', value: impactVal },
      ],
      recommendedSteps: [
        'Override automated irrigation cycle to calibrated manual schedule (35 L/vine/day).',
        'Inspect soil profile with manual TDR probe in Sector 4 Block 4B.',
        'Verify Ed25519 enrollment status on LoRaWAN edge gateway.',
      ],
    };
  }

  private generateForensicResponse(prompt: string, alert?: IncidentAlert) {
    const alertCode = alert?.alertId || 'SEC-092';

    return {
      persona: 'OT Cryptographic & Protocol Forensic Auditor',
      answer:
        `Forensic Incident Dossier [${alertCode}]:\n\n` +
        `• INGESTION INTEGRITY: Packet received with missing or forged cryptographic hardware signature. Ed25519 verification failed at edge demarcation firewall.\n\n` +
        `• PACKET ANATOMY: Injected frame contains Modbus Function Code 0x05 (Write Single Coil) targeting internal holding registers without authenticated session token.\n\n` +
        `• SPATIAL DIVERGENCE: Sensor reading diverges by >3.8 standard deviations (σ) from adjacent spatial reference probe (FARM-SENSOR-002) situated 45m away.\n\n` +
        `• CERT-IN DIRECTIVE STATUS: Incident classification logged. Mandatory 6-hour disclosure window is active with NTP-synced timestamped audit trail.`,
      evidenceItems: [
        { label: 'Auth Algorithm', value: 'Ed25519 / HMAC-SHA256' },
        { label: 'Validation Result', value: 'REJECTED (0x44bc... mismatch)' },
        { label: 'Spatial Divergence', value: '+3.84 Sigma (Anomaly Flagged)' },
        { label: 'Network Zone', value: 'Purdue Zone 1 -> Zone 2 Ingress' },
      ],
      recommendedSteps: [
        'Isolate rogue MAC address from OT field subnet VLAN 102.',
        'Rotate gateway pre-shared secret in hardware secure enclave.',
        'Export PCAP capture log for CERT-In incident filing.',
      ],
    };
  }

  private generatePlcResponse(prompt: string, alert?: IncidentAlert) {
    const assetId = alert?.assetId || 'IRRIGATION-CTRL-001';

    return {
      persona: 'Industrial Automation & PLC Systems Engineer',
      answer:
        `PLC Ladder Logic & Control Loop Diagnostic for ${assetId}:\n\n` +
        `• HARDWARE INTERLOCK: AgriShield Zero-Trust Relay has locked coil %QX0.4 (Main Well Pump) to calibrated safe operating envelope (200 - 450 L/min).\n\n` +
        `• LADDER LOGIC OVERRIDE:\n` +
        `  |--[ AgriShield_Safe_OK ]----+----[ %IX0.1_Sensor_Valid ]----( %QX0.4_Pump_Run )--|\n` +
        `  |                            |                                                    |\n` +
        `  |--[ FailSafe_Interlock ]----+----[ Manual_Bypass_Key ]---------------------------|\n\n` +
        `• SETPOINT RECOVERY: Remote writes to register 40012 (Flow Setpoint) are restricted to local HMI physical key switch only.`,
      evidenceItems: [
        { label: 'Target Controller', value: assetId },
        { label: 'Interlock Status', value: 'ACTIVE (Hardware Safe Mode)' },
        { label: 'Modbus Holding Reg', value: '40012 Locked' },
        { label: 'PLC Scan Cycle', value: '12ms (Normal)' },
      ],
      recommendedSteps: [
        'Verify physical HMI key-switch position on Schneider M241 cabinet.',
        'Inspect 24V DC auxiliary relay contact on AgriShield interlock module.',
        'Reset safety trip latch after manual hydraulic pressure check.',
      ],
    };
  }
}

export const aiService = new AiService();
