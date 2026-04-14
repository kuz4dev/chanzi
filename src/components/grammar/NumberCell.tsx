'use client';

import type { ChineseNumber } from '@/types';
import { useSpeech } from '@/hooks/useSpeech';
import styles from './NumberCell.module.css';

interface NumberCellProps {
  num: ChineseNumber;
}

export default function NumberCell({ num }: NumberCellProps) {
  const { speak } = useSpeech();

  return (
    <button
      className={styles.cell}
      onClick={() => speak(num.character)}
      title={`Послушать: ${num.character}`}
    >
      <span className={styles.char}>{num.character}</span>
      <span className={styles.pinyin}>{num.pinyin}</span>
      <span className={styles.meaning}>{num.meaning}</span>
      {num.examples.length > 0 && (
        <div className={styles.examples}>{num.examples.join(' ')}</div>
      )}
    </button>
  );
}
