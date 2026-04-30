'use client';

import { useSpeech } from '@/hooks/useSpeech';
import styles from './ToneCard.module.css';

interface ToneCardProps {
  tone: number;
  diacritic: string;
  color: string;
  character: string;
  pinyin: string;
  meaning: string;
}

const CONTOURS: Record<number, string> = {
  1: 'M 6 10 L 58 10',
  2: 'M 6 26 L 58 6',
  3: 'M 6 10 Q 20 30 32 26 Q 44 22 58 10',
  4: 'M 6 6 L 58 26',
  0: 'M 26 18 L 38 18',
};

export default function ToneCard({ tone, diacritic, color, character, pinyin, meaning }: ToneCardProps) {
  const { speak } = useSpeech();

  return (
    <button
      className={styles.card}
      style={{ '--tone-color': color } as React.CSSProperties}
      onClick={() => speak(character)}
      title={`Послушать: ${character}`}
    >
      <svg className={styles.contour} viewBox="0 0 64 32" fill="none">
        <path
          d={CONTOURS[tone] ?? CONTOURS[0]}
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <span className={styles.number}>{tone === 0 ? '中性' : `${tone}声`}</span>
      <span className={styles.diacritic}>{diacritic}</span>
      <span className={styles.char}>{character}</span>
      <span className={styles.pinyin}>{pinyin}</span>
      <span className={styles.meaning}>{meaning}</span>
    </button>
  );
}
