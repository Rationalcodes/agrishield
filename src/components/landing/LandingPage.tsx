import React from 'react';
import { useAgriShield } from '../../context/AgriShieldContext';
import {
  Shield,
  Zap,
  Radio,
  Cpu,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Lock,
  Activity,
  FileCheck2,
  TrendingUp,
  Server,
  CloudRain,
  Thermometer,
  Flame,
  ChevronRight
} from 'lucide-react';
import { AgriShieldLogo } from '../common/AgriShieldLogo';

export const LandingPage: React.FC = () => {
  const { setActiveTab, setInvestorModalOpen, runScenario } = useAgriShield();

  return (
    <div className="space-y-16 pb-20 animate-fade-in">
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-12 pb-8 overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-agri-emerald text-xs font-mono font-medium">
            <span className="w-2 h-2 rounded-full bg-agri-emerald animate-ping" />
            <span>AI-Powered OT Cybersecurity & Operational Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-agri-text-primary tracking-tight leading-tight sm:leading-none">
            Securing the Digital <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Backbone of Agriculture
            </span>
          </h1>

          <p className="text-sm sm:text-base text-agri-text-secondary max-w-2xl mx-auto leading-relaxed">
            AgriShield combines AI-driven anomaly detection, authenticated sensor telemetry, and operational technology security to help protect farms, cold-chain facilities, and bio-power infrastructure.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-950 transition-all hover:scale-[1.02]"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Launch Interactive Demo</span>
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 text-agri-text-primary font-semibold text-xs sm:text-sm border border-charcoal-700 transition-all"
            >
              <span>Explore Threat Simulator</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setInvestorModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-agri-cyan font-semibold text-xs sm:text-sm transition-all"
            >
              <span>Investor Briefing</span>
            </button>
          </div>
        </div>

        {/* Interactive Hero Preview Card */}
        <div className="mt-12 max-w-4xl mx-auto p-5 rounded-2xl bg-charcoal-800 border border-charcoal-700 shadow-2xl relative">
          <div className="flex items-center justify-between pb-3 border-b border-charcoal-700 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-agri-emerald animate-pulse" />
              <span className="font-mono text-agri-text-primary font-medium">LIVE TELEMETRY STREAM & BEHAVIORAL RADAR</span>
            </div>
            <span className="font-mono text-[10px] text-agri-emerald bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              ZERO-TRUST OT BUS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
            <div className="p-3.5 rounded-xl bg-charcoal-900 border border-charcoal-700">
              <span className="text-[10px] font-mono text-agri-text-muted uppercase">Soil Sensor Fleet</span>
              <div className="font-mono font-bold text-base text-agri-emerald mt-1">31.2% VWC</div>
              <span className="text-[10px] text-agri-text-muted">Ed25519 Signed · In Envelope</span>
            </div>
            <div className="p-3.5 rounded-xl bg-charcoal-900 border border-charcoal-700">
              <span className="text-[10px] font-mono text-agri-text-muted uppercase">Chamber 3 Cold Vault</span>
              <div className="font-mono font-bold text-base text-agri-cyan mt-1">-18.4°C</div>
              <span className="text-[10px] text-agri-text-muted">HMAC Verified · Stable</span>
            </div>
            <div className="p-3.5 rounded-xl bg-charcoal-900 border border-agri-amber/40 bg-amber-500/5">
              <span className="text-[10px] font-mono text-agri-amber uppercase font-semibold">Active Flag</span>
              <div className="font-mono font-bold text-base text-agri-amber mt-1">Zone 2 Coil Write</div>
              <span className="text-[10px] text-agri-text-muted">Unauthenticated Modbus FC 0x05</span>
            </div>
          </div>

          <div className="mt-3.5 pt-3 border-t border-charcoal-700 flex items-center justify-between text-xs text-agri-text-muted">
            <span>Simulated Network: 12 connected assets across Smart Farm, Cold Storage & Bio-Power</span>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="text-agri-emerald hover:underline flex items-center gap-1 font-medium"
            >
              <span>Explore Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Concrete Problem Section (3 Domains) */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-agri-red font-semibold">
            Vulnerabilities in the Food & Energy Chain
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-agri-text-primary mt-1">
            Why Modern Agricultural Infrastructure is Exposed
          </h2>
          <p className="text-xs sm:text-sm text-agri-text-muted mt-2">
            Automated controllers and connected IoT sensors lack native cryptographic defenses, turning cyber events into devastating physical losses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-charcoal-800 border border-charcoal-700 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-agri-emerald">
              <CloudRain className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-agri-text-primary">Smart Agriculture & Irrigation</h3>
            <p className="text-xs text-agri-text-secondary leading-relaxed">
              Manipulated soil moisture sensor readings or unauthorized irrigation PLC coil commands can fool automated watering algorithms into flooding or starving crops during fragile vegetative cycles.
            </p>
            <div className="text-[11px] font-mono text-agri-red pt-2 border-t border-charcoal-700">
              Physical risk: Permanent vine damage & 40%+ crop yield loss
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-charcoal-800 border border-charcoal-700 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-agri-cyan">
              <Thermometer className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-agri-text-primary">Cold-Chain Infrastructure</h3>
            <p className="text-xs text-agri-text-secondary leading-relaxed">
              Thermostatic spoofing, undetected compressor throttling, or rogue setpoint tampering causes silent thermal excursions that spoil refrigerated seed stock, biologics, and export meat produce.
            </p>
            <div className="text-[11px] font-mono text-agri-red pt-2 border-t border-charcoal-700">
              Physical risk: ₹28.5L+ batch write-offs & FSSAI food safety violations
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-charcoal-800 border border-charcoal-700 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-agri-amber">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-agri-text-primary">Bio-Power & Industrial OT</h3>
            <p className="text-xs text-agri-text-secondary leading-relaxed">
              Exposed anaerobic digester telecontrollers and legacy variable-frequency drives on flat Ethernet subnets allow packet spoofing, risking dangerous methane flaring shutdowns and boiler stalls.
            </p>
            <div className="text-[11px] font-mono text-agri-red pt-2 border-t border-charcoal-700">
              Physical risk: Hazardous biogas overpressure & power export penalties
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Visual Workflow */}
      <section className="p-8 rounded-2xl bg-charcoal-800 border border-charcoal-700 space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-agri-cyan font-semibold">
            End-To-End Ingestion Pipeline
          </span>
          <h2 className="text-2xl font-bold text-agri-text-primary mt-1">
            Five-Step Continuous Protection Lifecycle
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-4">
          {[
            {
              step: '01',
              title: 'CONNECTED ASSETS',
              desc: 'Field sensors, irrigation PLCs, refrigeration controllers, and bio-energy gateways transmit telemetry.',
              icon: Cpu
            },
            {
              step: '02',
              title: 'AUTHENTICATED TELEMETRY',
              desc: 'Cryptographic engine validates Ed25519/HMAC signatures against enrolled hardware keys.',
              icon: Lock
            },
            {
              step: '03',
              title: 'BEHAVIORAL ANALYSIS',
              desc: 'AI correlates readings across spatial neighbors, weather stations, and historical physical baselines.',
              icon: Activity
            },
            {
              step: '04',
              title: 'RISK DETECTION',
              desc: 'Flags impossible rates-of-change, unauthenticated Modbus writes, or thermal envelope breaches.',
              icon: AlertTriangle
            },
            {
              step: '05',
              title: 'ACTIONABLE RESPONSE',
              desc: 'Generates plain-language forensic explanations and prioritized field verification steps.',
              icon: CheckCircle2
            }
          ].map((w, idx) => {
            const Icon = w.icon;
            return (
              <div key={idx} className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700 text-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-agri-text-muted mb-2">
                    <span className="font-mono text-xs font-bold text-agri-emerald">{w.step}</span>
                    <Icon className="w-4 h-4 text-agri-cyan" />
                  </div>
                  <h4 className="font-mono font-bold text-agri-text-primary tracking-wider text-[11px] mb-1.5">{w.title}</h4>
                  <p className="text-agri-text-muted text-[11px] leading-relaxed">{w.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3 Industry Use Cases Cards */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-agri-emerald font-semibold">
            Applied Industry Environments
          </span>
          <h2 className="text-2xl font-bold text-agri-text-primary mt-1">
            Proven Industrial Use Cases
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-charcoal-800 border border-charcoal-700 space-y-4">
            <h3 className="text-base font-bold text-agri-text-primary">Smart Farms & Irrigation Networks</h3>
            <div className="space-y-2 text-xs">
              <div>
                <span className="font-mono font-bold text-agri-text-muted uppercase text-[10px] block">Scenario:</span>
                <span className="text-agri-text-secondary">High-value vineyard employing automated variable-rate drip irrigation.</span>
              </div>
              <div>
                <span className="font-mono font-bold text-agri-red uppercase text-[10px] block">Specific Threat:</span>
                <span className="text-agri-text-secondary">Sensor spoofing simulating saturated soil, leading to water withholding.</span>
              </div>
              <div>
                <span className="font-mono font-bold text-agri-emerald uppercase text-[10px] block">AgriShield Response:</span>
                <span className="text-agri-text-secondary">Correlates reading against adjacent reference sensors, flags divergence, and alerts operator.</span>
              </div>
            </div>
            <button
              onClick={() => runScenario('A')}
              className="w-full py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-agri-emerald border border-emerald-500/40 text-xs font-semibold transition-colors"
            >
              Simulate Farm Scenario →
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-charcoal-800 border border-charcoal-700 space-y-4">
            <h3 className="text-base font-bold text-agri-text-primary">Cold-Chain & Food Logistics</h3>
            <div className="space-y-2 text-xs">
              <div>
                <span className="font-mono font-bold text-agri-text-muted uppercase text-[10px] block">Scenario:</span>
                <span className="text-agri-text-secondary">Regional cold-storage depot storing ₹28.5 Lakhs worth of temperature-sensitive export table grapes.</span>
              </div>
              <div>
                <span className="font-mono font-bold text-agri-red uppercase text-[10px] block">Specific Threat:</span>
                <span className="text-agri-text-secondary">Refrigeration failure or thermostatic spoofing causing chamber temperature to surge.</span>
              </div>
              <div>
                <span className="font-mono font-bold text-agri-emerald uppercase text-[10px] block">AgriShield Response:</span>
                <span className="text-agri-text-secondary">Detects rate-of-climb exceeding thermal dissipation baseline and initiates countdown.</span>
              </div>
            </div>
            <button
              onClick={() => runScenario('D')}
              className="w-full py-2 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 text-agri-cyan border border-cyan-500/40 text-xs font-semibold transition-colors"
            >
              Simulate Cold-Chain Scenario →
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-charcoal-800 border border-charcoal-700 space-y-4">
            <h3 className="text-base font-bold text-agri-text-primary">Bio-Power & Anaerobic Digesters</h3>
            <div className="space-y-2 text-xs">
              <div>
                <span className="font-mono font-bold text-agri-text-muted uppercase text-[10px] block">Scenario:</span>
                <span className="text-agri-text-secondary">Agricultural biomass plant converting dairy waste into renewable grid power.</span>
              </div>
              <div>
                <span className="font-mono font-bold text-agri-red uppercase text-[10px] block">Specific Threat:</span>
                <span className="text-agri-text-secondary">Forged OPC UA packets attempting to alter digester pressure thresholds.</span>
              </div>
              <div>
                <span className="font-mono font-bold text-agri-emerald uppercase text-[10px] block">AgriShield Response:</span>
                <span className="text-agri-text-secondary">Ed25519 cryptographic validation fails; packet quarantined at edge boundary.</span>
              </div>
            </div>
            <button
              onClick={() => runScenario('B')}
              className="w-full py-2 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 text-agri-amber border border-amber-500/40 text-xs font-semibold transition-colors"
            >
              Simulate Bio-Power Scenario →
            </button>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="p-8 sm:p-12 rounded-3xl bg-charcoal-800 border border-emerald-500/30 text-center space-y-6">
        <AgriShieldLogo size={44} className="justify-center" />
        <h2 className="text-2xl sm:text-3xl font-extrabold text-agri-text-primary max-w-xl mx-auto">
          Experience the Enterprise SOC Prototype
        </h2>
        <p className="text-xs sm:text-sm text-agri-text-secondary max-w-lg mx-auto">
          Step into our interactive prototype to test live threat scenarios, inspect cryptographically signed sensor packets, and explore our business model.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-950 transition-all"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>Open Security Dashboard</span>
          </button>
          <button
            onClick={() => setInvestorModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-charcoal-900 hover:bg-charcoal-750 text-agri-text-primary font-semibold text-sm border border-charcoal-700 transition-colors"
          >
            <span>Request Investor Briefing</span>
          </button>
        </div>
      </section>
    </div>
  );
};
