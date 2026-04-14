import styles from './Ex.module.css';

interface ExProps {
  zh: string;
  py: string;
  tr?: string;
}

export function Ex({ zh, py, tr }: ExProps) {
  return (
    <div className={styles.ex}>
      <span className={styles.hanzi}>{zh}</span>
      <span className={styles.pinyin}>{py}</span>
      {tr && <span className={styles.translation}>{tr}</span>}
    </div>
  );
}
