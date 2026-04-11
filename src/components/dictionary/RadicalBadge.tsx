'use client';

import type { RadicalInfo } from '@/data/radicalMap';
import styles from './RadicalBadge.module.css';

interface RadicalBadgeProps {
  radStrokeCount: number | null;
  totalStrokes: number | null;
  radicalInfo: RadicalInfo | null;
  isLoading: boolean;
}

export default function RadicalBadge({
  radStrokeCount,
  totalStrokes,
  radicalInfo,
  isLoading,
}: RadicalBadgeProps) {
  if (isLoading) {
    return <div className={`${styles.root} ${styles.skeleton}`} />;
  }

  // No radical data from CDN at all — don't show anything
  if (radStrokeCount === null) return null;

  return (
    <div className={styles.root}>
      <div className={styles.label}>Радикал</div>
      <div className={styles.content}>
        {radicalInfo ? (
          <>
            <span className={styles.radicalChar}>{radicalInfo.character}</span>
            <span className={styles.meaning}>{radicalInfo.meaning}</span>
            <span className={styles.dot}>·</span>
            <span className={styles.strokes}>
              {radStrokeCount} из {totalStrokes} черт
            </span>
          </>
        ) : (
          <>
            <span className={styles.highlightNote}>выделен в анимации</span>
            <span className={styles.dot}>·</span>
            <span className={styles.strokes}>
              {radStrokeCount} из {totalStrokes} черт
            </span>
          </>
        )}
      </div>
    </div>
  );
}
