'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import styles from './TopBar.module.css';

const THEME_CYCLE: Record<string, { next: string; icon: string }> = {
  light: { next: 'dark', icon: '☾' },
  dark: { next: 'ink', icon: '墨' },
  ink: { next: 'light', icon: '☀' },
};

export default function TopBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const current = theme ?? 'light';
    setTheme(THEME_CYCLE[current]?.next ?? 'dark');
  };

  return (
    <header className={styles.topBar}>
      <span className={styles.logo}>ChànZì</span>
      {mounted && (
        <button
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label="Переключить тему"
        >
          {THEME_CYCLE[theme ?? 'light']?.icon ?? '☾'}
        </button>
      )}
    </header>
  );
}
