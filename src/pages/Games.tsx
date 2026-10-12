import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, Filter, Gamepad2 } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { GameCard } from '../components/GameCard';
import { GAMES_DATA, GAME_CATEGORIES } from '../data/games';

export const Games: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');

  const filteredGames = useMemo(() => {
    return GAMES_DATA.filter((game) => {
      const matchesSearch =
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.keyFeatures.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase())) ||
        game.platforms.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'Semua Kategori' || game.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Semua Kategori');
  };

  return (
    <div className="w-full py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeading
          kicker="KATALOG KARYA"
          title="Portofolio Game PT Indo Kreasi"
          description="Eksplorasi jajaran proyek game orisinal kami. Mulai dari prototipe teruji hingga karya yang sedang dalam siklus pengembangan aktif."
        />

        {/* Search & Category Filter Controls */}
        <div className="mb-10 space-y-5 bg-[#171321] border border-[#332A45] rounded-xl p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A7A1B5]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari berdasarkan nama game, mekanik, atau kata kunci..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#201A2D] border border-[#332A45] text-sm text-[#F5F3FF] placeholder-[#A7A1B5]/60 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all"
                aria-label="Cari game"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#A7A1B5] hover:text-[#F5F3FF]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Results count indicator */}
            <div className="shrink-0 text-xs font-mono text-[#A7A1B5] flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>
                Menampilkan <strong className="text-[#F5F3FF]">{filteredGames.length}</strong> dari {GAMES_DATA.length} Game
              </span>
            </div>
          </div>

          {/* Category Filter Buttons (Interactive controls) */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#332A45]/70">
            <span className="text-xs font-mono text-[#A7A1B5] mr-1">Kategori:</span>
            {GAME_CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] ${
                    isSelected
                      ? 'bg-[#8B5CF6] text-white shadow-sm font-semibold'
                      : 'bg-[#201A2D] text-[#A7A1B5] hover:text-[#F5F3FF] hover:bg-[#272036]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Game Cards Grid or Empty State */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="py-20 px-4 text-center rounded-2xl bg-[#171321] border border-[#332A45] max-w-xl mx-auto space-y-4">
            <div className="w-14 h-14 rounded-xl bg-[#201A2D] border border-[#332A45] flex items-center justify-center text-[#8B5CF6] mx-auto">
              <Gamepad2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-display font-bold text-[#F5F3FF]">
              Tidak Ada Game yang Cocok
            </h3>
            <p className="text-sm text-[#A7A1B5] max-w-md mx-auto leading-relaxed">
              Pencarian &quot;{searchQuery}&quot; pada kategori &quot;{selectedCategory}&quot; tidak menemukan hasil. Coba ganti kata kunci atau reset filter.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-[#F5F3FF] text-xs font-semibold shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-[#C4B5FD]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Semua Filter</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
