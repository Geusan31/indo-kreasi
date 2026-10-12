import React from 'react';

interface GameIllustrationProps {
  slug: string;
  className?: string;
  variant?: 'cover' | 'banner' | 'thumbnail';
}

export const GameIllustration: React.FC<GameIllustrationProps> = ({
  slug,
  className = '',
}) => {
  switch (slug) {
    case 'nusantara-realm':
      return (
        <div className={`relative overflow-hidden bg-[#120D24] select-none ${className}`}>
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
              <linearGradient id="nr-temple-top" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5B4588" />
                <stop offset="100%" stopColor="#43306B" />
              </linearGradient>
            </defs>

            {/* Distant Voxel Mountains */}
            <path d="M 120 180 L 170 120 L 220 180 Z" fill="#241B3B" opacity="0.6" />
            <path d="M 190 190 L 240 100 L 290 190 Z" fill="#322254" opacity="0.7" />
            <path d="M 380 200 L 450 130 L 520 200 Z" fill="#251A3E" opacity="0.5" />

            {/* Celestial Disc */}
            <circle cx="300" cy="110" r="32" fill="#E9D5FF" opacity="0.9" />

            {/* Isometric Voxel Floating Island Base */}
            <polygon points="300,160 480,225 300,290 120,225" fill="#362954" stroke="#4C3A75" strokeWidth="1.5" />
            <polygon points="120,225 300,290 300,340 120,275" fill="#1C142E" stroke="#332454" strokeWidth="1" />
            <polygon points="300,290 480,225 480,275 300,340" fill="#261A3D" stroke="#332454" strokeWidth="1" />

            {/* Voxel Tiered Temple */}
            <polygon points="260,195 340,195 360,210 240,210" fill="url(#nr-temple-top)" />
            <polygon points="240,210 360,210 360,235 240,235" fill="url(#nr-temple-front)" stroke="#5E438D" strokeWidth="1" />
            
            <polygon points="275,170 325,170 340,185 260,185" fill="url(#nr-temple-top)" />
            <polygon points="260,185 340,185 340,200 260,200" fill="url(#nr-temple-front)" />

            {/* Gate Towers */}
            <polygon points="210,130 240,130 245,140 205,140" fill="#7C5BB8" />
            <rect x="205" y="140" width="40" height="75" fill="url(#nr-temple-front)" stroke="#4A3470" strokeWidth="1" />
            <rect x="210" y="150" width="12" height="18" fill="#120B20" />
            <rect x="210" y="175" width="12" height="24" fill="#120B20" />

            <polygon points="360,130 390,130 395,140 355,140" fill="#7C5BB8" />
            <rect x="355" y="140" width="40" height="75" fill="url(#nr-temple-front)" stroke="#4A3470" strokeWidth="1" />
            <rect x="378" y="150" width="12" height="18" fill="#120B20" />
            <rect x="378" y="175" width="12" height="24" fill="#120B20" />

            {/* Central Mystical Floating Relic */}
            <polygon points="300,135 306,155 300,180 294,155" fill="url(#nr-crystal)" />

            {/* Blocky Character Silhouette */}
            <rect x="294" y="222" width="12" height="12" fill="#F5F3FF" rx="1" />
            <polygon points="291,222 309,222 300,216" fill="#C4B5FD" />
            <rect x="292" y="234" width="16" height="18" fill="#8B5CF6" rx="1" />
            <line x1="312" y1="236" x2="320" y2="224" stroke="#E9D5FF" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="293" y="252" width="6" height="14" fill="#3B2A5E" />
            <rect x="301" y="252" width="6" height="14" fill="#3B2A5E" />

            {/* Voxel Blocks */}
            <rect x="160" y="170" width="8" height="8" fill="#C4B5FD" transform="rotate(45 164 174)" opacity="0.8" />
            <rect x="440" y="160" width="10" height="10" fill="#8B5CF6" transform="rotate(30 445 165)" opacity="0.85" />
            <rect x="380" y="270" width="6" height="6" fill="#E9D5FF" transform="rotate(20 383 273)" opacity="0.9" />
          </svg>
        </div>
      );

    case 'skyblock-obby-mayhem':
      return (
        <div className={`relative overflow-hidden bg-[#0F0C20] select-none ${className}`}>
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

            {/* Distant Voxel Clouds */}
            <rect x="60" y="80" width="90" height="24" fill="#241B3B" rx="2" />
            <rect x="90" y="66" width="50" height="20" fill="#2F234D" rx="2" />
            <rect x="420" y="110" width="110" height="28" fill="#241B3B" rx="2" />

            {/* Stepping Obby Blocks */}
            <polygon points="80,280 180,240 240,270 140,310" fill="#362954" stroke="#8B5CF6" strokeWidth="2" />
            <polygon points="80,280 140,310 140,335 80,305" fill="#1D1533" />
            <polygon points="140,310 240,270 240,295 140,335" fill="#281E43" />

            {/* Boost Block */}
            <polygon points="210,210 290,180 340,205 260,235" fill="url(#cyan-boost)" stroke="#BAE6FD" strokeWidth="1.5" />
            <polygon points="210,210 260,235 260,250 210,225" fill="#0369A1" />
            <polygon points="260,235 340,205 340,220 260,250" fill="#075985" />
            <polygon points="275,200 285,188 295,200 288,200 288,212 282,212 282,200" fill="#FFFFFF" />

            {/* Hazard Bar */}
            <polygon points="320,160 380,135 430,155 370,180" fill="url(#neon-block)" stroke="#C4B5FD" strokeWidth="1.5" />
            <polygon points="320,160 370,180 370,195 320,175" fill="#4C1D95" />
            <polygon points="370,180 430,155 430,170 370,195" fill="#5B21B6" />
            <line x1="280" y1="140" x2="470" y2="175" stroke="#F43F5E" strokeWidth="3" strokeDasharray="8 4" strokeLinecap="round" />

            {/* Apex Goal */}
            <polygon points="410,105 470,80 520,100 460,125" fill="#8B5CF6" stroke="#DDD6FE" strokeWidth="2" />
            <polygon points="410,105 460,125 460,140 410,120" fill="#3B1C72" />
            <polygon points="460,125 520,100 520,115 460,140" fill="#4C228E" />
            <line x1="465" y1="70" x2="465" y2="105" stroke="#F5F3FF" strokeWidth="2" />
            <polygon points="465,70 500,80 465,90" fill="#FBBF24" />

            {/* Character in jump */}
            <rect x="270" y="125" width="14" height="14" fill="#F5F3FF" rx="1.5" />
            <rect x="268" y="140" width="18" height="20" fill="#8B5CF6" rx="2" />
            <rect x="259" y="132" width="7" height="16" fill="#A78BFA" transform="rotate(-30 259 132)" />
            <rect x="288" y="132" width="7" height="16" fill="#A78BFA" transform="rotate(30 288 132)" />
            <rect x="269" y="160" width="7" height="10" fill="#312E81" />
            <rect x="279" y="160" width="7" height="10" fill="#312E81" />
          </svg>
        </div>
      );

    case 'mega-tycoon-cyber-nusantara':
      return (
        <div className={`relative overflow-hidden bg-[#090714] select-none ${className}`}>
          <svg
            viewBox="0 0 600 360"
            className="relative w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Voxel Skyscraper */}
            <polygon points="140,80 180,60 220,80 180,100" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="1" />
            <polygon points="140,80 180,100 180,260 140,240" fill="#20153B" stroke="#332454" strokeWidth="1" />
            <polygon points="180,100 220,80 220,240 180,260" fill="#2A1B4E" stroke="#332454" strokeWidth="1" />
            {[0, 1, 2, 3, 4].map((row) => (
              <polygon key={`win-l-${row}`} points={`150,${110 + row * 26} 170,${120 + row * 26} 170,${130 + row * 26} 150,${120 + row * 26}`} fill="#34D399" opacity="0.8" />
            ))}
            {[0, 1, 2, 3, 4].map((row) => (
              <polygon key={`win-r-${row}`} points={`190,${120 + row * 26} 210,${110 + row * 26} 210,${120 + row * 26} 190,${130 + row * 26}`} fill="#8B5CF6" opacity="0.9" />
            ))}

            {/* Central Factory Hub */}
            <polygon points="260,160 380,100 480,150 360,210" fill="#39285E" stroke="#7C5BB8" strokeWidth="1.5" />
            <polygon points="260,160 360,210 360,280 260,230" fill="#1C142E" />
            <polygon points="360,210 480,150 480,220 360,280" fill="#281D42" />

            {/* Automated Conveyor */}
            <path d="M 220,230 L 300,270 L 420,210 L 520,260" fill="none" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" opacity="0.9" />

            {/* Voxel Drone */}
            <rect x="330" y="80" width="30" height="16" fill="#F5F3FF" rx="2" />
            <line x1="315" y1="88" x2="375" y2="88" stroke="#8B5CF6" strokeWidth="2" />
            <circle cx="315" cy="88" r="4" fill="#38BDF8" />
            <circle cx="375" cy="88" r="4" fill="#38BDF8" />
            <rect x="337" y="100" width="16" height="14" fill="#10B981" rx="1" />
          </svg>
        </div>
      );

    case 'ghost-hunter-kampung-misteri':
      return (
        <div className={`relative overflow-hidden bg-[#07060E] select-none ${className}`}>
          <svg
            viewBox="0 0 600 360"
            className="relative w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
            preserveAspectRatio="xMidYMid slice"
          >
            <path d="M 0,180 Q 150,140 300,180 T 600,180 L 600,360 L 0,360 Z" fill="#141026" opacity="0.7" />
            <path d="M 0,220 Q 200,260 400,210 T 600,240 L 600,360 L 0,360 Z" fill="#0C0A17" opacity="0.9" />

            {/* Banyan Tree */}
            <rect x="100" y="140" width="28" height="140" fill="#181324" />
            <rect x="80" y="80" width="70" height="70" fill="#231B36" rx="4" />
            <rect x="60" y="100" width="110" height="40" fill="#1C152B" rx="4" />

            {/* Stilt House */}
            <polygon points="340,110 440,70 540,110 440,140" fill="#382A52" stroke="#4C3A75" strokeWidth="1.5" />
            <polygon points="340,110 440,140 440,210 340,180" fill="#1E162E" stroke="#332454" strokeWidth="1" />
            <polygon points="440,140 540,110 540,180 440,210" fill="#251B38" stroke="#332454" strokeWidth="1" />
            <rect x="360" y="185" width="8" height="60" fill="#120D1D" />
            <rect x="420" y="200" width="8" height="55" fill="#120D1D" />
            <rect x="510" y="180" width="8" height="65" fill="#120D1D" />

            {/* Investigator Silhouette */}
            <rect x="215" y="240" width="12" height="12" fill="#E2E8F0" rx="1" />
            <rect x="213" y="252" width="16" height="18" fill="#475569" rx="1" />
            <rect x="229" y="256" width="10" height="5" fill="#FBBF24" />
            <rect x="214" y="270" width="6" height="14" fill="#1E293B" />
            <rect x="222" y="270" width="6" height="14" fill="#1E293B" />
          </svg>
        </div>
      );

    case 'gravity-racer-zero-voxel':
      return (
        <div className={`relative overflow-hidden bg-[#0B0818] select-none ${className}`}>
          <svg
            viewBox="0 0 600 360"
            className="relative w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
            preserveAspectRatio="xMidYMid slice"
          >
            <ellipse cx="300" cy="180" rx="260" ry="90" fill="none" stroke="#332454" strokeWidth="20" transform="rotate(-15 300 180)" />
            <ellipse cx="300" cy="180" rx="260" ry="90" fill="none" stroke="#8B5CF6" strokeWidth="3" strokeDasharray="16 8" transform="rotate(-15 300 180)" />

            {/* Voxel Racer Car */}
            <g transform="translate(240, 180) rotate(-10)">
              <polygon points="40,20 140,0 160,25 60,45" fill="#8B5CF6" stroke="#DDD6FE" strokeWidth="1.5" />
              <polygon points="40,20 60,45 40,65 20,40" fill="#4C1D95" />
              <polygon points="60,45 160,25 140,55 40,65" fill="#6D28D9" />
              <polygon points="80,15 120,5 130,22 90,30" fill="#38BDF8" opacity="0.9" stroke="#E0F2FE" strokeWidth="1" />
              <rect x="35" y="45" width="20" height="15" fill="#1E1B4B" rx="2" />
              <rect x="125" y="30" width="22" height="15" fill="#1E1B4B" rx="2" />
            </g>
          </svg>
        </div>
      );

    case 'block-arena-champions':
    default:
      return (
        <div className={`relative overflow-hidden bg-[#110C24] select-none ${className}`}>
          <svg
            viewBox="0 0 600 360"
            className="relative w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Arena Pillars */}
            {[-1, 0, 1].map((offset) => {
              const cx = 300 + offset * 140;
              return (
                <rect key={`p-${offset}`} x={cx - 15} y="110" width="30" height="130" fill="#23193D" stroke="#3D2B66" strokeWidth="1" />
              );
            })}

            {/* Arena Platform */}
            <polygon points="300,190 520,250 300,310 80,250" fill="#2E204E" stroke="#8B5CF6" strokeWidth="2" />
            <polygon points="80,250 300,310 300,340 80,280" fill="#181029" />
            <polygon points="300,310 520,250 520,280 300,340" fill="#211638" />

            {/* Left Hero */}
            <rect x="220" y="215" width="14" height="14" fill="#F1F5F9" rx="1.5" />
            <rect x="216" y="229" width="22" height="24" fill="#7C3AED" rx="2" />
            <line x1="238" y1="235" x2="260" y2="210" stroke="#E2E8F0" strokeWidth="3" />
            <rect x="252" y="198" width="22" height="18" fill="#F59E0B" rx="2" stroke="#FEF3C7" strokeWidth="1" />

            {/* Right Hero */}
            <rect x="360" y="215" width="14" height="14" fill="#F1F5F9" rx="1.5" />
            <rect x="356" y="229" width="22" height="24" fill="#2563EB" rx="2" />
          </svg>
        </div>
      );
  }
};
