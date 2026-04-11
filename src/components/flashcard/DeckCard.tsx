import type { Deck } from '@/types';
import styles from './DeckCard.module.css';

interface DeckCardProps {
  deck: Deck;
  onClick: (deck: Deck) => void;
  dueCount?: number;
}

export default function DeckCard({ deck, onClick, dueCount }: DeckCardProps) {
  const allDone = dueCount === 0;

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
        {allDone && (
          <span className={`${styles.badge} ${styles.badgeDone}`}>
            ✓ На сегодня всё
          </span>
        )}
        {dueCount !== undefined && dueCount > 0 && (
          <span className={`${styles.badge} ${styles.badgeDue}`}>
            {dueCount} к повторению
          </span>
        )}
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
