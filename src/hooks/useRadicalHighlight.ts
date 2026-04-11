'use client';

import { useState, useEffect } from 'react';
import { radicalMap, type RadicalInfo } from '@/data/radicalMap';

interface RadicalData {
  radStrokeCount: number;
  totalStrokes: number;
}

// Module-level cache so re-visiting the same character doesn't refetch
const cache = new Map<string, RadicalData | null>();

export interface UseRadicalHighlightReturn {
  radStrokeCount: number | null;
  totalStrokes: number | null;
  radicalInfo: RadicalInfo | null;
  isLoading: boolean;
}

export function useRadicalHighlight(character: string): UseRadicalHighlightReturn {
  const [data, setData] = useState<RadicalData | null | undefined>(() => {
    if (cache.has(character)) return cache.get(character) ?? null;
    return undefined; // undefined = not yet fetched
  });

  useEffect(() => {
    if (cache.has(character)) {
      setData(cache.get(character) ?? null);
      return;
    }

    const singleChar = character[0]; // hanzi-writer data is per single character
    fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/${encodeURIComponent(singleChar)}.json`)
      .then((r) => r.json())
      .then((json: { strokes: string[]; radStrokes?: number[] }) => {
        const result: RadicalData | null = json.radStrokes
          ? { radStrokeCount: json.radStrokes.length, totalStrokes: json.strokes.length }
          : null;
        cache.set(character, result);
        setData(result);
      })
      .catch(() => {
        cache.set(character, null);
        setData(null);
      });
  }, [character]);

  return {
    radStrokeCount: data?.radStrokeCount ?? null,
    totalStrokes: data?.totalStrokes ?? null,
    radicalInfo: radicalMap[character[0]] ?? null,
    isLoading: data === undefined,
  };
}
