import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Sparkles, Layers, Compass, Zap } from 'lucide-react';

export const VoxelHeroScene: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeTheme, setActiveTheme] = useState<'neon' | 'crystal' | 'cyber'>('crystal');
  const [cubeCount, setCubeCount] = useState(0);

  // Auto subtle cycle for ambience if not reduced motion
  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setCubeCount((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const themes = {
    crystal: {
      name: 'Crystal Realm',
      coreColor: '#8B5CF6',
      lightColor: '#C4B5FD',
      textColor: 'text-violet-300',
      badge: 'BIOMA: KRISTAL VOXEL',
    },
    neon: {
      name: 'Neon Horizon',
      coreColor: '#EC4899',
      lightColor: '#F472B6',
      textColor: 'text-pink-300',
      badge: 'BIOMA: CYBERPUNK GRID',
    },
    cyber: {
      name: 'Voxel Engine',
      coreColor: '#06B6D4',
      lightColor: '#67E8F9',
      textColor: 'text-cyan-300',
      badge: 'BIOMA: RUNTIME VOXEL',
    },
  };

  const current = themes[activeTheme];

  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[1/1] max-w-[560px] mx-auto flex items-center justify-center p-4">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 rounded-3xl opacity-40 blur-3xl transition-colors duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${current.coreColor} 0%, transparent 70%)`,
        }}
      />

      {/* Main Container Card with Isometric Frame */}
      <div className="relative w-full h-full rounded-2xl bg-[#171321]/90 border border-[#332A45] p-5 shadow-2xl flex flex-col justify-between overflow-hidden backdrop-blur-sm">
        {/* Top HUD Bar */}
        <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[#332A45]/60 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#8B5CF6] animate-pulse" />
            <span className="font-mono text-[11px] text-[#C4B5FD] font-semibold tracking-wider">
              INDO KREASI // VOXEL DIORAMA
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#A7A1B5]">
            <Compass className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span>X: 128 · Y: 64 · Z: 256</span>
          </div>
        </div>

        {/* Center Isometric Scene */}
        <div className="relative flex-1 flex items-center justify-center my-2">
          {/* SVG Vector Diorama */}
          <svg
            viewBox="0 0 460 380"
            className="w-full h-full max-h-[340px] drop-shadow-[0_20px_25px_rgba(0,0,0,0.6)]"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="islandTop" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#362954" />
                <stop offset="100%" stopColor="#241B3B" />
              </linearGradient>
              <linearGradient id="islandLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E1433" />
                <stop offset="100%" stopColor="#100A1C" />
              </linearGradient>
              <linearGradient id="islandRight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#281A43" />
                <stop offset="100%" stopColor="#150C24" />
              </linearGradient>
              <linearGradient id="crystalGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={current.lightColor} />
                <stop offset="100%" stopColor={current.coreColor} />
              </linearGradient>
            </defs>

            {/* Orbiting Energy Ring */}
            <ellipse
              cx="230"
              cy="230"
              rx="180"
              ry="70"
              fill="none"
              stroke={current.lightColor}
              strokeWidth="1.5"
              strokeDasharray="12 16"
              opacity="0.35"
              transform="rotate(-12 230 230)"
            />

            {/* Base Floating Island (Isometric Diamond) */}
            {/* Top Plane */}
            <polygon points="230,140 380,215 230,290 80,215" fill="url(#islandTop)" stroke="#4E3A75" strokeWidth="2" />
            
            {/* Left Dirt Facet */}
            <polygon points="80,215 230,290 230,355 80,280" fill="url(#islandLeft)" stroke="#332454" strokeWidth="1" />
            
            {/* Right Dirt Facet */}
            <polygon points="230,290 380,215 380,280 230,355" fill="url(#islandRight)" stroke="#332454" strokeWidth="1" />

            {/* Secondary Stepping Block (Tier 2) */}
            <polygon points="230,170 320,215 230,260 140,215" fill="#443269" stroke="#684D9C" strokeWidth="1.5" />
            <polygon points="140,215 230,260 230,275 140,230" fill="#24183D" />
            <polygon points="230,260 320,215 320,230 230,275" fill="#301F52" />

            {/* Isometric Voxel Character: Roblox-inspired blocky proportions */}
            {/* Character Base Position at (230, 185) */}
            <g transform="translate(0, -10)">
              {/* Shadow underneath */}
              <ellipse cx="230" cy="225" rx="22" ry="9" fill="#090514" opacity="0.65" />

              {/* Legs (Blocky Left and Right Leg) */}
              <rect x="220" y="196" width="9" height="24" fill="#1F1635" rx="1" stroke="#3D2966" strokeWidth="1" />
              <rect x="231" y="196" width="9" height="24" fill="#281C45" rx="1" stroke="#3D2966" strokeWidth="1" />

              {/* Torso (Trapezoidal/Blocky Studio Jacket) */}
              <polygon points="214,152 246,152 248,198 212,198" fill={current.coreColor} stroke="#DDD6FE" strokeWidth="1.5" />
              {/* Studio Crest on Chest */}
              <polygon points="227,162 233,162 236,172 230,180 224,172" fill="#FFFFFF" />

              {/* Left Arm & Right Arm */}
              <rect x="202" y="156" width="9" height="26" fill="#4C1D95" rx="1.5" transform="rotate(8 206 156)" />
              <rect x="249" y="156" width="9" height="26" fill="#5B21B6" rx="1.5" transform="rotate(-15 253 156)" />

              {/* Head (Classic Blocky Cube with visor/expression) */}
              <rect x="219" y="122" width="22" height="26" fill="#F5F3FF" rx="2" stroke="#CBD5E1" strokeWidth="1.5" />
              {/* Hair / Headgear Block */}
              <polygon points="216,122 244,122 242,112 218,112" fill="#1E1338" />
              <rect x="216" y="122" width="28" height="6" fill="#1E1338" rx="1" />
              {/* Visor / Eyes */}
              <rect x="223" y="132" width="5" height="4" fill="#0F172A" rx="1" />
              <rect x="232" y="132" width="5" height="4" fill="#0F172A" rx="1" />
              {/* Smile / Mouth line */}
              <line x1="226" y1="141" x2="234" y2="141" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />

              {/* Held Game Prop: Holographic Voxel Relic Cube in hand */}
              <g transform="translate(262, 160)">
                <polygon points="0,-12 10,-6 0,0 -10,-6" fill="url(#crystalGlow)" />
                <polygon points="-10,-6 0,0 0,12 -10,6" fill={current.coreColor} />
                <polygon points="0,0 10,-6 10,6 0,12" fill={current.lightColor} />
              </g>
            </g>

            {/* Floating Ambient Voxel Blocks */}
            {/* Top Left Voxel */}
            <g transform="translate(110, 110)">
              <polygon points="0,-10 9,-5 0,0 -9,-5" fill={current.lightColor} />
              <polygon points="-9,-5 0,0 0,10 -9,5" fill="#4C1D95" />
              <polygon points="0,0 9,-5 9,5 0,10" fill={current.coreColor} />
            </g>

            {/* Top Right High Voxel */}
            <g transform="translate(350, 95)">
              <polygon points="0,-12 11,-6 0,0 -11,-6" fill={current.lightColor} />
              <polygon points="-11,-6 0,0 0,12 -11,6" fill="#5B21B6" />
              <polygon points="0,0 11,-6 11,6 0,12" fill={current.coreColor} />
            </g>

            {/* Bottom Floating Island Tree (Blocky Stylized) */}
            <g transform="translate(130, 160)">
              {/* Trunk */}
              <rect x="18" y="30" width="8" height="25" fill="#2E1B4E" />
              {/* Foliage Blocks */}
              <rect x="0" y="8" width="44" height="24" fill="#7C3AED" rx="2" />
              <rect x="6" y="-6" width="32" height="18" fill="#8B5CF6" rx="2" />
              <rect x="12" y="-18" width="20" height="15" fill="#A78BFA" rx="2" />
            </g>

            {/* Pillar Obelisk on Right Side of Island */}
            <g transform="translate(320, 170)">
              <polygon points="10,-35 22,-30 10,-25 -2,-30" fill={current.lightColor} />
              <polygon points="-2,-30 10,-25 10,25 -2,20" fill="#2E184D" />
              <polygon points="10,-25 22,-30 22,20 10,25" fill="#4C2880" />
            </g>
          </svg>
        </div>

        {/* Bottom Interactive Biome Selector */}
        <div className="relative z-10 pt-3 border-t border-[#332A45]/60 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs text-[#A7A1B5]">
            <Layers className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span className="font-mono text-[11px] text-[#F5F3FF] font-medium">{current.badge}</span>
          </div>

          {/* Interactive buttons to switch visual theme */}
          <div className="flex items-center gap-1.5" role="group" aria-label="Ganti Bioma Prototipe">
            {(['crystal', 'neon', 'cyber'] as const).map((key) => {
              const isActive = activeTheme === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveTheme(key)}
                  className={`px-2.5 py-1 text-xs font-mono font-medium rounded transition-all focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] ${
                    isActive
                      ? 'bg-[#8B5CF6] text-white shadow-sm'
                      : 'bg-[#201A2D] text-[#A7A1B5] hover:text-[#F5F3FF] hover:bg-[#2A223B]'
                  }`}
                >
                  {key.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
