import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft, RotateCcw } from 'lucide-react';

const STORAGE_KEY = 'tasbeeh_count';
const TASBEEH_LABELS = ['سُبْحَانَ اللَّه', 'الْحَمْدُ لِلَّه', 'اللَّهُ أَكْبَر'];
const TASBEEH_ENGLISH = ['SubhanAllah', 'Alhamdulillah', 'Allahu Akbar'];
const TARGET = 33;

export default function TasbeehCounter() {
  const navigate = useNavigate();
  const [count, setCount] = useState<number>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? parseInt(stored, 10) : 0;
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [ripple, setRipple] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(count));
  }, [count]);

  const handleTap = () => {
    setCount((c) => c + 1);
    setRipple(true);
    setTimeout(() => setRipple(false), 300);
    // Cycle through tasbeeh at every 33
    if ((count + 1) % TARGET === 0) {
      setActiveIndex((i) => (i + 1) % TASBEEH_LABELS.length);
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  const progress = count % TARGET;
  const progressPercent = (progress / TARGET) * 100;
  const cycles = Math.floor(count / TARGET);

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
            <h1 className="text-lg font-bold text-gold-300">Tasbeeh Counter</h1>
            <p className="text-xs text-islamic-green-300">Digital Dhikr</p>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-8">
        {/* Current Tasbeeh */}
        <div className="text-center">
          <p className="text-3xl font-arabic text-gold-400 leading-loose mb-1">
            {TASBEEH_LABELS[activeIndex]}
          </p>
          <p className="text-sm text-muted-foreground">{TASBEEH_ENGLISH[activeIndex]}</p>
        </div>

        {/* Counter Display */}
        <div className="relative">
          {/* Progress Ring */}
          <svg className="w-56 h-56 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r="44"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-border"
            />
            <circle
              cx="50" cy="50" r="44"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 44}`}
              strokeDashoffset={`${2 * Math.PI * 44 * (1 - progressPercent / 100)}`}
              className="text-gold-500 transition-all duration-300"
            />
          </svg>
          {/* Tap Button */}
          <button
            onClick={handleTap}
            className={`absolute inset-4 rounded-full bg-gradient-to-br from-islamic-green-600 to-islamic-green-800 flex flex-col items-center justify-center shadow-xl transition-all duration-150 active:scale-95 select-none ${
              ripple ? 'scale-95 brightness-110' : ''
            }`}
          >
            <span className="text-5xl font-bold text-white">{count}</span>
            <span className="text-xs text-islamic-green-200 mt-1">Tap to count</span>
          </button>
        </div>

        {/* Progress Info */}
        <div className="flex items-center gap-6 text-center">
          <div>
            <p className="text-2xl font-bold text-foreground">{progress}</p>
            <p className="text-xs text-muted-foreground">Current</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div>
            <p className="text-2xl font-bold text-gold-500">{TARGET}</p>
            <p className="text-xs text-muted-foreground">Target</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div>
            <p className="text-2xl font-bold text-islamic-green-500">{cycles}</p>
            <p className="text-xs text-muted-foreground">Cycles</p>
          </div>
        </div>

        {/* Tasbeeh Selector */}
        <div className="flex gap-2">
          {TASBEEH_LABELS.map((label, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeIndex === i
                  ? 'bg-gold-500 text-white'
                  : 'bg-card border border-border text-muted-foreground hover:border-gold-500/50'
              }`}
            >
              {TASBEEH_ENGLISH[i]}
            </button>
          ))}
        </div>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-muted-foreground hover:text-destructive hover:border-destructive/50 transition-colors text-sm font-medium"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Counter
        </button>
      </main>
    </div>
  );
}
