import React, { useState } from 'react';
import { useAgriShield } from '../../context/AgriShieldContext';
import {
  FileCheck2,
  Shield,
  Layers,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Download,
  Info,
  ShieldAlert,
  Server,
  Cpu,
  FileText,
  AlertCircle,
  Filter,
  Eye,
  Sparkles
} from 'lucide-react';

export const AssessmentPage: React.FC = () => {
  const {
    riskRegister,
    setSelectedAsset,
    assets,
    setActiveTab,
    addToast,
    setExportDossierOpen
  } = useAgriShield();

  const [severityFilter, setSeverityFilter] = useState<'all' | 'critical' | 'high' | 'medium'>('all');
  const [selectedMatrixCell, setSelectedMatrixCell] = useState<{ likelihood: string; impact: string } | null>(null);

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'critical':
        return 'bg-agri-red/20 text-agri-red border-agri-red/40';
      case 'high':
        return 'bg-agri-amber/20 text-agri-amber border-agri-amber/40';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default:
        return 'bg-agri-cyan/20 text-agri-cyan border-agri-cyan/40';
    }
  };

  const filteredRisks = riskRegister.filter((risk) => {
    if (severityFilter !== 'all' && risk.severity !== severityFilter) return false;
    if (selectedMatrixCell) {
      return (
        risk.likelihood.toLowerCase() === selectedMatrixCell.likelihood.toLowerCase() &&
        risk.impact.toLowerCase() === selectedMatrixCell.impact.toLowerCase()
      );
    }
    return true;
  });

  // 5x5 Matrix Grid definitions
  const likelihoodLevels = ['High', 'Medium', 'Low'];
  const impactLevels = ['Catastrophic', 'Severe', 'Moderate', 'Low'];

  const getCellItems = (lik: string, imp: string) => {
    return riskRegister.filter(
      (r) => r.likelihood.toLowerCase() === lik.toLowerCase() && r.impact.toLowerCase() === imp.toLowerCase()
    );
  };

  const getCellColor = (lik: string, imp: string) => {
    if (imp === 'Catastrophic' || (lik === 'High' && imp === 'Severe')) return 'bg-agri-red/25 border-agri-red/50 text-agri-red hover:bg-agri-red/40';
    if (imp === 'Severe' || (lik === 'Medium' && imp === 'Moderate')) return 'bg-agri-amber/25 border-agri-amber/50 text-agri-amber hover:bg-agri-amber/40';
    return 'bg-emerald-500/15 border-emerald-500/30 text-agri-emerald hover:bg-emerald-500/30';
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-charcoal-800 border border-charcoal-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-agri-cyan text-xs font-mono font-semibold mb-2">
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>INDUSTRIAL CYBERSECURITY & SAFETY AUDIT</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-agri-text-primary">
            OT Security Risk Assessment & Exposure Audit
          </h1>
          <p className="text-xs text-agri-text-secondary mt-1 max-w-2xl leading-relaxed">
            Authorized industrial audit report structured by overall risk posture, critical findings, vulnerable assets, operational consequences, and prioritized remediation.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setExportDossierOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Executive Dossier (PDF)</span>
          </button>
        </div>
      </div>

      {/* 1. Overall Risk Posture Scorecards */}
      <div className="p-6 rounded-2xl bg-charcoal-800 border border-charcoal-700 space-y-4">
        <div className="flex flex-wrap items-center justify-between border-b border-charcoal-700 pb-3 gap-2">
          <div>
            <h2 className="text-sm font-bold text-agri-text-primary flex items-center gap-2">
              <Shield className="w-4 h-4 text-agri-emerald" />
              <span>1. Overall Operational Technology Risk Posture</span>
            </h2>
            <span className="text-xs text-agri-text-muted">Standards: BIS IS/IEC 62443 / CERT-In OT Directives / FSSAI Cold Chain</span>
          </div>
          <span className="font-mono text-xs text-agri-emerald bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/30">
            AUDIT ID: AUDIT-2026-Q4 · SL-2 VERIFIED
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-1">
          <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700 space-y-2">
            <div className="text-agri-text-muted text-xs font-medium">Asset Inventory Completeness</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-agri-emerald">92%</span>
              <span className="text-[11px] text-agri-text-muted font-mono">12/12 mapped</span>
            </div>
            <div className="w-full bg-charcoal-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-agri-emerald h-full rounded-full" style={{ width: '92%' }} />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700 space-y-2">
            <div className="text-agri-text-muted text-xs font-medium">Network Segmentation Review</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-agri-cyan">68%</span>
              <span className="text-[11px] text-agri-text-muted font-mono">Zone 1-3 Mapped</span>
            </div>
            <div className="w-full bg-charcoal-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-agri-cyan h-full rounded-full" style={{ width: '68%' }} />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700 space-y-2">
            <div className="text-agri-text-muted text-xs font-medium">Access Control & Auth</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-agri-amber">74%</span>
              <span className="text-[11px] text-agri-text-muted font-mono">2 Legacy PLCs</span>
            </div>
            <div className="w-full bg-charcoal-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-agri-amber h-full rounded-full" style={{ width: '74%' }} />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700 space-y-2">
            <div className="text-agri-text-muted text-xs font-medium">Firmware Patch Posture</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-agri-red">61%</span>
              <span className="text-[11px] text-agri-text-muted font-mono">3 Unpatched CVEs</span>
            </div>
            <div className="w-full bg-charcoal-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-agri-red h-full rounded-full" style={{ width: '61%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Cyber-Physical Risk Matrix */}
      <div className="p-6 rounded-2xl bg-charcoal-800 border border-charcoal-700 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-charcoal-700">
          <div>
            <h2 className="text-sm font-bold text-agri-text-primary flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-agri-cyan" />
              <span>2. Interactive Cyber-Physical Risk Matrix (Likelihood vs Physical Impact)</span>
            </h2>
            <p className="text-xs text-agri-text-muted mt-0.5">
              Click any cell in the matrix to filter the specific operational risks and affected assets below.
            </p>
          </div>

          {selectedMatrixCell && (
            <button
              onClick={() => setSelectedMatrixCell(null)}
              className="text-[11px] font-mono text-agri-cyan hover:underline flex items-center gap-1"
            >
              <span>Reset Matrix Filter ({selectedMatrixCell.likelihood} × {selectedMatrixCell.impact})</span>
              <span>×</span>
            </button>
          )}
        </div>

        {/* Matrix Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[500px] space-y-2 text-xs">
            <div className="grid grid-cols-5 gap-2 text-[11px] font-mono text-agri-text-muted text-center font-bold">
              <div className="text-left">Likelihood \ Impact</div>
              <div>Low</div>
              <div>Moderate</div>
              <div>Severe</div>
              <div>Catastrophic</div>
            </div>

            {likelihoodLevels.map((lik) => (
              <div key={lik} className="grid grid-cols-5 gap-2 items-center">
                <div className="font-mono text-xs text-agri-text-primary font-semibold text-left">
                  {lik}
                </div>
                {impactLevels.slice().reverse().map((imp) => {
                  const items = getCellItems(lik, imp);
                  const isSelected =
                    selectedMatrixCell?.likelihood === lik && selectedMatrixCell?.impact === imp;
                  const colorClass = getCellColor(lik, imp);

                  return (
                    <button
                      key={imp}
                      onClick={() => {
                        if (isSelected) setSelectedMatrixCell(null);
                        else setSelectedMatrixCell({ likelihood: lik, impact: imp });
                      }}
                      className={`h-14 rounded-xl border p-2 flex flex-col items-center justify-center transition-all ${colorClass} ${
                        isSelected ? 'ring-2 ring-white scale-105' : ''
                      }`}
                    >
                      <span className="font-mono font-bold text-base leading-none">
                        {items.length}
                      </span>
                      <span className="text-[9px] font-mono uppercase opacity-80 mt-1">
                        {items.length === 1 ? 'Threat' : 'Threats'}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Findings Register */}
      <div className="p-6 rounded-2xl bg-charcoal-800 border border-charcoal-700 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-charcoal-700">
          <div>
            <h2 className="text-sm font-bold text-agri-text-primary flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-agri-amber" />
              <span>3. Key Findings & Vulnerable Operational Assets</span>
            </h2>
            <p className="text-xs text-agri-text-muted mt-0.5">
              Transparent scoring: Calculated Score = (Likelihood Index × Physical Consequence).
            </p>
          </div>

          {/* Severity Filter Pills */}
          <div className="flex items-center gap-1 bg-charcoal-900 p-1 rounded-lg border border-charcoal-700 text-xs">
            {(['all', 'critical', 'high', 'medium'] as const).map((sev) => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className={`px-3 py-1 rounded text-[11px] font-medium uppercase font-mono transition-colors ${
                  severityFilter === sev
                    ? 'bg-charcoal-750 text-agri-emerald border border-emerald-500/30 font-semibold'
                    : 'text-agri-text-muted hover:text-agri-text-primary'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredRisks.map((risk) => (
            <div key={risk.id} className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700 text-xs space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-agri-text-muted">{risk.id}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold border ${getSeverityBadge(risk.severity)}`}>
                    {risk.severity} Severity
                  </span>
                  <span className="font-semibold text-agri-text-primary text-sm">{risk.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-agri-text-muted text-[11px]">Risk Score:</span>
                  <span className="font-mono font-bold text-agri-amber">{risk.score}/100</span>
                  <span className="text-charcoal-600">|</span>
                  <span className="px-2 py-0.5 rounded bg-charcoal-800 text-agri-text-secondary font-mono text-[10px]">
                    {risk.remediationStatus}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 rounded-lg bg-charcoal-800 border border-charcoal-700">
                <div>
                  <span className="text-agri-text-muted font-mono text-[10px] uppercase block">Observed Evidence:</span>
                  <span className="text-agri-text-secondary mt-0.5 block leading-relaxed">{risk.evidence}</span>
                </div>
                <div>
                  <span className="text-agri-red font-mono text-[10px] uppercase block font-semibold">Potential Operational Consequence:</span>
                  <span className="text-agri-text-primary mt-0.5 block leading-relaxed">{risk.potentialConsequence}</span>
                </div>
                <div>
                  <span className="text-agri-emerald font-mono text-[10px] uppercase block font-semibold">Recommended Remediation:</span>
                  <span className="text-agri-text-primary mt-0.5 block leading-relaxed">{risk.recommendation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Prioritized Remediation Roadmap */}
      <div className="p-6 rounded-2xl bg-charcoal-800 border border-charcoal-700 space-y-4">
        <div>
          <h2 className="text-sm font-bold text-agri-text-primary flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-agri-emerald" />
            <span>4. Prioritized Remediation Action Roadmap</span>
          </h2>
          <p className="text-xs text-agri-text-muted mt-0.5">
            Sequential roadmap to eliminate single points of failure without operational downtime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700 space-y-2">
            <span className="w-6 h-6 rounded-lg bg-agri-red/20 text-agri-red font-mono font-bold text-xs flex items-center justify-center">
              01
            </span>
            <div className="font-semibold text-agri-text-primary text-xs">Isolate Modbus VLAN on Field Pumps</div>
            <p className="text-[11px] text-agri-text-muted leading-relaxed">
              Drop unauthenticated broadcast packets on VLAN 40 to prevent unauthorized coil override injection.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700 space-y-2">
            <span className="w-6 h-6 rounded-lg bg-agri-amber/20 text-agri-amber font-mono font-bold text-xs flex items-center justify-center">
              02
            </span>
            <div className="font-semibold text-agri-text-primary text-xs">Deploy Backup Cold-Storage Probe</div>
            <p className="text-[11px] text-agri-text-muted leading-relaxed">
              Install battery-backed secondary sensor in Chamber 3 to enable automated 2-out-of-2 cross-validation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700 space-y-2">
            <span className="w-6 h-6 rounded-lg bg-agri-emerald/20 text-agri-emerald font-mono font-bold text-xs flex items-center justify-center">
              03
            </span>
            <div className="font-semibold text-agri-text-primary text-xs">VFD Firmware Maintenance Flash</div>
            <p className="text-[11px] text-agri-text-muted leading-relaxed">
              Flash vendor patch v2.24 during turnaround window to eliminate CVE-2023-38545 denial-of-service vector.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
