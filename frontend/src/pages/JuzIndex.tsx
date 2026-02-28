import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useGetJuzIndex, useGetSurahs } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import type { JuzMapping, Surah } from '../backend';

const JUZ_NAMES = [
  'Alif Lam Mim', 'Sayaqul', 'Tilka\'r-Rusul', 'Lan Tana Lu', 'Wal Muhsanat',
  'La Yuhibbullah', 'Wa Idha Sami\'u', 'Wa Law Annana', 'Qalal Mala\'u', 'Wa\'lamu',
  'Ya\'tadhirun', 'Wa Ma Min Dabbah', 'Wa Ma Ubri\'u', 'Rubama', 'Subhanallazi',
  'Qal Alam', 'Iqtaraba', 'Qad Aflaha', 'Wa Qalallazina', 'Amman Khalaqa',
  'Utlu Ma Uhiya', 'Wa Man Yaqnut', 'Wa Mali', 'Faman Azlamu', 'Ilayhi Yuraddu',
  'Ha Mim', 'Qala Fama Khatbukum', 'Qad Sami\'allah', 'Tabarakalladhi', 'Amma'
];

export default function JuzIndex() {
  const navigate = useNavigate();
  const { data: juzList = [], isLoading } = useGetJuzIndex();
  const { data: surahs = [] } = useGetSurahs();

  const getSurahName = (surahNumber: bigint): string => {
    const surah = surahs.find((s: Surah) => s.number === surahNumber);
    return surah ? surah.nameEnglish : `Surah ${Number(surahNumber)}`;
  };

  const sorted = [...juzList].sort((a, b) => Number(a.juzNumber) - Number(b.juzNumber));

  return (
    <div className="min-h-screen bg-page-bg flex flex-col">
      {/* Header */}
      <header className="bg-header-bg sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3 px-4 py-4">
          <button
            onClick={() => navigate({ to: '/' })}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-gold-300 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gold-300">Juz Index</h1>
            <p className="text-xs text-islamic-green-300">30 Juz</p>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-3 space-y-2">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))
        ) : sorted.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No Juz data available</p>
          </div>
        ) : (
          sorted.map((juz: JuzMapping) => {
            const juzNum = Number(juz.juzNumber);
            const juzName = JUZ_NAMES[juzNum - 1] || '';
            return (
              <button
                key={juzNum}
                onClick={() => navigate({ to: '/reader/$surahNumber', params: { surahNumber: String(juz.startingSurah) } })}
                className="w-full bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-4 hover:border-gold-500/50 hover:bg-card-hover transition-all duration-150 active:scale-[0.99]"
              >
                {/* Juz Number */}
                <div className="w-12 h-12 rounded-xl bg-gold-500/15 border border-gold-500/30 flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-xs text-gold-500 font-medium leading-none">Juz</span>
                  <span className="text-lg font-bold text-gold-400 leading-tight">{juzNum}</span>
                </div>
                {/* Info */}
                <div className="flex-1 text-left">
                  <p className="font-semibold text-foreground text-sm">{juzName}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Starts: {getSurahName(juz.startingSurah)}, Ayah {Number(juz.startingAyah)}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </button>
            );
          })
        )}
      </main>
    </div>
  );
}
