'use client';

import styles from './SearchInput.module.css';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  isLoading: boolean;
}

export default function SearchInput({ value, onChange, onClear, isLoading }: SearchInputProps) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.searchIcon}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </span>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Иероглиф, пиньинь или перевод…"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
      />
      {isLoading && (
        <span className={styles.loader} aria-hidden="true" />
      )}
      {value && !isLoading && (
        <button
          className={styles.clearButton}
          onClick={onClear}
          aria-label="Очистить"
        >
          ✕
        </button>
      )}
    </div>
  );
}
