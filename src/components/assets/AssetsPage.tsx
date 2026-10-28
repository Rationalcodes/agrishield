import React, { useState } from 'react';
import { useAgriShield } from '../../context/AgriShieldContext';
import {
  Cpu,
  Search,
  Filter,
  Layers,
  Shield,
  Lock,
  Radio,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  Server,
  Zap,
  Info,
  ChevronRight,
  LayoutGrid,
  Table,
  RefreshCw,
  Eye
} from 'lucide-react';
import { PurdueModelView } from './PurdueModelView';

export const AssetsPage: React.FC = () => {
  const {
    assets,
    setSelectedAsset,
    alerts,
    isScanningAssets,
    scanProgress,
    runAssetScan,
    selectedFacility,
    setSelectedFacility
  } = useAgriShield();

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'purdue' | 'grid' | 'table'>('purdue');

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFacility = selectedFacility === 'All' || asset.facility === selectedFacility;
    return matchesSearch && matchesFacility;
  });

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-charcoal-800 border border-charcoal-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-agri-emerald text-xs font-mono font-semibold mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>INDUSTRIAL ASSET INVENTORY & POSTURE</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-agri-text-primary">
            Connected Operational Technology Assets ({assets.length})
          </h1>
          <p className="text-xs text-agri-text-secondary mt-1 max-w-2xl leading-relaxed">
            Searchable industrial asset explorer mapping Purdue model network zones, hardware firmware vulnerabilities, and real-time cryptographic authentication status.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Run Security Scan Button */}
          <button
            onClick={runAssetScan}
            disabled={isScanningAssets}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm ${
              isScanningAssets
                ? 'bg-charcoal-750 text-agri-cyan border border-cyan-500/40 cursor-wait'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanningAssets ? 'animate-spin' : ''}`} />
            <span>{isScanningAssets ? `Auditing (${scanProgress}%)...` : 'Run Posture Audit'}</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-agri-text-secondary bg-charcoal-900 p-2 rounded-xl border border-charcoal-700">
            <span className="text-agri-emerald font-bold">{assets.filter((a) => a.connectionStatus === 'online').length}</span>
            <span>Online</span>
            <span className="text-charcoal-600">/</span>
            <span className="text-agri-amber font-bold">{assets.filter((a) => a.riskScore >= 40).length}</span>
            <span>Elevated</span>
          </div>
        </div>
      </div>

      {/* Live Scanning Progress Bar */}
      {isScanningAssets && (
        <div className="p-4 rounded-xl bg-charcoal-800 border border-cyan-500/40 space-y-2 animate-fade-in">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-agri-cyan font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-agri-cyan animate-ping" />
              <span>Scanning Purdue Zones 1-4 for CVE firmware exposures & unauthenticated Modbus RTU...</span>
            </span>
            <span className="text-agri-text-primary font-bold">{scanProgress}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-charcoal-900 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-200"
              style={{ width: `${scanProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Search, Facility Filter & View Toggle Strip */}
      <div className="p-4 rounded-xl bg-charcoal-800 border border-charcoal-700 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-agri-text-muted absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by asset identifier, vendor, model, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-charcoal-900 border border-charcoal-700 text-agri-text-primary placeholder-agri-text-muted text-xs focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Facility Filter Pills */}
        <div className="flex items-center gap-1 bg-charcoal-900 p-1 rounded-lg border border-charcoal-700">
          {(['All', 'Smart Farm', 'Cold Storage', 'Bio-Power Facility'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFacility(f)}
              className={`px-3 py-1 rounded text-[11px] font-medium transition-colors ${
                selectedFacility === f
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'text-agri-text-secondary hover:text-agri-text-primary'
              }`}
            >
              {f === 'All' ? 'All Sites' : f.replace(' Facility', '')}
            </button>
          ))}
        </div>

        {/* View Switcher: Purdue Architecture vs Card Grid vs Table */}
        <div className="flex items-center bg-charcoal-900 p-1 rounded-lg border border-charcoal-700 text-xs font-mono">
          <button
            onClick={() => setViewMode('purdue')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-[11px] transition-colors ${
              viewMode === 'purdue'
                ? 'bg-charcoal-750 text-agri-emerald font-semibold border border-emerald-500/30'
                : 'text-agri-text-muted hover:text-agri-text-primary'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Purdue Architecture</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-[11px] transition-colors ${
              viewMode === 'grid'
                ? 'bg-charcoal-750 text-agri-emerald font-semibold border border-emerald-500/30'
                : 'text-agri-text-muted hover:text-agri-text-primary'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Cards</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-[11px] transition-colors ${
              viewMode === 'table'
                ? 'bg-charcoal-750 text-agri-emerald font-semibold border border-emerald-500/30'
                : 'text-agri-text-muted hover:text-agri-text-primary'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>SOC Table</span>
          </button>
        </div>
      </div>

      {/* Main View Router */}
      {viewMode === 'purdue' ? (
        <PurdueModelView />
      ) : viewMode === 'table' ? (
        <div className="p-5 rounded-2xl bg-charcoal-800 border border-charcoal-700 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-charcoal-700 text-[10px] font-mono text-agri-text-muted uppercase tracking-wider">
                <th className="pb-3 pl-2">Asset ID</th>
                <th className="pb-3">Name & Facility</th>
                <th className="pb-3">Purdue Zone</th>
                <th className="pb-3">Protocol & Auth</th>
                <th className="pb-3">Telemetry</th>
                <th className="pb-3">Risk Score</th>
                <th className="pb-3 text-right pr-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-700/60 font-mono">
              {filteredAssets.map((asset) => (
                <tr
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset)}
                  className="hover:bg-charcoal-750/70 cursor-pointer transition-colors group"
                >
                  <td className="py-3 pl-2 font-bold text-agri-text-primary group-hover:text-agri-emerald">
                    {asset.id}
                  </td>
                  <td className="py-3 font-sans">
                    <div className="font-semibold text-agri-text-primary text-xs">{asset.name}</div>
                    <div className="text-[10px] text-agri-text-muted">{asset.facility} · {asset.location}</div>
                  </td>
                  <td className="py-3 text-agri-cyan text-[11px]">
                    {asset.networkZone.split(' ')[0]}
                  </td>
                  <td className="py-3">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                        asset.authStatus === 'verified'
                          ? 'bg-emerald-500/15 text-agri-emerald border border-emerald-500/30'
                          : 'bg-agri-red/15 text-agri-red border border-agri-red/30'
                      }`}
                    >
                      {asset.protocol} · {asset.authCapability.split(' ')[0]}
                    </span>
                  </td>
                  <td className="py-3 font-bold text-agri-text-primary">
                    {asset.currentReading}
                  </td>
                  <td className="py-3">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        asset.riskScore > 60
                          ? 'text-agri-red'
                          : asset.riskScore > 30
                          ? 'text-agri-amber'
                          : 'text-agri-emerald'
                      }`}
                    >
                      {asset.riskScore}/100
                    </span>
                  </td>
                  <td className="py-3 text-right pr-2">
                    <button className="p-1 rounded text-agri-text-muted group-hover:text-agri-emerald">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Asset Explorer Card Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              onClick={() => setSelectedAsset(asset)}
              className="p-5 rounded-2xl bg-charcoal-800 border border-charcoal-700 hover:border-emerald-500/50 hover:bg-charcoal-750 cursor-pointer transition-all flex flex-col justify-between group space-y-4"
            >
              <div>
                {/* Top Badge Strip */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="font-mono text-xs font-bold text-agri-text-primary group-hover:text-agri-emerald transition-colors">
                      {asset.id}
                    </span>
                    <span className="text-[10px] font-mono text-agri-cyan block mt-0.5">{asset.category}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold border ${
                      asset.riskScore > 60
                        ? 'bg-agri-red/20 text-agri-red border-agri-red/30'
                        : asset.riskScore > 30
                        ? 'bg-agri-amber/20 text-agri-amber border-agri-amber/30'
                        : 'bg-emerald-500/20 text-agri-emerald border-emerald-500/30'
                    }`}
                  >
                    Risk: {asset.riskScore}/100
                  </span>
                </div>

                <h3 className="text-sm font-bold text-agri-text-primary group-hover:text-agri-emerald transition-colors leading-snug">
                  {asset.name}
                </h3>
                <p className="text-agri-text-muted text-xs mt-1 line-clamp-2 leading-relaxed">{asset.description}</p>

                {/* Specs Box */}
                <div className="mt-3.5 p-3 rounded-xl bg-charcoal-900 border border-charcoal-700 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-agri-text-muted text-[11px]">Location:</span>
                    <span className="text-agri-text-primary font-medium truncate max-w-[160px]">{asset.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-agri-text-muted text-[11px]">Vendor / Model:</span>
                    <span className="text-agri-text-primary font-medium truncate max-w-[160px]">{asset.vendor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-agri-text-muted text-[11px]">Purdue Network Zone:</span>
                    <span className="font-mono text-agri-cyan text-[11px]">{asset.networkZone.split(' ')[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-agri-text-muted text-[11px]">Protocol & Auth:</span>
                    <span className="font-mono text-agri-emerald text-[11px]">{asset.protocol} · {asset.authCapability}</span>
                  </div>
                </div>

                {/* Telemetry Reading Strip */}
                <div className="mt-3 p-2.5 rounded-lg bg-charcoal-900 border border-charcoal-700 flex items-center justify-between text-xs">
                  <span className="text-agri-text-muted text-[11px]">Current Telemetry:</span>
                  <span
                    className={`font-mono font-bold ${
                      asset.currentReading.includes('Spike') || asset.currentReading.includes('CRITICAL')
                        ? 'text-agri-red'
                        : 'text-agri-text-primary'
                    }`}
                  >
                    {asset.currentReading}
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-charcoal-700 flex items-center justify-between text-xs">
                <span className="text-agri-text-muted font-mono text-[10px]">Last seen {asset.lastReported}</span>
                <span className="text-agri-emerald font-semibold group-hover:underline flex items-center gap-1">
                  <span>Inspect Profile</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
