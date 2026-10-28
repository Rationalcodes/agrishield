import React from 'react';
import { useAgriShield } from '../../context/AgriShieldContext';
import {
  X,
  Cpu,
  Shield,
  Activity,
  Layers,
  Radio,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const AssetDetailModal: React.FC = () => {
  const { selectedAsset, setSelectedAsset, alerts, setSelectedAlert } = useAgriShield();

  if (!selectedAsset) return null;

  const assetAlerts = alerts.filter((a) => a.assetId === selectedAsset.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-charcoal-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-charcoal-800 border border-charcoal-700 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-700 bg-charcoal-850 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-agri-emerald">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-agri-text-primary">{selectedAsset.id}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-charcoal-900 text-agri-text-muted border border-charcoal-700">
                  {selectedAsset.facility}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold border ${
                    selectedAsset.riskScore > 60
                      ? 'bg-agri-red/20 text-agri-red border-agri-red/30'
                      : selectedAsset.riskScore > 30
                      ? 'bg-agri-amber/20 text-agri-amber border-agri-amber/30'
                      : 'bg-emerald-500/20 text-agri-emerald border-emerald-500/30'
                  }`}
                >
                  Risk: {selectedAsset.riskScore}/100
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-agri-text-primary mt-0.5">
                {selectedAsset.name}
              </h2>
            </div>
          </div>
          <button
            onClick={() => setSelectedAsset(null)}
            className="p-1.5 rounded-lg text-agri-text-muted hover:text-agri-text-primary hover:bg-charcoal-750 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <p className="text-xs sm:text-sm text-agri-text-secondary leading-relaxed bg-charcoal-900 p-3.5 rounded-xl border border-charcoal-700">
            {selectedAsset.description}
          </p>

          {/* Quick Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-charcoal-900 border border-charcoal-700">
              <span className="text-agri-text-muted text-[10px] uppercase font-mono block">Physical Location</span>
              <span className="font-medium text-agri-text-primary mt-1 block">{selectedAsset.location}</span>
            </div>
            <div className="p-3 rounded-xl bg-charcoal-900 border border-charcoal-700">
              <span className="text-agri-text-muted text-[10px] uppercase font-mono block">Vendor & Model</span>
              <span className="font-medium text-agri-text-primary mt-1 block">{selectedAsset.vendor} {selectedAsset.model}</span>
            </div>
            <div className="p-3 rounded-xl bg-charcoal-900 border border-charcoal-700">
              <span className="text-agri-text-muted text-[10px] uppercase font-mono block">Firmware Release</span>
              <span className="font-mono text-agri-text-primary mt-1 block">{selectedAsset.firmwareVersion}</span>
            </div>
            <div className="p-3 rounded-xl bg-charcoal-900 border border-charcoal-700">
              <span className="text-agri-text-muted text-[10px] uppercase font-mono block">Purdue Network Zone</span>
              <span className="font-medium text-agri-cyan mt-1 block">{selectedAsset.networkZone}</span>
            </div>
            <div className="p-3 rounded-xl bg-charcoal-900 border border-charcoal-700">
              <span className="text-agri-text-muted text-[10px] uppercase font-mono block">Industrial Protocol</span>
              <span className="font-mono text-agri-text-primary mt-1 block">{selectedAsset.protocol}</span>
            </div>
            <div className="p-3 rounded-xl bg-charcoal-900 border border-charcoal-700">
              <span className="text-agri-text-muted text-[10px] uppercase font-mono block">Auth Architecture</span>
              <span className="font-mono text-agri-emerald mt-1 block">{selectedAsset.authCapability}</span>
            </div>
          </div>

          {/* Telemetry Status Card */}
          <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-agri-text-primary uppercase tracking-wider">
              <span className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-agri-cyan" />
                Live Operational Telemetry & Baseline
              </span>
              <span className="text-[10px] font-mono text-agri-text-muted">Last reported: {selectedAsset.lastReported}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-lg bg-charcoal-800 border border-charcoal-700">
                <span className="text-agri-text-muted text-[10px] font-mono uppercase block">Latest Reading</span>
                <span className="font-mono text-agri-emerald font-bold text-base mt-1 block">
                  {selectedAsset.currentReading}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-charcoal-800 border border-charcoal-700">
                <span className="text-agri-text-muted text-[10px] font-mono uppercase block">Safe Baseline Envelope</span>
                <span className="font-mono text-agri-text-secondary font-medium text-sm mt-1 block">
                  {selectedAsset.baseline}
                </span>
              </div>
            </div>
          </div>

          {/* Associated Incidents */}
          <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-agri-text-primary uppercase tracking-wider">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-agri-red" />
                Associated Security & Anomaly Incidents ({assetAlerts.length})
              </span>
            </div>
            {assetAlerts.length > 0 ? (
              <div className="space-y-2">
                {assetAlerts.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => {
                      setSelectedAlert(a);
                      setSelectedAsset(null);
                    }}
                    className="p-3 rounded-lg bg-charcoal-800 border border-charcoal-700 hover:border-emerald-500/40 cursor-pointer flex items-center justify-between transition-colors text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-agri-red">{a.alertId}</span>
                        <span className="font-semibold text-agri-text-primary">{a.title}</span>
                      </div>
                      <div className="text-agri-text-muted text-[11px] mt-0.5">{a.observedMetric}</div>
                    </div>
                    <span className="text-agri-emerald text-[11px] hover:underline font-medium">Investigate →</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-agri-text-muted italic">No open incidents currently associated with this asset.</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-charcoal-700 bg-charcoal-850 shrink-0 flex items-center justify-end">
          <button
            onClick={() => setSelectedAsset(null)}
            className="px-4 py-2 rounded-lg bg-charcoal-750 hover:bg-charcoal-700 text-agri-text-primary text-xs font-semibold transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
