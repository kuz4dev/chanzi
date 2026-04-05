import type { GrammarTopic } from '@/types';
import Link from 'next/link';
import styles from './GrammarCard.module.css';

interface GrammarCardProps {
  topic: GrammarTopic;
}

export default function GrammarCard({ topic }: GrammarCardProps) {
  return (
    <Link href={`/grammar/${topic.slug}`} className={styles.card}>
      <div className={styles.level}>HSK {topic.level}</div>
      <h3 className={styles.title}>{topic.title}</h3>
      <p className={styles.description}>{topic.description}</p>
    </Link>
  );
}
