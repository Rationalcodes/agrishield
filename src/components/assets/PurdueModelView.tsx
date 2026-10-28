import React from 'react';
import { useAgriShield } from '../../context/AgriShieldContext';
import { Asset } from '../../types';
import {
  Layers,
  Cpu,
  Radio,
  Lock,
  Server,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  ChevronRight,
  Eye,
  Activity
} from 'lucide-react';

export const PurdueModelView: React.FC = () => {
  const { assets, setSelectedAsset, alerts, interlocks } = useAgriShield();

  const zones: {
    zoneKey: string;
    level: string;
    title: string;
    description: string;
    accentColor: string;
    borderColor: string;
    filterFn: (asset: Asset) => boolean;
  }[] = [
    {
      zoneKey: 'zone4',
      level: 'LEVEL 4 / ENTERPRISE DMZ',
      title: 'Site Demarcation & Ingestion Gateways',
      description: 'Border gateway translating OT protocols into cryptographically verified zero-trust telemetry feeds.',
      accentColor: 'text-purple-400',
      borderColor: 'border-purple-500/30',
      filterFn: (a) => a.networkZone.includes('Zone 4') || a.category === 'Industrial Gateway',
    },
    {
      zoneKey: 'zone3',
      level: 'LEVEL 3 / PLANT OPERATIONS',
      title: 'Supervisory Control & SCADA Historians',
      description: 'Centralized plant monitoring stations, human-machine interfaces, and supervisory control systems.',
      accentColor: 'text-agri-cyan',
      borderColor: 'border-cyan-500/30',
      filterFn: (a) => a.networkZone.includes('Zone 3') || a.category === 'SCADA Server',
    },
    {
      zoneKey: 'zone2',
      level: 'LEVEL 2 / CONTROL LAN',
      title: 'Direct Automation & Safety PLCs',
      description: 'Programmable Logic Controllers governing real-time hydraulic solenoids, ammonia compressors, and biogas valves.',
      accentColor: 'text-agri-amber',
      borderColor: 'border-amber-500/30',
      filterFn: (a) => a.networkZone.includes('Zone 2') || a.category === 'Irrigation PLC',
    },
    {
      zoneKey: 'zone1',
      level: 'LEVEL 0/1 / FIELD INSTRUMENTATION',
      title: 'Sensors, Transmitters & Edge Actuators',
      description: 'Capacitive soil sensors, micro-meteorological towers, RTD thermal probes, and piezoresistive pressure cells.',
      accentColor: 'text-agri-emerald',
      borderColor: 'border-emerald-500/30',
      filterFn: (a) => a.networkZone.includes('Zone 1') || a.category === 'Soil Sensor' || a.category === 'Weather Station' || a.category === 'Refrigeration Unit' || a.category === 'Bio-Power Digester',
    },
  ];

  const hasActiveIncident = (assetId: string) => {
    return alerts.some((a) => a.assetId === assetId && a.status !== 'resolved');
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-agri-emerald" />
          <span className="font-semibold text-agri-text-primary">
            Purdue Model Architecture & IEC 62443 Zone Segmentation
          </span>
          <span className="text-agri-text-muted hidden md:inline">
            — Zero-trust isolation enforced between field I/O, control loops, and enterprise ingress.
          </span>
        </div>
        <span className="font-mono text-[10px] text-agri-cyan bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
          MICRO-SEGMENTATION: ACTIVE
        </span>
      </div>

      <div className="space-y-5">
        {zones.map((zone) => {
          const zoneAssets = assets.filter(zone.filterFn);

          return (
            <div
              key={zone.zoneKey}
              className={`p-5 rounded-2xl bg-charcoal-800 border ${zone.borderColor} space-y-4 relative`}
            >
              {/* Zone Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-charcoal-700">
                <div className="flex items-center gap-2.5">
                  <span className={`font-mono text-xs font-bold uppercase tracking-wider ${zone.accentColor}`}>
                    {zone.level}
                  </span>
                  <span className="text-charcoal-600">|</span>
                  <h3 className="text-sm font-bold text-agri-text-primary">{zone.title}</h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 text-agri-text-muted border border-charcoal-700">
                  {zoneAssets.length} Enrolled Nodes
                </span>
              </div>

              <p className="text-xs text-agri-text-muted leading-relaxed">
                {zone.description}
              </p>

              {/* Node Cards in this Zone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
                {zoneAssets.map((asset) => {
                  const isCritical = hasActiveIncident(asset.id);
                  const isInterlocked = interlocks[asset.id];

                  return (
                    <div
                      key={asset.id}
                      onClick={() => setSelectedAsset(asset)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group ${
                        isCritical
                          ? 'bg-charcoal-900 border-agri-red/70 shadow-glow-red'
                          : isInterlocked
                          ? 'bg-charcoal-900 border-amber-500/50'
                          : 'bg-charcoal-900 border-charcoal-700 hover:border-emerald-500/50 hover:bg-charcoal-750'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-start justify-between gap-1">
                          <span className="font-mono text-xs font-bold text-agri-text-primary group-hover:text-agri-emerald transition-colors">
                            {asset.id}
                          </span>
                          <span
                            className={`text-[9px] font-mono px-1.5 py-0.2 rounded uppercase font-semibold ${
                              asset.authStatus === 'verified'
                                ? 'bg-emerald-500/15 text-agri-emerald border border-emerald-500/30'
                                : 'bg-agri-red/20 text-agri-red border border-agri-red/40 animate-pulse'
                            }`}
                          >
                            {asset.authCapability.split(' ')[0]}
                          </span>
                        </div>

                        <div className="text-xs font-semibold text-agri-text-primary group-hover:text-agri-emerald transition-colors truncate">
                          {asset.name}
                        </div>
                        <div className="text-[10px] text-agri-text-muted truncate">
                          {asset.facility} · {asset.location}
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-charcoal-800 flex items-center justify-between text-xs">
                        <span className="font-mono text-[10px] text-agri-cyan">{asset.protocol}</span>
                        <div className="flex items-center gap-1 font-mono text-[11px] font-bold">
                          <span
                            className={
                              isCritical
                                ? 'text-agri-red'
                                : isInterlocked
                                ? 'text-agri-amber'
                                : 'text-agri-emerald'
                            }
                          >
                            {isInterlocked ? 'ISOLATED' : asset.currentReading}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-agri-text-muted group-hover:text-agri-emerald transition-colors" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
