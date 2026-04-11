'use client';

import dynamic from 'next/dynamic';
import styles from './page.module.css';

const WritingPageClient = dynamic(() => import('./WritingPageClient'), {
  ssr: false,
  loading: () => <div className={styles.loading}>Загрузка…</div>,
});

export default function WritingPage() {
  return <WritingPageClient />;
}
