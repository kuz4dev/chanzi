'use client';

import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import type { Card } from '@/types';
import { useSpeech } from '@/hooks/useSpeech';
import { useRadicalHighlight } from '@/hooks/useRadicalHighlight';
import HanziWriterComponent from '@/components/writing/HanziWriter';
import RadicalBadge from './RadicalBadge';
import styles from './CardDetail.module.css';

const TONE_COLORS: Record<number, string> = {
  1: '#2980b9',
  2: '#27ae60',
  3: '#8e44ad',
  4: '#c0392b',
  0: 'var(--color-text-secondary)',
};

interface CardDetailProps {
  card: Card;
  onBack: () => void;
}

const CANVAS_SIZE = 200;

export default function CardDetail({ card, onBack }: CardDetailProps) {
  const { resolvedTheme } = useTheme();
  const { speak } = useSpeech();
  const { radStrokeCount, totalStrokes, radicalInfo, isLoading } = useRadicalHighlight(card.character);

  const toneColor = TONE_COLORS[card.tone] ?? TONE_COLORS[0];
  const isDark = resolvedTheme === 'dark';
  const radicalColor = isDark ? '#e74c3c' : '#c0392b';
  const singleChar = card.character[0];
  const hasExample = Boolean(card.example?.chinese);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          ← Назад
        </button>
        <button
          className={styles.speakButton}
          aria-label="Произнести"
          onClick={() => speak(card.character)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
        </button>
      </div>

      <motion.div
        className={styles.canvasWrapper}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        <HanziWriterComponent
          character={singleChar}
          mode="animate"
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          radicalColor={radicalColor}
        />
      </motion.div>

      <motion.div
        className={styles.info}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.25 }}
      >
        {card.character.length > 1 && (
          <span className={styles.wordFull}>{card.character}</span>
        )}
        <span className={styles.pinyin} style={{ color: toneColor }}>
          {card.pinyin}
        </span>
        <span className={styles.hskBadge}>HSK {card.hskLevel}</span>
      </motion.div>

      <motion.div
        className={styles.body}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.25 }}
      >
        <RadicalBadge
          radStrokeCount={radStrokeCount}
          totalStrokes={totalStrokes}
          radicalInfo={radicalInfo}
          isLoading={isLoading}
        />

        <div className={styles.section}>
          <p className={styles.translation}>{card.translation}</p>
          {card.description && card.description !== card.translation && (
            <p className={styles.description}>{card.description}</p>
          )}
        </div>

        {hasExample && (
          <div className={styles.example}>
            <p className={styles.exampleChinese}>{card.example.chinese}</p>
            <p className={styles.exampleRussian}>{card.example.russian}</p>
          </div>
        )}

        {card.tags.length > 0 && (
          <div className={styles.tags}>
            {card.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
