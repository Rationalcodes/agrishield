import React, { useState } from 'react';
import { useAgriShield } from '../../context/AgriShieldContext';
import {
  X,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Layers,
  FileText,
  Send,
  RotateCcw,
  Check,
  ExternalLink,
  Info,
  AlertCircle
} from 'lucide-react';

export const IncidentDetailModal: React.FC = () => {
  const {
    selectedAlert,
    setSelectedAlert,
    acknowledgeAlert,
    resolveAlert,
    reopenAlert,
    addOperatorNote,
    setActiveTab,
    setSelectedAsset,
    assets
  } = useAgriShield();

  const [newNote, setNewNote] = useState<string>('');

  if (!selectedAlert) return null;

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    addOperatorNote(selectedAlert.id, newNote);
    setNewNote('');
  };

  const matchedAsset = assets.find((a) => a.id === selectedAlert.assetId);

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-agri-red/20 text-agri-red border-agri-red/30';
      case 'investigating':
        return 'bg-agri-amber/20 text-agri-amber border-agri-amber/30';
      case 'resolved':
        return 'bg-emerald-500/20 text-agri-emerald border-emerald-500/30';
      default:
        return 'bg-charcoal-700 text-slate-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-charcoal-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-charcoal-800 border border-charcoal-700 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-700 bg-charcoal-850 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border ${getSeverityBadge(selectedAlert.severity)}`}>
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-agri-text-muted">{selectedAlert.alertId}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold border ${getSeverityBadge(selectedAlert.severity)}`}>
                  {selectedAlert.severity} Severity
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-semibold border ${getStatusBadge(selectedAlert.status)}`}>
                  Status: {selectedAlert.status}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-agri-text-primary mt-0.5 leading-snug">
                {selectedAlert.title}
              </h2>
            </div>
          </div>
          <button
            onClick={() => setSelectedAlert(null)}
            className="p-1.5 rounded-lg text-agri-text-muted hover:text-agri-text-primary hover:bg-charcoal-750 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Asset & Facility Info Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-charcoal-900 border border-charcoal-700 text-xs">
            <div>
              <span className="text-agri-text-muted block text-[10px] uppercase font-mono">Affected Asset</span>
              <button
                onClick={() => {
                  if (matchedAsset) {
                    setSelectedAsset(matchedAsset);
                    setActiveTab('assets');
                    setSelectedAlert(null);
                  }
                }}
                className="font-semibold text-agri-emerald hover:underline flex items-center gap-1 mt-0.5"
              >
                <span>{selectedAlert.assetId}</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
            <div>
              <span className="text-agri-text-muted block text-[10px] uppercase font-mono">Facility Domain</span>
              <span className="font-medium text-agri-text-primary block mt-0.5">{selectedAlert.facility}</span>
            </div>
            <div>
              <span className="text-agri-text-muted block text-[10px] uppercase font-mono">Detection Category</span>
              <span className="font-medium text-agri-cyan block mt-0.5">{selectedAlert.category}</span>
            </div>
            <div>
              <span className="text-agri-text-muted block text-[10px] uppercase font-mono">Detection Time</span>
              <span className="font-mono text-agri-text-primary block mt-0.5">{selectedAlert.timestamp}</span>
            </div>
          </div>

          {/* Evidence Analysis Block */}
          <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-agri-text-primary">
              <Layers className="w-4 h-4 text-agri-emerald" />
              <span>Observed Evidence & Baseline Comparison</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-charcoal-800 border border-agri-red/30">
                <span className="text-agri-red font-mono text-[10px] uppercase block font-semibold">
                  Observed Measurement / Signal
                </span>
                <span className="font-mono text-agri-text-primary mt-1 block font-bold text-sm">
                  {selectedAlert.observedMetric}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-charcoal-800 border border-emerald-500/30">
                <span className="text-agri-emerald font-mono text-[10px] uppercase block font-semibold">
                  Configured Operational Baseline
                </span>
                <span className="font-mono text-agri-text-secondary mt-1 block text-sm">
                  {selectedAlert.configuredBaseline}
                </span>
              </div>
            </div>
          </div>

          {/* 3-Part Explainability */}
          <div className="space-y-4">
            {/* 1. What Happened */}
            <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700">
              <div className="flex items-center gap-2 text-xs font-semibold text-agri-cyan uppercase tracking-wider mb-1.5">
                <Info className="w-4 h-4" />
                <span>1. What Happened</span>
              </div>
              <p className="text-xs sm:text-sm text-agri-text-primary leading-relaxed">
                {selectedAlert.whatHappened}
              </p>
            </div>

            {/* 2. Why It Matters */}
            <div className="p-4 rounded-xl bg-agri-amber/5 border border-agri-amber/25">
              <div className="flex items-center gap-2 text-xs font-semibold text-agri-amber uppercase tracking-wider mb-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>2. Why It Matters — Physical Operational Consequence</span>
              </div>
              <p className="text-xs sm:text-sm text-agri-text-primary leading-relaxed font-medium">
                {selectedAlert.whyItMatters}
              </p>
              {selectedAlert.financialImpact && (
                <div className="mt-2 text-xs font-mono text-agri-amber font-semibold">
                  Estimated Financial Exposure: {selectedAlert.financialImpact}
                </div>
              )}
            </div>

            {/* 3. What To Do Next */}
            <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700">
              <div className="flex items-center gap-2 text-xs font-semibold text-agri-emerald uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>3. Recommended Next Steps (Prioritized Verification)</span>
              </div>
              <ul className="space-y-2">
                {selectedAlert.whatToDoNext.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-agri-text-secondary">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-agri-emerald flex items-center justify-center font-mono text-[10px] shrink-0 font-bold border border-emerald-500/30">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Incident Timeline */}
          <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700">
            <div className="flex items-center gap-2 text-xs font-semibold text-agri-text-primary uppercase tracking-wider mb-3">
              <Clock className="w-4 h-4 text-agri-cyan" />
              <span>Incident Event Timeline</span>
            </div>
            <div className="relative border-l border-charcoal-700 ml-2.5 space-y-3.5 py-1">
              {selectedAlert.timeline.map((event, idx) => (
                <div key={idx} className="relative pl-5 text-xs">
                  <div
                    className={`absolute -left-1.5 top-1 w-3 h-3 rounded-full border-2 bg-charcoal-800 ${
                      event.type === 'detection'
                        ? 'border-agri-red bg-agri-red'
                        : event.type === 'operator'
                        ? 'border-agri-emerald bg-agri-emerald'
                        : 'border-agri-cyan bg-agri-cyan'
                    }`}
                  />
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-agri-text-muted">{event.time}</span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded uppercase ${
                        event.type === 'detection'
                          ? 'bg-agri-red/20 text-agri-red'
                          : event.type === 'operator'
                          ? 'bg-emerald-500/20 text-agri-emerald'
                          : 'bg-cyan-500/20 text-agri-cyan'
                      }`}
                    >
                      {event.type}
                    </span>
                  </div>
                  <p className="text-agri-text-secondary mt-0.5">{event.event}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Operator Investigation Notes */}
          <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-agri-text-primary uppercase tracking-wider">
                <FileText className="w-4 h-4 text-agri-emerald" />
                <span>Operator Log & Investigation Notes ({selectedAlert.operatorNotes.length})</span>
              </div>
              <span className="text-[10px] text-agri-text-muted italic">Persisted in session storage</span>
            </div>

            {selectedAlert.operatorNotes.length > 0 ? (
              <div className="space-y-2">
                {selectedAlert.operatorNotes.map((note, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-charcoal-800 border border-charcoal-700 text-xs text-agri-text-secondary font-mono">
                    {note}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-agri-text-muted italic">No operator notes recorded yet.</p>
            )}

            {/* Add note input */}
            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Record observation, field dispatch dispatch, or verification result..."
                className="flex-1 px-3 py-2 rounded-lg bg-charcoal-800 border border-charcoal-700 text-xs text-agri-text-primary focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-lg bg-charcoal-750 hover:bg-charcoal-700 text-agri-text-primary text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Add Note</span>
              </button>
            </form>
          </div>
        </div>

        {/* Fixed Footer Operator Controls */}
        <div className="px-6 py-4 border-t border-charcoal-700 bg-charcoal-850 shrink-0 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-agri-text-muted">
            {selectedAlert.acknowledgedBy ? (
              <span>Acknowledged by <strong className="text-agri-text-primary">{selectedAlert.acknowledgedBy}</strong> ({selectedAlert.acknowledgedAt})</span>
            ) : (
              <span className="text-agri-amber">Alert pending initial operator acknowledgment</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {selectedAlert.status === 'open' && (
              <button
                onClick={() => acknowledgeAlert(selectedAlert.id, 'Shift Operator')}
                className="px-3.5 py-1.5 rounded-lg bg-agri-amber/20 hover:bg-agri-amber/30 border border-agri-amber/40 text-agri-amber text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Acknowledge</span>
              </button>
            )}

            {selectedAlert.status !== 'resolved' ? (
              <button
                onClick={() => resolveAlert(selectedAlert.id)}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mark as Resolved</span>
              </button>
            ) : (
              <button
                onClick={() => reopenAlert(selectedAlert.id)}
                className="px-3.5 py-1.5 rounded-lg bg-charcoal-750 hover:bg-charcoal-700 text-agri-text-secondary text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reopen Incident</span>
              </button>
            )}

            <button
              onClick={() => setSelectedAlert(null)}
              className="px-3.5 py-1.5 rounded-lg bg-charcoal-750 hover:bg-charcoal-700 text-agri-text-secondary text-xs font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
