import React from 'react';
import { useAgriShield, NavigationTab } from '../../context/AgriShieldContext';
import { AgriShieldLogo } from './AgriShieldLogo';
import {
  LayoutDashboard,
  Zap,
  Radio,
  Cpu,
  FileCheck2,
  Bot,
  TrendingUp,
  Globe,
  ChevronLeft,
  ChevronRight,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    sidebarCollapsed,
    toggleSidebar,
    isScenarioRunning,
    kpis,
    setInvestorModalOpen
  } = useAgriShield();

  const navItems: { id: NavigationTab; label: string; icon: React.ElementType; badge?: string; badgeColor?: string }[] = [
    { id: 'dashboard', label: 'Security Dashboard', icon: LayoutDashboard },
    {
      id: 'simulator',
      label: 'Threat Simulation Lab',
      icon: Zap,
      badge: isScenarioRunning ? 'Active' : undefined,
      badgeColor: 'bg-agri-red text-white animate-pulse',
    },
    { id: 'telemetry', label: 'Live Telemetry', icon: Radio },
    { id: 'assets', label: 'Asset Inventory', icon: Cpu, badge: `${kpis.monitoredAssets}`, badgeColor: 'bg-charcoal-700 text-agri-text-muted' },
    { id: 'assessment', label: 'Risk Assessment', icon: FileCheck2 },
    { id: 'assistant', label: 'AgriShield Intelligence', icon: Bot },
    { id: 'investor', label: 'Investor Opportunity', icon: TrendingUp, badge: 'VC', badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' },
    { id: 'landing', label: 'Overview & Vision', icon: Globe },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {!sidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 bg-charcoal-800 border-r border-charcoal-700 flex flex-col justify-between transition-all duration-300 ${
          sidebarCollapsed
            ? '-translate-x-full lg:translate-x-0 lg:w-20'
            : 'translate-x-0 w-64'
        }`}
      >
      {/* Top Section */}
      <div className="flex flex-col">
        {/* Brand / Logo header */}
        <div className="h-16 px-4 border-b border-charcoal-700 flex items-center justify-between">
          <div
            onClick={() => setActiveTab('dashboard')}
            className="cursor-pointer flex items-center gap-2 overflow-hidden"
          >
            <AgriShieldLogo size={32} showText={!sidebarCollapsed} />
          </div>
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg text-agri-text-muted hover:text-agri-text-primary hover:bg-charcoal-750 transition-colors"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                title={sidebarCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group relative ${
                  isActive
                    ? 'bg-charcoal-750 text-agri-text-primary border border-emerald-500/30 shadow-sm'
                    : 'text-agri-text-secondary hover:text-agri-text-primary hover:bg-charcoal-750/60 border border-transparent'
                }`}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-agri-emerald" />
                )}
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-agri-emerald' : 'text-agri-text-muted group-hover:text-agri-text-primary'
                  }`}
                />
                {!sidebarCollapsed && (
                  <span className="truncate flex-1 text-left">{item.label}</span>
                )}
                {!sidebarCollapsed && item.badge && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full font-bold shrink-0 ${item.badgeColor || 'bg-charcoal-700 text-slate-300'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-3 border-t border-charcoal-700 space-y-2">
        {!sidebarCollapsed && (
          <div className="p-3 rounded-xl bg-charcoal-900 border border-charcoal-700 text-xs space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-agri-text-muted">SOC Prototype</span>
              <span className="font-mono text-agri-emerald font-semibold">v2.1</span>
            </div>
            <p className="text-[10px] text-agri-text-muted leading-relaxed">
              Evaluating AgriShield for venture investment or pilot deployment?
            </p>
            <button
              onClick={() => setInvestorModalOpen(true)}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] transition-colors shadow-sm"
            >
              <Sparkles className="w-3 h-3 text-cyan-200" />
              <span>Investor Briefing</span>
            </button>
          </div>
        )}

        {sidebarCollapsed && (
          <button
            onClick={() => setInvestorModalOpen(true)}
            title="Request Investor Briefing"
            className="w-full p-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-agri-emerald border border-emerald-500/40 flex items-center justify-center transition-colors"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        )}
      </div>
    </aside>
    </>
  );
};
