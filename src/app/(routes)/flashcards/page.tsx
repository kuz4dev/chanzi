'use client';

import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion, type Transition } from 'framer-motion';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useGetDecksQuery, useGetCardsQuery } from '@/services/api/cardsApi';
import { useFlashcard } from '@/hooks/useFlashcard';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addSession } from '@/store/slices/progressSlice';
import { isDue } from '@/lib/sm2';
import FlashCardDeck from '@/components/flashcard/FlashCardDeck';
import DeckCard, { DeckCardSkeleton } from '@/components/flashcard/DeckCard';
import type { Deck, Rating } from '@/types';
import styles from './page.module.css';

type Mode = 'select' | 'study' | 'complete';

interface SessionRatings {
  easy: number;
  repeat: number;
  hard: number;
}

const variants = {
  select: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
  },
  study: {
    initial: { opacity: 0, x: 32 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -32 },
  },
  complete: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
};

const transition: Transition = { duration: 0.25, ease: 'easeInOut' };

export default function FlashcardsPage() {
  const dispatch = useAppDispatch();
  const srsCards = useAppSelector((state) => state.srs.cards);

  const [mode, setMode] = useState<Mode>('select');
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  const [sessionRatings, setSessionRatings] = useState<SessionRatings>({
    easy: 0,
    repeat: 0,
    hard: 0,
  });

  const { data: decksData, isLoading: decksLoading } = useGetDecksQuery();
  const { data: cardsData } = useGetCardsQuery(
    selectedDeck ? { deckId: selectedDeck.id } : skipToken
  );

  const {
    cards,
    currentIndex,
    isFlipped,
    handleFlip,
    handleRate,
    loadCards,
    reset,
    handleShuffle,
  } = useFlashcard();

  useEffect(() => {
    if (cardsData?.data && cardsData.data.length > 0) {
      const srsMap = new Map(srsCards.map((c) => [c.cardId, c]));
      const sorted = [...cardsData.data].sort((a, b) => {
        const aDue = !srsMap.has(a.id) || isDue(srsMap.get(a.id)!);
        const bDue = !srsMap.has(b.id) || isDue(srsMap.get(b.id)!);
        if (aDue === bDue) return 0;
        return aDue ? -1 : 1;
      });
      loadCards(sorted);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardsData]);

  const handleDeckSelect = useCallback(
    (deck: Deck) => {
      setSelectedDeck(deck);
      setSessionRatings({ easy: 0, repeat: 0, hard: 0 });
      reset();
      setMode('study');
    },
    [reset]
  );

  const handleRateWithCompletion = useCallback(
    (rating: Rating) => {
      const isLastCard = cards.length > 0 && currentIndex === cards.length - 1;

      setSessionRatings((prev) => ({ ...prev, [rating]: prev[rating] + 1 }));
      handleRate(rating);

      if (isLastCard && selectedDeck) {
        dispatch(
          addSession({
            deckId: selectedDeck.id,
            date: Date.now(),
            cardsReviewed: cards.length,
          })
        );
        setMode('complete');
      }
    },
    [cards.length, currentIndex, handleRate, dispatch, selectedDeck]
  );

  const handleReturnToSelect = useCallback(() => {
    setSelectedDeck(null);
    setSessionRatings({ easy: 0, repeat: 0, hard: 0 });
    reset();
    setMode('select');
  }, [reset]);

  const decks = decksData?.data ?? [];
  const thematicDecks = decks.filter((d) => !d.id.startsWith('hsk-level-'));
  const hskDecks = decks.filter((d) => d.id.startsWith('hsk-level-'));

  const getDueCount = (deck: (typeof decks)[0]) => {
    const srsMap = new Map(srsCards.map((c) => [c.cardId, c]));
    return deck.cardIds.filter((id) => {
      const srs = srsMap.get(id);
      return !srs || isDue(srs);
    }).length;
  };
  const totalCards =
    sessionRatings.easy + sessionRatings.repeat + sessionRatings.hard;

  return (
    <div className={styles.page}>
      <AnimatePresence mode="wait">
        {mode === 'select' && (
          <motion.div
            key="select"
            {...variants.select}
            transition={transition}
          >
            <h1 className={styles.title}>Карточки</h1>
            <p className={styles.subtitle}>Выберите колоду для изучения</p>

            {decksLoading ? (
              <div className={styles.deckGrid}>
                {Array.from({ length: 4 }, (_, i) => <DeckCardSkeleton key={i} />)}
              </div>
            ) : (
              <>
                {thematicDecks.length > 0 && (
                  <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Тематические колоды</h2>
                    <div className={styles.deckGrid}>
                      {thematicDecks.map((deck) => (
                        <DeckCard key={deck.id} deck={deck} onClick={handleDeckSelect} dueCount={getDueCount(deck)} />
                      ))}
                    </div>
                  </section>
                )}
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>По уровням HSK</h2>
                  <div className={styles.deckGrid}>
                    {hskDecks.map((deck) => (
                      <DeckCard key={deck.id} deck={deck} onClick={handleDeckSelect} dueCount={getDueCount(deck)} />
                    ))}
                  </div>
                </section>
              </>
            )}
          </motion.div>
        )}

        {mode === 'study' && (
          <motion.div
            key="study"
            {...variants.study}
            transition={transition}
          >
            <div className={styles.studyHeader}>
              <button
                className={styles.backButton}
                onClick={handleReturnToSelect}
              >
                ← Назад
              </button>
              <span className={styles.deckTitle}>{selectedDeck?.title}</span>
              <button
                className={styles.shuffleButton}
                onClick={handleShuffle}
                title="Перемешать"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 3 21 3 21 8"/>
                  <line x1="4" y1="20" x2="21" y2="3"/>
                  <polyline points="21 16 21 21 16 21"/>
                  <line x1="15" y1="15" x2="21" y2="21"/>
                </svg>
              </button>
            </div>

            {cards.length === 0 ? (
              <p className={styles.loading}>Загрузка карточек…</p>
            ) : (
              <FlashCardDeck
                cards={cards}
                currentIndex={currentIndex}
                isFlipped={isFlipped}
                onFlip={handleFlip}
                onRate={handleRateWithCompletion}
              />
            )}
          </motion.div>
        )}

        {mode === 'complete' && (
          <motion.div
            key="complete"
            {...variants.complete}
            transition={{ duration: 0.3, ease: [0.0, 0.0, 0.2, 1] }}
          >
            <div className={styles.completeView}>
              <div className={styles.completeIcon}>✓</div>
              <h2 className={styles.completeTitle}>Отлично!</h2>
              <p className={styles.completeSubtitle}>
                Вы изучили {totalCards} карточек из колоды «{selectedDeck?.title}»
              </p>

              <div className={styles.statsGrid}>
                <div className={`${styles.statItem} ${styles.statEasy}`}>
                  <span className={styles.statValue}>{sessionRatings.easy}</span>
                  <span className={styles.statLabel}>Легко</span>
                </div>
                <div className={`${styles.statItem} ${styles.statRepeat}`}>
                  <span className={styles.statValue}>
                    {sessionRatings.repeat}
                  </span>
                  <span className={styles.statLabel}>Повторить</span>
                </div>
                <div className={`${styles.statItem} ${styles.statHard}`}>
                  <span className={styles.statValue}>{sessionRatings.hard}</span>
                  <span className={styles.statLabel}>Сложно</span>
                </div>
              </div>

              <button
                className={styles.returnButton}
                onClick={handleReturnToSelect}
              >
                К списку колод
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
