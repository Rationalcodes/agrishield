import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const AgriShieldLogo: React.FC<LogoProps> = ({ className = '', size = 32, showText = true }) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-emerald-500/20 blur-md rounded-full pointer-events-none" />
        
        <svg
          viewBox="0 0 40 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10"
        >
          <defs>
            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="leafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#a7f3d0" />
            </linearGradient>
          </defs>

          {/* Shield Outline with subtle cybersecurity facets */}
          <path
            d="M20 2L36 7.5V19.8C36 30.5 29.2 38.6 20 42C10.8 38.6 4 30.5 4 19.8V7.5L20 2Z"
            stroke="url(#shieldGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#091322"
            fillOpacity="0.85"
          />

          {/* Connected Grid / Node Circuit Lines */}
          <path
            d="M12 16L20 20L28 16"
            stroke="#06b6d4"
            strokeWidth="1.5"
            strokeDasharray="2 2"
            opacity="0.8"
          />
          <path
            d="M20 20V32"
            stroke="#06b6d4"
            strokeWidth="1.5"
            opacity="0.8"
          />

          {/* Sprouting Leaf motif rising up the central spine */}
          <path
            d="M20 31C20 31 15 26 15 21C15 17 18 15 20 12C22 15 25 17 25 21C25 26 20 31 20 31Z"
            fill="url(#leafGrad)"
            opacity="0.9"
          />

          {/* Central Telemetry Nodes */}
          <circle cx="20" cy="12" r="2" fill="#10b981" />
          <circle cx="12" cy="16" r="1.5" fill="#06b6d4" />
          <circle cx="28" cy="16" r="1.5" fill="#06b6d4" />
          <circle cx="20" cy="32" r="1.8" fill="#34d399" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-bold tracking-tight text-white font-sans">
              AGRI<span className="text-emerald-400">SHIELD</span>
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-widest font-semibold">
              OT·AI
            </span>
          </div>
          <span className="text-[10px] text-slate-400 tracking-wider uppercase font-medium">
            Cyber-Physical Defense
          </span>
        </div>
      )}
    </div>
  );
};
