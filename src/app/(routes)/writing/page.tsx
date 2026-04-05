import styles from './page.module.css';

export default function WritingPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Письмо</h1>
      <p className={styles.subtitle}>Тренируйте написание иероглифов</p>
    </div>
  );
}
