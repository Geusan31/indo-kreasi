import React, { useState, useEffect, useMemo } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { GameCard } from '../components/GameCard';
import { getGames } from '../lib/db';
import { Game } from '../types';
import { LoadingState } from '../components/ui/LoadingState';

export const Games: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');

  const loadGames = async () => {
    try {
      setLoading(true);
      // Public users ONLY see published games
      const data = await getGames({ status: 'published' });
      setGames(data);
    } catch (err) {
      console.error('Error fetching published games:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGames();
    window.addEventListener('indokreasi_data_updated', loadGames);
    return () => {
      window.removeEventListener('indokreasi_data_updated', loadGames);
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    games.forEach((g) => {
      if (g.category) set.add(g.category);
    });
    return ['Semua Kategori', ...Array.from(set)];
  }, [games]);

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        game.title.toLowerCase().includes(q) ||
        (game.short_description && game.short_description.toLowerCase().includes(q)) ||
        (game.description && game.description.toLowerCase().includes(q)) ||
        (game.platform && game.platform.toLowerCase().includes(q));

      const matchesCategory =
        selectedCategory === 'Semua Kategori' || game.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [games, searchQuery, selectedCategory]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Semua Kategori');
  };

  return (
    <div className="w-full py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Katalog Proyek"
          title="Portofolio Game PT Indo Kreasi"
          description="Eksplorasi jajaran proyek game orisinal yang telah kami rilis dan sedang aktif dikembangkan. Gunakan pencarian dan filter kategori di bawah."
        />

        {/* Filter Toolbar */}
        <div className="mb-10 space-y-4 bg-[#171321] border border-[#332A45] rounded-xl p-5">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A7A1B5]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari berdasarkan judul, mekanik, atau platform..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs sm:text-sm text-[#F5F3FF] placeholder-[#A7A1B5]/60 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] transition-colors"
                aria-label="Cari game"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#A7A1B5] hover:text-[#F5F3FF]"
                >
                  Hapus
                </button>
              )}
            </div>

            <div className="text-xs text-[#A7A1B5]">
              Menampilkan <span className="font-semibold text-[#F5F3FF]">{filteredGames.length}</span> dari {games.length} game
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-[#332A45]/70">
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-md text-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8B5CF6] ${
                    isSelected
                      ? 'bg-[#8B5CF6] text-white font-medium'
                      : 'bg-[#201A2D] text-[#A7A1B5] hover:text-[#F5F3FF] hover:bg-[#282138]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <LoadingState message="Memuat portofolio game..." />
        ) : filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="py-16 px-4 text-center rounded-xl bg-[#171321] border border-[#332A45] max-w-md mx-auto space-y-4">
            <h3 className="text-lg font-display font-semibold text-[#F5F3FF]">
              Tidak Ada Game yang Ditemukan
            </h3>
            <p className="text-xs sm:text-sm text-[#A7A1B5]">
              Kriteria pencarian &quot;{searchQuery}&quot; pada kategori &quot;{selectedCategory}&quot; tidak menghasilkan data.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-xs font-semibold text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filter</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
