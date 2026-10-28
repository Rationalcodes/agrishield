import React from 'react';
import { AgriShieldProvider, useAgriShield } from './context/AgriShieldContext';
import { Sidebar } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { ToastContainer } from './components/common/ToastContainer';
import { LandingPage } from './components/landing/LandingPage';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { SimulatorPage } from './components/simulator/SimulatorPage';
import { TelemetryPage } from './components/telemetry/TelemetryPage';
import { AssetsPage } from './components/assets/AssetsPage';
import { AssessmentPage } from './components/assessment/AssessmentPage';
import { AssistantPage } from './components/assistant/AssistantPage';
import { InvestorPage } from './components/investor/InvestorPage';
import { IncidentDetailModal } from './components/investigation/IncidentDetailModal';
import { AssetDetailModal } from './components/assets/AssetDetailModal';
import { InvestModal } from './components/common/InvestModal';
import { ExportDossierModal } from './components/assessment/ExportDossierModal';
import { AgriShieldLogo } from './components/common/AgriShieldLogo';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab, sidebarCollapsed } = useAgriShield();

  return (
    <div className="min-h-screen bg-charcoal-900 text-agri-text-primary flex font-sans">
      {/* Collapsible Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 pl-0 ${
          sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Top Header */}
        <Header />

        {/* Dynamic Route View */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          {activeTab === 'landing' && <LandingPage />}
          {activeTab === 'dashboard' && <DashboardPage />}
          {activeTab === 'simulator' && <SimulatorPage />}
          {activeTab === 'telemetry' && <TelemetryPage />}
          {activeTab === 'assets' && <AssetsPage />}
          {activeTab === 'assessment' && <AssessmentPage />}
          {activeTab === 'assistant' && <AssistantPage />}
          {activeTab === 'investor' && <InvestorPage />}
        </main>

        {/* Global Floating Modals & Toasts */}
        <IncidentDetailModal />
        <AssetDetailModal />
        <InvestModal />
        <ExportDossierModal />
        <ToastContainer />

        {/* Enterprise SOC Footer */}
        <footer className="w-full border-t border-charcoal-700 bg-charcoal-950 mt-16 text-xs text-agri-text-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AgriShieldLogo size={24} showText={false} />
              <span className="font-mono text-[11px] text-agri-text-muted">
                AgriShield Technologies Inc. · Industrial Cyber-Physical Defense SOC
              </span>
            </div>
            <div className="flex items-center gap-4 font-mono text-[11px] text-agri-text-muted">
              <span>Purdue Zone 1-4</span>
              <span>•</span>
              <span>Ed25519 & HMAC-SHA256</span>
              <span>•</span>
              <span className="text-agri-emerald font-semibold">Simulated Prototype v2.1</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export function App() {
  return (
    <AgriShieldProvider>
      <AppContent />
    </AgriShieldProvider>
  );
}

export default App;
