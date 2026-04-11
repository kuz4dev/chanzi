'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import type { Card } from '@/types';
import HanziWriterComponent from './HanziWriter';
import styles from './CharacterPractice.module.css';

const TONE_COLORS: Record<number, string> = {
  1: '#2980b9',
  2: '#27ae60',
  3: '#8e44ad',
  4: '#c0392b',
  0: 'var(--color-text-secondary)',
};

interface CharacterPracticeProps {
  card: Card;
  phase: 'watch' | 'quiz';
  onWatchComplete: () => void;
  onQuizComplete: (mistakes: number) => void;
}

const CANVAS_SIZE = 280;

export default function CharacterPractice({
  card,
  phase,
  onWatchComplete,
  onQuizComplete,
}: CharacterPracticeProps) {
  const handleQuizComplete = useCallback(
    (summary: { character: string; totalMistakes: number }) => {
      onQuizComplete(summary.totalMistakes);
    },
    [onQuizComplete]
  );

  const toneColor = TONE_COLORS[card.tone] ?? TONE_COLORS[0];

  // hanzi-writer only supports single characters
  const singleChar = card.character[0];
  const isWord = card.character.length > 1;

  return (
    <div className={styles.root}>
      <motion.div
        className={styles.infoPanel}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {isWord && (
          <span className={styles.wordText}>{card.character}</span>
        )}
        <span className={styles.pinyinText} style={{ color: toneColor }}>
          {card.pinyin}
        </span>
        <span className={styles.translationText}>{card.translation}</span>
      </motion.div>

      <div className={styles.canvasWrapper}>
        <motion.div
          key={phase}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <HanziWriterComponent
            character={singleChar}
            mode={phase === 'watch' ? 'animate' : 'quiz'}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            onAnimationComplete={phase === 'watch' ? onWatchComplete : undefined}
            onQuizComplete={phase === 'quiz' ? handleQuizComplete : undefined}
          />
        </motion.div>

        <div className={styles.phaseLabel}>
          {phase === 'watch' ? (
            <span className={`${styles.phasePill} ${styles.pillWatch}`}>Смотри</span>
          ) : (
            <span className={`${styles.phasePill} ${styles.pillQuiz}`}>Пиши</span>
          )}
        </div>
      </div>

      {phase === 'watch' && (
        <motion.button
          className={styles.primaryButton}
          onClick={onWatchComplete}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.25 }}
        >
          Начать писать
        </motion.button>
      )}

      {phase === 'quiz' && (
        <motion.p
          className={styles.hintText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Рисуй черты в правильном порядке
        </motion.p>
      )}
    </div>
  );
}
