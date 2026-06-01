'use client';

import { Moon, SunMedium } from 'lucide-react';
import { useEffect, useState } from 'react';

import { THEME_STORAGE_KEY, type ThemeMode } from '@/lib/theme';

interface ThemeToggleProps {
  compact?: boolean;
}

export default function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const rootTheme = document.documentElement.dataset.theme;
      if (rootTheme === 'light' || rootTheme === 'dark') {
        setTheme(rootTheme);
      }
      setMounted(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={mounted && theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white/80 text-zinc-700 shadow-sm transition-all duration-300 hover:border-zinc-300 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 ${
        compact ? 'h-10 w-10' : 'h-10 w-10 md:h-9 md:w-9'
      }`}
    >
      {mounted && theme === 'dark' ? (
        <SunMedium className="h-4.5 w-4.5" />
      ) : (
        <Moon className="h-4.5 w-4.5" />
      )}
    </button>
  );
}
