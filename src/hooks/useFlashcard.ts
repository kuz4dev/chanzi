'use client';

import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  flipCard,
  nextCard,
  prevCard,
  resetDeck,
  setCards,
  shuffleCards,
} from '@/store/slices/cardsSlice';
import { recordRating } from '@/store/slices/progressSlice';
import { updateSrsCard } from '@/store/slices/srsSlice';
import type { Card, Rating } from '@/types';

export function useFlashcard() {
  const dispatch = useAppDispatch();
  const { cards, currentIndex, isFlipped, status } = useAppSelector(
    (state) => state.cards
  );

  const currentCard: Card | undefined = cards[currentIndex];

  const handleFlip = useCallback(() => {
    dispatch(flipCard());
  }, [dispatch]);

  const handleNext = useCallback(() => {
    dispatch(nextCard());
  }, [dispatch]);

  const handlePrev = useCallback(() => {
    dispatch(prevCard());
  }, [dispatch]);

  const handleRate = useCallback(
    (rating: Rating) => {
      if (currentCard) {
        dispatch(recordRating({ cardId: currentCard.id, rating }));
        dispatch(updateSrsCard({ cardId: currentCard.id, rating }));
        dispatch(nextCard());
      }
    },
    [dispatch, currentCard]
  );

  const loadCards = useCallback(
    (newCards: Card[]) => {
      dispatch(setCards(newCards));
    },
    [dispatch]
  );

  const reset = useCallback(() => {
    dispatch(resetDeck());
  }, [dispatch]);

  const handleShuffle = useCallback(() => {
    dispatch(shuffleCards());
  }, [dispatch]);

  return {
    cards,
    currentCard,
    currentIndex,
    isFlipped,
    status,
    handleFlip,
    handleNext,
    handlePrev,
    handleRate,
    loadCards,
    reset,
    handleShuffle,
  };
}
