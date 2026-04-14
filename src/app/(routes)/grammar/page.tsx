import Link from 'next/link';
import grammarData from '@/mock/grammar.json';
import type { GrammarTopic } from '@/types';
import GrammarCard from '@/components/grammar/GrammarCard';
import styles from './page.module.css';

export default function GrammarPage() {
  const topics = grammarData.data as GrammarTopic[];
  const levels = [...new Set(topics.map((t) => t.level))].sort();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Грамматика</h1>
      <p className={styles.subtitle}>Изучайте грамматические конструкции китайского языка</p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Справочники</h2>
        <div className={styles.refGrid}>
          <Link href="/grammar/radicals" className={styles.refCard}>
            <span className={styles.refIcon}>部</span>
            <div>
              <p className={styles.refTitle}>Ключи 部首</p>
              <p className={styles.refDesc}>214 ключей Канси с пиньинь и примерами</p>
            </div>
          </Link>
          <Link href="/grammar/proverbs" className={styles.refCard}>
            <span className={styles.refIcon}>谚</span>
            <div>
              <p className={styles.refTitle}>Пословицы 谚语</p>
              <p className={styles.refDesc}>Чэнъюй и поговорки с переводом</p>
            </div>
          </Link>
          <Link href="/grammar/numbers" className={styles.refCard}>
            <span className={styles.refIcon}>数</span>
            <div>
              <p className={styles.refTitle}>Числа 数字</p>
              <p className={styles.refDesc}>Цифры 0–10 и правила образования чисел</p>
            </div>
          </Link>
        </div>
      </section>

      {levels.map((level) => {
        const levelTopics = topics.filter((t) => t.level === level);
        return (
          <section key={level} className={styles.section}>
            <h2 className={styles.sectionTitle}>
              HSK {level}
              <span className={styles.count}>{levelTopics.length}</span>
            </h2>
            <div className={styles.grid}>
              {levelTopics.map((topic) => (
                <GrammarCard key={topic.slug} topic={topic} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
