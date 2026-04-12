import { readFile } from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import { compileMDX } from 'next-mdx-remote/rsc';
import cardsData from '@/mock/cards.json';
import type { Card } from '@/types';
import CharacterOfTheDay from './CharacterOfTheDay';
import styles from './page.module.css';

function normalizePinyin(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function getCardOfTheDay(): Card {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / 86400000);
  const cards = cardsData.data as Card[];
  return cards[dayOfYear % cards.length];
}

async function loadEtymology(card: Card) {
  const slug = normalizePinyin(card.pinyin);
  const mdxPath = path.join(process.cwd(), 'src/content/etymology', `${slug}.mdx`);

  try {
    const source = await readFile(mdxPath, 'utf-8');
    const { content } = await compileMDX({ source, options: { parseFrontmatter: true } });
    return content;
  } catch {
    return null;
  }
}

const quickLinks = [
  { href: '/flashcards', icon: '卡', label: 'Карточки' },
  { href: '/writing', icon: '写', label: 'Письмо' },
  { href: '/grammar', icon: '文', label: 'Грамматика' },
  { href: '/dictionary', icon: '典', label: 'Словарь' },
];

export default async function HomePage() {
  const card = getCardOfTheDay();
  const etymologyContent = await loadEtymology(card);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.greeting}>Иероглиф дня</p>
        <CharacterOfTheDay card={card} />
      </section>

      {etymologyContent && (
        <section className={styles.etymology}>
          <h2 className={styles.sectionTitle}>Происхождение</h2>
          <div className={styles.mdxContent}>
            {etymologyContent}
          </div>
        </section>
      )}

      <section className={styles.quickLinks}>
        <p className={styles.quickLinksTitle}>Разделы</p>
        <div className={styles.linksGrid}>
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.linkCard}>
              <span className={styles.linkIcon}>{link.icon}</span>
              <span className={styles.linkLabel}>{link.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
