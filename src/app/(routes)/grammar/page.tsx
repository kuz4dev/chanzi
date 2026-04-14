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
