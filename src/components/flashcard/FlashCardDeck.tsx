import type { Card, Rating } from '@/types';
import FlashCard from './FlashCard';
import styles from './FlashCardDeck.module.css';

interface FlashCardDeckProps {
  cards: Card[];
  currentIndex: number;
  isFlipped: boolean;
  onFlip: () => void;
  onRate: (rating: Rating) => void;
}

export default function FlashCardDeck({
  cards,
  currentIndex,
  isFlipped,
  onFlip,
  onRate,
}: FlashCardDeckProps) {
  const card = cards[currentIndex];

  if (!card) return null;

  return (
    <div className={styles.deck}>
      <div className={styles.counter}>
        {currentIndex + 1} / {cards.length}
      </div>
      {/* key={card.id} ensures fresh motion values on every new card */}
      <FlashCard
        key={card.id}
        card={card}
        isFlipped={isFlipped}
        onFlip={onFlip}
        onRate={onRate}
      />
    </div>
  );
}
