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
  switch (slug) {
    case 'nusantara-realm':
      return (
        <div className={`relative w-full h-full overflow-hidden bg-[#0F0A1E] select-none ${className}`}>
          <svg
            viewBox="0 0 600 380"
            className="w-full h-full object-cover"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="nr-sky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1B0F33" />
                <stop offset="60%" stopColor="#110A24" />
                <stop offset="100%" stopColor="#090514" />
              </linearGradient>
              <linearGradient id="nr-crystal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E9D5FF" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
              <linearGradient id="nr-rock-top" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3F2D63" />
                <stop offset="100%" stopColor="#25173E" />
              </linearGradient>
              <linearGradient id="nr-rock-left" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1F1333" />
                <stop offset="100%" stopColor="#10081C" />
              </linearGradient>
              <linearGradient id="nr-temple-front" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#5B438A" />
                <stop offset="100%" stopColor="#281A43" />
              </linearGradient>
            </defs>

            <rect width="600" height="380" fill="url(#nr-sky)" />

            {/* Distant Voxel Mountain Silhouettes */}
            <path d="M 60 220 L 140 140 L 220 220 Z" fill="#1E1235" opacity="0.6" />
            <path d="M 180 230 L 260 110 L 340 230 Z" fill="#291847" opacity="0.7" />
            <path d="M 380 240 L 460 150 L 540 240 Z" fill="#201338" opacity="0.5" />

            {/* Moon / Energy Core */}
            <circle cx="300" cy="115" r="38" fill="#DDD6FE" opacity="0.85" />
            <circle cx="300" cy="115" r="48" fill="#8B5CF6" opacity="0.2" />

            {/* Floating Voxel Main Island */}
            <polygon points="300,165 500,235 300,305 100,235" fill="url(#nr-rock-top)" stroke="#533C7E" strokeWidth="1.5" />
            <polygon points="100,235 300,305 300,365 100,295" fill="url(#nr-rock-left)" stroke="#352254" strokeWidth="1" />
            <polygon points="300,305 500,235 500,295 300,365" fill="#24153D" stroke="#352254" strokeWidth="1" />

            {/* Tiered Nusantara Temple (Candi Bentar Gate & Meru Tower) */}
            {/* Left Gate Pillar */}
            <polygon points="215,140 245,140 250,150 210,150" fill="#7C5BB8" />
            <rect x="210" y="150" width="40" height="70" fill="url(#nr-temple-front)" stroke="#4A3470" strokeWidth="1" />
            <rect x="215" y="160" width="12" height="18" fill="#140B24" />
            <rect x="215" y="185" width="12" height="24" fill="#140B24" />

            {/* Right Gate Pillar */}
            <polygon points="355,140 385,140 390,150 350,150" fill="#7C5BB8" />
            <rect x="350" y="150" width="40" height="70" fill="url(#nr-temple-front)" stroke="#4A3470" strokeWidth="1" />
            <rect x="373" y="160" width="12" height="18" fill="#140B24" />
            <rect x="373" y="185" width="12" height="24" fill="#140B24" />

            {/* Center Tiered Meru Sanctuary Roofs */}
            <polygon points="265,190 335,190 350,205 250,205" fill="#6B4B9C" stroke="#7E5BB5" strokeWidth="1" />
            <polygon points="250,205 350,205 350,225 250,225" fill="#3D285E" stroke="#533780" strokeWidth="1" />

            <polygon points="275,165 325,165 338,180 262,180" fill="#7C59B2" />
            <polygon points="262,180 338,180 338,195 262,195" fill="#462E6B" />

            {/* Central Mystical Floating Keris / Relic */}
            <g transform="translate(300, 140)">
              <polygon points="0,-22 8,-4 0,16 -8,-4" fill="url(#nr-crystal)" stroke="#FFFFFF" strokeWidth="1" />
              <circle cx="0" cy="18" r="3" fill="#EDE9FE" />
            </g>

            {/* Blocky Indonesian Hero Avatar Silhouette */}
            <g transform="translate(300, 240)">
              <ellipse cx="0" cy="22" rx="18" ry="6" fill="#06030D" opacity="0.7" />
              {/* Legs */}
              <rect x="-8" y="2" width="6" height="18" fill="#25163D" />
              <rect x="2" y="2" width="6" height="18" fill="#2E1C4A" />
              {/* Torso */}
              <polygon points="-12,-28 12,-28 14,2 -12,2" fill="#8B5CF6" stroke="#DDD6FE" strokeWidth="1" />
              {/* Glowing blade in hand */}
              <line x1="16" y1="-10" x2="30" y2="-28" stroke="#E9D5FF" strokeWidth="3" strokeLinecap="round" />
              {/* Head & Blangkon Headdress */}
              <rect x="-9" y="-48" width="18" height="20" fill="#F5F3FF" rx="1.5" />
              <polygon points="-11,-48 11,-48 8,-56 -8,-56" fill="#1C102E" />
              <rect x="-10" y="-48" width="20" height="4" fill="#1C102E" />
            </g>

            {/* Floating Energy Shards */}
            <rect x="150" y="180" width="8" height="8" fill="#C4B5FD" transform="rotate(45 154 184)" opacity="0.8" />
            <rect x="450" y="170" width="10" height="10" fill="#8B5CF6" transform="rotate(30 455 175)" opacity="0.85" />
            <rect x="380" y="280" width="6" height="6" fill="#E9D5FF" transform="rotate(20 383 283)" opacity="0.9" />
          </svg>
        </div>
      );

    case 'skyblock-obby-mayhem':
      return (
        <div className={`relative w-full h-full overflow-hidden bg-[#0C081A] select-none ${className}`}>
          <svg
            viewBox="0 0 600 380"
            className="w-full h-full object-cover"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="obby-sky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#220D45" />
                <stop offset="50%" stopColor="#15082C" />
                <stop offset="100%" stopColor="#0B0417" />
              </linearGradient>
              <linearGradient id="neon-block" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C084FC" />
                <stop offset="100%" stopColor="#7E22CE" />
              </linearGradient>
            </defs>

            <rect width="600" height="380" fill="url(#obby-sky)" />

            {/* Laser Speedrun Grids in Sky */}
            <line x1="0" y1="120" x2="600" y2="120" stroke="#8B5CF6" strokeWidth="0.8" strokeDasharray="12 12" opacity="0.4" />
            <line x1="0" y1="260" x2="600" y2="260" stroke="#8B5CF6" strokeWidth="0.8" strokeDasharray="12 12" opacity="0.4" />

            {/* Floating Stepping Blocks Obstacle Course */}
            {/* Platform 1 */}
            <polygon points="120,270 190,240 260,270 190,300" fill="#4C1D95" stroke="#A78BFA" strokeWidth="1.5" />
            <polygon points="120,270 190,300 190,325 120,295" fill="#2E1065" />
            <polygon points="190,300 260,270 260,295 190,325" fill="#3B0764" />

            {/* Platform 2 (Higher) */}
            <polygon points="230,200 290,170 350,200 290,230" fill="url(#neon-block)" stroke="#F472B6" strokeWidth="1.5" />
            <polygon points="230,200 290,230 290,250 230,220" fill="#701A75" />
            <polygon points="290,230 350,200 350,220 290,250" fill="#831843" />

            {/* Platform 3 (Apex Goal) */}
            <polygon points="360,140 430,110 500,140 430,170" fill="#6366F1" stroke="#A5B4FC" strokeWidth="1.5" />
            <polygon points="360,140 430,170 430,195 360,165" fill="#312E81" />
            <polygon points="430,170 500,140 500,165 430,195" fill="#3730A3" />

            {/* Trampoline Boost Rings */}
            <ellipse cx="290" cy="200" rx="36" ry="16" fill="none" stroke="#F472B6" strokeWidth="2" strokeDasharray="6 4" />
            <ellipse cx="430" cy="140" rx="42" ry="18" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="6 4" />

            {/* Speedrunner Avatar Mid-Air Jump */}
            <g transform="translate(290, 110)">
              {/* Motion trail lines */}
              <line x1="-30" y1="40" x2="-10" y2="20" stroke="#F472B6" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
              <line x1="-40" y1="50" x2="-15" y2="30" stroke="#A78BFA" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />

              {/* Legs in leap */}
              <rect x="-14" y="8" width="7" height="18" fill="#1E1B4B" transform="rotate(-35 -10 10)" />
              <rect x="2" y="8" width="7" height="18" fill="#312E81" transform="rotate(25 5 10)" />
              {/* Torso */}
              <polygon points="-12,-22 12,-22 14,8 -12,8" fill="#8B5CF6" stroke="#DDD6FE" strokeWidth="1" />
              {/* Head with Visor */}
              <rect x="-9" y="-42" width="18" height="20" fill="#F8FAFC" rx="2" />
              <rect x="-9" y="-36" width="18" height="7" fill="#06B6D4" />
              <line x1="-6" y1="-33" x2="3" y2="-33" stroke="#FFFFFF" strokeWidth="1.5" />
            </g>

            {/* Speedrun HUD Counter Overlay in scene */}
            <g transform="translate(40, 45)">
              <rect x="0" y="0" width="110" height="32" fill="#171321" rx="6" stroke="#332A45" strokeWidth="1" />
              <text x="12" y="21" fill="#C4B5FD" fontSize="11" fontFamily="monospace" fontWeight="bold">00:42.89s</text>
            </g>
          </svg>
        </div>
      );

    case 'mega-tycoon-cyber-nusantara':
      return (
        <div className={`relative w-full h-full overflow-hidden bg-[#0A0714] select-none ${className}`}>
          <svg
            viewBox="0 0 600 380"
            className="w-full h-full object-cover"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="cyber-sky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#190B38" />
                <stop offset="60%" stopColor="#0E0521" />
                <stop offset="100%" stopColor="#05020D" />
              </linearGradient>
              <linearGradient id="neon-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#22D3EE" />
              </linearGradient>
            </defs>

            <rect width="600" height="380" fill="url(#cyber-sky)" />

            {/* Grid Floor of Floating Cyber Harbor */}
            <polygon points="300,190 530,260 300,330 70,260" fill="#130D26" stroke="#332454" strokeWidth="1.2" />

            {/* Futuristic Vertical Megatowers */}
            {/* Tower Left */}
            <g transform="translate(130, 110)">
              <polygon points="40,0 80,15 40,30 0,15" fill="#4338CA" stroke="#818CF8" strokeWidth="1" />
              <polygon points="0,15 40,30 40,150 0,135" fill="#1E1B4B" stroke="#312E81" strokeWidth="1" />
              <polygon points="40,30 80,15 80,135 40,150" fill="#312E81" stroke="#3730A3" strokeWidth="1" />
              {/* Window grid */}
              <line x1="8" y1="35" x2="32" y2="44" stroke="#06B6D4" strokeWidth="1.5" />
              <line x1="8" y1="60" x2="32" y2="69" stroke="#06B6D4" strokeWidth="1.5" />
              <line x1="8" y1="85" x2="32" y2="94" stroke="#06B6D4" strokeWidth="1.5" />
              <line x1="8" y1="110" x2="32" y2="119" stroke="#06B6D4" strokeWidth="1.5" />
            </g>

            {/* Central Skybridge Skyscraper */}
            <g transform="translate(250, 70)">
              <polygon points="50,0 100,20 50,40 0,20" fill="#7C3AED" stroke="#C4B5FD" strokeWidth="1" />
              <polygon points="0,20 50,40 50,220 0,200" fill="#2E1065" stroke="#581C87" strokeWidth="1" />
              <polygon points="50,40 100,20 100,200 50,220" fill="#3B0764" stroke="#6B21A8" strokeWidth="1" />
              {/* Holographic Neon Billboard */}
              <polygon points="10,60 40,72 40,105 10,93" fill="url(#neon-cyan)" opacity="0.85" />
              {/* Antenna Spike */}
              <line x1="50" y1="0" x2="50" y2="-30" stroke="#E0E7FF" strokeWidth="2" />
              <circle cx="50" cy="-30" r="3" fill="#EC4899" />
            </g>

            {/* Conveyor Belt System */}
            <polygon points="170,250 370,205 390,215 190,260" fill="#1F2937" stroke="#4B5563" strokeWidth="1" />
            {/* Cargo Voxel Crates on Belt */}
            <rect x="230" y="235" width="14" height="12" fill="#F59E0B" stroke="#FDE68A" strokeWidth="1" />
            <rect x="300" y="218" width="14" height="12" fill="#10B981" stroke="#A7F3D0" strokeWidth="1" />

            {/* Flying Cargo Drone */}
            <g transform="translate(420, 140)">
              <rect x="0" y="0" width="30" height="14" fill="#1F1635" rx="3" stroke="#8B5CF6" strokeWidth="1" />
              <line x1="-8" y1="-4" x2="8" y2="-4" stroke="#C4B5FD" strokeWidth="2" />
              <line x1="22" y1="-4" x2="38" y2="-4" stroke="#C4B5FD" strokeWidth="2" />
              {/* Suspended battery box */}
              <line x1="8" y1="14" x2="8" y2="24" stroke="#6B7280" />
              <line x1="22" y1="14" x2="22" y2="24" stroke="#6B7280" />
              <rect x="6" y="24" width="18" height="14" fill="#06B6D4" rx="2" />
            </g>
          </svg>
        </div>
      );

    case 'ghost-hunter-kampung-misteri':
      return (
        <div className={`relative w-full h-full overflow-hidden bg-[#07050C] select-none ${className}`}>
          <svg
            viewBox="0 0 600 380"
            className="w-full h-full object-cover"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="mist-sky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#120A20" />
                <stop offset="60%" stopColor="#0B0614" />
                <stop offset="100%" stopColor="#040207" />
              </linearGradient>
              <linearGradient id="lantern-light" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>

            <rect width="600" height="380" fill="url(#mist-sky)" />

            {/* Fog Layers */}
            <ellipse cx="300" cy="240" rx="260" ry="80" fill="#2E1B4E" opacity="0.25" />
            <ellipse cx="300" cy="270" rx="300" ry="70" fill="#1E1235" opacity="0.4" />

            {/* Ancient Voxel Banyan Tree */}
            <g transform="translate(380, 80)">
              {/* Roots / Trunk */}
              <polygon points="50,180 70,180 65,80 45,80" fill="#1C132B" stroke="#2D1F45" strokeWidth="1" />
              <polygon points="35,180 50,180 55,80 35,80" fill="#140D21" />
              {/* Dense Voxel Leaf Canopies */}
              <rect x="-10" y="30" width="70" height="40" fill="#281A43" rx="3" stroke="#3D2966" strokeWidth="1" />
              <rect x="25" y="10" width="80" height="45" fill="#36225B" rx="3" stroke="#4C3080" strokeWidth="1" />
              <rect x="10" y="-15" width="60" height="40" fill="#442B73" rx="3" stroke="#5D3B9E" strokeWidth="1" />
            </g>

            {/* Abandoned Javanese/Sundanese Stilt House in Voxel */}
            <g transform="translate(140, 130)">
              {/* Stilts */}
              <rect x="20" y="110" width="8" height="50" fill="#150E24" />
              <rect x="65" y="110" width="8" height="50" fill="#150E24" />
              <rect x="110" y="110" width="8" height="50" fill="#150E24" />
              {/* House Deck & Walls */}
              <polygon points="0,110 140,110 120,60 20,60" fill="#271A3F" stroke="#3D2863" strokeWidth="1" />
              {/* Traditional Joglo Roof Tier */}
              <polygon points="-10,60 150,60 110,20 30,20" fill="#462C70" stroke="#603D99" strokeWidth="1" />
              <polygon points="20,20 120,20 90,-5 50,-5" fill="#58378C" stroke="#7549BA" strokeWidth="1" />
              {/* Creepy dim window */}
              <rect x="45" y="72" width="22" height="26" fill="#FDE047" opacity="0.25" />
            </g>

            {/* Flashlight Beam Cutting Through Darkness */}
            <polygon points="120,270 340,210 370,300" fill="#DDD6FE" opacity="0.12" />

            {/* Investigator Silhouette Holding Lantern */}
            <g transform="translate(130, 255)">
              <rect x="-8" y="2" width="6" height="18" fill="#1F1635" />
              <rect x="2" y="2" width="6" height="18" fill="#281C45" />
              <polygon points="-12,-28 12,-28 14,2 -12,2" fill="#581C87" stroke="#A855F7" strokeWidth="1" />
              {/* Head with flashlight headlamp */}
              <rect x="-8" y="-46" width="16" height="18" fill="#F5F3FF" rx="1.5" />
              <rect x="-4" y="-44" width="8" height="4" fill="#38BDF8" />
              {/* Handheld Lantern with warm glow */}
              <line x1="14" y1="-12" x2="22" y2="-4" stroke="#94A3B8" strokeWidth="2" />
              <rect x="18" y="-4" width="10" height="14" fill="url(#lantern-light)" rx="1" />
              <circle cx="23" cy="3" r="14" fill="#F59E0B" opacity="0.25" />
            </g>
          </svg>
        </div>
      );

    case 'gravity-racer-zero-voxel':
      return (
        <div className={`relative w-full h-full overflow-hidden bg-[#0A0617] select-none ${className}`}>
          <svg
            viewBox="0 0 600 380"
            className="w-full h-full object-cover"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="racer-sky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#250F4C" />
                <stop offset="60%" stopColor="#14072E" />
                <stop offset="100%" stopColor="#080214" />
              </linearGradient>
              <linearGradient id="plasma-trail" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>

            <rect width="600" height="380" fill="url(#racer-sky)" />

            {/* 360-Degree Curved Magnetic Track */}
            <path
              d="M -20 280 Q 200 120 400 240 T 620 180"
              fill="none"
              stroke="#2E1B52"
              strokeWidth="56"
            />
            <path
              d="M -20 280 Q 200 120 400 240 T 620 180"
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="4"
              strokeDasharray="16 16"
            />
            {/* Edge guide rails */}
            <path
              d="M -20 252 Q 200 92 400 212 T 620 152"
              fill="none"
              stroke="#06B6D4"
              strokeWidth="3"
            />

            {/* Plasma Boost Speed Trail */}
            <path
              d="M 120 220 Q 220 190 280 205"
              fill="none"
              stroke="url(#plasma-trail)"
              strokeWidth="10"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* Futuristic Voxel Hovercraft Racer */}
            <g transform="translate(290, 195) rotate(14)">
              {/* Aerodynamic Angular Voxel Chassis */}
              <polygon points="-40,-12 30,-14 55,0 30,14 -40,12 -50,0" fill="#7C3AED" stroke="#E9D5FF" strokeWidth="1.5" />
              {/* Cockpit Canopy */}
              <polygon points="-15,-8 15,-8 28,0 15,8 -15,8" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1" />
              {/* Dual Plasma Thrusters */}
              <rect x="-56" y="-14" width="14" height="8" fill="#1E1B4B" rx="1" />
              <rect x="-56" y="6" width="14" height="8" fill="#1E1B4B" rx="1" />
              <polygon points="-56,-14 -75,-10 -56,-6" fill="#F43F5E" />
              <polygon points="-56,6 -75,10 -56,14" fill="#F43F5E" />
              {/* Rear Spoiler */}
              <polygon points="-48,-20 -35,-20 -38,-14 -51,-14" fill="#C4B5FD" />
              <polygon points="-48,20 -35,20 -38,14 -51,14" fill="#C4B5FD" />
            </g>

            {/* Speed Gauge & Drift Marker */}
            <g transform="translate(450, 60)">
              <rect x="0" y="0" width="110" height="36" fill="#171321" rx="6" stroke="#332A45" strokeWidth="1" />
              <text x="12" y="23" fill="#38BDF8" fontSize="13" fontFamily="monospace" fontWeight="bold">584 KM/H</text>
            </g>
          </svg>
        </div>
      );

    case 'block-arena-champions':
    default:
      return (
        <div className={`relative w-full h-full overflow-hidden bg-[#0C071C] select-none ${className}`}>
          <svg
            viewBox="0 0 600 380"
            className="w-full h-full object-cover"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="arena-sky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#250F46" />
                <stop offset="60%" stopColor="#14082B" />
                <stop offset="100%" stopColor="#080214" />
              </linearGradient>
            </defs>

            <rect width="600" height="380" fill="url(#arena-sky)" />

            {/* Colosseum Voxel Arena Ground */}
            <polygon points="300,180 520,250 300,320 80,250" fill="#2E1C4F" stroke="#52358A" strokeWidth="1.5" />
            {/* Arena boundary pillars */}
            <rect x="130" y="190" width="16" height="45" fill="#472A7A" stroke="#7044C0" strokeWidth="1" />
            <rect x="450" y="190" width="16" height="45" fill="#472A7A" stroke="#7044C0" strokeWidth="1" />

            {/* Destructible Voxel Wall (Exploding in impact) */}
            <g transform="translate(300, 200)">
              {/* Flying shattered debris cubes */}
              <rect x="-35" y="-60" width="12" height="12" fill="#C4B5FD" transform="rotate(35)" stroke="#FFFFFF" strokeWidth="1" />
              <rect x="40" y="-70" width="14" height="14" fill="#8B5CF6" transform="rotate(15)" stroke="#DDD6FE" strokeWidth="1" />
              <rect x="-60" y="-30" width="10" height="10" fill="#6D28D9" transform="rotate(-20)" />
              <rect x="55" y="-20" width="12" height="12" fill="#A855F7" transform="rotate(40)" />

              {/* Energy Shockwave Ring */}
              <ellipse cx="0" cy="40" rx="90" ry="24" fill="none" stroke="#C4B5FD" strokeWidth="2.5" strokeDasharray="8 6" opacity="0.8" />
            </g>

            {/* Hammer Titan Champion Avatar */}
            <g transform="translate(300, 220)">
              <ellipse cx="0" cy="24" rx="24" ry="8" fill="#06020D" opacity="0.7" />
              {/* Heavy Legs */}
              <rect x="-14" y="2" width="10" height="22" fill="#25163D" stroke="#4C2D7E" strokeWidth="1" />
              <rect x="4" y="2" width="10" height="22" fill="#2E1C4A" stroke="#4C2D7E" strokeWidth="1" />
              {/* Heavy Armor Torso */}
              <polygon points="-20,-34 20,-34 22,2 -20,2" fill="#8B5CF6" stroke="#DDD6FE" strokeWidth="1.5" />
              {/* Giant Voxel War Hammer Slammed to ground */}
              <rect x="-2" y="-55" width="6" height="70" fill="#64748B" stroke="#CBD5E1" strokeWidth="1" />
              <rect x="-24" y="6" width="50" height="22" fill="#3B1C6B" stroke="#C084FC" strokeWidth="2" rx="2" />
              {/* Champion Helmet with Horns */}
              <rect x="-11" y="-56" width="22" height="22" fill="#F1F5F9" rx="2" stroke="#94A3B8" strokeWidth="1.2" />
              <polygon points="-16,-56 -10,-56 -14,-68" fill="#A855F7" />
              <polygon points="10,-56 16,-56 14,-68" fill="#A855F7" />
              {/* Glowing eye slit */}
              <rect x="-7" y="-46" width="14" height="4" fill="#06B6D4" />
            </g>
          </svg>
        </div>
      );
  }
};
