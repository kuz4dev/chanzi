'use client';

import type { Proverb } from '@/types';
import { useSpeech } from '@/hooks/useSpeech';
import styles from './ProverbCard.module.css';

interface ProverbCardProps {
  proverb: Proverb;
}

export default function ProverbCard({ proverb }: ProverbCardProps) {
  const { speak } = useSpeech();

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <button
          className={styles.chars}
          onClick={() => speak(proverb.characters)}
          title="Послушать"
        >
          {proverb.characters}
        </button>
        <span className={styles.pinyin}>{proverb.pinyin}</span>
      </div>
      <p className={styles.literal}>«{proverb.literal}»</p>
      <p className={styles.meaning}>{proverb.meaning}</p>
      <p className={styles.usage}>{proverb.usage}</p>
    </div>
  );
}
