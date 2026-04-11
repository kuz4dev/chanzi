'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import type HanziWriterType from 'hanzi-writer';
import type { StrokeData } from 'hanzi-writer';

export type FeedbackState = 'idle' | 'correct' | 'mistake';

export interface UseHanziWriterOptions {
  character: string;
  mode: 'animate' | 'quiz';
  width?: number;
  height?: number;
  isDark?: boolean;
  radicalColor?: string;
  onAnimationComplete?: () => void;
  onMistake?: (data: StrokeData) => void;
  onCorrectStroke?: (data: StrokeData) => void;
  onQuizComplete?: (summary: { character: string; totalMistakes: number }) => void;
}

export interface UseHanziWriterReturn {
  containerRef: React.RefObject<HTMLDivElement | null>;
  feedbackState: FeedbackState;
  isLoading: boolean;
}

export function useHanziWriter({
  character,
  mode,
  width = 280,
  height = 280,
  isDark = false,
  radicalColor,
  onAnimationComplete,
  onMistake,
  onCorrectStroke,
  onQuizComplete,
}: UseHanziWriterOptions): UseHanziWriterReturn {
  const containerRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<HanziWriterType | null>(null);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Store latest callbacks in refs so writer.quiz() callbacks don't close over stale values
  const onAnimationCompleteRef = useRef(onAnimationComplete);
  const onMistakeRef = useRef(onMistake);
  const onCorrectStrokeRef = useRef(onCorrectStroke);
  const onQuizCompleteRef = useRef(onQuizComplete);
  useEffect(() => { onAnimationCompleteRef.current = onAnimationComplete; }, [onAnimationComplete]);
  useEffect(() => { onMistakeRef.current = onMistake; }, [onMistake]);
  useEffect(() => { onCorrectStrokeRef.current = onCorrectStroke; }, [onCorrectStroke]);
  useEffect(() => { onQuizCompleteRef.current = onQuizComplete; }, [onQuizComplete]);

  const [feedbackState, setFeedbackState] = useState<FeedbackState>('idle');
  const [isLoading, setIsLoading] = useState(true);

  const triggerFeedback = useCallback((state: 'correct' | 'mistake') => {
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    setFeedbackState(state);
    feedbackTimerRef.current = setTimeout(() => setFeedbackState('idle'), 400);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    let cancelled = false;
    const container = containerRef.current;

    // Clear previous writer content
    container.innerHTML = '';
    setIsLoading(true);

    const init = async () => {
      const { default: HanziWriter } = await import('hanzi-writer');
      if (cancelled || !container) return;

      const writer = HanziWriter.create(container, character, {
        width,
        height,
        padding: 16,
        showOutline: true,
        showCharacter: mode === 'animate',
        strokeColor: isDark ? '#f0efe8' : '#333333',
        outlineColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)',
        drawingColor: isDark ? '#e74c3c' : '#c0392b',
        highlightColor: isDark ? '#2ecc71' : '#27ae60',
        radicalColor: radicalColor ?? null,
        strokeAnimationSpeed: 1,
        delayBetweenStrokes: 600,
        drawingWidth: 18,
        leniency: 1.2,
      });

      writerRef.current = writer;
      setIsLoading(false);

      if (mode === 'animate') {
        writer.animateCharacter({
          onComplete: () => {
            if (!cancelled) onAnimationCompleteRef.current?.();
          },
        });
      } else {
        writer.quiz({
          showHintAfterMisses: 3,
          highlightOnComplete: true,
          markStrokeCorrectAfterMisses: 5,
          onMistake: (data) => {
            if (!cancelled) {
              triggerFeedback('mistake');
              onMistakeRef.current?.(data);
            }
          },
          onCorrectStroke: (data) => {
            if (!cancelled) {
              triggerFeedback('correct');
              onCorrectStrokeRef.current?.(data);
            }
          },
          onComplete: (summary) => {
            if (!cancelled) onQuizCompleteRef.current?.(summary);
          },
        });
      }
    };

    init();

    return () => {
      cancelled = true;
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
      try {
        writerRef.current?.cancelQuiz();
      } catch {
        // ignore errors on cleanup
      }
      writerRef.current = null;
      container.innerHTML = '';
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character, mode, width, height, isDark, radicalColor]);

  return { containerRef, feedbackState, isLoading };
}
