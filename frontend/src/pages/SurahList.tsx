import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Search, ChevronRight, ArrowLeft } from 'lucide-react';
import { useGetSurahs } from '../hooks/useQueries';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import type { Surah } from '../backend';

export default function SurahList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { data: surahs = [], isLoading } = useGetSurahs();

  const filtered = surahs.filter((s: Surah) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      s.nameEnglish.toLowerCase().includes(q) ||
      s.nameArabic.includes(q) ||
      String(s.number).includes(q)
    );
  });

  const sorted = [...filtered].sort((a, b) => Number(a.number) - Number(b.number));

  return (
    <div className="min-h-screen bg-page-bg flex flex-col">
      {/* Header */}
      <header className="bg-header-bg sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3 px-4 pt-safe pb-4 pt-4">
          <button
            onClick={() => navigate({ to: '/' })}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gold-300 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gold-300">Surah List</h1>
            <p className="text-xs text-islamic-green-300">114 Surahs</p>
          </div>
        </div>
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or number..."
              className="pl-9 bg-search-bg border-border text-foreground placeholder:text-muted-foreground rounded-xl"
            />
          </div>
        </div>
      </header>

      {/* List */}
      <main className="flex-1 px-4 py-3 space-y-2">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))
        ) : sorted.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No surahs found</p>
            <p className="text-sm mt-1">Try a different search term</p>
          </div>
        ) : (
          sorted.map((surah: Surah) => (
            <button
              key={Number(surah.number)}
              onClick={() => navigate({ to: '/reader/$surahNumber', params: { surahNumber: String(surah.number) } })}
              className="w-full bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-4 hover:border-gold-500/50 hover:bg-card-hover transition-all duration-150 active:scale-[0.99]"
            >
              {/* Number Badge */}
              <div className="w-10 h-10 rounded-lg bg-islamic-green-600/20 border border-islamic-green-500/30 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-islamic-green-500">{Number(surah.number)}</span>
              </div>
              {/* Info */}
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-foreground text-sm">{surah.nameEnglish}</p>
                  <p className="text-lg font-arabic text-gold-500">{surah.nameArabic}</p>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground">{surah.revelationType}</span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">{Number(surah.ayahCount)} Ayahs</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </button>
          ))
        )}
      </main>
    </div>
  );
}
