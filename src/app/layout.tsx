import type { Metadata } from 'next';
import { Noto_Sans_SC, Noto_Serif_SC, Cinzel } from 'next/font/google';
import './globals.css';
import styles from './layout.module.css';
import Providers from '@/components/layout/Providers';
import TopBar from '@/components/layout/TopBar';
import BottomNav from '@/components/layout/BottomNav';

const notoSansSC = Noto_Sans_SC({
  variable: '--font-noto-sans-sc',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

const notoSerifSC = Noto_Serif_SC({
  variable: '--font-noto-serif-sc',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ChànZì — Изучение китайских иероглифов',
  description: 'Приложение для изучения китайских иероглифов методом карточек',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      className={`${notoSansSC.variable} ${notoSerifSC.variable} ${cinzel.variable}`}
      suppressHydrationWarning
    >
      <body className={styles.body}>
        <Providers>
          <TopBar />
          <main className={styles.main}>{children}</main>
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
