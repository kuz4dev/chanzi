'use client';

import dynamic from 'next/dynamic';
import styles from './page.module.css';

const DictionaryPageClient = dynamic(() => import('./DictionaryPageClient'), {
  ssr: false,
  loading: () => <div className={styles.loading}>Загрузка…</div>,
});

export default function DictionaryPage() {
  return <DictionaryPageClient />;
}
