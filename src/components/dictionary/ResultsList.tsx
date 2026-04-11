'use client';

import type { Card } from '@/types';
import ResultRow from './ResultRow';
import styles from './ResultsList.module.css';

interface ResultsListProps {
  cards: Card[];
  total: number;
  onSelect: (card: Card) => void;
}

export default function ResultsList({ cards, total, onSelect }: ResultsListProps) {
  const isCapped = total > cards.length;

  return (
    <div className={styles.root}>
      <p className={styles.count}>
        {isCapped
          ? `Показано ${cards.length} из ${total} совпадений`
          : `Найдено: ${total}`}
      </p>
      <div className={styles.list}>
        {cards.map((card) => (
          <ResultRow key={card.id} card={card} onClick={onSelect} />
        ))}
      </div>
      {isCapped && (
        <p className={styles.hint}>Уточните запрос, чтобы увидеть больше результатов</p>
      )}
    </div>
  );
}
