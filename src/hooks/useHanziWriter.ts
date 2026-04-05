'use client';

import { useRef, useCallback } from 'react';

export function useHanziWriter() {
  const containerRef = useRef<HTMLDivElement>(null);

  const init = useCallback((_character: string) => {
    // hanzi-writer инициализация будет здесь
    // HanziWriter.create(containerRef.current, character, { ... })
  }, []);

  const animateCharacter = useCallback(() => {
    // writer.animateCharacter()
  }, []);

  const quiz = useCallback(() => {
    // writer.quiz()
  }, []);

  return { containerRef, init, animateCharacter, quiz };
}
