'use client';

import { motion } from 'framer-motion';
import styles from './LevelSelector.module.css';

const HSK_LEVELS = [
  { level: 1, cover: '一', label: 'Базовый' },
  { level: 2, cover: '二', label: 'Элементарный' },
  { level: 3, cover: '三', label: 'Средний' },
  { level: 4, cover: '四', label: 'Выше среднего' },
  { level: 5, cover: '五', label: 'Продвинутый' },
  { level: 6, cover: '六', label: 'Мастерский' },
] as const;

interface LevelSelectorProps {
  onSelect: (level: number) => void;
}

export default function LevelSelector({ onSelect }: LevelSelectorProps) {
  return (
    <div className={styles.grid}>
      {HSK_LEVELS.map(({ level, cover, label }, i) => (
        <motion.button
          key={level}
          className={styles.levelButton}
          onClick={() => onSelect(level)}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.25 }}
          whileTap={{ scale: 0.96 }}
        >
          <span className={styles.levelCharacter}>{cover}</span>
          <span className={styles.levelNumber}>HSK {level}</span>
          <span className={styles.levelLabel}>{label}</span>
        </motion.button>
      ))}
    </div>
  );
}
