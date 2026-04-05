'use client';

import { useRef } from 'react';
import styles from './HanziWriter.module.css';

interface HanziWriterProps {
  character: string;
}

export default function HanziWriterComponent({ character }: HanziWriterProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.placeholder}>
        <span className={styles.character}>{character}</span>
        <span className={styles.hint}>Тренажёр письма будет здесь</span>
      </div>
    </div>
  );
}
