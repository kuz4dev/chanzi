'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import styles from './TopBar.module.css';

export default function TopBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
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
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      )}
    </header>
  );
}
