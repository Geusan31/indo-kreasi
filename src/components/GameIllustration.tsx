import React from 'react';

interface GameIllustrationProps {
  slug: string;
  className?: string;
  variant?: 'cover' | 'banner' | 'thumbnail';
}

export const GameIllustration: React.FC<GameIllustrationProps> = ({
  slug,
  className = '',
  variant = 'cover',
}) => {
  // Height and aspect ratio adjustments based on variant
  const isBanner = variant === 'banner';

  switch (slug) {
    case 'nusantara-realm':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-[#120D24] via-[#1C1335] to-[#0A0714] select-none ${className}`}>
          {/* Ambient atmosphere glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,rgba(139,92,246,0.35),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(196,181,253,0.15),transparent_50%)]" />

          {/* Grid lines overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-nr" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#8B5CF6" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-nr)" />
          </svg>

          {/* Stylized Blocky Nusantara Island Diorama */}
          <svg
            viewBox="0 0 600 360"
            className="relative w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="nr-crystal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C4B5FD" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
              <linearGradient id="nr-temple-front" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3B2A5E" />
                <stop offset="100%" stopColor="#201538" />
              </linearGradient>
              <linearGradient id="nr-temple-side" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2B1E45" />
                <stop offset="100%" stopColor="#140C26" />
              </linearGradient>
              <linearGradient id="nr-temple-top" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5B4588" />
                <stop offset="100%" stopColor="#43306B" />
              </linearGradient>
            </defs>

            {/* Distant Voxel Floating Mountains */}
            <path d="M 120 180 L 170 120 L 220 180 Z" fill="#241B3B" opacity="0.6" />
            <path d="M 190 190 L 240 100 L 290 190 Z" fill="#322254" opacity="0.7" />
            <path d="M 380 200 L 450 130 L 520 200 Z" fill="#251A3E" opacity="0.5" />

            {/* Glowing moon/portal behind temple */}
            <circle cx="300" cy="110" r="48" fill="url(#nr-crystal)" opacity="0.25" filter="blur(8px)" />
            <circle cx="300" cy="110" r="32" fill="#E9D5FF" opacity="0.9" />

            {/* Isometric Voxel Floating Island Base */}
            {/* Top base polygon */}
            <polygon points="300,160 480,225 300,290 120,225" fill="#362954" stroke="#4C3A75" strokeWidth="1.5" />
            {/* Left dirt cliff */}
            <polygon points="120,225 300,290 300,340 120,275" fill="#1C142E" stroke="#332454" strokeWidth="1" />
            {/* Right dirt cliff */}
            <polygon points="300,290 480,225 480,275 300,340" fill="#261A3D" stroke="#332454" strokeWidth="1" />

            {/* Voxel Tiered Temple (Candi Bentar Blocky Style) */}
            {/* Center Tier 1 */}
            <polygon points="260,195 340,195 360,210 240,210" fill="url(#nr-temple-top)" />
            <polygon points="240,210 360,210 360,235 240,235" fill="url(#nr-temple-front)" stroke="#5E438D" strokeWidth="1" />
            
            {/* Center Tier 2 */}
            <polygon points="275,170 325,170 340,185 260,185" fill="url(#nr-temple-top)" />
            <polygon points="260,185 340,185 340,200 260,200" fill="url(#nr-temple-front)" />

            {/* Left Gate Tower (Blocky Candi) */}
            <polygon points="210,130 240,130 245,140 205,140" fill="#7C5BB8" />
            <rect x="205" y="140" width="40" height="75" fill="url(#nr-temple-front)" stroke="#4A3470" strokeWidth="1" />
            <rect x="210" y="150" width="12" height="18" fill="#120B20" />
            <rect x="210" y="175" width="12" height="24" fill="#120B20" />

            {/* Right Gate Tower (Blocky Candi) */}
            <polygon points="360,130 390,130 395,140 355,140" fill="#7C5BB8" />
            <rect x="355" y="140" width="40" height="75" fill="url(#nr-temple-front)" stroke="#4A3470" strokeWidth="1" />
            <rect x="378" y="150" width="12" height="18" fill="#120B20" />
            <rect x="378" y="175" width="12" height="24" fill="#120B20" />

            {/* Central Mystical Floating Keris/Relic */}
            <polygon points="300,135 306,155 300,180 294,155" fill="url(#nr-crystal)" />
            <circle cx="300" cy="155" r="14" fill="#8B5CF6" opacity="0.3" filter="blur(4px)" />

            {/* Blocky Character Silhouette standing on front ledge */}
            {/* Head */}
            <rect x="294" y="222" width="12" height="12" fill="#F5F3FF" rx="1" />
            {/* Blangkon/Headdress Accent */}
            <polygon points="291,222 309,222 300,216" fill="#C4B5FD" />
            {/* Torso */}
            <rect x="292" y="234" width="16" height="18" fill="#8B5CF6" rx="1" />
            {/* Glowing Keris in hand */}
            <line x1="312" y1="236" x2="320" y2="224" stroke="#E9D5FF" strokeWidth="2.5" strokeLinecap="round" />
            {/* Legs */}
            <rect x="293" y="252" width="6" height="14" fill="#3B2A5E" />
            <rect x="301" y="252" width="6" height="14" fill="#3B2A5E" />

            {/* Floating Voxel Crystals and Spores */}
            <rect x="160" y="170" width="8" height="8" fill="#C4B5FD" transform="rotate(45 164 174)" opacity="0.8" />
            <rect x="440" y="160" width="10" height="10" fill="#8B5CF6" transform="rotate(30 445 165)" opacity="0.85" />
            <rect x="380" y="270" width="6" height="6" fill="#E9D5FF" transform="rotate(20 383 273)" opacity="0.9" />
            <rect x="220" y="280" width="7" height="7" fill="#A78BFA" transform="rotate(45 223 283)" opacity="0.8" />
          </svg>

          {/* Watermark badge on corner */}
          <div className="absolute bottom-3 left-3 text-[11px] font-mono tracking-wider text-[#C4B5FD]/70 uppercase">
            VOXEL WORLD // 01
          </div>
        </div>
      );

    case 'skyblock-obby-mayhem':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-[#0F0C20] via-[#1B1139] to-[#0A0617] select-none ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(167,139,250,0.3),transparent_55%)]" />

          {/* Obby Grid & Platforms */}
          <svg
            viewBox="0 0 600 360"
            className="relative w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="neon-block" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A78BFA" />
                <stop offset="100%" stopColor="#6D28D9" />
              </linearGradient>
              <linearGradient id="cyan-boost" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#67E8F9" />
                <stop offset="100%" stopColor="#0284C7" />
              </linearGradient>
            </defs>

            {/* Distant Clouds in Voxel Blocks */}
            <rect x="60" y="80" width="90" height="24" fill="#241B3B" rx="2" />
            <rect x="90" y="66" width="50" height="20" fill="#2F234D" rx="2" />
            <rect x="420" y="110" width="110" height="28" fill="#241B3B" rx="2" />
            <rect x="450" y="94" width="60" height="22" fill="#2F234D" rx="2" />

            {/* Stepping Obby Blocks Stepping Upward */}
            {/* Block 1 (Start Platform) */}
            <polygon points="80,280 180,240 240,270 140,310" fill="#362954" stroke="#8B5CF6" strokeWidth="2" />
            <polygon points="80,280 140,310 140,335 80,305" fill="#1D1533" />
            <polygon points="140,310 240,270 240,295 140,335" fill="#281E43" />

            {/* Block 2 (Kinetic Neon Trampoline) */}
            <polygon points="210,210 290,180 340,205 260,235" fill="url(#cyan-boost)" stroke="#BAE6FD" strokeWidth="1.5" />
            <polygon points="210,210 260,235 260,250 210,225" fill="#0369A1" />
            <polygon points="260,235 340,205 340,220 260,250" fill="#075985" />
            {/* Bounce arrow symbol */}
            <polygon points="275,200 285,188 295,200 288,200 288,212 282,212 282,200" fill="#FFFFFF" />

            {/* Block 3 (Rotating Red Hazard Bar) */}
            <polygon points="320,160 380,135 430,155 370,180" fill="url(#neon-block)" stroke="#C4B5FD" strokeWidth="1.5" />
            <polygon points="320,160 370,180 370,195 320,175" fill="#4C1D95" />
            <polygon points="370,180 430,155 430,170 370,195" fill="#5B21B6" />
            {/* Hazard laser bar */}
            <line x1="280" y1="140" x2="470" y2="175" stroke="#F43F5E" strokeWidth="3.5" strokeDasharray="8 4" strokeLinecap="round" />

            {/* Block 4 (Apex Goal Floating Crystal) */}
            <polygon points="410,105 470,80 520,100 460,125" fill="#8B5CF6" stroke="#DDD6FE" strokeWidth="2" />
            <polygon points="410,105 460,125 460,140 410,120" fill="#3B1C72" />
            <polygon points="460,125 520,100 520,115 460,140" fill="#4C228E" />

            {/* Goal Trophy Flag */}
            <line x1="465" y1="70" x2="465" y2="105" stroke="#F5F3FF" strokeWidth="2" />
            <polygon points="465,70 500,80 465,90" fill="#FBBF24" />

            {/* Jumper Character in mid-air jumping */}
            {/* Motion trail dashes */}
            <path d="M 180,260 Q 240,160 280,140" fill="none" stroke="#C4B5FD" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" />
            {/* Character in jump pose */}
            <rect x="270" y="125" width="14" height="14" fill="#F5F3FF" rx="1.5" />
            <rect x="268" y="140" width="18" height="20" fill="#8B5CF6" rx="2" />
            {/* Arms raised */}
            <rect x="259" y="132" width="7" height="16" fill="#A78BFA" transform="rotate(-30 259 132)" />
            <rect x="288" y="132" width="7" height="16" fill="#A78BFA" transform="rotate(30 288 132)" />
            {/* Legs tucked */}
            <rect x="269" y="160" width="7" height="10" fill="#312E81" />
            <rect x="279" y="160" width="7" height="10" fill="#312E81" />
          </svg>

          <div className="absolute bottom-3 left-3 text-[11px] font-mono tracking-wider text-[#C4B5FD]/70 uppercase">
            OBBY SPEEDRUN // 02
          </div>
        </div>
      );

    case 'mega-tycoon-cyber-nusantara':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-[#090714] via-[#141029] to-[#0B091B] select-none ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_70%,rgba(139,92,246,0.25),transparent_60%)]" />

          {/* Cyber Voxel Skyscraper & Factory Diorama */}
          <svg
            viewBox="0 0 600 360"
            className="relative w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Isometric Grid Floor */}
            <g opacity="0.3">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <line key={`gl-${i}`} x1={0} y1={200 + i * 20} x2={600} y2={120 + i * 20} stroke="#4C3A75" strokeWidth="1" />
              ))}
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <line key={`gr-${i}`} x1={0} y1={120 + i * 20} x2={600} y2={200 + i * 20} stroke="#4C3A75" strokeWidth="1" />
              ))}
            </g>

            {/* Cyber Voxel Skyscraper Tower (Left) */}
            {/* Roof */}
            <polygon points="140,80 180,60 220,80 180,100" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="1" />
            {/* Left face */}
            <polygon points="140,80 180,100 180,260 140,240" fill="#20153B" stroke="#332454" strokeWidth="1" />
            {/* Right face */}
            <polygon points="180,100 220,80 220,240 180,260" fill="#2A1B4E" stroke="#332454" strokeWidth="1" />
            {/* Neon Window Grid on left face */}
            {[0, 1, 2, 3, 4].map((row) => (
              <g key={`win-l-${row}`}>
                <polygon points={`150,${110 + row * 26} 170,${120 + row * 26} 170,${130 + row * 26} 150,${120 + row * 26}`} fill="#34D399" opacity="0.8" />
              </g>
            ))}
            {/* Neon Window Grid on right face */}
            {[0, 1, 2, 3, 4].map((row) => (
              <g key={`win-r-${row}`}>
                <polygon points={`190,${120 + row * 26} 210,${110 + row * 26} 210,${120 + row * 26} 190,${130 + row * 26}`} fill="#8B5CF6" opacity="0.9" />
              </g>
            ))}

            {/* Central Automated Factory Hub (Center-Right) */}
            <polygon points="260,160 380,100 480,150 360,210" fill="#39285E" stroke="#7C5BB8" strokeWidth="1.5" />
            <polygon points="260,160 360,210 360,280 260,230" fill="#1C142E" />
            <polygon points="360,210 480,150 480,220 360,280" fill="#281D42" />

            {/* Conveyor Belt System with Moving Block Items */}
            <path d="M 220,230 L 300,270 L 420,210 L 520,260" fill="none" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" opacity="0.9" />
            <path d="M 220,230 L 300,270 L 420,210 L 520,260" fill="none" stroke="#FEF3C7" strokeWidth="2" strokeDasharray="8 6" />

            {/* Voxel Drone hovering with cargo */}
            <rect x="330" y="80" width="30" height="16" fill="#F5F3FF" rx="2" />
            <line x1="315" y1="88" x2="375" y2="88" stroke="#8B5CF6" strokeWidth="2" />
            <circle cx="315" cy="88" r="4" fill="#38BDF8" />
            <circle cx="375" cy="88" r="4" fill="#38BDF8" />
            <rect x="337" y="100" width="16" height="14" fill="#10B981" rx="1" />
            <line x1="345" y1="96" x2="345" y2="100" stroke="#CBD5E1" strokeWidth="1.5" />

            {/* Currency Hologram Icon */}
            <circle cx="480" cy="90" r="18" fill="#FBBF24" opacity="0.2" filter="blur(4px)" />
            <text x="480" y="96" fill="#FDE047" fontSize="18" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              Rp
            </text>
          </svg>

          <div className="absolute bottom-3 left-3 text-[11px] font-mono tracking-wider text-[#C4B5FD]/70 uppercase">
            TYCOON SIM // 03
          </div>
        </div>
      );

    case 'ghost-hunter-kampung-misteri':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-[#07060E] via-[#100D1C] to-[#06050B] select-none ${className}`}>
          {/* Volumetric Fog & Spooky Voxel Atmosphere */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(139,92,246,0.18),transparent_70%)]" />

          <svg
            viewBox="0 0 600 360"
            className="relative w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Fog layers */}
            <path d="M 0,180 Q 150,140 300,180 T 600,180 L 600,360 L 0,360 Z" fill="#141026" opacity="0.7" />
            <path d="M 0,220 Q 200,260 400,210 T 600,240 L 600,360 L 0,360 Z" fill="#0C0A17" opacity="0.9" />

            {/* Gnarled Blocky Banyan Tree */}
            <rect x="100" y="140" width="28" height="140" fill="#181324" />
            <rect x="80" y="80" width="70" height="70" fill="#231B36" rx="4" />
            <rect x="60" y="100" width="110" height="40" fill="#1C152B" rx="4" />
            <rect x="75" y="60" width="80" height="35" fill="#2C2243" rx="4" />
            {/* Hanging roots */}
            <line x1="85" y1="130" x2="85" y2="190" stroke="#181324" strokeWidth="3" />
            <line x1="140" y1="130" x2="140" y2="210" stroke="#181324" strokeWidth="2.5" />

            {/* Traditional Wooden Voxel Stilt House (Rumah Panggung) */}
            <polygon points="340,110 440,70 540,110 440,140" fill="#382A52" stroke="#4C3A75" strokeWidth="1.5" />
            <polygon points="340,110 440,140 440,210 340,180" fill="#1E162E" stroke="#332454" strokeWidth="1" />
            <polygon points="440,140 540,110 540,180 440,210" fill="#251B38" stroke="#332454" strokeWidth="1" />
            {/* Stilts */}
            <rect x="360" y="185" width="8" height="60" fill="#120D1D" />
            <rect x="420" y="200" width="8" height="55" fill="#120D1D" />
            <rect x="510" y="180" width="8" height="65" fill="#120D1D" />
            {/* Glowing window with ominous purple eye-light */}
            <rect x="375" y="130" width="22" height="28" fill="#8B5CF6" opacity="0.8" />
            <line x1="386" y1="130" x2="386" y2="158" stroke="#1E162E" strokeWidth="2" />

            {/* Flashlight beam from hunter */}
            <polygon points="230,260 380,210 400,270" fill="url(#flash-light)" opacity="0.35" />
            <defs>
              <linearGradient id="flash-light" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Blocky Investigator Silhouette */}
            <rect x="215" y="240" width="12" height="12" fill="#E2E8F0" rx="1" />
            <rect x="213" y="252" width="16" height="18" fill="#475569" rx="1" />
            <rect x="229" y="256" width="10" height="5" fill="#FBBF24" />
            {/* Legs */}
            <rect x="214" y="270" width="6" height="14" fill="#1E293B" />
            <rect x="222" y="270" width="6" height="14" fill="#1E293B" />
          </svg>

          <div className="absolute bottom-3 left-3 text-[11px] font-mono tracking-wider text-[#C4B5FD]/70 uppercase">
            MYSTERY CO-OP // 04
          </div>
        </div>
      );

    case 'gravity-racer-zero-voxel':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-[#0B0818] via-[#160E2C] to-[#080612] select-none ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(139,92,246,0.3),transparent_60%)]" />

          {/* 360-Degree Magnetic Track Loop & Voxel Speed Machine */}
          <svg
            viewBox="0 0 600 360"
            className="relative w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Futuristic Magnetic Ring Track */}
            <ellipse cx="300" cy="180" rx="260" ry="90" fill="none" stroke="#332454" strokeWidth="24" transform="rotate(-15 300 180)" />
            <ellipse cx="300" cy="180" rx="260" ry="90" fill="none" stroke="#8B5CF6" strokeWidth="4" strokeDasharray="16 8" transform="rotate(-15 300 180)" />
            <ellipse cx="300" cy="180" rx="240" ry="80" fill="none" stroke="#C4B5FD" strokeWidth="1" strokeDasharray="6 12" transform="rotate(-15 300 180)" />

            {/* Neon Speed Lines */}
            <line x1="80" y1="260" x2="280" y2="240" stroke="#A78BFA" strokeWidth="2" strokeDasharray="40 10" opacity="0.8" />
            <line x1="120" y1="280" x2="340" y2="255" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="30 15" opacity="0.7" />

            {/* Voxel Racer Car Chassis in Drift */}
            <g transform="translate(240, 180) rotate(-10)">
              {/* Car Main Body */}
              <polygon points="40,20 140,0 160,25 60,45" fill="#8B5CF6" stroke="#DDD6FE" strokeWidth="1.5" />
              <polygon points="40,20 60,45 40,65 20,40" fill="#4C1D95" />
              <polygon points="60,45 160,25 140,55 40,65" fill="#6D28D9" />
              {/* Cockpit Canopy */}
              <polygon points="80,15 120,5 130,22 90,30" fill="#38BDF8" opacity="0.9" stroke="#E0F2FE" strokeWidth="1" />
              {/* Voxel Wheels / Hover Pads with glowing purple plasma */}
              <rect x="35" y="45" width="20" height="15" fill="#1E1B4B" rx="2" />
              <rect x="125" y="30" width="22" height="15" fill="#1E1B4B" rx="2" />
              {/* Plasma Jet Exhaust */}
              <polygon points="15,35 -20,25 -10,40" fill="#F43F5E" />
              <polygon points="15,40 -35,35 -15,48" fill="#F59E0B" />
              <polygon points="15,42 -15,45 -5,50" fill="#38BDF8" />
            </g>
          </svg>

          <div className="absolute bottom-3 left-3 text-[11px] font-mono tracking-wider text-[#C4B5FD]/70 uppercase">
            ARCADE RACING // 05
          </div>
        </div>
      );

    case 'block-arena-champions':
    default:
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-[#110C24] via-[#1D143B] to-[#0C0819] select-none ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.3),transparent_65%)]" />

          {/* Voxel Arena Colosseum & Clashing Heroes */}
          <svg
            viewBox="0 0 600 360"
            className="relative w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Arena Colosseum Pillars */}
            {[-2, -1, 0, 1, 2].map((offset) => {
              const cx = 300 + offset * 110;
              return (
                <g key={`pillar-${offset}`}>
                  <rect x={cx - 15} y="100" width="30" height="140" fill="#23193D" stroke="#3D2B66" strokeWidth="1" />
                  <polygon points={`${cx - 20},90 ${cx + 20},90 ${cx + 15},100 ${cx - 15},100`} fill="#4E377F" />
                </g>
              );
            })}

            {/* Floating Arena Platform */}
            <polygon points="300,190 520,250 300,310 80,250" fill="#2E204E" stroke="#8B5CF6" strokeWidth="2" />
            <polygon points="80,250 300,310 300,340 80,280" fill="#181029" />
            <polygon points="300,310 520,250 520,280 300,340" fill="#211638" />

            {/* Glowing Central Zone Circle */}
            <ellipse cx="300" cy="250" rx="90" ry="35" fill="none" stroke="#C4B5FD" strokeWidth="2" strokeDasharray="8 6" />
            <ellipse cx="300" cy="250" rx="40" ry="15" fill="#8B5CF6" opacity="0.4" filter="blur(6px)" />

            {/* Left Hero (Voxel Hammer Warrior) */}
            <rect x="220" y="215" width="14" height="14" fill="#F1F5F9" rx="1.5" />
            <rect x="216" y="229" width="22" height="24" fill="#7C3AED" rx="2" />
            {/* Hammer */}
            <line x1="238" y1="235" x2="260" y2="210" stroke="#E2E8F0" strokeWidth="3" />
            <rect x="252" y="198" width="22" height="18" fill="#F59E0B" rx="2" stroke="#FEF3C7" strokeWidth="1" />

            {/* Right Hero (Voxel Tech-Mage) */}
            <rect x="360" y="215" width="14" height="14" fill="#F1F5F9" rx="1.5" />
            <rect x="356" y="229" width="22" height="24" fill="#2563EB" rx="2" />
            {/* Magic Orb */}
            <circle cx="340" cy="225" r="10" fill="#38BDF8" opacity="0.8" filter="blur(2px)" />

            {/* Flying Voxel Debris / Destruction Physics */}
            <rect x="280" y="210" width="8" height="8" fill="#C4B5FD" transform="rotate(45 284 214)" />
            <rect x="310" y="195" width="10" height="10" fill="#8B5CF6" transform="rotate(25 315 200)" />
            <rect x="295" y="235" width="7" height="7" fill="#DDD6FE" transform="rotate(60 298 238)" />
          </svg>

          <div className="absolute bottom-3 left-3 text-[11px] font-mono tracking-wider text-[#C4B5FD]/70 uppercase">
            PVP ARENA // 06
          </div>
        </div>
      );
  }
};
