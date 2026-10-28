import React from 'react';
import { useAgriShield } from '../../context/AgriShieldContext';
import { ThreatScenario } from '../../types';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Zap,
  ArrowRight,
  TrendingDown,
  IndianRupee,
  Activity,
  Layers
} from 'lucide-react';

interface ComparisonViewProps {
  scenario: ThreatScenario;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({ scenario }) => {
  const { interlocks, engageInterlock, setSelectedAlert, alerts } = useAgriShield();
  const isInterlockActive = interlocks[scenario.targetAssetId];
  const relatedAlert = alerts.find((a) => a.assetId === scenario.targetAssetId);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-agri-text-primary flex items-center gap-2">
            <Activity className="w-4 h-4 text-agri-emerald" />
            <span>Cyber-Physical Consequence Comparison</span>
          </h4>
          <p className="text-xs text-agri-text-muted mt-0.5">
            Side-by-side analysis: Unprotected traditional OT infrastructure vs. AgriShield active cyber-physical defense.
          </p>
        </div>

        {/* Emergency Interlock Toggle Button */}
        <button
          onClick={() => engageInterlock(scenario.targetAssetId)}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm ${
            isInterlockActive
              ? 'bg-charcoal-750 text-agri-emerald border border-emerald-500/50'
              : 'bg-agri-red/20 text-agri-red border border-agri-red/40 hover:bg-agri-red/30 animate-pulse'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>{isInterlockActive ? 'Hardware Interlock: ACTIVE' : 'Engage Emergency Interlock'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* WITHOUT AGRISHIELD */}
        <div className="p-5 rounded-2xl bg-charcoal-900 border border-agri-red/30 space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-charcoal-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-agri-red" />
              <span className="font-mono text-xs font-bold text-agri-red uppercase tracking-wider">
                Without AgriShield (Legacy OT)
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-agri-red/10 text-agri-red border border-agri-red/20 font-semibold">
              UNPROTECTED
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-charcoal-800/80 border border-charcoal-700/80 space-y-1">
              <span className="text-[10px] font-mono text-agri-text-muted uppercase block font-semibold">
                1. Sensor / Controller Execution
              </span>
              <p className="text-agri-text-secondary leading-relaxed">
                Legacy PLC accepts spoofed packet ({scenario.suspiciousReading}) over unauthenticated Modbus/LoRa. No hardware cryptographic signature check is performed.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-charcoal-800/80 border border-charcoal-700/80 space-y-1">
              <span className="text-[10px] font-mono text-agri-text-muted uppercase block font-semibold">
                2. Operational Logic Failure
              </span>
              <p className="text-agri-text-secondary leading-relaxed">
                Autonomous algorithm responds blindly to altered values without spatial cross-validation against neighboring sensors or weather stations.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-agri-red/10 border border-agri-red/30 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-agri-red uppercase font-bold">
                  3. Physical Breakdown & Loss
                </span>
                <span className="font-mono text-xs font-bold text-agri-red">
                  {scenario.financialConsequence}
                </span>
              </div>
              <p className="text-agri-text-primary text-[11px] leading-relaxed font-medium">
                {scenario.physicalConsequence}
              </p>
            </div>
          </div>
        </div>

        {/* WITH AGRISHIELD */}
        <div className="p-5 rounded-2xl bg-charcoal-900 border border-emerald-500/40 space-y-4 relative overflow-hidden shadow-glow-emerald">
          <div className="flex items-center justify-between pb-3 border-b border-charcoal-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-agri-emerald animate-ping" />
              <span className="font-mono text-xs font-bold text-agri-emerald uppercase tracking-wider">
                With AgriShield Protection
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-agri-emerald border border-emerald-500/30 font-semibold">
              ACTIVE DEFENSE
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-charcoal-800/80 border border-emerald-500/20 space-y-1">
              <span className="text-[10px] font-mono text-agri-emerald uppercase block font-semibold">
                1. Cryptographic Ingestion Check
              </span>
              <p className="text-agri-text-secondary leading-relaxed">
                Ed25519 hardware key and HMAC digest validated at edge boundary. Spoofed or altered packet fails origin signature verification in &lt; 300ms.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-charcoal-800/80 border border-emerald-500/20 space-y-1">
              <span className="text-[10px] font-mono text-agri-cyan uppercase block font-semibold">
                2. Cyber-Physical Correlation Engine
              </span>
              <p className="text-agri-text-secondary leading-relaxed">
                {scenario.howDetected}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-agri-emerald uppercase font-bold">
                  3. Automated Fail-Safe Interlock
                </span>
                <span className="font-mono text-xs font-bold text-agri-emerald">
                  ₹0 Physical Damage
                </span>
              </div>
              <p className="text-agri-text-primary text-[11px] leading-relaxed font-medium">
                {scenario.actionTaken}
              </p>
              {isInterlockActive && (
                <div className="text-[10px] font-mono text-cyan-300 pt-1 border-t border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Hardware circuit locked to calibrated safe operating envelope.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
