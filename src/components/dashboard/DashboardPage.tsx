import React, { useState } from 'react';
import { useAgriShield } from '../../context/AgriShieldContext';
import {
  ShieldAlert,
  ShieldCheck,
  Activity,
  Cpu,
  AlertTriangle,
  Radio,
  Lock,
  ArrowRight,
  ExternalLink,
  Zap,
  Info,
  Clock,
  CheckCircle2,
  Filter,
  Search,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import {
  AreaChart,
  Area,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { TopologyMap } from './TopologyMap';

export const DashboardPage: React.FC = () => {
  const {
    kpis,
    telemetry,
    assets,
    alerts,
    setSelectedAlert,
    setSelectedAsset,
    setActiveTab,
    timeRange,
    setTimeRange,
    acknowledgeAlert,
    interlocks,
    engageInterlock
  } = useAgriShield();

  const [selectedMetric, setSelectedMetric] = useState<'soilMoisture' | 'temperature' | 'irrigationFlow'>('soilMoisture');
  const [incidentFilter, setIncidentFilter] = useState<'all' | 'open' | 'resolved'>('all');

  // Most critical open alert for the Hero Attention Panel
  const topAlert = alerts.find((a) => a.severity === 'critical' && a.status !== 'resolved') ||
    alerts.find((a) => a.status !== 'resolved') ||
    alerts[0];

  const filteredAlerts = alerts.filter((a) => {
    if (incidentFilter === 'open') return a.status !== 'resolved';
    if (incidentFilter === 'resolved') return a.status === 'resolved';
    return true;
  });

  // Risk Distribution Data
  const riskCounts = {
    Low: assets.filter((a) => a.riskScore <= 25).length,
    Medium: assets.filter((a) => a.riskScore > 25 && a.riskScore <= 50).length,
    High: assets.filter((a) => a.riskScore > 50 && a.riskScore <= 75).length,
    Critical: assets.filter((a) => a.riskScore > 75).length,
  };

  const riskPieData = [
    { name: 'Low Risk', value: riskCounts.Low, color: '#10B981' },
    { name: 'Medium Risk', value: riskCounts.Medium, color: '#06B6D4' },
    { name: 'High Risk', value: riskCounts.High, color: '#F5B942' },
    { name: 'Critical Risk', value: riskCounts.Critical, color: '#F04452' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Simulation Banner Notice */}
      <div className="p-3.5 rounded-xl bg-charcoal-800 border border-charcoal-700 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-agri-emerald border border-emerald-500/30">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-agri-text-primary">Operational Demonstration Mode:</span>
            <span className="text-agri-text-secondary ml-1.5">
              Connected to 12 simulated agricultural & industrial control assets with live cryptographic telemetry ingestion.
            </span>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('simulator')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-sm"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Launch Threat Simulation</span>
        </button>
      </div>

      {/* Answer 1: IS THE INFRASTRUCTURE SAFE? -> 4 Essential KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Monitored Assets */}
        <div className="p-5 rounded-2xl bg-charcoal-800 border border-charcoal-700 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-medium text-agri-text-muted">
            <span>Monitored Assets</span>
            <Cpu className="w-4 h-4 text-agri-cyan" />
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-agri-text-primary">{kpis.monitoredAssets}</span>
            <span className="text-xs text-agri-text-muted font-mono">100% Online</span>
          </div>
          <div className="text-[11px] text-agri-text-muted flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-agri-emerald" />
            <span>Purdue Zones 1 to 4 fully mapped</span>
          </div>
        </div>

        {/* KPI 2: Healthy Devices */}
        <div className="p-5 rounded-2xl bg-charcoal-800 border border-charcoal-700 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-medium text-agri-text-muted">
            <span>Healthy Devices</span>
            <ShieldCheck className="w-4 h-4 text-agri-emerald" />
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-agri-emerald">{kpis.healthyDevices}</span>
            <span className="text-xs text-agri-text-muted font-mono">/ {kpis.monitoredAssets}</span>
          </div>
          <div className="text-[11px] text-agri-text-muted flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-agri-emerald" />
            <span>Operating within calibrated baselines</span>
          </div>
        </div>

        {/* KPI 3: Open Incidents (Prominent Danger indicator) */}
        <div
          className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
            kpis.openAlerts > 0
              ? 'bg-charcoal-800 border-agri-red/40 shadow-glow-red'
              : 'bg-charcoal-800 border-charcoal-700'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-medium text-agri-text-muted">
            <span>Active Incidents</span>
            <ShieldAlert className={`w-4 h-4 ${kpis.openAlerts > 0 ? 'text-agri-red' : 'text-agri-text-muted'}`} />
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className={`text-3xl font-bold font-mono ${kpis.openAlerts > 0 ? 'text-agri-red' : 'text-agri-text-primary'}`}>
              {kpis.openAlerts}
            </span>
            <span className="text-xs text-agri-text-muted">
              {kpis.openAlerts > 0 ? 'Requires Operator Review' : 'All Clear'}
            </span>
          </div>
          <div className="text-[11px] text-agri-text-muted flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${kpis.openAlerts > 0 ? 'bg-agri-red' : 'bg-agri-emerald'}`} />
            <span>{kpis.openAlerts > 0 ? `${kpis.operationalAnomalies} physical anomaly flagged` : 'No anomalies detected'}</span>
          </div>
        </div>

        {/* KPI 4: Cryptographic Ingestion Failures */}
        <div
          className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
            kpis.authFailures > 0
              ? 'bg-charcoal-800 border-agri-amber/50 shadow-glow-amber'
              : 'bg-charcoal-800 border-charcoal-700'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-medium text-agri-text-muted">
            <span>Cryptographic Failures</span>
            <Lock className={`w-4 h-4 ${kpis.authFailures > 0 ? 'text-agri-amber' : 'text-agri-text-muted'}`} />
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className={`text-3xl font-bold font-mono ${kpis.authFailures > 0 ? 'text-agri-amber' : 'text-agri-text-primary'}`}>
              {kpis.authFailures}
            </span>
            <span className="text-xs text-agri-text-muted">
              {kpis.authFailures > 0 ? 'Quarantined at Edge' : 'Zero Forged Packets'}
            </span>
          </div>
          <div className="text-[11px] text-agri-text-muted flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${kpis.authFailures > 0 ? 'bg-agri-amber' : 'bg-agri-emerald'}`} />
            <span>Ed25519 & HMAC Hardware Ingestion</span>
          </div>
        </div>
      </div>

      {/* Cyber-Physical OT Network Topology Map */}
      <TopologyMap />

      {/* Main Grid: Telemetry Center (2/3) + Answer 2: WHAT NEEDS ATTENTION RIGHT NOW? (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Telemetry Visualizer with Safe Operating Envelopes */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-charcoal-800 border border-charcoal-700 flex flex-col justify-between space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-agri-emerald" />
                <h3 className="text-sm font-bold text-agri-text-primary">
                  Live Sensor Telemetry & Physical Safe Operating Envelopes
                </h3>
              </div>
              <p className="text-xs text-agri-text-muted mt-0.5">
                Shaded band illustrates the permissible agronomic boundary. Divergence triggers real-time alerts.
              </p>
            </div>

            {/* Time Range Selector */}
            <div className="flex items-center bg-charcoal-900 p-1 rounded-lg border border-charcoal-700 text-xs font-mono">
              {(['1H', '6H', '24H', '7D'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                    timeRange === r
                      ? 'bg-charcoal-750 text-agri-emerald border border-emerald-500/30'
                      : 'text-agri-text-muted hover:text-agri-text-primary'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Metric Switcher Toolbar */}
          <div className="flex items-center gap-2 border-b border-charcoal-700 pb-3 text-xs">
            <button
              onClick={() => setSelectedMetric('soilMoisture')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedMetric === 'soilMoisture'
                  ? 'bg-emerald-500/15 text-agri-emerald border border-emerald-500/40 font-semibold'
                  : 'text-agri-text-muted hover:text-agri-text-primary hover:bg-charcoal-750'
              }`}
            >
              Soil Moisture (% VWC)
            </button>
            <button
              onClick={() => setSelectedMetric('temperature')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedMetric === 'temperature'
                  ? 'bg-cyan-500/15 text-agri-cyan border border-cyan-500/40 font-semibold'
                  : 'text-agri-text-muted hover:text-agri-text-primary hover:bg-charcoal-750'
              }`}
            >
              Ambient Temperature (°C)
            </button>
            <button
              onClick={() => setSelectedMetric('irrigationFlow')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedMetric === 'irrigationFlow'
                  ? 'bg-amber-500/15 text-agri-amber border border-amber-500/40 font-semibold'
                  : 'text-agri-text-muted hover:text-agri-text-primary hover:bg-charcoal-750'
              }`}
            >
              Irrigation Flow (L/min)
            </button>
          </div>

          {/* High-Contrast Recharts Graph */}
          <div className="h-64 sm:h-72 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              {selectedMetric === 'soilMoisture' ? (
                <AreaChart data={telemetry} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="moistureGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="envelopeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#233330" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#233330" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F2B29" />
                  <XAxis dataKey="timeLabel" stroke="#667470" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#667470" domain={[15, 95]} tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#141C1B', borderColor: '#2E423E', borderRadius: '10px', fontSize: '12px' }}
                    itemStyle={{ color: '#F4F7F6' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  {/* Permissible Operating Envelope Band */}
                  <Area
                    type="monotone"
                    dataKey="soilMoistureMax"
                    name="Safe Upper Limit (33% VWC)"
                    stroke="#2E423E"
                    strokeDasharray="3 3"
                    fill="url(#envelopeGrad)"
                  />
                  {/* Actual Measured Telemetry */}
                  <Area
                    type="monotone"
                    dataKey="soilMoisture"
                    name="Observed Moisture (% VWC)"
                    stroke="#10B981"
                    strokeWidth={2.5}
                    fill="url(#moistureGrad)"
                  />
                  <Line
                    type="monotone"
                    dataKey="soilMoistureBaseline"
                    name="Calibrated Baseline (30.0%)"
                    stroke="#06B6D4"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                </AreaChart>
              ) : selectedMetric === 'temperature' ? (
                <AreaChart data={telemetry} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F2B29" />
                  <XAxis dataKey="timeLabel" stroke="#667470" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#667470" domain={[10, 32]} tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#141C1B', borderColor: '#2E423E', borderRadius: '10px', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Area
                    type="monotone"
                    dataKey="temperature"
                    name="Observed Temp (°C)"
                    stroke="#06B6D4"
                    strokeWidth={2.5}
                    fill="url(#tempGrad)"
                  />
                  <Line
                    type="monotone"
                    dataKey="tempThresholdMax"
                    name="Max Safe Boundary (26°C)"
                    stroke="#F04452"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                </AreaChart>
              ) : (
                <AreaChart data={telemetry} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="flowGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F5B942" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#F5B942" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F2B29" />
                  <XAxis dataKey="timeLabel" stroke="#667470" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#667470" domain={[200, 900]} tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#141C1B', borderColor: '#2E423E', borderRadius: '10px', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Area
                    type="monotone"
                    dataKey="irrigationFlow"
                    name="Flow Rate (L/min)"
                    stroke="#F5B942"
                    strokeWidth={2.5}
                    fill="url(#flowGrad)"
                  />
                  <Line
                    type="monotone"
                    dataKey="irrigationLimit"
                    name="Peak Tariff Limit (450 L/min)"
                    stroke="#F04452"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 1 Col: PROMINENT CRITICAL INCIDENT PANEL (What needs attention right now?) */}
        <div className="p-6 rounded-2xl bg-charcoal-800 border border-charcoal-700 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-charcoal-700">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-agri-amber flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-agri-amber" />
                <span>Attention Required</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 text-agri-text-muted border border-charcoal-700">
                Priority 1
              </span>
            </div>

            {topAlert ? (
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                      topAlert.severity === 'critical'
                        ? 'bg-agri-red/20 text-agri-red border border-agri-red/40'
                        : 'bg-agri-amber/20 text-agri-amber border border-agri-amber/40'
                    }`}
                  >
                    {topAlert.severity} Severity
                  </span>
                  <span className="font-mono text-xs text-agri-text-muted">{topAlert.alertId}</span>
                </div>

                <h4 className="text-base font-bold text-agri-text-primary leading-snug">
                  {topAlert.title}
                </h4>

                <div className="p-3 rounded-xl bg-charcoal-900 border border-charcoal-700 text-xs space-y-1.5">
                  <div className="text-[11px] text-agri-text-muted font-mono uppercase">Target Asset:</div>
                  <div className="font-semibold text-agri-emerald">{topAlert.assetName}</div>
                  <div className="text-[11px] text-agri-text-secondary">{topAlert.facility} · Zone 2 Control</div>
                </div>

                <div className="p-3 rounded-xl bg-agri-red/10 border border-agri-red/30 text-xs space-y-1">
                  <span className="text-[10px] font-mono font-bold text-agri-red uppercase block">
                    Physical Operational Impact:
                  </span>
                  <p className="text-agri-text-primary text-[11px] leading-relaxed">
                    {topAlert.physicalImpact}
                  </p>
                  {topAlert.financialImpact && (
                    <p className="text-[11px] font-mono text-agri-amber font-semibold pt-1">
                      {topAlert.financialImpact}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-agri-text-muted text-xs space-y-2">
                <ShieldCheck className="w-8 h-8 mx-auto text-agri-emerald" />
                <p>All monitored assets are operating safely within baseline envelopes.</p>
              </div>
            )}
          </div>

          {/* Answer 3: WHAT SHOULD THE OPERATOR DO NEXT? */}
          {topAlert && (
            <div className="pt-3 border-t border-charcoal-700 flex flex-col gap-2">
              <button
                onClick={() => setSelectedAlert(topAlert)}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Investigate Evidence & Impact</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => engageInterlock(topAlert.assetId)}
                className={`w-full py-2 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-all ${
                  interlocks[topAlert.assetId]
                    ? 'bg-charcoal-750 text-agri-emerald border border-emerald-500/40'
                    : 'bg-agri-red/20 text-agri-red border border-agri-red/40 hover:bg-agri-red/30'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>
                  {interlocks[topAlert.assetId] ? 'Safety Interlock: ENGAGED (Safe Mode)' : 'Engage Emergency Interlock'}
                </span>
              </button>
              {topAlert.status === 'open' && (
                <button
                  onClick={() => acknowledgeAlert(topAlert.id, 'Shift Operator')}
                  className="w-full py-2 px-3 rounded-xl bg-charcoal-900 hover:bg-charcoal-750 text-agri-text-secondary hover:text-agri-text-primary font-medium text-xs border border-charcoal-700 transition-colors"
                >
                  Acknowledge Incident
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Lower Section: Recent Incident Timeline & Asset Risk Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Incidents Timeline with Filter */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-charcoal-800 border border-charcoal-700 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-agri-cyan" />
                <h3 className="text-sm font-bold text-agri-text-primary">
                  Recent Incidents & Anomaly Timeline
                </h3>
              </div>
              <p className="text-xs text-agri-text-muted mt-0.5">
                Timestamped log of behavioral anomalies, logic breaches, and cryptographic failures.
              </p>
            </div>

            <div className="flex items-center bg-charcoal-900 p-1 rounded-lg border border-charcoal-700 text-xs">
              {(['all', 'open', 'resolved'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setIncidentFilter(filter)}
                  className={`px-3 py-1 rounded text-[11px] uppercase font-mono font-medium transition-colors ${
                    incidentFilter === filter
                      ? 'bg-charcoal-750 text-agri-emerald border border-emerald-500/30'
                      : 'text-agri-text-muted hover:text-agri-text-primary'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredAlerts.slice(0, 4).map((alert) => (
              <div
                key={alert.id}
                onClick={() => setSelectedAlert(alert)}
                className="p-3.5 rounded-xl bg-charcoal-900 border border-charcoal-700 hover:border-emerald-500/40 hover:bg-charcoal-750 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg border shrink-0 mt-0.5 ${
                      alert.severity === 'critical'
                        ? 'bg-agri-red/15 text-agri-red border-agri-red/40'
                        : alert.severity === 'high'
                        ? 'bg-agri-amber/15 text-agri-amber border-agri-amber/40'
                        : 'bg-agri-cyan/15 text-agri-cyan border-agri-cyan/40'
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono text-xs font-bold text-agri-text-muted">{alert.alertId}</span>
                      <span className="text-[10px] font-mono px-2 py-0.2 rounded uppercase font-semibold bg-charcoal-800 text-agri-text-secondary border border-charcoal-700">
                        {alert.category}
                      </span>
                      <span className="text-[10px] text-agri-text-muted font-mono">{alert.timestamp}</span>
                    </div>
                    <div className="text-xs font-semibold text-agri-text-primary group-hover:text-agri-emerald transition-colors">
                      {alert.title}
                    </div>
                    <div className="text-[11px] text-agri-text-muted mt-0.5">
                      {alert.assetId} · <span className="text-agri-red">{alert.physicalImpact}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 sm:justify-end">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold border ${
                      alert.status === 'open'
                        ? 'bg-agri-red/20 text-agri-red border-agri-red/30'
                        : alert.status === 'investigating'
                        ? 'bg-agri-amber/20 text-agri-amber border-agri-amber/30'
                        : 'bg-agri-emerald/20 text-agri-emerald border-agri-emerald/30'
                    }`}
                  >
                    {alert.status}
                  </span>
                  <ChevronRight className="w-4 h-4 text-agri-text-muted group-hover:text-agri-emerald transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Asset Risk Distribution Donut */}
        <div className="p-6 rounded-2xl bg-charcoal-800 border border-charcoal-700 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-sm font-bold text-agri-text-primary flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-agri-cyan" />
              <span>Asset Risk Tier Distribution</span>
            </h3>
            <p className="text-xs text-agri-text-muted mt-0.5">
              Categorization based on physical consequence severity and Purdue exposure.
            </p>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={46}
                  outerRadius={68}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {riskPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#141C1B', borderColor: '#2E423E', borderRadius: '8px', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {riskPieData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 p-2 rounded-lg bg-charcoal-900 border border-charcoal-700">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-agri-text-muted text-[11px]">{item.name}:</span>
                <span className="font-mono font-bold text-agri-text-primary ml-auto">{item.value}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setActiveTab('assets')}
            className="w-full py-2 px-3 rounded-xl bg-charcoal-900 hover:bg-charcoal-750 text-agri-emerald border border-charcoal-700 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
          >
            <span>Explore All 12 Assets</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
