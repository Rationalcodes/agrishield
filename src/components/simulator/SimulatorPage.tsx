import React from 'react';
import { useAgriShield } from '../../context/AgriShieldContext';
import { ThreatScenario, ScenarioId } from '../../types';
import {
  Zap,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  ArrowRight,
  Clock,
  Layers,
  Cpu,
  Info,
  ChevronRight,
  ShieldCheck,
  Radio,
  FileText,
  IndianRupee,
  AlertCircle,
  SkipForward,
  SkipBack
} from 'lucide-react';
import { ComparisonView } from './ComparisonView';

export const SimulatorPage: React.FC = () => {
  const {
    scenarios,
    activeScenario,
    scenarioStep,
    isScenarioRunning,
    runScenario,
    resetScenario,
    alerts,
    setSelectedAlert,
    setActiveTab,
    stepScenarioForward,
    stepScenarioBackward,
    pauseScenarioPlayback,
    resumeScenarioPlayback
  } = useAgriShield();

  const currentScenarioObj = scenarios.find((s) => s.id === activeScenario);
  const latestAlert = alerts[0];

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-charcoal-800 border border-charcoal-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-agri-emerald text-xs font-mono font-semibold mb-2">
            <Zap className="w-3.5 h-3.5 fill-agri-emerald/20" />
            <span>INTERACTIVE THREAT SIMULATION LAB</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-agri-text-primary">
            Cyber-Physical Incident & Anomaly Detection Stories
          </h1>
          <p className="text-xs text-agri-text-secondary mt-1 max-w-2xl leading-relaxed">
            Experience complete end-to-end incident lifecycles: <strong className="text-agri-text-primary">Normal Operation → Suspicious Activity → AgriShield Detection → Risk Prevention → Recommended Response</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-agri-amber/10 border border-agri-amber/30 text-agri-amber font-bold">
            SIMULATED DEMONSTRATION
          </span>
          {activeScenario && (
            <button
              onClick={resetScenario}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-charcoal-900 hover:bg-charcoal-750 text-agri-text-secondary hover:text-agri-text-primary text-xs font-semibold border border-charcoal-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Baseline</span>
            </button>
          )}
        </div>
      </div>

      {/* Complete 5-Stage Story Player (Active Scenario) */}
      {activeScenario && currentScenarioObj && (
        <div className="p-6 rounded-2xl bg-charcoal-800 border border-emerald-500/40 shadow-glow-emerald space-y-6">
          {/* Active Story Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-charcoal-700">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-agri-emerald flex items-center justify-center font-mono font-bold text-xs">
                  {currentScenarioObj.id}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-agri-cyan font-bold">
                  {currentScenarioObj.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-agri-text-primary mt-1">
                {currentScenarioObj.name}
              </h3>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="text-agri-text-muted">Target Asset:</span>
              <span className="font-mono font-bold text-agri-emerald">{currentScenarioObj.targetAssetId}</span>
              <span className="text-agri-text-muted">({currentScenarioObj.facility})</span>
            </div>
          </div>

          {/* Interactive Playback Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-charcoal-900 border border-charcoal-700">
            <div className="flex items-center gap-2">
              <button
                onClick={stepScenarioBackward}
                className="p-2 rounded-lg bg-charcoal-800 hover:bg-charcoal-750 text-agri-text-secondary hover:text-agri-text-primary border border-charcoal-700 transition-colors"
                title="Step Backward"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>

              {isScenarioRunning ? (
                <button
                  onClick={pauseScenarioPlayback}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-agri-amber/20 text-agri-amber border border-agri-amber/40 hover:bg-agri-amber/30 text-xs font-semibold transition-colors"
                >
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause</span>
                </button>
              ) : (
                <button
                  onClick={resumeScenarioPlayback}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Play / Continue</span>
                </button>
              )}

              <button
                onClick={stepScenarioForward}
                className="p-2 rounded-lg bg-charcoal-800 hover:bg-charcoal-750 text-agri-text-secondary hover:text-agri-text-primary border border-charcoal-700 transition-colors"
                title="Step Forward"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-agri-text-muted">
              <span>Simulation Speed:</span>
              <span className="text-agri-emerald font-bold">1x Real-time Ingest</span>
            </div>
          </div>

          {/* 5-Stage Interactive Progress Bar */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-agri-text-muted mb-2 font-bold flex items-center justify-between">
              <span>5-Stage Incident Lifecycle Progression</span>
              <span className="text-agri-emerald">
                Stage {scenarioStep + 1} of 5: {currentScenarioObj.storyStages[scenarioStep]?.stage}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
              {currentScenarioObj.storyStages.map((stageItem, idx) => {
                const isPast = idx < scenarioStep;
                const isCurrent = idx === scenarioStep;
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-xs transition-all ${
                      isCurrent
                        ? 'bg-charcoal-750 border-emerald-500/70 shadow-sm'
                        : isPast
                        ? 'bg-charcoal-900 border-emerald-500/30'
                        : 'bg-charcoal-900/60 border-charcoal-700 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[9px] uppercase font-bold text-agri-text-muted">
                        Stage 0{idx + 1}
                      </span>
                      {isPast ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-agri-emerald" />
                      ) : isCurrent ? (
                        <span className="w-2 h-2 rounded-full bg-agri-emerald animate-ping" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-charcoal-700" />
                      )}
                    </div>
                    <div className="font-semibold text-agri-text-primary text-[11px] truncate">{stageItem.stage}</div>
                    <div className="text-[10px] text-agri-text-muted mt-1 leading-snug line-clamp-2">
                      {stageItem.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Before vs After Reading Comparison & Forensic Impact Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Box 1: Sensor Readings Comparison */}
            <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-agri-text-muted font-bold block">
                Telemetry Signal Ingest
              </span>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-charcoal-800 border border-charcoal-700">
                  <span className="text-[10px] font-mono text-agri-text-muted uppercase block">Original Calibrated Reading:</span>
                  <span className="font-mono font-bold text-agri-emerald mt-0.5 block">
                    {currentScenarioObj.originalReading}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-charcoal-800 border border-agri-red/40">
                  <span className="text-[10px] font-mono text-agri-red uppercase block font-semibold">Injected Suspicious Event:</span>
                  <span className="font-mono font-bold text-agri-red mt-0.5 block">
                    {currentScenarioObj.suspiciousReading}
                  </span>
                </div>
              </div>
            </div>

            {/* Box 2: How Detected & Action Taken */}
            <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-agri-text-muted font-bold block">
                AgriShield Protection Mechanism
              </span>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-agri-cyan uppercase block font-semibold">How Detected:</span>
                  <p className="text-agri-text-secondary text-[11px] mt-0.5 leading-snug">
                    {currentScenarioObj.howDetected}
                  </p>
                </div>
                <div className="pt-2 border-t border-charcoal-700">
                  <span className="text-[10px] font-mono text-agri-emerald uppercase block font-semibold">Action Taken by Prototype:</span>
                  <p className="text-agri-text-primary text-[11px] mt-0.5 leading-snug font-medium">
                    {currentScenarioObj.actionTaken}
                  </p>
                </div>
              </div>
            </div>

            {/* Box 3: Physical & Financial Consequences */}
            <div className="p-4 rounded-xl bg-agri-red/10 border border-agri-red/30 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-agri-red font-bold block flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-agri-red" />
                <span>Physical & Financial Consequences</span>
              </span>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-agri-text-muted uppercase block">Potential Physical Loss:</span>
                  <p className="text-agri-text-primary text-[11px] mt-0.5 leading-snug font-medium">
                    {currentScenarioObj.physicalConsequence}
                  </p>
                </div>
                <div className="pt-2 border-t border-agri-red/20">
                  <span className="text-[10px] font-mono text-agri-amber uppercase block font-semibold">Financial Impact Value:</span>
                  <p className="text-agri-amber font-mono font-bold text-xs mt-0.5">
                    {currentScenarioObj.financialConsequence}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Side-by-Side Consequence Comparator */}
          <ComparisonView scenario={currentScenarioObj} />

          {/* Quick Action Footer */}
          {!isScenarioRunning && latestAlert && (
            <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-agri-amber">
                <AlertTriangle className="w-4 h-4 text-agri-amber" />
                <span>
                  Incident Alert Generated: <strong className="text-agri-text-primary">{latestAlert.title}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedAlert(latestAlert)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Investigate Evidence & Impact</span>
                </button>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="px-4 py-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 text-agri-text-secondary hover:text-agri-text-primary font-medium transition-colors"
                >
                  View on Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4 Interactive Scenario Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scenarios.map((scenario) => {
          const isActive = activeScenario === scenario.id;
          return (
            <div
              key={scenario.id}
              className={`p-6 rounded-2xl bg-charcoal-800 border transition-all flex flex-col justify-between ${
                isActive
                  ? 'border-emerald-500/70 shadow-glow-emerald bg-charcoal-750'
                  : 'border-charcoal-700 hover:border-charcoal-600'
              }`}
            >
              <div>
                {/* Scenario Header */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-emerald-500/10 text-agri-emerald border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-xs">
                      {scenario.id}
                    </span>
                    <div>
                      <span className="text-[10px] font-mono text-agri-cyan uppercase tracking-wider block font-semibold">
                        {scenario.category}
                      </span>
                      <h3 className="text-base font-bold text-agri-text-primary">
                        {scenario.name.replace(/^Scenario [A-D]: /, '')}
                      </h3>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-900 text-agri-text-muted border border-charcoal-700 shrink-0">
                    {scenario.facility}
                  </span>
                </div>

                <p className="text-xs text-agri-text-secondary mt-2 leading-relaxed">
                  {scenario.summary}
                </p>

                {/* Target Asset Box */}
                <div className="mt-4 p-3 rounded-xl bg-charcoal-900 border border-charcoal-700 text-xs space-y-1">
                  <div className="flex items-center justify-between text-agri-text-muted">
                    <span className="font-mono text-[10px] uppercase">Target Asset:</span>
                    <span className="font-mono text-agri-emerald font-semibold">{scenario.targetAssetId}</span>
                  </div>
                  <div className="font-medium text-agri-text-primary truncate">{scenario.targetAssetName}</div>
                </div>

                {/* Physical & Financial Consequence */}
                <div className="mt-3 p-3 rounded-xl bg-agri-red/5 border border-agri-red/25 text-xs">
                  <div className="flex items-center gap-1.5 text-agri-red font-semibold text-[11px] uppercase tracking-wider mb-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Consequence: {scenario.physicalConsequence}</span>
                  </div>
                  <div className="text-[11px] font-mono text-agri-amber font-semibold">
                    Cost Risk: {scenario.financialConsequence}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-charcoal-700 flex items-center justify-between gap-3">
                <span className="text-[11px] text-agri-text-muted font-mono">
                  5-Stage Simulation Pipeline
                </span>
                <button
                  onClick={() => runScenario(scenario.id)}
                  disabled={isScenarioRunning}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm ${
                    isActive && isScenarioRunning
                      ? 'bg-agri-amber text-charcoal-950 cursor-wait animate-pulse'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white hover:shadow-glow-emerald'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{isActive && isScenarioRunning ? 'Simulating...' : 'Run Scenario'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
