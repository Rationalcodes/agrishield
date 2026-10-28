import React, { useState } from 'react';
import { useAgriShield } from '../../context/AgriShieldContext';
import {
  TrendingUp,
  IndianRupee,
  Shield,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Sliders,
  Sparkles,
  PieChart as PieIcon,
  Target,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Building2,
  FileText
} from 'lucide-react';

export const InvestorPage: React.FC = () => {
  const {
    investorInputs,
    updateInvestorInputs,
    fundingAllocation,
    updateFundingAllocation,
    setInvestorModalOpen,
    setActiveTab,
    isPresentationMode,
    setIsPresentationMode
  } = useAgriShield();

  const [proposedFundingTarget, setProposedFundingTarget] = useState<number>(75000000); // ₹7.5 Crore Seed
  const [pitchSlide, setPitchSlide] = useState<number>(0);

  // Derived Financial Calculations in INR
  const arr = investorInputs.payingCustomers * investorInputs.annualContractValue;
  const assessmentRev = investorInputs.payingCustomers * investorInputs.assessmentFee;
  const totalRev = arr + assessmentRev;
  const cogs = totalRev * 0.22; // ~78% gross margin for hybrid SaaS + cloud OT ingest
  const grossProfit = totalRev - cogs;
  const netSurplus = grossProfit - investorInputs.annualOperatingExpenses;
  const totalMonitoredNodes = investorInputs.payingCustomers * investorInputs.monitoredDevicesPerCustomer;

  const totalAllocationPct = Object.values(fundingAllocation).reduce((acc, curr) => acc + curr, 0);

  // Indian Rupee (INR) Formatter supporting Lakhs (L) and Crores (Cr)
  const formatINR = (num: number) => {
    if (Math.abs(num) >= 10000000) {
      return `₹${(num / 10000000).toFixed(2)} Cr`;
    }
    if (Math.abs(num) >= 100000) {
      return `₹${(num / 100000).toFixed(2)} Lakh`;
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="space-y-8 pb-16 animate-fade-in">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-charcoal-800 border border-charcoal-700 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-agri-cyan text-xs font-mono font-semibold mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>INDIAN MARKET COMMERCIAL OPPORTUNITY & BUSINESS MODEL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-agri-text-primary tracking-tight">
            Securing India's Critical Agro-Food & Bio-Energy Infrastructure
          </h1>
          <p className="text-xs sm:text-sm text-agri-text-secondary mt-2 leading-relaxed">
            Tailored for Indian precision agriculture clusters, FPOs, cold-storage warehouses, and SATAT Bio-CNG plants. Explore our assessment-to-SaaS customer acquisition flywheel, interactive unit economics calculator, and Seed financing milestones.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button
            onClick={() => setIsPresentationMode(!isPresentationMode)}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
              isPresentationMode
                ? 'bg-charcoal-750 text-agri-cyan border-cyan-500/50 shadow-sm'
                : 'bg-charcoal-900 hover:bg-charcoal-750 text-agri-text-primary border-charcoal-700'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5 text-agri-cyan" />
            <span>{isPresentationMode ? 'Exit Pitch Deck' : 'Executive Pitch Deck'}</span>
          </button>
          <button
            onClick={() => setInvestorModalOpen(true)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs shadow-lg shadow-emerald-950 transition-all"
          >
            <Sparkles className="w-4 h-4 text-cyan-200" />
            <span>Request VC Briefing</span>
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-charcoal-900 hover:bg-charcoal-750 text-agri-text-primary font-medium text-xs border border-charcoal-700 transition-colors"
          >
            <span>Explore Threat Simulator</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* EXECUTIVE PRESENTATION PITCH DECK MODE */}
      {isPresentationMode && (
        <div className="p-8 rounded-3xl bg-charcoal-800 border border-cyan-500/40 shadow-2xl space-y-6 animate-fade-in">
          {/* Deck Stepper Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-charcoal-700">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-agri-cyan font-bold block">
                SERIES SEED PITCH DECK // INDIAN AGRI-OT SECURITY
              </span>
              <h2 className="text-xl font-bold text-agri-text-primary mt-1">
                AgriShield India: Seed Investment Walkthrough
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-agri-text-muted">
                Slide {pitchSlide + 1} of 4
              </span>
              <div className="flex items-center gap-1 bg-charcoal-900 p-1 rounded-lg border border-charcoal-700">
                <button
                  onClick={() => setPitchSlide(Math.max(0, pitchSlide - 1))}
                  disabled={pitchSlide === 0}
                  className="px-2.5 py-1 rounded text-xs font-mono disabled:opacity-30 hover:bg-charcoal-750 text-agri-text-primary"
                >
                  ← Prev
                </button>
                <button
                  onClick={() => setPitchSlide(Math.min(3, pitchSlide + 1))}
                  disabled={pitchSlide === 3}
                  className="px-2.5 py-1 rounded text-xs font-mono disabled:opacity-30 hover:bg-charcoal-750 text-agri-text-primary font-semibold"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>

          {/* Slide 0: The Urgent Problem & Indian Market Opportunity */}
          {pitchSlide === 0 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <span className="font-mono text-xs text-agri-red font-bold uppercase">The Cyber-Physical Vulnerability</span>
                <h3 className="text-2xl font-black text-agri-text-primary">
                  India's ₹11,500 Crore Agro-Cold Chain & Bio-Energy OT is Defenseless to Telemetry Spoofing
                </h3>
                <p className="text-xs text-agri-text-secondary leading-relaxed max-w-3xl">
                  Across 10,000+ Indian commercial cold stores, 7,000+ FPOs, 5,000 SATAT Bio-CNG plants, and high-value export horticulture clusters (Nashik, Sonipat, Shimla), automation is expanding rapidly. Legacy PLCs lack cryptographic verification: a manipulated moisture or temperature reading results in catastrophic physical crop dehydration or ₹28+ Lakhs of spoiled stock.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-700 space-y-2">
                  <div className="font-mono font-bold text-2xl text-agri-red">₹11,500 Cr</div>
                  <div className="text-xs font-semibold text-agri-text-primary">Indian Agro-OT Security TAM</div>
                  <p className="text-[11px] text-agri-text-muted">
                    10,000+ registered cold storages, 7,000+ FPOs, 5,000 SATAT Bio-CNG plants, and precision horticulture corridors.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-700 space-y-2">
                  <div className="font-mono font-bold text-2xl text-agri-amber">&lt; 2%</div>
                  <div className="text-xs font-semibold text-agri-text-primary">Authenticated Sensor Bus Rate</div>
                  <p className="text-[11px] text-agri-text-muted">
                    Over 98% of Indian irrigation pump PLCs, chiller controls, and soil probes run on unauthenticated plaintext Modbus TCP or raw LoRa.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-700 space-y-2">
                  <div className="font-mono font-bold text-2xl text-agri-cyan">₹28.5 Lakhs</div>
                  <div className="text-xs font-semibold text-agri-text-primary">Average Single Incident Loss</div>
                  <p className="text-[11px] text-agri-text-muted">
                    Financial loss from an undetected refrigeration door excursion in a Controlled Atmosphere apple or seed vault.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Slide 1: The Solution & Moats */}
          {pitchSlide === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <span className="font-mono text-xs text-agri-emerald font-bold uppercase">The Technology Differentiator</span>
                <h3 className="text-2xl font-black text-agri-text-primary">
                  Converged Cyber-Physical Defense Built for Indian Field Conditions
                </h3>
                <p className="text-xs text-agri-text-secondary leading-relaxed max-w-3xl">
                  Enterprise IT security cannot install agent software on 24V agricultural PLCs or understand the thermodynamics of Indian summer heatwaves. AgriShield provides 4 defensible moats.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-700 space-y-2">
                  <div className="font-semibold text-agri-emerald text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Moat 1: Hardware-Level Cryptographic Ingestion</span>
                  </div>
                  <p className="text-[11px] text-agri-text-secondary leading-relaxed">
                    Ed25519 signature checks and HMAC keys at the demarcation gateway drop spoofed or unauthorized packets in &lt; 300ms before they reach automated controllers.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-700 space-y-2">
                  <div className="font-semibold text-agri-cyan text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Moat 2: Spatial Agronomic Plausibility Model</span>
                  </div>
                  <p className="text-[11px] text-agri-text-secondary leading-relaxed">
                    Cross-references sensor telemetry against neighboring probes, IMD/local weather microloggers, and historical diurnal curves to detect subtle sensor tampering.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-700 space-y-2">
                  <div className="font-semibold text-agri-amber text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Moat 3: Automated Fail-Safe Safety Interlocks</span>
                  </div>
                  <p className="text-[11px] text-agri-text-secondary leading-relaxed">
                    Decouples compromised sensor telemetry from automated irrigation and refrigeration schedulers, enforcing safe baseline operation with zero downtime.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-700 space-y-2">
                  <div className="font-semibold text-purple-400 text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Moat 4: Plug-and-Play Indian OEM Compatibility</span>
                  </div>
                  <p className="text-[11px] text-agri-text-secondary leading-relaxed">
                    Works seamlessly with Schneider India, Carel, Jain Irrigation, Netafim, and indigenous LoRaWAN telemetry with no expensive hardware replacement.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Slide 2: Business Model & Flywheel */}
          {pitchSlide === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <span className="font-mono text-xs text-agri-cyan font-bold uppercase">Commercial Go-To-Market</span>
                <h3 className="text-2xl font-black text-agri-text-primary">
                  The Assessment-to-SaaS Customer Acquisition Flywheel
                </h3>
                <p className="text-xs text-agri-text-secondary leading-relaxed max-w-3xl">
                  Indian enterprise operators and FPO leaders prefer diagnostic proof before signing annual software contracts. AgriShield uses a paid security assessment to uncover critical flaws within 48 hours, converting 65%+ into high-margin recurring SaaS.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-700 space-y-2">
                  <span className="font-mono text-[10px] text-agri-text-muted uppercase font-bold block">Stage 1: Acquisition</span>
                  <div className="font-bold text-sm text-agri-text-primary">OT Security Assessment</div>
                  <div className="font-mono text-agri-emerald font-bold text-sm">₹1,25,000 one-time</div>
                  <p className="text-[11px] text-agri-text-muted">
                    Purdue model architecture scan & CERT-In / FSSAI gap analysis. Completely covers customer acquisition cost (CAC).
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-700 space-y-2">
                  <span className="font-mono text-[10px] text-agri-text-muted uppercase font-bold block">Stage 2: Validation</span>
                  <div className="font-bold text-sm text-agri-text-primary">30-Day Edge Pilot</div>
                  <div className="font-mono text-agri-cyan font-bold text-sm">Low-Risk Deployment</div>
                  <p className="text-[11px] text-agri-text-muted">
                    Demonstrates zero false-positives while monitoring 15–50 field nodes with real-time cryptographic validation.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-charcoal-900 border border-emerald-500/40 space-y-2 shadow-glow-emerald">
                  <span className="font-mono text-[10px] text-agri-emerald uppercase font-bold block">Stage 3: Recurring SaaS</span>
                  <div className="font-bold text-sm text-agri-text-primary">Enterprise Subscription</div>
                  <div className="font-mono text-agri-emerald font-bold text-sm">₹3,60,000 / facility / yr</div>
                  <p className="text-[11px] text-agri-text-muted">
                    78% gross margins with 125% net revenue retention driven by fleet sensor expansion.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                <div>
                  <span className="text-agri-text-muted block text-[10px]">CAC PAYBACK PERIOD</span>
                  <span className="text-agri-emerald font-bold text-base">5.8 Months</span>
                </div>
                <div>
                  <span className="text-agri-text-muted block text-[10px]">LTV:CAC RATIO</span>
                  <span className="text-agri-cyan font-bold text-base">6.4x</span>
                </div>
                <div>
                  <span className="text-agri-text-muted block text-[10px]">GROSS MARGIN</span>
                  <span className="text-agri-emerald font-bold text-base">78.0%</span>
                </div>
                <div>
                  <span className="text-agri-text-muted block text-[10px]">NET RETENTION</span>
                  <span className="text-agri-amber font-bold text-base">125%</span>
                </div>
              </div>
            </div>
          )}

          {/* Slide 3: Seed Ask & Execution Milestones */}
          {pitchSlide === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <span className="font-mono text-xs text-agri-amber font-bold uppercase">Series Seed Financing</span>
                <h3 className="text-2xl font-black text-agri-text-primary">
                  ₹7.5 Crore Seed Round: Scaling to ₹6.0 Crore ARR across 75+ Indian Facilities
                </h3>
                <p className="text-xs text-agri-text-secondary leading-relaxed max-w-3xl">
                  Capital will be deployed to expand core engineering in Bengaluru/Pune, establish our hardware cryptographic testing lab, and execute pilots across Maharashtra grape corridors, Sonipat cold chains, and UP SATAT bio-CNG plants.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700 space-y-1">
                  <span className="font-mono text-xs text-agri-emerald font-bold">MONTH 0 - 6</span>
                  <div className="font-bold text-agri-text-primary text-xs">Pilot Validation</div>
                  <p className="text-[11px] text-agri-text-muted">
                    15 commercial pilots live across Nashik, Sonipat, and Baramati. First ₹1.2 Cr ARR.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700 space-y-1">
                  <span className="font-mono text-xs text-agri-cyan font-bold">MONTH 6 - 12</span>
                  <div className="font-bold text-agri-text-primary text-xs">OEM Hardware Integrations</div>
                  <p className="text-[11px] text-agri-text-muted">
                    Native pre-enrolled driver integrations with Schneider India, Carel, and Sentek sensors. Reaching 40 facilities.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700 space-y-1">
                  <span className="font-mono text-xs text-agri-amber font-bold">MONTH 12 - 18</span>
                  <div className="font-bold text-agri-text-primary text-xs">Scale & Compliance</div>
                  <p className="text-[11px] text-agri-text-muted">
                    75+ enterprise hubs live (₹6.0 Cr ARR). Full CERT-In, BIS IS/ISO/IEC 62443, and FSSAI readiness for Series A.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
                  <span className="font-mono text-xs text-agri-emerald font-bold">SERIES A TARGET</span>
                  <div className="font-bold text-agri-text-primary text-xs">₹6.0 Cr ARR / ₹45 Cr+ Valuation</div>
                  <p className="text-[11px] text-agri-text-muted">
                    Established as India's category-defining cyber-physical agricultural security platform.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  onClick={() => setInvestorModalOpen(true)}
                  className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-emerald-950"
                >
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  <span>Request Full Investor Data Room & Term Sheet Walkthrough</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION 1: THE PROBLEM & MARKET OPPORTUNITY */}
      <div className="p-6 sm:p-8 rounded-2xl bg-charcoal-800 border border-charcoal-700 space-y-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-agri-cyan font-bold block mb-1">
            Section 01
          </span>
          <h2 className="text-lg font-bold text-agri-text-primary flex items-center gap-2">
            <Target className="w-5 h-5 text-agri-cyan" />
            <span>The Problem & Addressable Indian Market Opportunity</span>
          </h2>
          <p className="text-xs text-agri-text-secondary mt-1">
            Why India's expanding agricultural IoT and food supply infrastructure urgently requires specialized OT cybersecurity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700 space-y-2">
            <div className="font-semibold text-agri-text-primary text-xs">High Physical Stakes in Export Hubs</div>
            <p className="text-[11px] text-agri-text-muted leading-relaxed">
              In Indian precision agriculture, a spoofed soil moisture reading shuts down drip irrigation during critical vine flowering, causing ₹14.5 Lakhs in crop desiccation per 25-acre block.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700 space-y-2">
            <div className="font-semibold text-agri-text-primary text-xs">Rapid Cold Chain Expansion</div>
            <p className="text-[11px] text-agri-text-muted leading-relaxed">
              India has over 10,000 cold storages and CA warehouses connecting legacy PLCs to cloud portals without encryption, risking silent thaw of ₹28+ Lakhs of perishable produce.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700 space-y-2">
            <div className="font-semibold text-agri-text-primary text-xs">CERT-In & SATAT Directives</div>
            <p className="text-[11px] text-agri-text-muted leading-relaxed">
              CERT-In cyber security mandates, FSSAI traceability, and SATAT Bio-CNG guidelines require verifiable telemetry authentication and incident reporting across critical sectors.
            </p>
          </div>
        </div>

        {/* Editable TAM / SAM / SOM (INR) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-charcoal-700">
          <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700">
            <span className="text-[10px] font-mono text-agri-cyan uppercase font-bold block mb-1">
              TAM — Total Addressable Market
            </span>
            <div className="flex items-center gap-2">
              <span className="text-agri-text-muted font-mono text-lg">₹</span>
              <input
                type="number"
                step="100"
                value={investorInputs.tamBillion}
                onChange={(e) => updateInvestorInputs({ tamBillion: parseFloat(e.target.value) || 0 })}
                className="w-28 px-2 py-1 rounded bg-charcoal-800 border border-charcoal-700 font-mono text-lg font-bold text-agri-text-primary focus:outline-none focus:border-agri-cyan"
              />
              <span className="text-agri-text-secondary font-mono text-sm font-semibold">Crore</span>
            </div>
            <p className="text-[11px] text-agri-text-muted mt-2">
              India smart agriculture, cold-storage telemetry, and distributed bio-energy OT cybersecurity spend.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700">
            <span className="text-[10px] font-mono text-agri-emerald uppercase font-bold block mb-1">
              SAM — Serviceable Addressable Market
            </span>
            <div className="flex items-center gap-2">
              <span className="text-agri-text-muted font-mono text-lg">₹</span>
              <input
                type="number"
                step="50"
                value={investorInputs.samBillion}
                onChange={(e) => updateInvestorInputs({ samBillion: parseFloat(e.target.value) || 0 })}
                className="w-28 px-2 py-1 rounded bg-charcoal-800 border border-charcoal-700 font-mono text-lg font-bold text-agri-text-primary focus:outline-none focus:border-agri-emerald"
              />
              <span className="text-agri-text-secondary font-mono text-sm font-semibold">Crore</span>
            </div>
            <p className="text-[11px] text-agri-text-muted mt-2">
              Commercial agribusinesses, CA cold chain depots, and SATAT bio-CNG plants in Western and Northern India.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700">
            <span className="text-[10px] font-mono text-agri-amber uppercase font-bold block mb-1">
              SOM — Serviceable Obtainable Market (3-5 Yr)
            </span>
            <div className="flex items-center gap-2">
              <span className="text-agri-text-muted font-mono text-lg">₹</span>
              <input
                type="number"
                step="10"
                value={investorInputs.somMillion}
                onChange={(e) => updateInvestorInputs({ somMillion: parseFloat(e.target.value) || 0 })}
                className="w-28 px-2 py-1 rounded bg-charcoal-800 border border-charcoal-700 font-mono text-lg font-bold text-agri-text-primary focus:outline-none focus:border-agri-amber"
              />
              <span className="text-agri-text-secondary font-mono text-sm font-semibold">Crore</span>
            </div>
            <p className="text-[11px] text-agri-text-muted mt-2">
              Initial obtainable market targeting the top 1,000 regional agro-logistics hubs and progressive FPOs.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: THE BUSINESS MODEL (3 Revenue Streams) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-charcoal-800 border border-charcoal-700 space-y-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-agri-emerald font-bold block mb-1">
            Section 02
          </span>
          <h2 className="text-lg font-bold text-agri-text-primary flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-agri-emerald" />
            <span>The Business Model: Three Complementary Indian Revenue Streams</span>
          </h2>
          <p className="text-xs text-agri-text-secondary mt-1">
            Accessible entry point through OT security audits, converting directly into high-margin recurring software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-charcoal-900 border border-charcoal-700 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-agri-emerald font-bold border border-emerald-500/30">
                  STREAM 1: ENTRY
                </span>
                <span className="text-agri-text-muted">One-Time Fee</span>
              </div>
              <h3 className="text-base font-bold text-agri-text-primary">OT Security Assessments</h3>
              <div className="text-xl font-bold font-mono text-agri-emerald mt-1">
                ₹75,000 – ₹2,50,000 <span className="text-xs text-agri-text-muted font-sans font-normal">/ facility</span>
              </div>
              <p className="text-xs text-agri-text-secondary mt-3 leading-relaxed">
                Comprehensive on-site and remote asset discovery, Purdue model network segmentation audit, legacy firmware CVE review, and CERT-In / FSSAI gap analysis.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-charcoal-700 text-[11px] text-agri-text-muted font-mono">
              Role: Builds trust & completely covers customer acquisition cost (CAC)
            </div>
          </div>

          <div className="p-5 rounded-xl bg-charcoal-900 border border-emerald-500/40 shadow-glow-emerald flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-agri-cyan font-bold border border-cyan-500/30">
                  STREAM 2: CORE RECURRING
                </span>
                <span className="text-agri-text-muted">Annual SaaS</span>
              </div>
              <h3 className="text-base font-bold text-agri-text-primary">Enterprise Monitoring SaaS</h3>
              <div className="text-xl font-bold font-mono text-agri-cyan mt-1">
                ₹25,000 – ₹60,000 <span className="text-xs text-agri-text-muted font-sans font-normal">/ month / facility</span>
              </div>
              <div className="font-mono text-xs text-agri-text-muted mt-0.5">(₹3.0 Lakhs – ₹7.2 Lakhs / year)</div>
              <p className="text-xs text-agri-text-secondary mt-2.5 leading-relaxed">
                Continuous 24/7 telemetry ingestion, cryptographic authentication checks, multi-variable physical anomaly detection, automated fail-safe interlocks, and compliance logs.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-charcoal-700 text-[11px] text-agri-emerald font-mono">
              Role: 78%+ gross margin recurring software engine
            </div>
          </div>

          <div className="p-5 rounded-xl bg-charcoal-900 border border-charcoal-700 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-agri-amber font-bold border border-amber-500/30">
                  STREAM 3: EXPANSION
                </span>
                <span className="text-agri-text-muted">Per-Node / Mo</span>
              </div>
              <h3 className="text-base font-bold text-agri-text-primary">FPO & Smart Farm Sensor Subscriptions</h3>
              <div className="text-xl font-bold font-mono text-agri-amber mt-1">
                ₹499 – ₹1,299 <span className="text-xs text-agri-text-muted font-sans font-normal">/ node / month</span>
              </div>
              <p className="text-xs text-agri-text-secondary mt-3 leading-relaxed">
                Scalable tiered pricing for distributed agricultural probe fleets, soil capacitance arrays, and center-pivot controllers, aligning directly with monitored acreage.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-charcoal-700 text-[11px] text-agri-text-muted font-mono">
              Role: Natural expansion with customer IoT rollout
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: THE FINANCIAL MODEL (Interactive Calculator) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-charcoal-800 border border-emerald-500/40 shadow-glow-emerald space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-agri-emerald font-bold block mb-1">
              Section 03
            </span>
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-agri-emerald" />
              <h2 className="text-lg font-bold text-agri-text-primary">Interactive Unit Economics & Profitability Calculator (INR)</h2>
            </div>
            <p className="text-xs text-agri-text-secondary mt-0.5">
              Adjust paying customer counts, contract values in Rupees, and operating expenses to model revenue and margin scenarios.
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-agri-amber/10 border border-agri-amber/30 text-agri-amber font-bold">
            INDIAN FINANCIAL MODEL
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sliders Column */}
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-agri-text-primary font-medium">Paying Customers (Facilities / FPOs)</span>
                <span className="font-mono font-bold text-agri-emerald">{investorInputs.payingCustomers} customers</span>
              </div>
              <input
                type="range"
                min={5}
                max={250}
                step={5}
                value={investorInputs.payingCustomers}
                onChange={(e) => updateInvestorInputs({ payingCustomers: parseInt(e.target.value) })}
                className="w-full accent-emerald-500 bg-charcoal-900 rounded-lg h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-agri-text-muted mt-1">
                <span>5 (Early Cohort)</span>
                <span>100</span>
                <span>250 (Scale)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-agri-text-primary font-medium">Average Annual Contract Value (ACV)</span>
                <span className="font-mono font-bold text-agri-cyan">{formatINR(investorInputs.annualContractValue)} / yr</span>
              </div>
              <input
                type="range"
                min={120000}
                max={1200000}
                step={30000}
                value={investorInputs.annualContractValue}
                onChange={(e) => updateInvestorInputs({ annualContractValue: parseInt(e.target.value) })}
                className="w-full accent-cyan-500 bg-charcoal-900 rounded-lg h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-agri-text-muted mt-1">
                <span>₹1.2L (Single Site)</span>
                <span>₹3.6L (Standard)</span>
                <span>₹12.0L (Multi-Depot Cluster)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-agri-text-primary font-medium">One-Time Assessment Fee per Customer</span>
                <span className="font-mono font-bold text-agri-amber">{formatINR(investorInputs.assessmentFee)}</span>
              </div>
              <input
                type="range"
                min={50000}
                max={350000}
                step={25000}
                value={investorInputs.assessmentFee}
                onChange={(e) => updateInvestorInputs({ assessmentFee: parseInt(e.target.value) })}
                className="w-full accent-amber-500 bg-charcoal-900 rounded-lg h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-agri-text-muted mt-1">
                <span>₹50,000</span>
                <span>₹1,25,000 (Standard Audit)</span>
                <span>₹3,50,000</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-agri-text-primary font-medium">Annual Operating Expenses (Engineering, R&D, G&A)</span>
                <span className="font-mono font-bold text-agri-red">{formatINR(investorInputs.annualOperatingExpenses)}</span>
              </div>
              <input
                type="range"
                min={2000000}
                max={15000000}
                step={500000}
                value={investorInputs.annualOperatingExpenses}
                onChange={(e) => updateInvestorInputs({ annualOperatingExpenses: parseInt(e.target.value) })}
                className="w-full accent-red-500 bg-charcoal-900 rounded-lg h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-agri-text-muted mt-1">
                <span>₹20L (Lean Seed)</span>
                <span>₹48L (Active Team)</span>
                <span>₹1.5 Cr (Series A Scale)</span>
              </div>
            </div>
          </div>

          {/* Real-Time Output Calculation Cards */}
          <div className="space-y-4 flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700">
                <span className="text-agri-text-muted text-[10px] uppercase font-mono block">Annual Recurring Revenue (ARR)</span>
                <span className="font-mono font-extrabold text-xl text-agri-emerald mt-1 block">
                  {formatINR(arr)}
                </span>
                <span className="text-[10px] text-agri-text-muted mt-0.5 block">SaaS software subscriptions</span>
              </div>

              <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700">
                <span className="text-agri-text-muted text-[10px] uppercase font-mono block">Assessment Revenue</span>
                <span className="font-mono font-extrabold text-xl text-agri-amber mt-1 block">
                  {formatINR(assessmentRev)}
                </span>
                <span className="text-[10px] text-agri-text-muted mt-0.5 block">One-time audit engagements</span>
              </div>

              <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700">
                <span className="text-agri-text-muted text-[10px] uppercase font-mono block">Total Annual Revenue</span>
                <span className="font-mono font-extrabold text-xl text-agri-cyan mt-1 block">
                  {formatINR(totalRev)}
                </span>
                <span className="text-[10px] text-agri-text-muted mt-0.5 block">Gross Margin ~78%</span>
              </div>

              <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700">
                <span className="text-agri-text-muted text-[10px] uppercase font-mono block">Monitored Sensor Fleet</span>
                <span className="font-mono font-extrabold text-xl text-agri-text-primary mt-1 block">
                  {totalMonitoredNodes.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-agri-text-muted mt-0.5 block">Active nodes under protection</span>
              </div>
            </div>

            {/* Operating Surplus / Deficit Bottomline */}
            <div className={`p-4 rounded-xl border ${netSurplus >= 0 ? 'bg-emerald-500/10 border-emerald-500/40' : 'bg-red-500/10 border-red-500/40'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-agri-text-primary">
                    Estimated Operating Surplus / (Deficit):
                  </span>
                  <div className="text-[11px] text-agri-text-muted">
                    Gross Profit ({formatINR(grossProfit)}) minus Operating Expenses ({formatINR(investorInputs.annualOperatingExpenses)})
                  </div>
                </div>
                <div className={`text-2xl font-mono font-black ${netSurplus >= 0 ? 'text-agri-emerald' : 'text-agri-red'}`}>
                  {formatINR(netSurplus)}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-charcoal-900 border border-charcoal-700 text-[11px] text-agri-text-muted leading-relaxed">
              <strong className="text-agri-text-primary">Methodology Transparency:</strong> This illustrative model demonstrates that AgriShield achieves cash-flow positive operations with fewer than 35 Indian enterprise customers due to high upfront assessment revenue and software gross margins.
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: THE INVESTMENT THESIS, MILESTONES & CAPITAL ALLOCATION */}
      <div className="p-6 sm:p-8 rounded-2xl bg-charcoal-800 border border-charcoal-700 space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-agri-cyan font-bold block mb-1">
            Section 04
          </span>
          <h2 className="text-lg font-bold text-agri-text-primary flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-agri-emerald" />
            <span>The Investment Thesis, Milestones & Capital Allocation</span>
          </h2>
          <p className="text-xs text-agri-text-secondary mt-1">
            Execution roadmaps and key technical assumptions that will be validated in commercial Indian pilots.
          </p>
        </div>

        {/* Theses & Milestones Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
          <div className="space-y-3">
            <div className="font-semibold text-agri-text-primary text-xs uppercase tracking-wider font-mono">
              Core Strategic Theses for India
            </div>
            {[
              {
                t: '1. Cyber-Physical Convergence in Indian Agriculture',
                d: 'High-value horticulture (Nashik grapes, apple CA stores, SATAT bio-CNG) cannot tolerate unauthenticated sensor drift or pump tampering. AgriShield bridges physical reality and IT.'
              },
              {
                t: '2. Software-First Retrofit on Indian OEMs',
                d: 'Compatible with Schneider India, Carel, Jain Irrigation, and Netafim without demanding costly hardware replacement or operational downtime.'
              },
              {
                t: '3. Low-Friction Diagnostic Entry Point',
                d: 'Paid assessments bypass lengthy corporate procurement delays, creating high-intent conversion to continuous monitoring SaaS.'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-charcoal-900 border border-charcoal-700 space-y-1">
                <div className="font-semibold text-agri-emerald">{item.t}</div>
                <p className="text-agri-text-muted leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="font-semibold text-agri-text-primary text-xs uppercase tracking-wider font-mono">
              Key Risks & Indian Validation Milestones
            </div>
            {[
              {
                r: 'Legacy Field Protocol Diversity',
                m: 'Milestone: Build DIN-rail hardware enclave proxy for Modbus-to-TLS bridging across Indian rural substations.'
              },
              {
                r: 'Extreme Temperature Fluctuations',
                m: 'Milestone: Calibrate baseline models for 48°C peak summer heatwaves without generating false alarms.'
              },
              {
                r: 'FPO Commercial Sales Cycles',
                m: 'Milestone: Align GTM with harvest turnaround windows and NABARD / SATAT subsidy audit schedules.'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-charcoal-900 border border-charcoal-700 space-y-1">
                <div className="font-semibold text-agri-amber">{item.r}</div>
                <div className="text-[11px] font-mono text-agri-text-secondary">{item.m}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Editable Seed Funding Allocation (₹7.5 Crore) */}
        <div className="pt-4 border-t border-charcoal-700 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs font-semibold text-agri-text-primary">
              Proposed Seed Round Capital Allocation ({formatINR(proposedFundingTarget)})
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-agri-text-muted">Total:</span>
              <span className={`font-mono font-bold ${totalAllocationPct === 100 ? 'text-agri-emerald' : 'text-agri-amber'}`}>
                {totalAllocationPct}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { key: 'engineering', label: 'Core Engineering' },
              { key: 'testing', label: 'OT Testing Lab' },
              { key: 'iotIntegrations', label: 'Indian OEM Drivers' },
              { key: 'pilotDeployments', label: 'Field Pilots' },
              { key: 'salesMarketing', label: 'GTM & Audits' },
              { key: 'compliance', label: 'CERT-In & FSSAI' },
            ].map((item) => {
              const val = fundingAllocation[item.key as keyof typeof fundingAllocation];
              return (
                <div key={item.key} className="p-3 rounded-xl bg-charcoal-900 border border-charcoal-700 text-xs space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-agri-text-muted truncate">{item.label}</span>
                    <span className="font-mono font-bold text-agri-text-primary">{val}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={60}
                    step={1}
                    value={val}
                    onChange={(e) =>
                      updateFundingAllocation(
                        item.key as keyof typeof fundingAllocation,
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-full accent-emerald-500 bg-charcoal-800 rounded-lg h-1.5 cursor-pointer"
                  />
                  <div className="font-mono text-[10px] text-agri-emerald font-semibold">
                    {formatINR((proposedFundingTarget * val) / 100)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action Bar */}
        <div className="p-6 rounded-2xl bg-charcoal-900 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-agri-text-primary">
              Ready to evaluate AgriShield for venture investment or commercial pilot participation?
            </h4>
            <p className="text-xs text-agri-text-muted mt-0.5">
              Request our technical architecture memo, Indian unit economics model, and confidential demonstration.
            </p>
          </div>
          <button
            onClick={() => setInvestorModalOpen(true)}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shrink-0 shadow-sm"
          >
            Request Investor Briefing
          </button>
        </div>
      </div>
    </div>
  );
};
