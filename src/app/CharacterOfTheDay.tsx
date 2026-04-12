'use client';

import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { useSpeech } from '@/hooks/useSpeech';
import HanziWriterComponent from '@/components/writing/HanziWriter';
import type { Card } from '@/types';
import styles from './page.module.css';

const TONE_COLORS: Record<number, string> = {
  1: '#2980b9',
  2: '#27ae60',
  3: '#8e44ad',
  4: '#c0392b',
  0: 'var(--color-text-secondary)',
};

interface CharacterOfTheDayProps {
  card: Card;
}

export default function CharacterOfTheDay({ card }: CharacterOfTheDayProps) {
  const { resolvedTheme } = useTheme();
  const { speak } = useSpeech();

  const toneColor = TONE_COLORS[card.tone] ?? TONE_COLORS[0];
  const isDark = resolvedTheme === 'dark';
  const radicalColor = isDark ? '#e74c3c' : resolvedTheme === 'ink' ? '#8b1a1a' : '#c0392b';

  return (
    <motion.div
      className={styles.characterCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className={styles.writerWrapper}>
        <HanziWriterComponent
          character={card.character[0]}
          mode="animate"
          width={160}
          height={160}
          radicalColor={radicalColor}
        />
      </div>

      <div className={styles.cardInfo}>
        <div className={styles.cardMain}>
          <span className={styles.pinyin} style={{ color: toneColor }}>
            {card.pinyin}
          </span>
          <span className={styles.hskBadge}>HSK {card.hskLevel}</span>
        </div>
        <p className={styles.translation}>{card.translation}</p>
      </div>

      <button
        className={styles.speakButton}
        onClick={() => speak(card.character)}
        aria-label="Произнести"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
        Произнести
      </button>
    </motion.div>
  );
}
