import styles from './page.module.css';

export default function ProgressPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Прогресс</h1>
      <p className={styles.subtitle}>Отслеживайте свои успехи в изучении иероглифов</p>
    </div>
  );
}
