'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Card } from '@/types';
import CharacterPractice from './CharacterPractice';
import type { WritingSessionSummary } from './WritingSummary';
import styles from './WritingSession.module.css';

const SESSION_SIZE = 10;

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

type Phase = 'watch' | 'quiz' | 'result';

interface WritingSessionProps {
  hskLevel: number;
  allCards: Card[];
  onComplete: (summary: WritingSessionSummary) => void;
  onBack: () => void;
}

export default function WritingSession({
  hskLevel,
  allCards,
  onComplete,
  onBack,
}: WritingSessionProps) {
  const [sessionCards] = useState<Card[]>(() =>
    shuffle(allCards).slice(0, SESSION_SIZE)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('watch');
  const [perCardMistakes, setPerCardMistakes] = useState<Array<{ cardId: string; character: string; mistakes: number }>>([]);
  const [currentMistakes, setCurrentMistakes] = useState(0);

  const card = sessionCards[currentIndex];
  const progress = (currentIndex / sessionCards.length) * 100;

  const handleWatchComplete = useCallback(() => {
    setPhase('quiz');
  }, []);

  const handleQuizComplete = useCallback(
    (mistakes: number) => {
      setCurrentMistakes(mistakes);
      setPhase('result');
    },
    []
  );

  const handleNext = useCallback(() => {
    const updatedMistakes = [
      ...perCardMistakes,
      { cardId: card.id, character: card.character, mistakes: currentMistakes },
    ];
    setPerCardMistakes(updatedMistakes);

    if (currentIndex === sessionCards.length - 1) {
      onComplete({
        hskLevel,
        totalCards: sessionCards.length,
        perCard: updatedMistakes,
      });
    } else {
      setCurrentIndex((i) => i + 1);
      setPhase('watch');
      setCurrentMistakes(0);
    }
  }, [card, currentIndex, currentMistakes, hskLevel, onComplete, perCardMistakes, sessionCards.length]);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          ← Назад
        </button>
        <span className={styles.counter}>
          {currentIndex + 1} / {sessionCards.length}
        </span>
      </div>

      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>

      <div className={styles.content}>
        <AnimatePresence mode="wait">
          {phase !== 'result' ? (
            <motion.div
              key={`${card.id}-${phase}`}
              initial={{ opacity: 0, x: phase === 'quiz' ? 20 : 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CharacterPractice
                key={card.id}
                card={card}
                phase={phase}
                onWatchComplete={handleWatchComplete}
                onQuizComplete={handleQuizComplete}
              />
            </motion.div>
          ) : (
            <motion.div
              key={`${card.id}-result`}
              className={styles.resultView}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className={styles.resultIcon}>
                {currentMistakes === 0 ? '🎉' : currentMistakes <= 2 ? '👍' : '💪'}
              </div>
              <div className={styles.resultCharacter}>{card.character}</div>
              <div className={styles.resultScore}>
                {currentMistakes === 0
                  ? 'Идеально!'
                  : `${currentMistakes} ${currentMistakes === 1 ? 'ошибка' : currentMistakes < 5 ? 'ошибки' : 'ошибок'}`}
              </div>
              <button className={styles.nextButton} onClick={handleNext}>
                {currentIndex === sessionCards.length - 1 ? 'Завершить' : 'Далее →'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
