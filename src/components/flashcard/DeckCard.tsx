import type { Deck } from '@/types';
import styles from './DeckCard.module.css';

interface DeckCardProps {
  deck: Deck;
  onClick: (deck: Deck) => void;
}

export default function DeckCard({ deck, onClick }: DeckCardProps) {
  return (
    <button className={styles.card} onClick={() => onClick(deck)}>
      <span className={styles.coverCharacter}>{deck.coverCharacter}</span>
      <h3 className={styles.title}>{deck.title}</h3>
      <p className={styles.description}>{deck.description}</p>
      <div className={styles.badges}>
        <span className={`${styles.badge} ${styles.badgePrimary}`}>
          HSK {deck.hskLevel}
        </span>
        <span className={styles.badge}>
          {deck.cardIds.length} карточек
        </span>
      </div>
    </button>
  );
}

export function DeckCardSkeleton() {
  return (
    <div className={styles.skeleton}>
      <span className={`${styles.skeletonLine} ${styles.skeletonChar}`} />
      <span className={`${styles.skeletonLine} ${styles.skeletonTitle}`} />
      <span className={`${styles.skeletonLine} ${styles.skeletonDesc}`} />
      <span className={`${styles.skeletonLine} ${styles.skeletonDescShort}`} />
      <div className={styles.skeletonBadges}>
        <span className={`${styles.skeletonLine} ${styles.skeletonBadge}`} />
        <span className={`${styles.skeletonLine} ${styles.skeletonBadge}`} />
      </div>
    </div>
  );
}
