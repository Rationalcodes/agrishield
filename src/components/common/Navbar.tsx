import React, { useState, useEffect } from 'react';
import { AgriShieldLogo } from './AgriShieldLogo';
import { useAgriShield, NavigationTab } from '../../context/AgriShieldContext';
import {
  ShieldAlert,
  Activity,
  Cpu,
  Radio,
  FileCheck2,
  Bot,
  TrendingUp,
  LayoutDashboard,
  Sparkles,
  Zap,
  Globe,
  Bell,
  CheckCircle2,
  AlertTriangle,
  FileText,
  User,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    kpis,
    isScenarioRunning,
    activeScenario,
    setInvestorModalOpen,
    alerts,
    setSelectedAlert,
  } = useAgriShield();

  const [timeStr, setTimeStr] = useState<string>('');
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toTimeString().split(' ')[0] + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems: { id: NavigationTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'landing', label: 'Overview & Vision', icon: Globe },
    { id: 'dashboard', label: 'Security Dashboard', icon: LayoutDashboard },
    {
      id: 'simulator',
      label: 'Threat Simulation Lab',
      icon: Zap,
      badge: isScenarioRunning ? 'Active' : undefined,
    },
    { id: 'telemetry', label: 'Live Telemetry', icon: Radio },
    { id: 'assets', label: 'Device & OT Assets', icon: Cpu },
    { id: 'assessment', label: 'OT Risk Assessment', icon: FileCheck2 },
    { id: 'assistant', label: 'AI Security Assistant', icon: Bot },
    { id: 'investor', label: 'Investment Opportunity', icon: TrendingUp, badge: 'VC' },
  ];

  const unreadAlerts = alerts.filter((a) => a.status === 'open');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-navy-950/95 backdrop-blur-md">
      {/* Top Utility Ribbon */}
      <div className="px-4 lg:px-6 py-2 border-b border-slate-800/50 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-[11px] text-slate-300">
              Org: <strong className="text-slate-100 font-medium">Demo Agricultural Operations</strong>
            </span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>DEMO SIMULATION MODE</span>
          </div>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <div className="hidden sm:flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Engine: 99.8% Healthy</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Active Scenario Indicator if Running */}
          {isScenarioRunning && (
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/40 text-rose-300 font-mono text-[11px] animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>Running Scenario {activeScenario}</span>
            </div>
          )}

          {/* Time indicator */}
          <span className="font-mono text-slate-400 text-[11px] hidden md:inline">
            {timeStr}
          </span>

          {/* Notification dropdown button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadAlerts.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-mono text-[9px] flex items-center justify-center font-bold">
                  {unreadAlerts.length}
                </span>
              )}
            </button>

            {/* Notification popup */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-navy-900 border border-slate-700 rounded-lg shadow-xl p-3 z-50">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                  <span className="font-semibold text-slate-200 text-xs">Security Incidents ({unreadAlerts.length})</span>
                  <button
                    onClick={() => {
                      setActiveTab('dashboard');
                      setShowNotifications(false);
                    }}
                    className="text-[10px] text-emerald-400 hover:underline"
                  >
                    View All in Dashboard
                  </button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {alerts.slice(0, 4).map((a) => (
                    <div
                      key={a.id}
                      onClick={() => {
                        setSelectedAlert(a);
                        setShowNotifications(false);
                      }}
                      className="p-2 rounded bg-navy-850 hover:bg-slate-800/80 cursor-pointer border border-slate-800 text-[11px] transition-colors"
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                        <span className={`uppercase font-bold ${a.severity === 'critical' ? 'text-rose-400' : a.severity === 'high' ? 'text-amber-400' : 'text-cyan-400'}`}>
                          {a.severity}
                        </span>
                        <span>{a.timeAgo}</span>
                      </div>
                      <div className="font-medium text-slate-200 line-clamp-1">{a.title}</div>
                      <div className="text-[10px] text-slate-400">{a.assetId} · {a.facility}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Launch Threat Simulation */}
          <button
            onClick={() => setActiveTab('simulator')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-medium transition-all"
          >
            <Zap className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
            <span className="hidden sm:inline">Launch</span> Simulator
          </button>

          {/* Investor Briefing Button */}
          <button
            onClick={() => setInvestorModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-medium text-xs shadow-sm shadow-emerald-950 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
            <span>Investor Briefing</span>
          </button>

          {/* Profile Badge */}
          <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-slate-800 text-slate-400 text-xs">
            <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-mono text-[10px] border border-slate-700">
              CS
            </div>
            <div className="text-left">
              <div className="text-[11px] font-medium text-slate-200 leading-none">Security Analyst</div>
              <div className="text-[9px] text-slate-400 leading-none mt-0.5">Demo Operator</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="px-4 lg:px-6 py-2.5 flex items-center justify-between gap-4">
        <div
          onClick={() => setActiveTab('landing')}
          className="cursor-pointer hover:opacity-95 transition-opacity"
        >
          <AgriShieldLogo size={34} />
        </div>

        {/* Navigation Items (Desktop & Tablet) */}
        <nav className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1 max-w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all duration-150 relative ${
                  isActive
                    ? 'bg-slate-800 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-950/50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`ml-1 text-[9px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                      item.badge === 'Active'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
