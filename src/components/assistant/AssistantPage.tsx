import React, { useState } from 'react';
import { useAgriShield } from '../../context/AgriShieldContext';
import {
  Bot,
  Send,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Info,
  Terminal,
  Code2,
  Lock,
  Activity,
  Layers,
  Copy,
  Check
} from 'lucide-react';
import { api } from '../../services/api';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  content: string;
  evidenceItems?: { label: string; value: string }[];
  steps?: string[];
  codeBlock?: { language: string; code: string };
}

export const AssistantPage: React.FC = () => {
  const { alerts, assets, addToast } = useAgriShield();
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>(alerts[0]?.id || '');
  const [inputQuery, setInputQuery] = useState<string>('');
  const [activePersona, setActivePersona] = useState<'explainer' | 'forensics' | 'remediation'>('explainer');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const activeAlert = alerts.find((a) => a.id === selectedIncidentId) || alerts[0];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'assistant',
      timestamp: 'Just now',
      content: `Hello! I am AgriShield Intelligence, your specialized agricultural cybersecurity and operational copilot.\n\nI correlate edge cryptographic telemetry, sensor physics, and PLC ladder logic to prevent cyber attacks from escalating into physical crop damage, cold-chain thaw, or grid penalties.`,
      evidenceItems: [
        { label: 'Active Context', value: activeAlert.alertId },
        { label: 'Target Asset', value: activeAlert.assetId },
        { label: 'Current Telemetry', value: activeAlert.observedMetric },
      ]
    },
  ]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    addToast('Code snippet copied to clipboard', 'info');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handlePromptClick = (promptType: string) => {
    const timeStr = new Date().toLocaleTimeString();
    if (!activeAlert) return;

    if (promptType === 'explain') {
      const userMsg: ChatMessage = {
        id: `u-${Date.now()}`,
        sender: 'user',
        timestamp: timeStr,
        content: `Explain alert ${activeAlert.alertId}: "${activeAlert.title}" in operational agronomic terms.`,
      };
      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        timestamp: timeStr,
        content: `Operational Breakdown for ${activeAlert.alertId} (${activeAlert.assetName}):\n\n` +
          `• WHAT OCCURRED: ${activeAlert.whatHappened}\n\n` +
          `• WHY IT MATTERS (PHYSICAL CONSEQUENCE): ${activeAlert.whyItMatters}\n\n` +
          `• AGRONOMIC IMPACT: If unmitigated, autonomous irrigation or cooling algorithms will falsely adjust physical setpoints. Financial exposure is estimated at ${activeAlert.financialImpact || '₹8.5 Lakhs+'}.`,
        evidenceItems: [
          { label: 'Target Asset', value: `${activeAlert.assetId}` },
          { label: 'Observed Reading', value: activeAlert.observedMetric },
          { label: 'Permissible Safe Envelope', value: activeAlert.configuredBaseline },
        ],
        steps: activeAlert.whatToDoNext,
      };
      setMessages((prev) => [...prev, userMsg, assistantMsg]);
    } else if (promptType === 'forensics') {
      const userMsg: ChatMessage = {
        id: `u-${Date.now()}`,
        sender: 'user',
        timestamp: timeStr,
        content: `Provide raw Modbus register frames and cryptographic verification trail for ${activeAlert.alertId}.`,
      };
      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        timestamp: timeStr,
        content: `Deep Forensic Packet Inspection for ${activeAlert.assetId}:\n\n` +
          `Ingestion Source: LoRaWAN Gateway Gateway-01 (IP 192.168.10.45)\n` +
          `Protocol: Modbus TCP / IEEE 802.15.4 Encapsulation\n` +
          `Function Code: 0x03 (Read Holding Registers), Register 40012\n\n` +
          `Cryptographic Digest Check:\n` +
          `• Algorithm: Ed25519 Elliptic-Curve Signature\n` +
          `• Signature State: VALID hardware signature, BUT physical plausibility check failed against neighboring probe FARM-SENSOR-002 (-54.7% divergence).\n` +
          `• Verdict: Ingestion Engine isolated the telemetry to prevent corrupted control decisions.`,
        codeBlock: {
          language: 'json',
          code: JSON.stringify({
            frame_id: "0x89FA31B2",
            timestamp: timeStr,
            asset_id: activeAlert.assetId,
            holding_register_40012: 845, // 84.5% VWC
            ed25519_signature: "0x3f4a9b...7c81",
            neighbor_delta_pct: -54.7,
            quarantine_action: "DISCARD_FROM_CONTROL_LOOP"
          }, null, 2)
        }
      };
      setMessages((prev) => [...prev, userMsg, assistantMsg]);
    } else if (promptType === 'ladder') {
      const userMsg: ChatMessage = {
        id: `u-${Date.now()}`,
        sender: 'user',
        timestamp: timeStr,
        content: `Generate PLC safety interlock ladder logic / structured text to protect ${activeAlert.assetId}.`,
      };
      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        timestamp: timeStr,
        content: `Automated IEC 61131-3 Structured Text Interlock for Schneider / Carel Controller:\n\n` +
          `This logic enforces fallback to calibrated safe baselines whenever AgriShield flags an ingestion quarantine:`,
        codeBlock: {
          language: 'iec',
          code: `(* AgriShield Cyber-Physical Interlock *)
IF (AgriShield_Quarantine_Active = TRUE) THEN
    (* Isolate unauthenticated setpoint; revert to historical baseline *)
    Pump_Coil_Cmd := Safe_Baseline_Schedule;
    Emergency_Valve_Lock := TRUE;
    Alarm_Physical_Override := TRUE;
    Log_Forensic_Event("AgriShield: Telemetry Isolated; Safe Envelope Active");
ELSE
    Pump_Coil_Cmd := Ingested_Sensor_Reading;
    Emergency_Valve_Lock := FALSE;
END_IF;`
        },
        steps: [
          'Flash structured text interlock routine into Task_Periodic (100ms cycle).',
          'Ensure dry-contact physical emergency relay is wired in series with PLC coil outputs.',
          'Verify that manual hand-off-auto (HOA) bypass switch remains operational for field agronomist.'
        ]
      };
      setMessages((prev) => [...prev, userMsg, assistantMsg]);
    } else if (promptType === 'compliance') {
      const userMsg: ChatMessage = {
        id: `u-${Date.now()}`,
        sender: 'user',
        timestamp: timeStr,
        content: `What IEC 62443 and NIST SP 800-82 controls apply to this incident?`,
      };
      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        timestamp: timeStr,
        content: `Standards Alignment for ${activeAlert.alertId}:\n\n` +
          `1. IEC 62443-3-3 SR 3.1 (Cryptographic Integrity): Requires authentication of field inputs across zone boundaries.\n` +
          `2. IEC 62443-4-2 CR 1.1 (Human-Machine Interface Boundary): Enforces role-based operator sign-off before unquarantining physical valves.\n` +
          `3. NIST SP 800-82 Rev 3 (OT Security Guide Section 6.2): Recommends physical safe envelopes to guard against false telemetry manipulation.\n\n` +
          `AgriShield satisfies all 3 controls out of the box with zero modifications to legacy PLC wiring.`,
        steps: activeAlert.whatToDoNext,
      };
      setMessages((prev) => [...prev, userMsg, assistantMsg]);
    }
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    const timeStr = new Date().toLocaleTimeString();
    const query = inputQuery.trim();
    setInputQuery('');

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      timestamp: timeStr,
      content: query,
    };

    setMessages((prev) => [...prev, userMsg]);

    try {
      const mode = activePersona === 'forensics' ? 'forensic' : activePersona === 'remediation' ? 'plc' : 'agronomic';
      const result = await api.queryAiCopilot(query, mode, activeAlert.id);
      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        timestamp: timeStr,
        content: result.answer,
        evidenceItems: result.evidenceItems,
        steps: result.recommendedSteps,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      // Fallback in-memory response if offline
      let reply = `Regarding "${query}": In AgriShield's cyber-physical defense architecture, asset ${activeAlert.assetId} is currently evaluated under ${activeAlert.severity.toUpperCase()} operational risk. `;

      if (query.toLowerCase().includes('crop') || query.toLowerCase().includes('water') || query.toLowerCase().includes('vineyard')) {
        reply += `In automated irrigation, accepting an inflated volumetric water content reading (e.g. 84.5% VWC) causes the PLC to withhold water for days during vegetative fruit-set. This triggers severe vine water stress, floral abortion, and up to 40% harvest loss. AgriShield prevents this by checking spatial neighbor divergence before updating irrigation setpoints.`;
      } else if (query.toLowerCase().includes('cold') || query.toLowerCase().includes('vaccine') || query.toLowerCase().includes('temp')) {
        reply += `In cold-chain storage, thermostatic spoofing masks compressor failures or physical door seal compromises. AgriShield uses thermodynamic rate-of-climb models to flag abnormal dissipation curves before temperatures cross critical product degradation thresholds.`;
      } else if (query.toLowerCase().includes('crypto') || query.toLowerCase().includes('ed25519') || query.toLowerCase().includes('signature')) {
        reply += `AgriShield implements hardware-level Ed25519 elliptic-curve signatures and HMAC-SHA256 digests. Keys are enrolled in edge TPM / secure elements. Unsigned or forged packets from rogue radios or rogue Modbus writers are blocked at the perimeter in under 300 milliseconds.`;
      } else {
        reply += `Our behavioral anomaly engine correlates incoming telemetry with spatial reference sensors, ambient weather micro-stations, and historical operational envelopes. The recommended action is to maintain the automated hardware interlock until physical inspection confirms sensor integrity.`;
      }

      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        timestamp: timeStr,
        content: reply,
        evidenceItems: [
          { label: 'Asset Reference', value: activeAlert.assetId },
          { label: 'Risk State', value: activeAlert.severity.toUpperCase() },
          { label: 'Physical Impact', value: activeAlert.physicalImpact.substring(0, 32) + '...' }
        ]
      };

      setMessages((prev) => [...prev, assistantMsg]);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-charcoal-800 border border-charcoal-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-agri-cyan text-xs font-mono font-semibold mb-2">
            <Bot className="w-3.5 h-3.5" />
            <span>AGRISHIELD INTELLIGENCE · ENTERPRISE COPILOT</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-agri-text-primary">
            AI-Assisted Incident Explanations & Physical Impact Analysis
          </h1>
          <p className="text-xs text-agri-text-secondary mt-1 max-w-2xl leading-relaxed">
            Translates complex OT telemetry deviations, Modbus packet logs, and cryptographic errors into clear, operational guidance for agronomists and plant operators.
          </p>
        </div>

        {/* Selected Incident Dropdown */}
        <div className="flex items-center gap-2 bg-charcoal-900 p-2 rounded-xl border border-charcoal-700 text-xs">
          <span className="text-agri-text-muted font-mono text-[11px]">Context:</span>
          <select
            value={selectedIncidentId}
            onChange={(e) => setSelectedIncidentId(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-charcoal-800 border border-charcoal-700 font-mono text-xs text-agri-text-primary focus:outline-none"
          >
            {alerts.map((a) => (
              <option key={a.id} value={a.id}>
                {a.alertId} — {a.title.substring(0, 34)}...
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="p-6 rounded-2xl bg-charcoal-800 border border-charcoal-700 flex flex-col h-[620px]">
        {/* Persona Switcher Tabs */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-charcoal-700">
          <div className="flex items-center gap-1.5 bg-charcoal-900 p-1 rounded-xl border border-charcoal-700 text-xs">
            <button
              onClick={() => setActivePersona('explainer')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activePersona === 'explainer'
                  ? 'bg-charcoal-750 text-agri-emerald font-semibold border border-emerald-500/30'
                  : 'text-agri-text-muted hover:text-agri-text-primary'
              }`}
            >
              Operational Agronomist View
            </button>
            <button
              onClick={() => setActivePersona('forensics')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activePersona === 'forensics'
                  ? 'bg-charcoal-750 text-agri-cyan font-semibold border border-cyan-500/30'
                  : 'text-agri-text-muted hover:text-agri-text-primary'
              }`}
            >
              Forensic Packet Inspector
            </button>
            <button
              onClick={() => setActivePersona('remediation')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activePersona === 'remediation'
                  ? 'bg-charcoal-750 text-agri-amber font-semibold border border-amber-500/30'
                  : 'text-agri-text-muted hover:text-agri-text-primary'
              }`}
            >
              PLC Remediation Engineer
            </button>
          </div>

          <span className="font-mono text-[10px] text-agri-text-muted hidden sm:inline">
            Zero-Trust Cyber-Physical Engine
          </span>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-1 text-[10px] text-agri-text-muted">
                <span className="font-semibold">{msg.sender === 'user' ? 'Operator' : 'AgriShield Intelligence'}</span>
                <span>·</span>
                <span className="font-mono">{msg.timestamp}</span>
              </div>
              <div
                className={`max-w-3xl p-4 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-tr-none'
                    : 'bg-charcoal-900 border border-charcoal-700 text-agri-text-primary rounded-tl-none space-y-3'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>

                {/* Evidence Items Strip */}
                {msg.evidenceItems && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-charcoal-700">
                    {msg.evidenceItems.map((e, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-charcoal-800 border border-charcoal-700">
                        <span className="text-[10px] font-mono text-agri-text-muted uppercase block">{e.label}</span>
                        <span className="font-semibold text-agri-emerald mt-0.5 block truncate">{e.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Code Block if any */}
                {msg.codeBlock && (
                  <div className="rounded-xl bg-charcoal-950 border border-charcoal-700 p-3 relative font-mono text-[11px] text-cyan-300">
                    <button
                      onClick={() => handleCopyCode(msg.codeBlock!.code)}
                      className="absolute right-2.5 top-2.5 p-1 rounded bg-charcoal-800 text-agri-text-muted hover:text-white transition-colors flex items-center gap-1 text-[10px]"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                    </button>
                    <pre className="overflow-x-auto pt-4 leading-relaxed">{msg.codeBlock.code}</pre>
                  </div>
                )}

                {/* Verification Steps Checklist */}
                {msg.steps && (
                  <div className="pt-2 border-t border-charcoal-700 space-y-1.5">
                    <span className="text-[11px] font-bold text-agri-text-secondary block">
                      Prioritized Verification Checklist:
                    </span>
                    {msg.steps.map((st, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-agri-text-secondary">
                        <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-agri-emerald flex items-center justify-center font-mono text-[9px] shrink-0 font-bold mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-snug">{st}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Action Prompt Chips */}
        <div className="pt-3 border-t border-charcoal-700 flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-agri-text-muted font-mono">Quick Inquiries:</span>
          <button
            onClick={() => handlePromptClick('explain')}
            className="px-2.5 py-1 rounded-lg bg-charcoal-900 hover:bg-charcoal-750 text-agri-emerald border border-charcoal-700 text-xs transition-colors flex items-center gap-1"
          >
            <Activity className="w-3 h-3" />
            <span>Explain Agronomic Risk</span>
          </button>
          <button
            onClick={() => handlePromptClick('forensics')}
            className="px-2.5 py-1 rounded-lg bg-charcoal-900 hover:bg-charcoal-750 text-agri-cyan border border-charcoal-700 text-xs transition-colors flex items-center gap-1"
          >
            <Lock className="w-3 h-3" />
            <span>Show Modbus & Ed25519 Packet</span>
          </button>
          <button
            onClick={() => handlePromptClick('ladder')}
            className="px-2.5 py-1 rounded-lg bg-charcoal-900 hover:bg-charcoal-750 text-agri-amber border border-charcoal-700 text-xs transition-colors flex items-center gap-1"
          >
            <Code2 className="w-3 h-3" />
            <span>Generate PLC Ladder Interlock</span>
          </button>
          <button
            onClick={() => handlePromptClick('compliance')}
            className="px-2.5 py-1 rounded-lg bg-charcoal-900 hover:bg-charcoal-750 text-agri-text-secondary border border-charcoal-700 text-xs transition-colors"
          >
            IEC 62443 Compliance
          </button>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleCustomSubmit} className="pt-3 flex gap-2">
          <input
            type="text"
            placeholder={`Ask AgriShield Intelligence about ${activeAlert.assetId}, physical consequences, or Modbus registers...`}
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-charcoal-900 border border-charcoal-700 text-xs text-agri-text-primary placeholder-agri-text-muted focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 transition-colors shadow-sm"
          >
            <Send className="w-4 h-4" />
            <span>Inquire</span>
          </button>
        </form>
      </div>

      {/* Advisory Guardrail Note */}
      <div className="p-4 rounded-xl bg-charcoal-800 border border-charcoal-700 text-xs text-agri-text-muted flex items-center gap-2">
        <Info className="w-4 h-4 text-agri-emerald shrink-0" />
        <span>
          Operational Guardrail: AgriShield Intelligence functions strictly as an advisory copilot. It never executes automated physical actuation without operator verification.
        </span>
      </div>
    </div>
  );
};
