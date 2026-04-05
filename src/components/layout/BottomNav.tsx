'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './BottomNav.module.css';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/flashcards', label: 'Карточки', icon: '卡' },
  { href: '/grammar', label: 'Грамматика', icon: '文' },
  { href: '/writing', label: 'Письмо', icon: '写' },
  { href: '/dictionary', label: 'Словарь', icon: '典' },
  { href: '/progress', label: 'Прогресс', icon: '★' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.bottomNav}>
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(styles.navItem, isActive && styles.active)}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
