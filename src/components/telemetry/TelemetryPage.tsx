import React, { useState } from 'react';
import { useAgriShield } from '../../context/AgriShieldContext';
import {
  Radio,
  Play,
  Pause,
  Lock,
  Layers,
  Cpu,
  Zap,
  Info,
  Clock,
  Code2,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export const TelemetryPage: React.FC = () => {
  const {
    telemetry,
    assets,
    isLiveSimulation,
    setIsLiveSimulation,
    simulationSpeed,
    setSimulationSpeed,
    recentMessages,
    injectManualAnomaly,
    isScenarioRunning,
    setSelectedAsset
  } = useAgriShield();

  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('FARM-SENSOR-001');

  const selectedDevice = assets.find((a) => a.id === selectedDeviceId) || assets[0];

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Top Banner: Status & Streaming Controls */}
      <div className="p-6 rounded-2xl bg-charcoal-800 border border-charcoal-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-agri-cyan text-xs font-mono font-semibold mb-2">
            <Radio className="w-3.5 h-3.5" />
            <span>AUTHENTICATED SENSOR INGESTION</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-agri-text-primary">
            Live Telemetry & Cryptographic Validation
          </h1>
          <p className="text-xs text-agri-text-secondary mt-1 max-w-2xl leading-relaxed">
            Inspect real-time physical readings against safe operating envelopes, with hardware signature verification at the edge gateway.
          </p>
        </div>

        {/* Live Simulation Controls */}
        <div className="flex flex-wrap items-center gap-3 shrink-0 p-2 rounded-xl bg-charcoal-900 border border-charcoal-700">
          <button
            onClick={() => setIsLiveSimulation(!isLiveSimulation)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isLiveSimulation
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-charcoal-750 text-agri-text-secondary hover:text-agri-text-primary'
            }`}
          >
            {isLiveSimulation ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause Stream</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Resume Stream</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-agri-text-muted font-mono text-[11px]">Poll Rate:</span>
            <select
              value={simulationSpeed}
              onChange={(e) => setSimulationSpeed(parseInt(e.target.value))}
              className="px-2 py-1 rounded bg-charcoal-800 border border-charcoal-700 font-mono text-xs text-agri-text-primary focus:outline-none"
            >
              <option value={1500}>1.5s (Fast)</option>
              <option value={3000}>3.0s (Normal)</option>
              <option value={6000}>6.0s (Slow)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Primary Experience: Chart & System Status First */}
      <div className="p-6 rounded-2xl bg-charcoal-800 border border-charcoal-700 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-agri-emerald">{selectedDevice.id}</span>
              <span className="text-charcoal-600">·</span>
              <h3 className="text-base font-bold text-agri-text-primary">{selectedDevice.name}</h3>
            </div>
            <p className="text-xs text-agri-text-muted mt-0.5">
              Location: {selectedDevice.location} | Protocol: {selectedDevice.protocol} | Zone: {selectedDevice.networkZone}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 ${
                selectedDevice.authStatus === 'verified'
                  ? 'bg-emerald-500/10 text-agri-emerald border border-emerald-500/30'
                  : 'bg-agri-red/10 text-agri-red border border-agri-red/30'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{selectedDevice.authCapability}: {selectedDevice.authStatus.toUpperCase()}</span>
            </span>
            <button
              onClick={() => setSelectedAsset(selectedDevice)}
              className="px-3 py-1 rounded-lg bg-charcoal-900 hover:bg-charcoal-750 text-agri-text-secondary hover:text-agri-text-primary text-xs font-medium border border-charcoal-700 transition-colors"
            >
              Inspect Asset
            </button>
          </div>
        </div>

        {/* Device Selector Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {assets.slice(0, 6).map((asset) => {
            const isSelected = asset.id === selectedDeviceId;
            return (
              <button
                key={asset.id}
                onClick={() => setSelectedDeviceId(asset.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-charcoal-750 border-emerald-500/60 shadow-glow-emerald'
                    : 'bg-charcoal-900 border-charcoal-700 hover:border-charcoal-600'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-agri-text-muted mb-1">
                  <span>{asset.id}</span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      asset.connectionStatus === 'online' ? 'bg-agri-emerald' : 'bg-agri-red'
                    }`}
                  />
                </div>
                <div className="font-semibold text-agri-text-primary text-xs truncate">{asset.category}</div>
                <div className="font-mono text-[11px] text-agri-emerald mt-1 font-bold truncate">
                  {asset.currentReading}
                </div>
              </button>
            );
          })}
        </div>

        {/* Real-Time Chart with Safe Operating Envelopes */}
        <div className="h-64 sm:h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={telemetry} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="liveStreamGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="safeEnvelopeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#233330" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#233330" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2B29" />
              <XAxis dataKey="timeLabel" stroke="#667470" tick={{ fontSize: 11 }} />
              <YAxis stroke="#667470" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#141C1B', borderColor: '#2E423E', borderRadius: '10px', fontSize: '12px' }}
                itemStyle={{ color: '#F4F7F6' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Area
                type="monotone"
                dataKey="soilMoistureMax"
                name="Safe Operating Limit (33% VWC)"
                stroke="#2E423E"
                strokeDasharray="3 3"
                fill="url(#safeEnvelopeGrad)"
              />
              <Area
                type="monotone"
                dataKey="soilMoisture"
                name="Observed Telemetry Signal"
                stroke="#10B981"
                strokeWidth={2.5}
                fill="url(#liveStreamGrad)"
              />
              <Area
                type="monotone"
                dataKey="soilMoistureBaseline"
                name="Calibrated Expected Baseline"
                stroke="#06B6D4"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                fill="none"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Manual Anomaly Ingestion Toolbar */}
      <div className="p-4 rounded-xl bg-charcoal-800 border border-charcoal-700 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-agri-text-primary">
          <Zap className="w-4 h-4 text-agri-amber" />
          <span className="font-semibold">Simulate Ingest Conditions:</span>
          <span className="text-agri-text-muted hidden sm:inline">Inject live conditions to observe real-time pipeline behavior:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => injectManualAnomaly('moisture_spike')}
            disabled={isScenarioRunning}
            className="px-2.5 py-1 rounded-lg bg-charcoal-900 hover:bg-charcoal-750 text-agri-emerald text-[11px] font-medium transition-colors border border-charcoal-700"
          >
            + Soil Moisture Spike
          </button>
          <button
            onClick={() => injectManualAnomaly('signature_fail')}
            disabled={isScenarioRunning}
            className="px-2.5 py-1 rounded-lg bg-charcoal-900 hover:bg-charcoal-750 text-agri-red text-[11px] font-medium transition-colors border border-charcoal-700"
          >
            + Invalid Signature
          </button>
          <button
            onClick={() => injectManualAnomaly('flow_overload')}
            disabled={isScenarioRunning}
            className="px-2.5 py-1 rounded-lg bg-charcoal-900 hover:bg-charcoal-750 text-agri-amber text-[11px] font-medium transition-colors border border-charcoal-700"
          >
            + Hydraulic Overload
          </button>
          <button
            onClick={() => injectManualAnomaly('temp_excursion')}
            disabled={isScenarioRunning}
            className="px-2.5 py-1 rounded-lg bg-charcoal-900 hover:bg-charcoal-750 text-agri-cyan text-[11px] font-medium transition-colors border border-charcoal-700"
          >
            + Cold-Chain Surge
          </button>
        </div>
      </div>

      {/* Secondary Panel: Readable JSON Message Inspector & Cryptography */}
      <div className="p-6 rounded-2xl bg-charcoal-800 border border-charcoal-700 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-agri-text-primary flex items-center gap-2">
              <Code2 className="w-5 h-5 text-agri-cyan" />
              <span>Cryptographic Message Ingestion & Origin Verification</span>
            </h3>
            <p className="text-xs text-agri-text-muted mt-0.5">
              Inspect decoded JSON payload frames and verification states: VERIFIED (Green), REJECTED (Red), and QUARANTINED.
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 text-agri-text-muted border border-charcoal-700">
            ZERO-TRUST INGESTION PIPELINE
          </span>
        </div>

        <div className="space-y-3">
          {recentMessages.map((msg) => (
            <div
              key={msg.id}
              className={`p-4 rounded-xl border font-mono text-xs transition-all ${
                msg.signatureValid && msg.validationStatus === 'verified'
                  ? 'bg-charcoal-900 border-charcoal-700'
                  : 'bg-agri-red/5 border-agri-red/40'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-charcoal-700">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-agri-text-primary">{msg.id}</span>
                  <span className="text-charcoal-600">|</span>
                  <span className="text-agri-emerald">{msg.assetId}</span>
                  <span className="text-charcoal-600">|</span>
                  <span className="text-agri-text-muted">Seq #{msg.sequence}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-agri-text-muted text-[11px]">{msg.timestamp}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                      msg.signatureValid
                        ? 'bg-emerald-500/20 text-agri-emerald border border-emerald-500/40'
                        : 'bg-agri-red/20 text-agri-red border border-agri-red/40 animate-pulse'
                    }`}
                  >
                    {msg.signatureValid ? 'SIGNATURE: VERIFIED' : 'SIGNATURE: REJECTED'}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                      msg.validationStatus === 'verified'
                        ? 'bg-cyan-500/20 text-agri-cyan border border-cyan-500/40'
                        : 'bg-amber-500/20 text-agri-amber border border-amber-500/40'
                    }`}
                  >
                    {msg.validationStatus.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* JSON Payload & Digest Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-lg bg-charcoal-800 border border-charcoal-700 text-[11px] overflow-x-auto">
                  <span className="text-agri-text-muted block text-[10px] uppercase font-bold mb-1">
                    Decoded Edge Payload:
                  </span>
                  <pre className="text-agri-emerald font-mono">{JSON.stringify(msg.payload, null, 2)}</pre>
                </div>
                <div className="p-3 rounded-lg bg-charcoal-800 border border-charcoal-700 text-[11px] space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-agri-text-muted block text-[10px] uppercase font-bold">
                      Cryptographic Signature Hash:
                    </span>
                    <span className="text-agri-text-secondary font-mono text-[11px] break-all">{msg.signature}</span>
                  </div>
                  <div>
                    <span className="text-agri-text-muted block text-[10px] uppercase font-bold">
                      Validation Assessment:
                    </span>
                    <p className={`text-[11px] ${msg.signatureValid ? 'text-agri-text-secondary' : 'text-agri-red font-semibold'}`}>
                      {msg.details}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
