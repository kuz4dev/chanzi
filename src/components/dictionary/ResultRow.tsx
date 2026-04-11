'use client';

import type { Card } from '@/types';
import styles from './ResultRow.module.css';

interface ResultRowProps {
  card: Card;
  onClick: (card: Card) => void;
}

const TONE_COLORS: Record<number, string> = {
  1: '#2980b9',
  2: '#27ae60',
  3: '#8e44ad',
  4: '#c0392b',
  0: 'var(--color-text-secondary)',
};

export default function ResultRow({ card, onClick }: ResultRowProps) {
  const toneColor = TONE_COLORS[card.tone] ?? TONE_COLORS[0];

  return (
    <button className={styles.row} onClick={() => onClick(card)}>
      <span className={styles.character}>{card.character}</span>
      <span className={styles.info}>
        <span className={styles.pinyin} style={{ color: toneColor }}>
          {card.pinyin}
        </span>
        <span className={styles.translation}>{card.translation}</span>
      </span>
      <span className={styles.hskBadge}>HSK {card.hskLevel}</span>
      <span className={styles.arrow}>›</span>
    </button>
  );
}
