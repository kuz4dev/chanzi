import Link from 'next/link';
import numbersData from '@/mock/numbers.json';
import type { ChineseNumber } from '@/types';
import NumberCell from '@/components/grammar/NumberCell';
import { Ex } from '@/components/grammar/Ex';
import styles from './page.module.css';

const numbers = numbersData.data as ChineseNumber[];

export default function NumbersPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link href="/grammar" className={styles.backButton}>← Назад</Link>
        <span className={styles.counter}>{numbers.length} цифр</span>
      </div>

      <h1 className={styles.title}>Числа 数字</h1>
      <p className={styles.subtitle}>Базовые цифры и правила образования чисел — нажмите на любую, чтобы услышать</p>

      <div className={styles.grid}>
        {numbers.map((num) => (
          <NumberCell key={num.id} num={num} />
        ))}
      </div>

      <div className={styles.rulesSection}>
        <h2 className={styles.rulesTitle}>Образование чисел</h2>

        <div className={styles.ruleBlock}>
          <p className={styles.ruleHeading}>Числа 11–19 — 十 + цифра</p>
          <p className={styles.ruleDesc}>Числа от 11 до 19 образуются прибавлением цифры к 十.</p>
          <Ex zh="十一" py="shí yī" tr="одиннадцать" />
          <Ex zh="十五" py="shí wǔ" tr="пятнадцать" />
          <Ex zh="十九" py="shí jiǔ" tr="девятнадцать" />
        </div>

        <div className={styles.ruleBlock}>
          <p className={styles.ruleHeading}>Десятки (20–90) — цифра + 十</p>
          <p className={styles.ruleDesc}>Десятки образуются цифрой перед 十, затем (если есть) единица.</p>
          <Ex zh="二十" py="èr shí" tr="двадцать" />
          <Ex zh="三十五" py="sān shí wǔ" tr="тридцать пять" />
          <Ex zh="九十九" py="jiǔ shí jiǔ" tr="девяносто девять" />
        </div>

        <div className={styles.ruleBlock}>
          <p className={styles.ruleHeading}>Сотни — цифра + 百</p>
          <p className={styles.ruleDesc}>При нулевом промежуточном разряде используется 零 (líng).</p>
          <Ex zh="一百" py="yī bǎi" tr="сто" />
          <Ex zh="五百" py="wǔ bǎi" tr="пятьсот" />
          <Ex zh="三百零五" py="sān bǎi líng wǔ" tr="триста пять" />
          <Ex zh="三百二十" py="sān bǎi èr shí" tr="триста двадцать" />
        </div>

        <div className={styles.ruleBlock}>
          <p className={styles.ruleHeading}>Тысячи — цифра + 千</p>
          <p className={styles.ruleDesc}>«Две тысячи» — 两千, не 二千: перед 千/万/亿 обычно используется 两.</p>
          <Ex zh="一千" py="yī qiān" tr="тысяча" />
          <Ex zh="两千" py="liǎng qiān" tr="две тысячи" />
          <Ex zh="五千三百" py="wǔ qiān sān bǎi" tr="пять тысяч триста" />
        </div>

        <div className={styles.ruleBlock}>
          <p className={styles.ruleHeading}>万 (10 000) и выше</p>
          <p className={styles.ruleDesc}>В китайском счёте базовая единица — 万 (десять тысяч), а не тысяча. Миллион = 百万, миллиард = 十亿.</p>
          <Ex zh="一万" py="yī wàn" tr="десять тысяч" />
          <Ex zh="十万" py="shí wàn" tr="сто тысяч" />
          <Ex zh="一百万" py="yī bǎi wàn" tr="миллион" />
          <Ex zh="一亿" py="yī yì" tr="сто миллионов" />
        </div>

        <div className={styles.ruleBlock}>
          <p className={styles.ruleHeading}>两 vs 二 — когда «два»?</p>
          <p className={styles.ruleDesc}>两 используется перед счётными словами и мерами. 二 — в составе чисел (十二, 第二) и при счёте.</p>
          <Ex zh="两个" py="liǎng gè" tr="два (штуки)" />
          <Ex zh="两天" py="liǎng tiān" tr="два дня" />
          <Ex zh="十二" py="shí èr" tr="двенадцать" />
          <Ex zh="第二" py="dì èr" tr="второй" />
        </div>

        <div className={styles.ruleBlock}>
          <p className={styles.ruleHeading}>Порядковые числительные — 第 + число</p>
          <p className={styles.ruleDesc}>Приставка 第 (dì) превращает любое число в порядковое.</p>
          <Ex zh="第一" py="dì yī" tr="первый" />
          <Ex zh="第三" py="dì sān" tr="третий" />
          <Ex zh="第十" py="dì shí" tr="десятый" />
        </div>
      </div>
    </div>
  );
}
