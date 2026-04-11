'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence, motion, type Transition } from 'framer-motion';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useGetCardsQuery } from '@/services/api/cardsApi';
import { useAppDispatch } from '@/store/hooks';
import { recordWritingAttempt, incrementSessionsCompleted } from '@/store/slices/writingProgressSlice';
import LevelSelector from '@/components/writing/LevelSelector';
import WritingSession from '@/components/writing/WritingSession';
import WritingSummary, { type WritingSessionSummary } from '@/components/writing/WritingSummary';
import type { HskLevel } from '@/types';
import styles from './page.module.css';

type PageMode = 'select' | 'session' | 'summary';

const variants = {
  select: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
  },
  session: {
    initial: { opacity: 0, x: 32 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -32 },
  },
  summary: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
};

const transition: Transition = { duration: 0.25, ease: 'easeInOut' };

export default function WritingPageClient() {
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState<PageMode>('select');
  const [selectedLevel, setSelectedLevel] = useState<HskLevel | null>(null);
  const [summary, setSummary] = useState<WritingSessionSummary | null>(null);

  const { data: cardsData, isLoading: cardsLoading } = useGetCardsQuery(
    selectedLevel ? { hskLevel: selectedLevel } : skipToken
  );

  const handleLevelSelect = useCallback((level: number) => {
    setSelectedLevel(level as HskLevel);
    setMode('session');
  }, []);

  const handleSessionComplete = useCallback(
    (sessionSummary: WritingSessionSummary) => {
      setSummary(sessionSummary);
      dispatch(incrementSessionsCompleted());
      sessionSummary.perCard.forEach(({ cardId, character, mistakes }) => {
        dispatch(recordWritingAttempt({ cardId, character, mistakes }));
      });
      setMode('summary');
    },
    [dispatch]
  );

  const handleRestart = useCallback(() => {
    setSummary(null);
    setMode('session');
  }, []);

  const handleBack = useCallback(() => {
    setSelectedLevel(null);
    setSummary(null);
    setMode('select');
  }, []);

  const cards = cardsData?.data ?? [];

  return (
    <div className={styles.page}>
      <AnimatePresence mode="wait">
        {mode === 'select' && (
          <motion.div key="select" {...variants.select} transition={transition}>
            <h1 className={styles.title}>Письмо</h1>
            <p className={styles.subtitle}>Выберите уровень HSK для практики</p>
            <LevelSelector onSelect={handleLevelSelect} />
          </motion.div>
        )}

        {mode === 'session' && (
          <motion.div key="session" {...variants.session} transition={transition}>
            {cardsLoading || cards.length === 0 ? (
              <p className={styles.loading}>Загрузка иероглифов…</p>
            ) : (
              <WritingSession
                hskLevel={selectedLevel!}
                allCards={cards}
                onComplete={handleSessionComplete}
                onBack={handleBack}
              />
            )}
          </motion.div>
        )}

        {mode === 'summary' && summary && (
          <motion.div
            key="summary"
            {...variants.summary}
            transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
          >
            <WritingSummary
              summary={summary}
              onRestart={handleRestart}
              onBack={handleBack}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
