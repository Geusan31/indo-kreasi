import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Monitor, Layers } from 'lucide-react';
import { Game } from '../types';
import { GameIllustration } from './GameIllustration';

interface GameCardProps {
  game: Game;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <article className="group relative flex flex-col rounded-xl bg-[#201A2D] border border-[#332A45] hover:border-[#8B5CF6]/70 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-[0_12px_30px_rgba(139,92,246,0.15)] focus-within:ring-2 focus-within:ring-[#8B5CF6]">
      {/* Artwork Header */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#171321]">
        <GameIllustration slug={game.slug} variant="cover" className="w-full h-full" />
        
        {/* Unboxed subtle status tag at top right */}
        <div className="absolute top-3 right-3 font-mono text-[11px] font-semibold px-2.5 py-1 rounded bg-[#09090F]/80 backdrop-blur-sm text-[#C4B5FD] border border-[#332A45]">
          {game.status}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Metadata line without pill badge */}
          <div className="flex items-center gap-2 text-xs text-[#A7A1B5] font-mono">
            <span className="text-[#C4B5FD] font-medium">{game.category}</span>
            <span aria-hidden="true" className="text-[#8B5CF6]">·</span>
            <span className="truncate">{game.playerMode.split('(')[0]}</span>
          </div>

          <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F5F3FF] group-hover:text-white transition-colors leading-snug">
            <Link to={`/games/${game.slug}`} className="focus:outline-none">
              {game.title}
            </Link>
          </h3>

          <p className="text-sm text-[#A7A1B5] line-clamp-2 leading-relaxed">
            {game.description}
          </p>
        </div>

        {/* Platforms and CTA */}
        <div className="pt-3 border-t border-[#332A45]/70 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-[#A7A1B5]">
            <Monitor className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span className="truncate max-w-[170px] text-[11px]">{game.platforms[0]}</span>
          </div>

          <Link
            to={`/games/${game.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#C4B5FD] group-hover:text-[#F5F3FF] group-hover:translate-x-0.5 transition-all focus:outline-none"
            aria-label={`Lihat detail game ${game.title}`}
          >
            <span>Detail Game</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#8B5CF6]" />
          </Link>
        </div>
      </div>
    </article>
  );
};
