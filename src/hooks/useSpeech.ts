'use client';

import { useCallback } from 'react';

export function useSpeech() {
  const speak = useCallback((text: string, lang = 'zh-CN', rate = 0.7) => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    window.speechSynthesis.speak(utterance);
  }, []);

  return { speak };
}
