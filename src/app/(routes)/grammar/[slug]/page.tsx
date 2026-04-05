import styles from './page.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function GrammarTopicPage({ params }: Props) {
  const { slug } = await params;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Грамматика: {slug}</h1>
      <p className={styles.subtitle}>Содержимое урока будет загружено из MDX</p>
    </div>
  );
}
