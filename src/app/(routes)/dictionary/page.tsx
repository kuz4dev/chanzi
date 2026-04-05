import styles from './page.module.css';

export default function DictionaryPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Словарь</h1>
      <p className={styles.subtitle}>Ищите иероглифы и узнавайте их значение</p>
    </div>
  );
}
