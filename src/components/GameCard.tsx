import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Monitor } from 'lucide-react';
import { Game } from '../types';
import { GameIllustration } from './GameIllustration';

interface GameCardProps {
  game: Game;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <article className="group flex flex-col rounded-xl bg-[#171321] border border-[#332A45] hover:border-[#8B5CF6]/80 transition-colors overflow-hidden focus-within:ring-2 focus-within:ring-[#8B5CF6]">
      {/* Artwork Header */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#09090F]">
        {game.cover_image_url && (game.cover_image_url.startsWith('http') || game.cover_image_url.startsWith('data:')) ? (
          <img
            src={game.cover_image_url}
            alt={game.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <GameIllustration slug={game.slug} variant="cover" className="w-full h-full" />
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between space-y-4">
        <div className="space-y-2">
          {/* Unboxed metadata line */}
          <div className="flex items-center gap-2 text-xs text-[#A7A1B5]">
            <span className="text-[#C4B5FD] font-medium">{game.category}</span>
            <span aria-hidden="true" className="text-[#332A45]">·</span>
            <span className="capitalize">{game.status}</span>
          </div>

          <h3 className="font-display font-semibold text-lg sm:text-xl text-[#F5F3FF] group-hover:text-white transition-colors leading-snug">
            <Link to={`/games/${game.slug}`} className="focus:outline-none">
              {game.title}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-[#A7A1B5] line-clamp-2 leading-relaxed">
            {game.short_description || game.description || ''}
          </p>
        </div>

        {/* Footer info & link */}
        <div className="pt-3 border-t border-[#332A45]/70 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-[#A7A1B5]">
            <Monitor className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
            <span className="truncate max-w-[170px] text-[11px]">
              {game.platform || 'Multi-platform'}
            </span>
          </div>

          <Link
            to={`/games/${game.slug}`}
            className="inline-flex items-center gap-1 font-medium text-[#C4B5FD] group-hover:text-white transition-colors focus:outline-none"
            aria-label={`Buka detail ${game.title}`}
          >
            <span>Detail</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#8B5CF6]" />
          </Link>
        </div>
      </div>
    </article>
  );
};
