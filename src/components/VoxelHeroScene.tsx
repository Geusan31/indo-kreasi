import React, { useState } from 'react';

export const VoxelHeroScene: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<'crystal' | 'neon' | 'cyber'>('crystal');

  const themes = {
    crystal: {
      name: 'Kristal',
      coreColor: '#8B5CF6',
      lightColor: '#C4B5FD',
      accent: '#7C3AED',
      label: 'Palet Kristal Mistik',
    },
    neon: {
      name: 'Neon',
      coreColor: '#EC4899',
      lightColor: '#F472B6',
      accent: '#BE185D',
      label: 'Palet Gelombang Neon',
    },
    cyber: {
      name: 'Cyber',
      coreColor: '#06B6D4',
      lightColor: '#67E8F9',
      accent: '#0891B2',
      label: 'Palet Voxel Futuristik',
    },
  };

  const current = themes[activeTheme];

  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[1/1] max-w-[540px] mx-auto flex items-center justify-center">
      {/* Crisp Architectural Card */}
      <div className="relative w-full h-full rounded-xl bg-[#171321] border border-[#332A45] p-5 flex flex-col justify-between overflow-hidden shadow-xl">
        {/* Top Editorial Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-[#332A45]/70 text-xs">
          <span className="font-medium text-[#F5F3FF]">
            Eksplorasi Voxel Studio
          </span>
          <span className="text-[#A7A1B5] text-[11px]">
            {current.label}
          </span>
        </div>

        {/* Isometric 3D Voxel Scene */}
        <div className="relative flex-1 flex items-center justify-center my-3">
          <svg
            viewBox="0 0 460 380"
            className="w-full h-full max-h-[320px]"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="heroIslandTop" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#362954" />
                <stop offset="100%" stopColor="#241B3B" />
              </linearGradient>
              <linearGradient id="heroIslandLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E1433" />
                <stop offset="100%" stopColor="#100A1C" />
              </linearGradient>
              <linearGradient id="heroIslandRight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#281A43" />
                <stop offset="100%" stopColor="#150C24" />
              </linearGradient>
            </defs>

            {/* Orbiting Axis */}
            <ellipse
              cx="230"
              cy="230"
              rx="170"
              ry="65"
              fill="none"
              stroke={current.lightColor}
              strokeWidth="1.2"
              strokeDasharray="8 8"
              opacity="0.3"
              transform="rotate(-12 230 230)"
            />

            {/* Base Floating Island */}
            <polygon points="230,140 380,215 230,290 80,215" fill="url(#heroIslandTop)" stroke="#4E3A75" strokeWidth="1.5" />
            <polygon points="80,215 230,290 230,355 80,280" fill="url(#heroIslandLeft)" stroke="#332454" strokeWidth="1" />
            <polygon points="230,290 380,215 380,280 230,355" fill="url(#heroIslandRight)" stroke="#332454" strokeWidth="1" />

            {/* Stepping Platform */}
            <polygon points="230,170 320,215 230,260 140,215" fill="#443269" stroke="#684D9C" strokeWidth="1.2" />
            <polygon points="140,215 230,260 230,275 140,230" fill="#24183D" />
            <polygon points="230,260 320,215 320,230 230,275" fill="#301F52" />

            {/* Isometric Blocky Character */}
            <g transform="translate(0, -10)">
              {/* Shadow */}
              <ellipse cx="230" cy="225" rx="20" ry="8" fill="#090514" opacity="0.6" />

              {/* Legs */}
              <rect x="220" y="196" width="9" height="24" fill="#1F1635" rx="1" stroke="#3D2966" strokeWidth="1" />
              <rect x="231" y="196" width="9" height="24" fill="#281C45" rx="1" stroke="#3D2966" strokeWidth="1" />

              {/* Torso */}
              <polygon points="214,152 246,152 248,198 212,198" fill={current.coreColor} stroke="#DDD6FE" strokeWidth="1.2" />
              <polygon points="227,162 233,162 236,172 230,180 224,172" fill="#FFFFFF" />

              {/* Arms */}
              <rect x="202" y="156" width="9" height="26" fill="#4C1D95" rx="1" transform="rotate(8 206 156)" />
              <rect x="249" y="156" width="9" height="26" fill="#5B21B6" rx="1" transform="rotate(-15 253 156)" />

              {/* Head */}
              <rect x="219" y="122" width="22" height="26" fill="#F5F3FF" rx="2" stroke="#CBD5E1" strokeWidth="1.2" />
              <polygon points="216,122 244,122 242,112 218,112" fill="#1E1338" />
              <rect x="216" y="122" width="28" height="5" fill="#1E1338" rx="1" />
              <rect x="223" y="132" width="5" height="4" fill="#0F172A" rx="1" />
              <rect x="232" y="132" width="5" height="4" fill="#0F172A" rx="1" />
              <line x1="226" y1="141" x2="234" y2="141" stroke="#334155" strokeWidth="1.2" strokeLinecap="round" />

              {/* Handheld Artifact */}
              <g transform="translate(262, 160)">
                <polygon points="0,-10 9,-5 0,0 -9,-5" fill={current.lightColor} />
                <polygon points="-9,-5 0,0 0,10 -9,5" fill={current.accent} />
                <polygon points="0,0 9,-5 9,5 0,10" fill={current.coreColor} />
              </g>
            </g>

            {/* Voxel Trees & Obelisk */}
            <g transform="translate(130, 160)">
              <rect x="18" y="30" width="8" height="25" fill="#2E1B4E" />
              <rect x="0" y="8" width="44" height="24" fill="#7C3AED" rx="2" />
              <rect x="6" y="-6" width="32" height="18" fill="#8B5CF6" rx="2" />
            </g>

            <g transform="translate(320, 170)">
              <polygon points="10,-35 22,-30 10,-25 -2,-30" fill={current.lightColor} />
              <polygon points="-2,-30 10,-25 10,25 -2,20" fill="#2E184D" />
              <polygon points="10,-25 22,-30 22,20 10,25" fill="#4C2880" />
            </g>
          </svg>
        </div>

        {/* Clean Human Interactive Selector */}
        <div className="pt-3 border-t border-[#332A45]/70 flex items-center justify-between text-xs">
          <span className="text-[#A7A1B5]">Tema Visual:</span>

          <div className="flex items-center gap-1.5" role="group" aria-label="Pilih tema visual">
            {(['crystal', 'neon', 'cyber'] as const).map((key) => {
              const isActive = activeTheme === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveTheme(key)}
                  className={`px-3 py-1 rounded text-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8B5CF6] ${
                    isActive
                      ? 'bg-[#8B5CF6] text-white font-medium'
                      : 'bg-[#201A2D] text-[#A7A1B5] hover:text-[#F5F3FF]'
                  }`}
                >
                  {themes[key].name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
