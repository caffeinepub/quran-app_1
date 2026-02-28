import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Moon, Sun, Info } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function Settings() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

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
            <h1 className="text-lg font-bold text-gold-300">Settings</h1>
            <p className="text-xs text-islamic-green-300">Preferences</p>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 space-y-4">
        {/* Appearance Section */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">Appearance</p>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-islamic-green-600/20 flex items-center justify-center">
                  {isDark ? (
                    <Moon className="w-5 h-5 text-islamic-green-400" />
                  ) : (
                    <Sun className="w-5 h-5 text-gold-500" />
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground cursor-pointer">Dark Mode</Label>
                  <p className="text-xs text-muted-foreground">{isDark ? 'Dark theme active' : 'Light theme active'}</p>
                </div>
              </div>
              <Switch
                checked={isDark}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              />
            </div>
          </div>
        </div>

        {/* Theme Preview */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">Theme Preview</p>
          <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
            <div className="flex gap-3">
              <button
                onClick={() => setTheme('light')}
                className={`flex-1 py-3 rounded-xl border-2 transition-all ${
                  !isDark
                    ? 'border-gold-500 bg-gold-500/10'
                    : 'border-border bg-muted/30 hover:border-border/80'
                }`}
              >
                <Sun className={`w-5 h-5 mx-auto mb-1 ${!isDark ? 'text-gold-500' : 'text-muted-foreground'}`} />
                <p className={`text-xs font-medium ${!isDark ? 'text-gold-500' : 'text-muted-foreground'}`}>Light</p>
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`flex-1 py-3 rounded-xl border-2 transition-all ${
                  isDark
                    ? 'border-gold-500 bg-gold-500/10'
                    : 'border-border bg-muted/30 hover:border-border/80'
                }`}
              >
                <Moon className={`w-5 h-5 mx-auto mb-1 ${isDark ? 'text-gold-500' : 'text-muted-foreground'}`} />
                <p className={`text-xs font-medium ${isDark ? 'text-gold-500' : 'text-muted-foreground'}`}>Dark</p>
              </button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">About</p>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4">
              <div className="w-9 h-9 rounded-lg bg-gold-500/15 flex items-center justify-center">
                <Info className="w-5 h-5 text-gold-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Quran App</p>
                <p className="text-xs text-muted-foreground">Full Quran with Urdu & English translations</p>
              </div>
            </div>
          </div>
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
