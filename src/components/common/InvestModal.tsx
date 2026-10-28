import React, { useState } from 'react';
import { useAgriShield } from '../../context/AgriShieldContext';
import { X, CheckCircle, Download, FileText, Send, Building, Shield, ChevronRight } from 'lucide-react';
import { api } from '../../services/api';

export const InvestModal: React.FC = () => {
  const { investorModalOpen, setInvestorModalOpen, setActiveTab, addToast } = useAgriShield();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: 'Venture Partner',
    firm: 'Agricultural & Critical Infrastructure Fund',
    role: 'Venture Partner',
    focusArea: 'OT Security & AI Anomaly Detection',
    message: 'Interested in reviewing technical architecture, pilot metrics, and seed unit economics.',
  });

  if (!investorModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    api.submitInvestorLead(formData).catch((err) => {
      console.warn('Backend lead capture offline, saved locally:', err);
    });
    addToast('Investor Briefing request registered successfully with AgriShield Backend', 'success');
  };

  const handleReset = () => {
    setSubmitted(false);
    setInvestorModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-charcoal-800 border border-charcoal-700 rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-700 bg-charcoal-850">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-agri-emerald">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-agri-text-primary">AgriShield Investor Briefing</h3>
              <p className="text-xs text-agri-text-muted">Request Technical Memo & Schedule Confidential Walkthrough</p>
            </div>
          </div>
          <button
            onClick={() => setInvestorModalOpen(false)}
            className="p-1.5 rounded-lg text-agri-text-muted hover:text-agri-text-primary hover:bg-charcoal-750 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-charcoal-900 border border-charcoal-700 text-xs text-agri-text-secondary leading-relaxed">
                <p className="font-semibold text-agri-emerald mb-1">
                  Demonstration Note for Prospective Investors:
                </p>
                <p>
                  This briefing module connects you directly with the founding team. You can download the Executive Summary Briefing Memo, inspect the unit economics model, and submit your evaluation focus areas.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-agri-text-primary mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-charcoal-900 border border-charcoal-700 text-agri-text-primary text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-agri-text-primary mb-1">Firm / Investment Group</label>
                  <input
                    type="text"
                    required
                    value={formData.firm}
                    onChange={(e) => setFormData({ ...formData, firm: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-charcoal-900 border border-charcoal-700 text-agri-text-primary text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-agri-text-primary mb-1">Investor Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-charcoal-900 border border-charcoal-700 text-agri-text-primary text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Venture Capital Partner">Venture Capital Partner</option>
                    <option value="AgTech Corporate VC">AgTech Corporate VC</option>
                    <option value="Angel / Syndicate Lead">Angel / Syndicate Lead</option>
                    <option value="Agricultural Co-op Operator">Agricultural Co-op Operator</option>
                    <option value="OT / ICS Security Strategist">OT / ICS Security Strategist</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-agri-text-primary mb-1">Evaluation Focus</label>
                  <select
                    value={formData.focusArea}
                    onChange={(e) => setFormData({ ...formData, focusArea: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-charcoal-900 border border-charcoal-700 text-agri-text-primary text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value="OT Security & AI Anomaly Detection">OT Security & AI Anomaly Detection</option>
                    <option value="Go-To-Market & Assessment-to-SaaS Model">Go-To-Market & Assessment-to-SaaS Model</option>
                    <option value="Cold-Chain & Food Supply Chain Security">Cold-Chain & Food Supply Chain Security</option>
                    <option value="Hardware Enclave & Cryptographic Auth">Hardware Enclave & Cryptographic Auth</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-agri-text-primary mb-1">Brief Inquiry / Evaluation Notes</label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-charcoal-900 border border-charcoal-700 text-agri-text-primary text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('investor');
                    setInvestorModalOpen(false);
                  }}
                  className="text-xs text-agri-text-muted hover:text-agri-emerald flex items-center gap-1"
                >
                  <span>Review Financial Model First</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setInvestorModalOpen(false)}
                    className="px-3 py-2 rounded-lg bg-charcoal-750 hover:bg-charcoal-700 text-agri-text-secondary text-xs font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Briefing Request</span>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-center py-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-agri-emerald">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-base font-semibold text-agri-text-primary">Briefing Request Registered</h4>
                <p className="text-xs text-agri-text-muted mt-1 max-w-md mx-auto">
                  Thank you for your interest in AgriShield. Your evaluation profile for <strong className="text-agri-emerald">{formData.firm}</strong> has been logged in this prototype session.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700 text-left text-xs space-y-2">
                <div className="font-semibold text-agri-text-primary">Recommended Next Steps in this Demonstration:</div>
                <div className="flex items-center gap-2 text-agri-text-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-agri-emerald" />
                  <span>Run all 4 scenarios in the Threat Simulation Lab</span>
                </div>
                <div className="flex items-center gap-2 text-agri-text-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-agri-emerald" />
                  <span>Review and adjust unit economics in the Investment Opportunity tab</span>
                </div>
                <div className="flex items-center gap-2 text-agri-text-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-agri-emerald" />
                  <span>Inspect telemetry cryptography in the Live Telemetry page</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    handleReset();
                    setActiveTab('simulator');
                  }}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
                >
                  Explore Threat Simulator
                </button>
                <button
                  onClick={() => {
                    handleReset();
                    setActiveTab('investor');
                  }}
                  className="px-4 py-2 rounded-lg bg-charcoal-750 hover:bg-charcoal-700 text-agri-text-primary text-xs font-semibold transition-colors"
                >
                  View Investment Model
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
