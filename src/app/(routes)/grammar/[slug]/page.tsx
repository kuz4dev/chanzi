import { readFile } from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import grammarData from '@/mock/grammar.json';
import type { GrammarTopic } from '@/types';
import { Ex } from '@/components/grammar/Ex';
import styles from './page.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

const components = { Ex };

async function loadMdx(slug: string) {
  const base = path.join(process.cwd(), 'src/content/grammar');

  // 1. Flat: src/content/grammar/{slug}.mdx
  const flatPath = path.join(base, `${slug}.mdx`);
  try {
    const source = await readFile(flatPath, 'utf-8');
    const { content } = await compileMDX({ source, components, options: { parseFrontmatter: true, mdxOptions: { remarkPlugins: [remarkGfm] } } });
    return content;
  } catch {}

  // 2. Nested: src/content/grammar/{category}/{name}.mdx (slug = category-name)
  const dashIndex = slug.indexOf('-');
  if (dashIndex !== -1) {
    const category = slug.slice(0, dashIndex);
    const name = slug.slice(dashIndex + 1);
    const nestedPath = path.join(base, category, `${name}.mdx`);
    try {
      const source = await readFile(nestedPath, 'utf-8');
      const { content } = await compileMDX({ source, components, options: { parseFrontmatter: true, mdxOptions: { remarkPlugins: [remarkGfm] } } });
      return content;
    } catch {}
  }

  return null;
}

export default async function GrammarTopicPage({ params }: Props) {
  const { slug } = await params;

  const topics = grammarData.data as GrammarTopic[];
  const topic = topics.find((t) => t.slug === slug);

  const content = await loadMdx(slug);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link href="/grammar" className={styles.backButton}>
          ← Назад
        </Link>
        {topic && (
          <span className={styles.level}>HSK {topic.level}</span>
        )}
      </div>

      {content ? (
        <div className={styles.mdxContent}>
          {content}
        </div>
      ) : (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>Контент в разработке</p>
          <p className={styles.emptyText}>Эта тема скоро появится.</p>
        </div>
      )}
    </div>
  );
}
