'use client';

import { useTheme } from 'next-themes';
import { useHanziWriter } from '@/hooks/useHanziWriter';
import type { StrokeData } from 'hanzi-writer';
import styles from './HanziWriter.module.css';

interface HanziWriterProps {
  character: string;
  mode: 'animate' | 'quiz';
  width?: number;
  height?: number;
  radicalColor?: string;
  onAnimationComplete?: () => void;
  onMistake?: (data: StrokeData) => void;
  onCorrectStroke?: (data: StrokeData) => void;
  onQuizComplete?: (summary: { character: string; totalMistakes: number }) => void;
}

export default function HanziWriterComponent({
  character,
  mode,
  width = 280,
  height = 280,
  radicalColor,
  onAnimationComplete,
  onMistake,
  onCorrectStroke,
  onQuizComplete,
}: HanziWriterProps) {
  const { resolvedTheme } = useTheme();
  const { containerRef, feedbackState, isLoading } = useHanziWriter({
    character,
    mode,
    width,
    height,
    isDark: resolvedTheme === 'dark',
    isInk: resolvedTheme === 'ink',
    radicalColor,
    onAnimationComplete,
    onMistake,
    onCorrectStroke,
    onQuizComplete,
  });

  const feedbackClass =
    feedbackState === 'correct'
      ? styles.feedbackCorrect
      : feedbackState === 'mistake'
      ? styles.feedbackMistake
      : '';

  return (
    <div
      className={`${styles.container} ${feedbackClass}`}
      style={{ width, height }}
    >
      <div
        ref={containerRef}
        className={styles.canvas}
        style={{ width, height }}
      />
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingDot} />
        </div>
      )}
    </div>
  );
}
