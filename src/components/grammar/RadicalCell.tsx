'use client';

import type { Radical } from '@/types';
import { useSpeech } from '@/hooks/useSpeech';
import styles from './RadicalCell.module.css';

interface RadicalCellProps {
  radical: Radical;
}

export default function RadicalCell({ radical }: RadicalCellProps) {
  const { speak } = useSpeech();

  return (
    <button
      className={styles.cell}
      onClick={() => speak(radical.character)}
      title={`Послушать: ${radical.character}`}
    >
      <span className={styles.number}>{radical.number}</span>
      <span className={styles.char}>{radical.character}</span>
      <span className={styles.pinyin}>{radical.pinyin}</span>
      <span className={styles.meaning}>{radical.meaning}</span>
      {radical.examples.length > 0 && (
        <div className={styles.examples}>{radical.examples.join(' ')}</div>
      )}
    </button>
  );
}
