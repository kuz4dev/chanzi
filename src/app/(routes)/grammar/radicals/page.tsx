import Link from 'next/link';
import radicalsData from '@/mock/radicals.json';
import type { Radical } from '@/types';
import RadicalCell from '@/components/grammar/RadicalCell';
import styles from './page.module.css';

const radicals = radicalsData.data as Radical[];

export default function RadicalsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link href="/grammar" className={styles.backButton}>← Назад</Link>
        <span className={styles.counter}>{radicals.length} ключей</span>
      </div>

      <h1 className={styles.title}>Ключи 部首</h1>
      <p className={styles.subtitle}>214 ключей словаря Канси — нажмите на любой, чтобы услышать</p>

      <div className={styles.grid}>
        {radicals.map((radical) => (
          <RadicalCell key={radical.number} radical={radical} />
        ))}
      </div>
    </div>
  );
}
