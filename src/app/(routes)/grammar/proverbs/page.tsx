import Link from 'next/link';
import proverbsData from '@/mock/proverbs.json';
import type { Proverb } from '@/types';
import ProverbCard from '@/components/grammar/ProverbCard';
import styles from './page.module.css';

export default function ProverbsPage() {
  const proverbs = proverbsData.data as Proverb[];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link href="/grammar" className={styles.backButton}>← Назад</Link>
        <span className={styles.counter}>{proverbs.length} пословиц</span>
      </div>

      <h1 className={styles.title}>Пословицы 谚语</h1>
      <p className={styles.subtitle}>Чэнъюй и поговорки с буквальным и смысловым переводом</p>

      <div className={styles.list}>
        {proverbs.map((proverb) => (
          <ProverbCard key={proverb.id} proverb={proverb} />
        ))}
      </div>
    </div>
  );
}
