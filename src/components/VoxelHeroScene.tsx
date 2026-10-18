import React, { useState, useRef, useEffect } from 'react';
import { Layers, Eye, Compass, Shield, Sword, Sparkles, Box } from 'lucide-react';

type CharacterStance = 'explore' | 'combat' | 'idle';
type ViewMode = 'rendered' | 'wireframe' | 'blueprint';

export const VoxelHeroScene: React.FC = () => {
  const [stance, setStance] = useState<CharacterStance>('explore');
  const [viewMode, setViewMode] = useState<ViewMode>('rendered');
  const [rotation, setRotation] = useState({ x: 12, y: -16 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Subtle interactive parallax tilt based on mouse position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotY = (x / (rect.width / 2)) * 14 - 10;
    const rotX = 14 - (y / (rect.height / 2)) * 12;

    setRotation({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 12, y: -16 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[1/1] max-w-[540px] mx-auto flex items-center justify-center select-none"
    >
      {/* Studio Showcase Card */}
      <div className="relative w-full h-full rounded-2xl bg-[#171321] border border-[#332A45] p-5 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-[#332A45]/70 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-sm bg-[#8B5CF6]" />
            <span className="font-semibold text-[#F5F3FF] tracking-tight">
              Interactive Voxel Diorama
            </span>
            <span className="text-[#332A45]">/</span>
            <span className="text-[#A7A1B5] text-[11px] font-mono">v1.4 Render</span>
          </div>

          <div className="flex items-center gap-1" role="group" aria-label="Pilih mode render">
            <button
              type="button"
              onClick={() => setViewMode('rendered')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                viewMode === 'rendered'
                  ? 'bg-[#8B5CF6] text-white'
                  : 'text-[#A7A1B5] hover:text-[#F5F3FF] hover:bg-[#201A2D]'
              }`}
            >
              Render
            </button>
            <button
              type="button"
              onClick={() => setViewMode('wireframe')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                viewMode === 'wireframe'
                  ? 'bg-[#8B5CF6] text-white'
                  : 'text-[#A7A1B5] hover:text-[#F5F3FF] hover:bg-[#201A2D]'
              }`}
            >
              Wireframe
            </button>
            <button
              type="button"
              onClick={() => setViewMode('blueprint')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                viewMode === 'blueprint'
                  ? 'bg-[#8B5CF6] text-white'
                  : 'text-[#A7A1B5] hover:text-[#F5F3FF] hover:bg-[#201A2D]'
              }`}
            >
              Blueprint
            </button>
          </div>
        </div>

        {/* 3D Isometric Viewport */}
        <div
          className="relative flex-1 flex items-center justify-center my-2 overflow-hidden transition-transform duration-200 ease-out"
          style={{
            transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <svg
            viewBox="0 0 520 420"
            className="w-full h-full max-h-[340px]"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="dioramaIslandTop" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={viewMode === 'blueprint' ? '#1E293B' : '#3B2A5D'} />
                <stop offset="100%" stopColor={viewMode === 'blueprint' ? '#0F172A' : '#23183B'} />
              </linearGradient>
              <linearGradient id="dioramaIslandLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={viewMode === 'blueprint' ? '#0F172A' : '#1C122E'} />
                <stop offset="100%" stopColor={viewMode === 'blueprint' ? '#020617' : '#0E0917'} />
              </linearGradient>
              <linearGradient id="dioramaIslandRight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={viewMode === 'blueprint' ? '#1E293B' : '#281943'} />
                <stop offset="100%" stopColor={viewMode === 'blueprint' ? '#0F172A' : '#150B24'} />
              </linearGradient>
              <linearGradient id="crystalGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DDD6FE" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
              <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Orbit Grid Guidelines */}
            <ellipse
              cx="260"
              cy="250"
              rx="210"
              ry="80"
              fill="none"
              stroke={viewMode === 'blueprint' ? '#38BDF8' : '#8B5CF6'}
              strokeWidth={viewMode === 'wireframe' ? '1.5' : '1'}
              strokeDasharray={viewMode === 'wireframe' ? '4 4' : '6 6'}
              opacity="0.3"
              transform="rotate(-8 260 250)"
            />

            {/* Lower Shadow */}
            <ellipse cx="260" cy="380" rx="140" ry="32" fill="#040208" opacity="0.8" />

            {/* Base Floating Voxel Mountain Island */}
            {/* Top Plane */}
            <polygon
              points="260,150 430,235 260,320 90,235"
              fill={viewMode === 'wireframe' ? 'none' : 'url(#dioramaIslandTop)'}
              stroke={viewMode === 'blueprint' ? '#38BDF8' : '#553E80'}
              strokeWidth={viewMode === 'wireframe' ? '1.8' : '1.2'}
            />
            {/* Left Cliff */}
            <polygon
              points="90,235 260,320 260,385 90,300"
              fill={viewMode === 'wireframe' ? 'none' : 'url(#dioramaIslandLeft)'}
              stroke={viewMode === 'blueprint' ? '#0284C7' : '#3A2758'}
              strokeWidth="1"
            />
            {/* Right Cliff */}
            <polygon
              points="260,320 430,235 430,300 260,385"
              fill={viewMode === 'wireframe' ? 'none' : 'url(#dioramaIslandRight)'}
              stroke={viewMode === 'blueprint' ? '#0284C7' : '#3A2758'}
              strokeWidth="1"
            />

            {/* Stepped Terraces (Voxel Layers) */}
            <g opacity={viewMode === 'blueprint' ? '0.7' : '1'}>
              {/* Lower Step */}
              <polygon
                points="260,190 360,240 260,290 160,240"
                fill={viewMode === 'wireframe' ? 'none' : '#4C3574'}
                stroke={viewMode === 'blueprint' ? '#38BDF8' : '#7050A4'}
                strokeWidth="1"
              />
              <polygon points="160,240 260,290 260,305 160,255" fill={viewMode === 'wireframe' ? 'none' : '#271A3F'} stroke="#3A2758" strokeWidth="0.8" />
              <polygon points="260,290 360,240 360,255 260,305" fill={viewMode === 'wireframe' ? 'none' : '#332050'} stroke="#3A2758" strokeWidth="0.8" />

              {/* Central Elevated Pedestal */}
              <polygon
                points="260,215 320,245 260,275 200,245"
                fill={viewMode === 'wireframe' ? 'none' : '#5E438D'}
                stroke={viewMode === 'blueprint' ? '#38BDF8' : '#8B5CF6'}
                strokeWidth="1.2"
              />
              <polygon points="200,245 260,275 260,285 200,255" fill={viewMode === 'wireframe' ? 'none' : '#362254'} />
              <polygon points="260,275 320,245 320,255 260,285" fill={viewMode === 'wireframe' ? 'none' : '#452B6B'} />
            </g>

            {/* Voxel Trees & Monoliths */}
            <g transform="translate(135, 175)">
              <rect x="18" y="28" width="8" height="26" fill={viewMode === 'wireframe' ? 'none' : '#23153A'} stroke="#3A2758" strokeWidth="0.8" />
              <rect x="2" y="8" width="40" height="22" fill={viewMode === 'wireframe' ? 'none' : '#6D28D9'} rx="2" stroke="#A78BFA" strokeWidth="1" />
              <rect x="8" y="-6" width="28" height="18" fill={viewMode === 'wireframe' ? 'none' : '#8B5CF6'} rx="2" stroke="#C4B5FD" strokeWidth="1" />
            </g>

            <g transform="translate(365, 185)">
              <rect x="12" y="24" width="8" height="22" fill={viewMode === 'wireframe' ? 'none' : '#23153A'} stroke="#3A2758" strokeWidth="0.8" />
              <rect x="0" y="4" width="32" height="22" fill={viewMode === 'wireframe' ? 'none' : '#7C3AED'} rx="2" stroke="#A78BFA" strokeWidth="1" />
              <rect x="6" y="-8" width="20" height="14" fill={viewMode === 'wireframe' ? 'none' : '#9333EA'} rx="2" stroke="#C4B5FD" strokeWidth="1" />
            </g>

            {/* Glowing Voxel Obelisk / Temple Pillar */}
            <g transform="translate(325, 160)">
              <polygon
                points="10,-45 24,-38 10,-31 -4,-38"
                fill={viewMode === 'wireframe' ? 'none' : 'url(#crystalGlow)'}
                stroke="#EDE9FE"
                strokeWidth="1.2"
                filter={viewMode === 'rendered' ? 'url(#softGlow)' : undefined}
              />
              <polygon points="-4,-38 10,-31 10,35 -4,28" fill={viewMode === 'wireframe' ? 'none' : '#2F1A52'} stroke="#533385" strokeWidth="0.8" />
              <polygon points="10,-31 24,-38 24,28 10,35" fill={viewMode === 'wireframe' ? 'none' : '#492B7A'} stroke="#663F9E" strokeWidth="0.8" />
            </g>

            {/* Dynamic Orbiting Energy Cubes */}
            <g transform="translate(195, 140)">
              <rect
                x="-8"
                y="-8"
                width="16"
                height="16"
                fill={viewMode === 'wireframe' ? 'none' : '#C4B5FD'}
                stroke="#8B5CF6"
                strokeWidth="1.5"
                transform="rotate(35)"
                opacity="0.9"
              />
            </g>
            <g transform="translate(330, 280)">
              <rect
                x="-6"
                y="-6"
                width="12"
                height="12"
                fill={viewMode === 'wireframe' ? 'none' : '#8B5CF6'}
                stroke="#DDD6FE"
                strokeWidth="1.2"
                transform="rotate(20)"
                opacity="0.85"
              />
            </g>

            {/* Interactive Blocky Studio Avatar Character */}
            <g transform="translate(260, 220)">
              {/* Character Base Shadow */}
              <ellipse cx="0" cy="18" rx="22" ry="7" fill="#080410" opacity="0.6" />

              {/* Legs */}
              <rect x="-10" y="-8" width="9" height="24" fill={viewMode === 'wireframe' ? 'none' : '#221639'} rx="1" stroke="#3D2966" strokeWidth="1" />
              <rect x="1" y="-8" width="9" height="24" fill={viewMode === 'wireframe' ? 'none' : '#2C1D4A'} rx="1" stroke="#3D2966" strokeWidth="1" />

              {/* Torso */}
              <polygon
                points="-14,-48 14,-48 16,-8 -14,-8"
                fill={viewMode === 'wireframe' ? 'none' : '#8B5CF6'}
                stroke="#C4B5FD"
                strokeWidth="1.5"
              />
              {/* Torso Crest Graphic */}
              <polygon points="-5,-38 5,-38 8,-28 0,-18 -8,-28" fill={viewMode === 'wireframe' ? 'none' : '#FFFFFF'} opacity="0.9" />

              {/* Arms based on Stance */}
              {stance === 'combat' ? (
                <>
                  {/* Left Arm holding Shield */}
                  <rect x="-24" y="-44" width="9" height="24" fill="#581C87" rx="1" transform="rotate(-18 -20 -44)" stroke="#A855F7" strokeWidth="1" />
                  <polygon points="-36,-40 -20,-48 -20,-16 -36,-24" fill="#3B2A5E" stroke="#C4B5FD" strokeWidth="1.5" />

                  {/* Right Arm swinging Sword */}
                  <rect x="15" y="-44" width="9" height="24" fill="#6B21A8" rx="1" transform="rotate(35 19 -44)" stroke="#A855F7" strokeWidth="1" />
                  {/* Glowing Keris / Crystal Blade */}
                  <polygon points="34,-62 38,-60 30,-28 26,-30" fill="url(#crystalGlow)" stroke="#FFFFFF" strokeWidth="1" />
                  <circle cx="28" cy="-30" r="3" fill="#DDD6FE" />
                </>
              ) : stance === 'explore' ? (
                <>
                  {/* Left Arm relaxed */}
                  <rect x="-24" y="-44" width="9" height="26" fill="#4C1D95" rx="1" transform="rotate(6 -20 -44)" stroke="#3D2966" strokeWidth="1" />

                  {/* Right Arm holding Floating Compass Artifact */}
                  <rect x="15" y="-44" width="9" height="26" fill="#5B21B6" rx="1" transform="rotate(-20 19 -44)" stroke="#3D2966" strokeWidth="1" />
                  <g transform="translate(30, -32)">
                    <polygon points="0,-10 9,-5 0,0 -9,-5" fill={viewMode === 'wireframe' ? 'none' : '#DDD6FE'} />
                    <polygon points="-9,-5 0,0 0,10 -9,5" fill={viewMode === 'wireframe' ? 'none' : '#7C3AED'} />
                    <polygon points="0,0 9,-5 9,5 0,10" fill={viewMode === 'wireframe' ? 'none' : '#8B5CF6'} />
                  </g>
                </>
              ) : (
                <>
                  {/* Idle posture with arms crossed */}
                  <rect x="-22" y="-42" width="10" height="22" fill="#4C1D95" rx="1" transform="rotate(24 -17 -42)" />
                  <rect x="12" y="-42" width="10" height="22" fill="#5B21B6" rx="1" transform="rotate(-24 17 -42)" />
                </>
              )}

              {/* Head */}
              <rect x="-11" y="-76" width="22" height="26" fill={viewMode === 'wireframe' ? 'none' : '#F5F3FF'} rx="2" stroke="#CBD5E1" strokeWidth="1.5" />
              {/* Hair / Stylized Headdress */}
              <polygon points="-14,-76 14,-76 12,-86 -12,-86" fill={viewMode === 'wireframe' ? 'none' : '#1A0E30'} />
              <rect x="-13" y="-76" width="26" height="5" fill={viewMode === 'wireframe' ? 'none' : '#1A0E30'} rx="1" />
              {/* Eyes */}
              <rect x="-7" y="-66" width="4.5" height="4" fill="#0F172A" rx="0.8" />
              <rect x="2.5" y="-66" width="4.5" height="4" fill="#0F172A" rx="0.8" />
              {/* Eye sparkle reflection */}
              <rect x="-6" y="-65.5" width="1.5" height="1.5" fill="#FFFFFF" />
              <rect x="3.5" y="-65.5" width="1.5" height="1.5" fill="#FFFFFF" />
              {/* Confident smile */}
              <line x1="-3" y1="-57" x2="3" y2="-57" stroke="#334155" strokeWidth="1.2" strokeLinecap="round" />
            </g>
          </svg>
        </div>

        {/* Bottom Tactile Controller Bar */}
        <div className="pt-3 border-t border-[#332A45]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center gap-1.5 text-[#A7A1B5]">
            <Compass className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span className="text-[11px]">Interaksi Karakter:</span>
          </div>

          <div className="flex items-center gap-1.5" role="group" aria-label="Pose karakter">
            <button
              type="button"
              onClick={() => setStance('explore')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8B5CF6] ${
                stance === 'explore'
                  ? 'bg-[#8B5CF6] text-white font-semibold'
                  : 'bg-[#201A2D] text-[#A7A1B5] hover:text-[#F5F3FF]'
              }`}
            >
              <Compass className="w-3 h-3" />
              <span>Eksplorasi</span>
            </button>
            <button
              type="button"
              onClick={() => setStance('combat')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8B5CF6] ${
                stance === 'combat'
                  ? 'bg-[#8B5CF6] text-white font-semibold'
                  : 'bg-[#201A2D] text-[#A7A1B5] hover:text-[#F5F3FF]'
              }`}
            >
              <Sword className="w-3 h-3" />
              <span>Pose Tempur</span>
            </button>
            <button
              type="button"
              onClick={() => setStance('idle')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8B5CF6] ${
                stance === 'idle'
                  ? 'bg-[#8B5CF6] text-white font-semibold'
                  : 'bg-[#201A2D] text-[#A7A1B5] hover:text-[#F5F3FF]'
              }`}
            >
              <Shield className="w-3 h-3" />
              <span>Santai</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
