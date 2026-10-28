import React, { useState, useEffect } from 'react';
import { useAgriShield } from '../../context/AgriShieldContext';
import { FacilityType } from '../../types';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Clock,
  Sparkles,
  Menu,
  ShieldCheck,
  Radio,
  FileText,
  Layers,
  ChevronDown,
  Lock
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    sidebarCollapsed,
    toggleSidebar,
    activeScenario,
    isScenarioRunning,
    alerts,
    setSelectedAlert,
    setActiveTab,
    setInvestorModalOpen,
    kpis,
    selectedFacility,
    setSelectedFacility,
    setExportDossierOpen
  } = useAgriShield();

  const [timeStr, setTimeStr] = useState<string>('');
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showFacilityMenu, setShowFacilityMenu] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toTimeString().split(' ')[0] + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const unreadAlerts = alerts.filter((a) => a.status === 'open');

  const facilities: { id: FacilityType | 'All'; label: string }[] = [
    { id: 'All', label: 'All Operational Zones (3)' },
    { id: 'Smart Farm', label: 'Nashik Autonomous Vineyard' },
    { id: 'Cold Storage', label: 'Sonipat CA Cold Vaults' },
    { id: 'Bio-Power Facility', label: 'Baramati SATAT Bio-Energy Plant' },
  ];

  return (
    <header className="sticky top-0 z-30 h-16 w-full border-b border-charcoal-700 bg-charcoal-900/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Organization & Facility Dropdown & Health Pill */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-1.5 rounded-lg text-agri-text-muted hover:text-agri-text-primary hover:bg-charcoal-800 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Facility Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowFacilityMenu(!showFacilityMenu)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 border border-charcoal-700 text-xs text-agri-text-primary transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-agri-emerald" />
            <span className="font-semibold hidden sm:inline">
              {facilities.find((f) => f.id === selectedFacility)?.label || 'All Operational Zones'}
            </span>
            <span className="font-semibold sm:hidden">
              {selectedFacility}
            </span>
            <ChevronDown className="w-3 h-3 text-agri-text-muted" />
          </button>

          {showFacilityMenu && (
            <div className="absolute left-0 mt-2 w-64 bg-charcoal-800 border border-charcoal-700 rounded-xl shadow-2xl p-1.5 z-50 animate-fade-in text-xs space-y-1">
              <div className="px-2.5 py-1 text-[10px] font-mono text-agri-text-muted uppercase">
                Select Operational Target
              </div>
              {facilities.map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setSelectedFacility(f.id);
                    setShowFacilityMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                    selectedFacility === f.id
                      ? 'bg-emerald-600/20 text-agri-emerald font-semibold border border-emerald-500/30'
                      : 'text-agri-text-secondary hover:text-agri-text-primary hover:bg-charcoal-750'
                  }`}
                >
                  <span>{f.label}</span>
                  {selectedFacility === f.id && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-agri-emerald" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center gap-2.5">
          <span className="text-charcoal-600">|</span>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-charcoal-800 border border-charcoal-700 text-xs text-agri-text-secondary font-mono">
            <span className="w-2 h-2 rounded-full bg-agri-emerald animate-ping" />
            <span className="font-medium text-agri-text-primary">99.8% Healthy</span>
            <span className="text-agri-text-muted">({kpis.healthyDevices}/{kpis.monitoredAssets} Nodes)</span>
          </div>
          <span className="text-charcoal-600">|</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono font-bold text-agri-emerald">
            <Lock className="w-2.5 h-2.5" />
            <span>ED25519 ZERO-TRUST BUS</span>
          </span>
        </div>
      </div>

      {/* Right: Actions & Tools */}
      <div className="flex items-center gap-3">
        {/* Active Scenario Indicator if Running */}
        {isScenarioRunning && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-agri-red/15 border border-agri-red/40 text-agri-red font-mono text-xs font-bold animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Simulating Scenario {activeScenario}...</span>
          </div>
        )}

        {/* Generate Audit Report Quick Button */}
        <button
          onClick={() => setExportDossierOpen(true)}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 border border-charcoal-700 text-xs font-medium text-agri-text-secondary hover:text-agri-text-primary transition-colors"
          title="Open Executive Audit Dossier"
        >
          <FileText className="w-3.5 h-3.5 text-agri-cyan" />
          <span>Audit Dossier</span>
        </button>

        {/* Live Clock */}
        <div className="hidden xl:flex items-center gap-1.5 font-mono text-xs text-agri-text-muted bg-charcoal-800/80 px-2.5 py-1 rounded-lg border border-charcoal-700">
          <Clock className="w-3.5 h-3.5 text-agri-emerald" />
          <span>{timeStr}</span>
        </div>

        {/* Investor Briefing Pill */}
        <button
          onClick={() => setInvestorModalOpen(true)}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs transition-all shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
          <span>VC Briefing</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 text-agri-text-secondary hover:text-agri-text-primary border border-charcoal-700 transition-colors"
            title="Open Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadAlerts.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-agri-red text-white font-mono text-[9px] font-bold flex items-center justify-center animate-pulse">
                {unreadAlerts.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-charcoal-800 border border-charcoal-700 rounded-xl shadow-2xl p-3 z-50 animate-fade-in">
              <div className="flex items-center justify-between border-b border-charcoal-700 pb-2 mb-2 text-xs">
                <span className="font-semibold text-agri-text-primary">
                  Open Incidents ({unreadAlerts.length})
                </span>
                <button
                  onClick={() => {
                    setActiveTab('dashboard');
                    setShowNotifications(false);
                  }}
                  className="text-[10px] text-agri-emerald hover:underline font-medium"
                >
                  View All
                </button>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {alerts.slice(0, 4).map((a) => (
                  <div
                    key={a.id}
                    onClick={() => {
                      setSelectedAlert(a);
                      setShowNotifications(false);
                    }}
                    className="p-2.5 rounded-lg bg-charcoal-900 border border-charcoal-700 hover:border-emerald-500/40 cursor-pointer text-xs space-y-1 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-agri-emerald">{a.alertId}</span>
                      <span className="text-[10px] font-mono text-agri-red uppercase font-semibold">{a.severity}</span>
                    </div>
                    <div className="text-agri-text-primary font-medium truncate">{a.title}</div>
                    <div className="text-[10px] text-agri-text-muted">{a.assetId} · {a.timestamp}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
