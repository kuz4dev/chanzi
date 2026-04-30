import Link from 'next/link';
import ToneCard from '@/components/grammar/ToneCard';
import { Ex } from '@/components/grammar/Ex';
import styles from './page.module.css';

const TONES = [
  { tone: 1, diacritic: 'ā', color: '#2980b9', character: '妈', pinyin: 'mā', meaning: 'мама' },
  { tone: 2, diacritic: 'á', color: '#27ae60', character: '麻', pinyin: 'má', meaning: 'онемение' },
  { tone: 3, diacritic: 'ǎ', color: '#8e44ad', character: '马', pinyin: 'mǎ', meaning: 'лошадь' },
  { tone: 4, diacritic: 'à', color: '#c0392b', character: '骂', pinyin: 'mà', meaning: 'ругать' },
  { tone: 0, diacritic: 'a', color: '#ADADAD', character: '吗', pinyin: 'ma', meaning: 'вопр. частица' },
];

export default function TonesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link href="/grammar" className={styles.backButton}>← Назад</Link>
        <span className={styles.counter}>5 тонов</span>
      </div>

      <h1 className={styles.title}>Тоны 声调</h1>
      <p className={styles.subtitle}>
        В китайском языке тон — часть слова. Один и тот же слог с разным тоном означает разное.
        Нажмите на карточку, чтобы услышать.
      </p>

      <div className={styles.grid}>
        {TONES.map((t) => (
          <ToneCard key={t.tone} {...t} />
        ))}
      </div>

      <div className={styles.sandhiSection}>
        <h2 className={styles.sandhiTitle}>Тон-сандхи 变调</h2>
        <p className={styles.sandhiDesc}>
          В беглой речи некоторые тоны меняются в зависимости от окружения.
        </p>

        <div className={styles.ruleBlock}>
          <p className={styles.ruleHeading}>Два 3-х тона подряд → 2-й + 3-й</p>
          <p className={styles.ruleDesc}>
            Если два слога с 3-м тоном идут рядом, первый читается как 2-й тон.
          </p>
          <Ex zh="你好" py="ní hǎo" tr="привет (произносится níhǎo, не nǐhǎo)" />
          <Ex zh="可以" py="kě yǐ → ké yǐ" tr="можно" />
        </div>

        <div className={styles.ruleBlock}>
          <p className={styles.ruleHeading}>不 (bù) перед 4-м тоном → 2-й тон</p>
          <p className={styles.ruleDesc}>
            Иероглиф 不 имеет 4-й тон, но перед другим 4-м тоном становится 2-м.
          </p>
          <Ex zh="不对" py="bú duì" tr="неверно" />
          <Ex zh="不是" py="bú shì" tr="не является" />
          <Ex zh="不去" py="bú qù" tr="не пойду" />
        </div>

        <div className={styles.ruleBlock}>
          <p className={styles.ruleHeading}>一 (yī) — три варианта</p>
          <p className={styles.ruleDesc}>
            Перед 1–3-м тоном 一 читается с 4-м тоном; перед 4-м тоном — со 2-м; в порядковых и паузах — с 1-м.
          </p>
          <Ex zh="一天" py="yì tiān" tr="один день (перед 1-м тоном → 4-й)" />
          <Ex zh="一年" py="yì nián" tr="один год (перед 2-м тоном → 4-й)" />
          <Ex zh="一个" py="yí gè" tr="одна штука (перед 4-м тоном → 2-й)" />
          <Ex zh="第一" py="dì yī" tr="первый (порядковое — остаётся 1-й)" />
        </div>
      </div>
    </div>
  );
}
