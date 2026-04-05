'use client';

import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
} from 'framer-motion';
import type { Card, Rating } from '@/types';
import styles from './FlashCard.module.css';

interface FlashCardProps {
  card: Card;
  isFlipped: boolean;
  onFlip: () => void;
  onRate: (rating: Rating) => void;
}

const THRESHOLD = 80;
const VELOCITY_THRESHOLD = 500;

export default function FlashCard({ card, isFlipped, onFlip, onRate }: FlashCardProps) {
  const hasExample = Boolean(card.example?.chinese);
  const isExiting = useRef(false);
  const hasDragged = useRef(false);
  const speakPressed = useRef(false);

  const handleSpeak = () => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(card.character);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.7;
    window.speechSynthesis.speak(utterance);
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-12, 12]);

  const handleDragEnd = async (_: unknown, info: PanInfo) => {
    if (isExiting.current) return;
    const { offset, velocity } = info;

    if (offset.x > THRESHOLD || velocity.x > VELOCITY_THRESHOLD) {
      isExiting.current = true;
      await animate(x, 600, { type: 'spring', stiffness: 200, damping: 20 });
      onRate('easy');
    } else if (offset.x < -THRESHOLD || velocity.x < -VELOCITY_THRESHOLD) {
      isExiting.current = true;
      await animate(x, -600, { type: 'spring', stiffness: 200, damping: 20 });
      onRate('hard');
    } else if (offset.y < -THRESHOLD || velocity.y < -VELOCITY_THRESHOLD) {
      isExiting.current = true;
      await animate(y, -600, { type: 'spring', stiffness: 200, damping: 20 });
      onRate('repeat');
    } else {
      animate(x, 0, { type: 'spring', stiffness: 400, damping: 30 });
      animate(y, 0, { type: 'spring', stiffness: 400, damping: 30 });
    }
  };

  return (
    // Static container holds the layout space while the card flies off
    <div className={styles.container}>
      <motion.div
        className={styles.dragLayer}
        style={{ x, y, rotate }}
        drag
        dragDirectionLock
        dragMomentum={false}
        onPointerDown={() => { hasDragged.current = false; speakPressed.current = false; }}
        onDragStart={() => { hasDragged.current = true; }}
        onDragEnd={handleDragEnd}
        onTap={() => { if (!hasDragged.current && !speakPressed.current) onFlip(); }}
      >
        {/* Perspective wrapper is separate from drag layer — prevents transform-style: preserve-3d breakage */}
        <div className={styles.perspectiveWrapper}>
          <div className={`${styles.inner} ${isFlipped ? styles.flipped : ''}`}>
            <div className={styles.front}>
              <span className={styles.character}>{card.character}</span>
              <span className={styles.pinyin}>{card.pinyin}</span>
              <button
                className={styles.speakButton}
                aria-label="Произнести"
                onPointerDown={e => { e.stopPropagation(); speakPressed.current = true; }}
                onClick={handleSpeak}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                </svg>
              </button>
            </div>
            <div className={styles.back}>
              <span className={styles.translation}>{card.translation}</span>
              {hasExample ? (
                <div className={styles.example}>
                  <span className={styles.exampleChinese}>{card.example.chinese}</span>
                  <span className={styles.exampleRussian}>{card.example.russian}</span>
                </div>
              ) : (
                card.description !== card.translation && (
                  <span className={styles.description}>{card.description}</span>
                )
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
