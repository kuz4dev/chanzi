'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion, type Transition } from 'framer-motion';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useGetCardsQuery } from '@/services/api/cardsApi';
import SearchInput from '@/components/dictionary/SearchInput';
import ResultsList from '@/components/dictionary/ResultsList';
import CardDetail from '@/components/dictionary/CardDetail';
import type { Card } from '@/types';
import styles from './page.module.css';

type PageMode = 'search' | 'detail';

const variants = {
  search: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
  },
  detail: {
    initial: { opacity: 0, x: 32 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -32 },
  },
};

const transition: Transition = { duration: 0.25, ease: 'easeInOut' };

export default function DictionaryPageClient() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const mode: PageMode = selectedCard ? 'detail' : 'search';

  // Debounce query by 300ms
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const { data, isLoading, isFetching } = useGetCardsQuery(
    debouncedQuery.trim() ? { search: debouncedQuery.trim() } : skipToken
  );

  const handleSelect = useCallback((card: Card) => {
    setSelectedCard(card);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedCard(null);
  }, []);

  const handleClear = useCallback(() => {
    setQuery('');
    setDebouncedQuery('');
  }, []);

  const cards = data?.data ?? [];
  const total = data?.meta.total ?? 0;

  return (
    <div className={styles.page}>
      <AnimatePresence mode="wait">
        {mode === 'search' && (
          <motion.div key="search" {...variants.search} transition={transition}>
            <h1 className={styles.title}>Словарь</h1>
            <p className={styles.subtitle}>Иероглиф, пиньинь или перевод</p>

            <SearchInput
              value={query}
              onChange={setQuery}
              onClear={handleClear}
              isLoading={isFetching}
            />

            {!debouncedQuery.trim() ? (
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>典</span>
                <p className={styles.emptyText}>
                  Введите запрос для поиска по {'>'}5000 иероглифов HSK 1–6
                </p>
              </div>
            ) : isLoading ? (
              <div className={styles.skeletonList}>
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className={styles.skeletonRow} />
                ))}
              </div>
            ) : cards.length === 0 ? (
              <p className={styles.noResults}>Ничего не найдено по запросу «{debouncedQuery}»</p>
            ) : (
              <ResultsList cards={cards} total={total} onSelect={handleSelect} />
            )}
          </motion.div>
        )}

        {mode === 'detail' && selectedCard && (
          <motion.div key="detail" {...variants.detail} transition={transition}>
            <CardDetail card={selectedCard} onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
