import { useNavigate } from '@tanstack/react-router';
import { BookOpen, List, AlignJustify, Settings, Hash, ChevronRight, Star, CalendarClock } from 'lucide-react';
import { useGetBookmark, useGetSurah } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const navigate = useNavigate();
  const { data: bookmark, isLoading: bookmarkLoading } = useGetBookmark();
  const { data: bookmarkedSurah } = useGetSurah(bookmark ? Number(bookmark.surahNumber) : 0);

  const navCards = [
    {
      icon: <List className="w-7 h-7" />,
      label: 'Surah List',
      sublabel: '114 Surahs',
      path: '/surahs',
      color: 'from-islamic-green-600 to-islamic-green-700',
    },
    {
      icon: <AlignJustify className="w-7 h-7" />,
      label: 'Juz Index',
      sublabel: '30 Juz',
      path: '/juz',
      color: 'from-gold-600 to-gold-700',
    },
    {
      icon: <Hash className="w-7 h-7" />,
      label: 'Tasbeeh',
      sublabel: 'Counter',
      path: '/tasbeeh',
      color: 'from-islamic-green-700 to-islamic-green-800',
    },
    {
      icon: <CalendarClock className="w-7 h-7" />,
      label: 'Prayer Timings',
      sublabel: 'Ramadan',
      path: '/prayer-timings',
      color: 'from-gold-500 to-gold-700',
    },
    {
      icon: <Settings className="w-7 h-7" />,
      label: 'Settings',
      sublabel: 'Theme & More',
      path: '/settings',
      color: 'from-gold-700 to-gold-800',
    },
  ];

  return (
    <div className="min-h-screen bg-page-bg">
      {/* Header */}
      <header className="relative overflow-hidden bg-header-bg pt-safe">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/assets/generated/bg-gradient.dim_1080x1920.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative px-6 pt-10 pb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-gold-500/20 border-2 border-gold-400 flex items-center justify-center shadow-lg">
              <img
                src="/assets/generated/quran-logo.dim_256x256.png"
                alt="Quran App"
                className="w-14 h-14 object-contain"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gold-300 font-arabic mb-1">القرآن الكريم</h1>
          <p className="text-islamic-green-200 text-sm tracking-widest uppercase font-medium">The Holy Quran</p>
        </div>
      </header>

      <main className="px-4 pb-10 -mt-4">
        {/* Continue Reading Card */}
        <div className="mb-6">
          {bookmarkLoading ? (
            <Skeleton className="h-24 w-full rounded-2xl" />
          ) : bookmark ? (
            <button
              onClick={() => navigate({ to: '/reader/$surahNumber', params: { surahNumber: String(bookmark.surahNumber) } })}
              className="w-full bg-continue-card border border-gold-500/30 rounded-2xl p-5 flex items-center justify-between shadow-card hover:shadow-card-hover transition-all duration-200 active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold-500/20 border border-gold-400/40 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-gold-400" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Continue Reading</p>
                  <p className="text-base font-semibold text-foreground">
                    {bookmarkedSurah ? bookmarkedSurah.nameEnglish : `Surah ${bookmark.surahNumber}`}
                  </p>
                  <p className="text-sm text-islamic-green-400">
                    Ayah {Number(bookmark.ayahNumber)}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gold-400" />
            </button>
          ) : (
            <div className="w-full bg-continue-card border border-border rounded-2xl p-5 flex items-center gap-4 shadow-card">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                <Star className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">No bookmark yet</p>
                <p className="text-xs text-muted-foreground">Start reading to save your progress</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 gap-4">
          {navCards.map((card) => (
            <button
              key={card.path}
              onClick={() => navigate({ to: card.path as '/' })}
              className={`bg-gradient-to-br ${card.color} rounded-2xl p-5 flex flex-col items-start gap-3 shadow-card hover:shadow-card-hover transition-all duration-200 active:scale-[0.97] text-white`}
            >
              <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
                {card.icon}
              </div>
              <div>
                <p className="text-base font-bold">{card.label}</p>
                <p className="text-xs opacity-75">{card.sublabel}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Bismillah */}
        <div className="mt-8 text-center">
          <p className="text-2xl font-arabic text-gold-500 leading-loose">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <p className="text-xs text-muted-foreground mt-1">In the name of Allah, the Most Gracious, the Most Merciful</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 px-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Built with{' '}
          <span className="text-gold-500">♥</span>
          {' '}using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || 'quran-app')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-islamic-green-500 hover:text-islamic-green-400 font-medium"
          >
            caffeine.ai
          </a>
          {' '}· © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
