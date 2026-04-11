'use client';

import { motion } from 'framer-motion';
import styles from './WritingSummary.module.css';

export interface WritingSessionSummary {
  hskLevel: number;
  totalCards: number;
  perCard: Array<{ cardId: string; character: string; mistakes: number }>;
}

interface WritingSummaryProps {
  summary: WritingSessionSummary;
  onRestart: () => void;
  onBack: () => void;
}

export default function WritingSummary({ summary, onRestart, onBack }: WritingSummaryProps) {
  const perfect = summary.perCard.filter((c) => c.mistakes === 0).length;
  const okay = summary.perCard.filter((c) => c.mistakes >= 1 && c.mistakes <= 2).length;
  const hard = summary.perCard.filter((c) => c.mistakes > 2).length;
  const totalMistakes = summary.perCard.reduce((s, c) => s + c.mistakes, 0);

  return (
    <div className={styles.view}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
        className={styles.icon}
      >
        ✓
      </motion.div>

      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Отлично!
      </motion.h2>

      <motion.p
        className={styles.subtitle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        Написано {summary.totalCards} иероглифов HSK {summary.hskLevel}
        {totalMistakes > 0 && ` · ${totalMistakes} ошибок всего`}
      </motion.p>

      <motion.div
        className={styles.statsGrid}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className={`${styles.statItem} ${styles.statPerfect}`}>
          <span className={styles.statValue}>{perfect}</span>
          <span className={styles.statLabel}>Идеально</span>
        </div>
        <div className={`${styles.statItem} ${styles.statOkay}`}>
          <span className={styles.statValue}>{okay}</span>
          <span className={styles.statLabel}>1–2 ошибки</span>
        </div>
        <div className={`${styles.statItem} ${styles.statHard}`}>
          <span className={styles.statValue}>{hard}</span>
          <span className={styles.statLabel}>Сложно</span>
        </div>
      </motion.div>

      <motion.div
        className={styles.actions}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <button className={styles.primaryButton} onClick={onRestart}>
          Повторить уровень
        </button>
        <button className={styles.secondaryButton} onClick={onBack}>
          К выбору уровня
        </button>
      </motion.div>
    </div>
  );
}
