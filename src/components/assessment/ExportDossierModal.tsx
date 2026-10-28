import React from 'react';
import { useAgriShield } from '../../context/AgriShieldContext';
import {
  X,
  Printer,
  Download,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Building2,
  Calendar,
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';
import { AgriShieldLogo } from '../common/AgriShieldLogo';

export const ExportDossierModal: React.FC = () => {
  const { isExportDossierOpen, setExportDossierOpen, assets, alerts, addToast } = useAgriShield();

  if (!isExportDossierOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    addToast('Executive OT Risk Dossier (PDF format) compiled & downloaded', 'success');
    setExportDossierOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-charcoal-900 border border-charcoal-700 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Top Action Toolbar */}
        <div className="p-4 bg-charcoal-800 border-b border-charcoal-700 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-agri-emerald" />
            <span className="font-mono text-xs font-bold text-agri-text-primary">
              EXECUTIVE AUDIT DOSSIER // BIS IS/IEC 62443 & CERT-In OT AUDIT
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-charcoal-900 hover:bg-charcoal-750 text-agri-text-secondary hover:text-agri-text-primary border border-charcoal-700 text-xs flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF Report</span>
            </button>
            <button
              onClick={() => setExportDossierOpen(false)}
              className="p-1.5 rounded-lg text-agri-text-muted hover:text-agri-text-primary hover:bg-charcoal-750 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Report Content */}
        <div className="p-8 sm:p-10 space-y-8 overflow-y-auto text-xs leading-relaxed text-agri-text-primary">
          {/* Document Letterhead */}
          <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-charcoal-700">
            <div>
              <AgriShieldLogo size={36} />
              <p className="text-[11px] text-agri-text-muted mt-2">
                AgriShield Technologies India Pvt. Ltd. · Industrial Control & Cyber-Physical Defense Group
              </p>
            </div>
            <div className="text-right font-mono text-[11px] space-y-1">
              <div className="text-agri-emerald font-bold">REPORT REF: AGS-IND-AUDIT-2026-Q4</div>
              <div className="text-agri-text-muted">CLASSIFICATION: RESTRICTED // BOARD BRIEFING</div>
              <div className="text-agri-text-muted">ISSUED: OCTOBER 2026 (INDIA EDITION)</div>
            </div>
          </div>

          {/* Title & Target Enterprise */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-agri-cyan font-bold block">
              OPERATIONAL TECHNOLOGY SECURITY POSTURE & CONVERGED PHYSICAL RISK AUDIT
            </span>
            <h1 className="text-2xl font-black text-agri-text-primary">
              Cyber-Physical Vulnerability & Ingestion Integrity Assessment
            </h1>
            <p className="text-agri-text-secondary text-xs max-w-3xl leading-relaxed">
              Target Entity: <strong>Demo Indian Agro-Industrial Operations (Nashik Autonomous Vineyard, Sonipat CA Cold Vaults, Baramati SATAT Bio-CNG Plant)</strong>. This audit analyzes the attack surface between unauthenticated field telemetry, automated PLC control loops, and critical agronomic yield.
            </p>
          </div>

          {/* Compliance & Readiness Scorecard */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-charcoal-800 border border-charcoal-700 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase text-agri-text-muted font-bold">
                  BIS / IEC 62443-3-3
                </span>
                <span className="font-mono font-bold text-sm text-agri-emerald">84% (SL-2)</span>
              </div>
              <p className="text-[11px] text-agri-text-secondary">
                Bureau of Indian Standards Industrial Network Security. Field I/O segmentation verified.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-charcoal-800 border border-charcoal-700 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase text-agri-text-muted font-bold">
                  CERT-In OT DIRECTIVES
                </span>
                <span className="font-mono font-bold text-sm text-agri-cyan">88% COMPLIANT</span>
              </div>
              <p className="text-[11px] text-agri-text-secondary">
                Mandatory 6-hour cybersecurity incident reporting readiness & synced NTP logs enabled.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-charcoal-800 border border-charcoal-700 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase text-agri-text-muted font-bold">
                  FSSAI SCHEDULE 4
                </span>
                <span className="font-mono font-bold text-sm text-agri-emerald">92% AUDITED</span>
              </div>
              <p className="text-[11px] text-agri-text-secondary">
                Food Safety & Standards Authority perishable cold-chain temperature traceability verified.
              </p>
            </div>
          </div>

          {/* Executive Findings Summary */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-agri-text-primary uppercase font-mono tracking-wider text-agri-amber">
              Executive Finding & Key Exposure Vectors
            </h3>
            <div className="p-4 rounded-xl bg-charcoal-800 border border-charcoal-700 space-y-3">
              <p className="text-agri-text-secondary text-xs leading-relaxed">
                During this operational assessment, 12 critical connected assets across Purdue Zones 1-4 were evaluated. The primary vulnerability stems from <strong>unauthenticated field sensor telemetry</strong> and <strong>flat Modbus TCP subnets</strong> connecting supervisory irrigation controllers and ammonia chiller PLCs.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-charcoal-700 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-agri-red uppercase font-bold block">
                    Highest Immediate Physical Threat:
                  </span>
                  <span className="text-agri-text-primary font-medium">
                    Sensor spoofing simulating saturated soil, fooling variable-rate irrigation into withholding water during flowering (₹14.5 Lakhs crop loss).
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-agri-emerald uppercase font-bold block">
                    AgriShield Mitigation Deployed:
                  </span>
                  <span className="text-agri-text-primary font-medium">
                    Hardware-enrolled Ed25519 cryptographic signatures and automated spatial neighbor divergence checks enforce instant packet quarantine.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 30/60/90-Day Remediation Roadmap */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-agri-text-primary uppercase font-mono tracking-wider text-agri-cyan">
              Prioritized Remediation Roadmap
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-charcoal-800 border border-charcoal-700 space-y-1">
                <span className="font-mono text-agri-emerald font-bold text-xs">DAY 1 - 30: IMMEDIATE</span>
                <p className="text-agri-text-muted text-[11px]">
                  Deploy AgriShield Zero-Trust Ingestion appliance at Demarcation Gateway. Enforce hardware Ed25519 key verification on primary soil probes.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-charcoal-800 border border-charcoal-700 space-y-1">
                <span className="font-mono text-agri-cyan font-bold text-xs">DAY 31 - 60: ISOLATION</span>
                <p className="text-agri-text-muted text-[11px]">
                  Segment Modbus TCP pump controllers into isolated VLANs. Establish fallback safe operating envelopes for cold-storage compressors.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-charcoal-800 border border-charcoal-700 space-y-1">
                <span className="font-mono text-agri-amber font-bold text-xs">DAY 61 - 90: AUTONOMY</span>
                <p className="text-agri-text-muted text-[11px]">
                  Integrate AgriShield Intelligence copilot with facility SCADA alarms for automated fail-safe interlocks and insurance underwriting data.
                </p>
              </div>
            </div>
          </div>

          {/* Signature Block */}
          <div className="pt-6 border-t border-charcoal-700 flex flex-wrap items-center justify-between gap-6 text-[11px] font-mono text-agri-text-muted">
            <div>
              <span className="text-agri-text-primary font-semibold block">Col. Rajiv Menon (Retd.), CISSP, GICSP</span>
              <span>Senior OT Cyber-Physical Architect · AgriShield Labs India</span>
            </div>
            <div>
              <span className="text-agri-text-primary font-semibold block">Dr. Ananya Sharma, Ph.D.</span>
              <span>Principal Agricultural Systems Engineer · ICAR-IARI Fellow</span>
            </div>
            <div className="text-right">
              <span className="text-agri-emerald font-bold block">VERIFIED HASH: SHA256:4a8b...99e1</span>
              <span>Certified under AgriShield Indian OT Assessment Framework v2.1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
