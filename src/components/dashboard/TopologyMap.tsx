import React, { useState } from 'react';
import { useAgriShield } from '../../context/AgriShieldContext';
import { Asset, FacilityType } from '../../types';
import {
  Layers,
  Cpu,
  Radio,
  Lock,
  AlertTriangle,
  CheckCircle2,
  Maximize2,
  ShieldCheck,
  ShieldAlert,
  Zap,
  Activity,
  Eye,
  Server
} from 'lucide-react';

export const TopologyMap: React.FC = () => {
  const { assets, setSelectedAsset, alerts, selectedFacility, setSelectedFacility } = useAgriShield();
  const [hoveredAssetId, setHoveredAssetId] = useState<string | null>(null);

  const filteredAssets = selectedFacility === 'All'
    ? assets
    : assets.filter((a) => a.facility === selectedFacility);

  const facilities: { name: FacilityType | 'All'; label: string; count: number }[] = [
    { name: 'All', label: 'All Operational Zones', count: assets.length },
    { name: 'Smart Farm', label: 'Nashik Autonomous Vineyard', count: assets.filter((a) => a.facility === 'Smart Farm').length },
    { name: 'Cold Storage', label: 'Sonipat CA Cold Vaults', count: assets.filter((a) => a.facility === 'Cold Storage').length },
    { name: 'Bio-Power Facility', label: 'Baramati SATAT Bio-Energy Plant', count: assets.filter((a) => a.facility === 'Bio-Power Facility').length },
  ];

  // Helper to check if an asset has an active open incident
  const hasActiveIncident = (assetId: string) => {
    return alerts.some((a) => a.assetId === assetId && a.status !== 'resolved');
  };

  return (
    <div className="p-6 rounded-2xl bg-charcoal-800 border border-charcoal-700 space-y-4">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-charcoal-700">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-agri-cyan" />
            <h3 className="text-sm font-bold text-agri-text-primary">
              Live Cyber-Physical OT Topology & Cryptographic Bus
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-agri-emerald border border-emerald-500/30">
              Purdue Model Zone 0-4
            </span>
          </div>
          <p className="text-xs text-agri-text-muted mt-0.5">
            Real-time packet flow from edge field instruments through control PLCs to AgriShield zero-trust ingestion engine.
          </p>
        </div>

        {/* Facility Segment Buttons */}
        <div className="flex items-center bg-charcoal-900 p-1 rounded-xl border border-charcoal-700 text-xs">
          {facilities.map((fac) => (
            <button
              key={fac.name}
              onClick={() => setSelectedFacility(fac.name)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1.5 ${
                selectedFacility === fac.name
                  ? 'bg-charcoal-750 text-agri-emerald border border-emerald-500/30 shadow-sm font-semibold'
                  : 'text-agri-text-muted hover:text-agri-text-primary'
              }`}
            >
              <span>{fac.label}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-charcoal-800 text-agri-text-secondary">
                {fac.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Topology Canvas / Grid */}
      <div className="relative rounded-xl bg-charcoal-950/80 border border-charcoal-700/80 p-5 overflow-hidden">
        {/* Ambient Grid Lines Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#141C1B_1px,transparent_1px),linear-gradient(to_bottom,#141C1B_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 pointer-events-none" />

        {/* Top Purdue Zone Flow Bar */}
        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-agri-text-muted px-2 pb-4 mb-4 border-b border-charcoal-800">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>LEVEL 0/1: FIELD SENSORS & ACTUATORS</span>
          </div>
          <div className="flex items-center gap-1 text-agri-text-muted">
            <span>→ LoRaWAN / Modbus RTU →</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>LEVEL 2: CONTROL LAN (PLCS & I/O)</span>
          </div>
          <div className="flex items-center gap-1 text-agri-text-muted">
            <span>→ Modbus TCP / OPC UA →</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>LEVEL 3/4: AGRISHIELD ZERO-TRUST INGESTION</span>
          </div>
        </div>

        {/* Interactive Asset Nodes Map */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {filteredAssets.map((asset) => {
            const isCritical = hasActiveIncident(asset.id);
            const isHovered = hoveredAssetId === asset.id;

            return (
              <div
                key={asset.id}
                onClick={() => setSelectedAsset(asset)}
                onMouseEnter={() => setHoveredAssetId(asset.id)}
                onMouseLeave={() => setHoveredAssetId(null)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
                  isCritical
                    ? 'bg-charcoal-900 border-agri-red/70 shadow-glow-red'
                    : isHovered
                    ? 'bg-charcoal-850 border-emerald-500/50 shadow-md'
                    : 'bg-charcoal-900/90 border-charcoal-700/80 hover:border-charcoal-600'
                }`}
              >
                {/* Node Status Badge */}
                <div className="flex items-start justify-between gap-1 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                        isCritical
                          ? 'bg-agri-red animate-ping'
                          : asset.connectionStatus === 'online'
                          ? 'bg-agri-emerald animate-pulse'
                          : 'bg-agri-amber'
                      }`}
                    />
                    <span className="font-mono text-xs font-bold text-agri-text-primary group-hover:text-agri-emerald transition-colors">
                      {asset.id}
                    </span>
                  </div>
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-semibold ${
                      asset.authStatus === 'verified'
                        ? 'bg-emerald-500/15 text-agri-emerald border border-emerald-500/30'
                        : 'bg-agri-red/20 text-agri-red border border-agri-red/40 animate-pulse'
                    }`}
                  >
                    {asset.authCapability.split(' ')[0]}
                  </span>
                </div>

                {/* Node Name and Facility */}
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold text-agri-text-primary group-hover:text-agri-emerald transition-colors truncate">
                    {asset.name}
                  </div>
                  <div className="text-[10px] text-agri-text-muted flex items-center justify-between">
                    <span>{asset.facility}</span>
                    <span className="font-mono text-agri-cyan">{asset.protocol}</span>
                  </div>
                </div>

                {/* Live Telemetry Value Strip */}
                <div className="mt-3 pt-2.5 border-t border-charcoal-800 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-agri-text-muted text-[10px]">Live Reading:</span>
                  <span
                    className={`font-bold ${
                      isCritical ? 'text-agri-red' : 'text-agri-emerald'
                    }`}
                  >
                    {asset.currentReading}
                  </span>
                </div>

                {/* Quick inspect hover pill */}
                <div className="absolute right-2.5 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="p-1 rounded bg-charcoal-800 text-agri-text-secondary hover:text-white flex items-center gap-1 text-[10px] font-sans">
                    <Eye className="w-3 h-3 text-agri-emerald" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Legend */}
        <div className="relative z-10 mt-4 pt-3 border-t border-charcoal-800 flex flex-wrap items-center justify-between gap-3 text-xs text-agri-text-muted">
          <div className="flex items-center gap-4 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-agri-emerald" />
              <span>Ed25519 Authenticated & Baseline Normal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-agri-amber" />
              <span>Unauthenticated Legacy Protocol / Warning</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-agri-red animate-ping" />
              <span>Active Physical Threat / Anomaly Detected</span>
            </div>
          </div>

          <span className="font-mono text-[10px] text-agri-text-muted">
            Click any node to open forensic telemetry inspector
          </span>
        </div>
      </div>
    </div>
  );
};
