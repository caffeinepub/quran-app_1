import { useNavigate } from '@tanstack/react-router';
import { ChevronLeft, Moon, Sun, Sunrise, Sunset, Clock } from 'lucide-react';

interface DayPrayerTimes {
  day: number;
  suhoor: string;
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

// Static Ramadan prayer times (representative times for a mid-latitude city, e.g. Mecca/Medina region)
const ramadanPrayerTimes: DayPrayerTimes[] = [
  { day: 1,  suhoor: '4:42', fajr: '5:02', dhuhr: '12:18', asr: '15:42', maghrib: '18:28', isha: '19:58' },
  { day: 2,  suhoor: '4:41', fajr: '5:01', dhuhr: '12:18', asr: '15:42', maghrib: '18:29', isha: '19:59' },
  { day: 3,  suhoor: '4:40', fajr: '5:00', dhuhr: '12:18', asr: '15:43', maghrib: '18:30', isha: '20:00' },
  { day: 4,  suhoor: '4:39', fajr: '4:59', dhuhr: '12:17', asr: '15:43', maghrib: '18:30', isha: '20:00' },
  { day: 5,  suhoor: '4:38', fajr: '4:58', dhuhr: '12:17', asr: '15:44', maghrib: '18:31', isha: '20:01' },
  { day: 6,  suhoor: '4:37', fajr: '4:57', dhuhr: '12:17', asr: '15:44', maghrib: '18:32', isha: '20:02' },
  { day: 7,  suhoor: '4:36', fajr: '4:56', dhuhr: '12:17', asr: '15:45', maghrib: '18:32', isha: '20:02' },
  { day: 8,  suhoor: '4:35', fajr: '4:55', dhuhr: '12:17', asr: '15:45', maghrib: '18:33', isha: '20:03' },
  { day: 9,  suhoor: '4:34', fajr: '4:54', dhuhr: '12:16', asr: '15:46', maghrib: '18:34', isha: '20:04' },
  { day: 10, suhoor: '4:33', fajr: '4:53', dhuhr: '12:16', asr: '15:46', maghrib: '18:34', isha: '20:04' },
  { day: 11, suhoor: '4:32', fajr: '4:52', dhuhr: '12:16', asr: '15:47', maghrib: '18:35', isha: '20:05' },
  { day: 12, suhoor: '4:31', fajr: '4:51', dhuhr: '12:16', asr: '15:47', maghrib: '18:36', isha: '20:06' },
  { day: 13, suhoor: '4:30', fajr: '4:50', dhuhr: '12:16', asr: '15:48', maghrib: '18:36', isha: '20:06' },
  { day: 14, suhoor: '4:29', fajr: '4:49', dhuhr: '12:15', asr: '15:48', maghrib: '18:37', isha: '20:07' },
  { day: 15, suhoor: '4:28', fajr: '4:48', dhuhr: '12:15', asr: '15:49', maghrib: '18:38', isha: '20:08' },
  { day: 16, suhoor: '4:27', fajr: '4:47', dhuhr: '12:15', asr: '15:49', maghrib: '18:38', isha: '20:08' },
  { day: 17, suhoor: '4:26', fajr: '4:46', dhuhr: '12:15', asr: '15:50', maghrib: '18:39', isha: '20:09' },
  { day: 18, suhoor: '4:25', fajr: '4:45', dhuhr: '12:15', asr: '15:50', maghrib: '18:40', isha: '20:10' },
  { day: 19, suhoor: '4:24', fajr: '4:44', dhuhr: '12:14', asr: '15:51', maghrib: '18:40', isha: '20:10' },
  { day: 20, suhoor: '4:23', fajr: '4:43', dhuhr: '12:14', asr: '15:51', maghrib: '18:41', isha: '20:11' },
  { day: 21, suhoor: '4:22', fajr: '4:42', dhuhr: '12:14', asr: '15:52', maghrib: '18:42', isha: '20:12' },
  { day: 22, suhoor: '4:21', fajr: '4:41', dhuhr: '12:14', asr: '15:52', maghrib: '18:42', isha: '20:12' },
  { day: 23, suhoor: '4:20', fajr: '4:40', dhuhr: '12:14', asr: '15:53', maghrib: '18:43', isha: '20:13' },
  { day: 24, suhoor: '4:19', fajr: '4:39', dhuhr: '12:13', asr: '15:53', maghrib: '18:44', isha: '20:14' },
  { day: 25, suhoor: '4:18', fajr: '4:38', dhuhr: '12:13', asr: '15:54', maghrib: '18:44', isha: '20:14' },
  { day: 26, suhoor: '4:17', fajr: '4:37', dhuhr: '12:13', asr: '15:54', maghrib: '18:45', isha: '20:15' },
  { day: 27, suhoor: '4:16', fajr: '4:36', dhuhr: '12:13', asr: '15:55', maghrib: '18:46', isha: '20:16' },
  { day: 28, suhoor: '4:15', fajr: '4:35', dhuhr: '12:13', asr: '15:55', maghrib: '18:46', isha: '20:16' },
  { day: 29, suhoor: '4:14', fajr: '4:34', dhuhr: '12:12', asr: '15:56', maghrib: '18:47', isha: '20:17' },
  { day: 30, suhoor: '4:13', fajr: '4:33', dhuhr: '12:12', asr: '15:56', maghrib: '18:48', isha: '20:18' },
];

interface PrayerEntry {
  key: keyof Omit<DayPrayerTimes, 'day'>;
  arabic: string;
  english: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

const prayers: PrayerEntry[] = [
  { key: 'suhoor',  arabic: 'سُحُور',  english: 'Suhoor',         icon: <Moon className="w-3.5 h-3.5" />,    highlight: true },
  { key: 'fajr',   arabic: 'فَجْر',   english: 'Fajr',           icon: <Sunrise className="w-3.5 h-3.5" /> },
  { key: 'dhuhr',  arabic: 'ظُهْر',   english: 'Dhuhr',          icon: <Sun className="w-3.5 h-3.5" /> },
  { key: 'asr',    arabic: 'عَصْر',   english: 'Asr',            icon: <Clock className="w-3.5 h-3.5" /> },
  { key: 'maghrib',arabic: 'مَغْرِب', english: 'Maghrib / Iftar', icon: <Sunset className="w-3.5 h-3.5" />,  highlight: true },
  { key: 'isha',   arabic: 'عِشَاء',  english: 'Isha',           icon: <Moon className="w-3.5 h-3.5" /> },
];

export default function PrayerTimings() {
  const navigate = useNavigate();

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
        <div className="relative px-4 pt-10 pb-6">
          <button
            onClick={() => navigate({ to: '/' })}
            className="flex items-center gap-2 text-gold-300 hover:text-gold-200 transition-colors mb-4"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Home</span>
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gold-300 font-arabic mb-1">مَوَاقِيتُ الصَّلَاة</h1>
            <p className="text-islamic-green-200 text-sm tracking-widest uppercase font-medium">Ramadan Prayer Timings</p>
            <p className="text-islamic-green-300/70 text-xs mt-1">30 Days · Reference Times</p>
          </div>
        </div>
      </header>

      {/* Prayer key legend */}
      <div className="px-4 pt-4 pb-2">
        <div className="bg-card border border-border rounded-2xl p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Prayer Times Key</p>
          <div className="grid grid-cols-3 gap-2">
            {prayers.map((p) => (
              <div key={p.key} className="flex items-center gap-1.5">
                <span className={`flex-shrink-0 ${p.highlight ? 'text-gold-500' : 'text-islamic-green-500'}`}>
                  {p.icon}
                </span>
                <div>
                  <span className="text-xs font-medium text-foreground">{p.english}</span>
                  <span className="block text-xs font-arabic text-muted-foreground leading-tight">{p.arabic}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Days list */}
      <main className="px-4 pb-10 pt-2 space-y-3">
        {ramadanPrayerTimes.map((day) => (
          <div
            key={day.day}
            className="bg-card border border-border rounded-2xl overflow-hidden shadow-card"
          >
            {/* Day header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-islamic-green-700/10 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-islamic-green-600 flex items-center justify-center shadow-xs">
                  <span className="text-xs font-bold text-white">{day.day}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Day {day.day}</p>
                  <p className="text-xs text-muted-foreground font-arabic">اليوم {day.day}</p>
                </div>
              </div>
              {/* Suhoor & Iftar highlight */}
              <div className="flex items-center gap-3 text-right">
                <div>
                  <p className="text-xs text-muted-foreground">Suhoor</p>
                  <p className="text-sm font-bold text-gold-500">{day.suhoor}</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div>
                  <p className="text-xs text-muted-foreground">Iftar</p>
                  <p className="text-sm font-bold text-gold-500">{day.maghrib}</p>
                </div>
              </div>
            </div>

            {/* Prayer times grid */}
            <div className="grid grid-cols-3 divide-x divide-y divide-border">
              {prayers.map((prayer) => (
                <div
                  key={prayer.key}
                  className={`px-3 py-2.5 flex flex-col items-center gap-0.5 ${
                    prayer.highlight
                      ? 'bg-gold-500/5'
                      : ''
                  }`}
                >
                  <div className={`flex items-center gap-1 ${prayer.highlight ? 'text-gold-500' : 'text-islamic-green-500'}`}>
                    {prayer.icon}
                    <span className="text-xs font-medium">{prayer.english.split(' /')[0]}</span>
                  </div>
                  <span className="text-xs font-arabic text-muted-foreground">{prayer.arabic}</span>
                  <span className="text-sm font-bold text-foreground mt-0.5">{day[prayer.key]}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
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
