import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { ArrowLeft, Bookmark, BookmarkCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetAyahs, useGetSurah, useGetBookmark, useSaveBookmark } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import type { Ayah } from '../backend';

export default function SurahReader() {
  const { surahNumber } = useParams({ from: '/reader/$surahNumber' });
  const surahNum = parseInt(surahNumber, 10);
  const navigate = useNavigate();
  const [savedAyah, setSavedAyah] = useState<number | null>(null);
  const ayahRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const { data: surah, isLoading: surahLoading } = useGetSurah(surahNum);
  const { data: ayahs = [], isLoading: ayahsLoading } = useGetAyahs(surahNum);
  const { data: bookmark } = useGetBookmark();
  const saveBookmark = useSaveBookmark();

  const isLoading = surahLoading || ayahsLoading;
  const sortedAyahs = [...ayahs].sort((a, b) => Number(a.ayahNumber) - Number(b.ayahNumber));

  // Scroll to bookmarked ayah on load
  useEffect(() => {
    if (bookmark && Number(bookmark.surahNumber) === surahNum) {
      setSavedAyah(Number(bookmark.ayahNumber));
      const ayahNum = Number(bookmark.ayahNumber);
      setTimeout(() => {
        const el = ayahRefs.current[ayahNum];
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }
  }, [bookmark, surahNum]);

  const handleBookmark = (ayahNumber: number) => {
    saveBookmark.mutate({ surahNumber: surahNum, ayahNumber });
    setSavedAyah(ayahNumber);
  };

  const goToPrev = () => {
    if (surahNum > 1) navigate({ to: '/reader/$surahNumber', params: { surahNumber: String(surahNum - 1) } });
  };

  const goToNext = () => {
    if (surahNum < 114) navigate({ to: '/reader/$surahNumber', params: { surahNumber: String(surahNum + 1) } });
  };

  return (
    <div className="min-h-screen bg-page-bg flex flex-col">
      {/* Header */}
      <header className="bg-header-bg sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3 px-4 py-4">
          <button
            onClick={() => navigate({ to: '/surahs' })}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gold-300 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 text-center">
            {surahLoading ? (
              <Skeleton className="h-5 w-32 mx-auto" />
            ) : (
              <>
                <h1 className="text-base font-bold text-gold-300">{surah?.nameEnglish}</h1>
                <p className="text-xs text-islamic-green-300">{surah?.revelationType} · {Number(surah?.ayahCount)} Ayahs</p>
              </>
            )}
          </div>
          <div className="w-9" />
        </div>
      </header>

      {/* Bismillah */}
      {surahNum !== 1 && surahNum !== 9 && (
        <div className="text-center py-6 px-4 border-b border-border/50">
          <p className="text-2xl font-arabic text-gold-500 leading-loose">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
        </div>
      )}

      {/* Surah Name Banner */}
      {!surahLoading && surah && (
        <div className="text-center py-4 px-4 bg-surah-banner border-b border-gold-500/20">
          <p className="text-3xl font-arabic text-gold-400 mb-1">{surah.nameArabic}</p>
          <p className="text-sm text-muted-foreground">{surah.nameEnglish}</p>
        </div>
      )}

      {/* Ayahs */}
      <main className="flex-1 px-4 py-4 space-y-1 scroll-smooth">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-card rounded-2xl p-5 space-y-3">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))
        ) : sortedAyahs.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p>No ayahs found for this surah.</p>
          </div>
        ) : (
          sortedAyahs.map((ayah: Ayah) => {
            const ayahNum = Number(ayah.ayahNumber);
            const isBookmarked = savedAyah === ayahNum;
            return (
              <div
                key={ayahNum}
                ref={(el) => { ayahRefs.current[ayahNum] = el; }}
                className={`bg-card border rounded-2xl p-5 transition-all duration-200 ${
                  isBookmarked ? 'border-gold-500/60 bg-card-bookmarked' : 'border-border'
                }`}
              >
                {/* Ayah Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 rounded-full bg-islamic-green-600/20 border border-islamic-green-500/30 flex items-center justify-center">
                    <span className="text-xs font-bold text-islamic-green-500">{ayahNum}</span>
                  </div>
                  <button
                    onClick={() => handleBookmark(ayahNum)}
                    disabled={saveBookmark.isPending}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      isBookmarked
                        ? 'text-gold-500 bg-gold-500/15'
                        : 'text-muted-foreground hover:text-gold-400 hover:bg-gold-500/10'
                    }`}
                    title="Bookmark this ayah"
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Arabic Text */}
                <p className="text-right text-2xl font-arabic leading-[2.2] text-arabic-text mb-4 dir-rtl">
                  {ayah.uthmaniText}
                </p>

                {/* Divider */}
                <div className="border-t border-border/50 my-3" />

                {/* Urdu Translation */}
                {ayah.urduTranslation && (
                  <p className="text-right text-base font-urdu leading-relaxed text-urdu-text mb-2 dir-rtl">
                    {ayah.urduTranslation}
                  </p>
                )}

                {/* English Translation */}
                {ayah.englishTranslation && (
                  <p className="text-sm leading-relaxed text-english-text mt-2">
                    {ayah.englishTranslation}
                  </p>
                )}
              </div>
            );
          })
        )}
      </main>

      {/* Navigation Footer */}
      <div className="sticky bottom-0 bg-header-bg border-t border-border/50 px-4 py-3 flex items-center justify-between">
        <button
          onClick={goToPrev}
          disabled={surahNum <= 1}
          className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white/10 text-gold-300 disabled:opacity-30 hover:bg-white/20 transition-colors text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        <span className="text-xs text-muted-foreground">Surah {surahNum} / 114</span>
        <button
          onClick={goToNext}
          disabled={surahNum >= 114}
          className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white/10 text-gold-300 disabled:opacity-30 hover:bg-white/20 transition-colors text-sm font-medium"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
