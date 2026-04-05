/**
 * Downloads official HSK 2.0 word lists from drkameleon/complete-hsk-vocabulary
 * and updates hskLevel in cards-hsk6.json accordingly.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CARDS_PATH = join(__dirname, '../src/mock/cards-hsk6.json');
const BASE_URL =
  'https://raw.githubusercontent.com/drkameleon/complete-hsk-vocabulary/main/wordlists/exclusive/old';

async function fetchLevel(level) {
  const res = await fetch(`${BASE_URL}/${level}.json`);
  if (!res.ok) throw new Error(`Failed to fetch HSK ${level}: ${res.status}`);
  const data = await res.json();
  return data.map((entry) => entry.simplified);
}

async function main() {
  console.log('Downloading HSK word lists...');

  // Build a map: word → hskLevel
  const wordToLevel = new Map();
  for (let level = 1; level <= 6; level++) {
    const words = await fetchLevel(level);
    console.log(`  HSK ${level}: ${words.length} words`);
    for (const word of words) {
      wordToLevel.set(word, level);
    }
  }

  console.log(`Total unique words in mapping: ${wordToLevel.size}`);

  const json = JSON.parse(readFileSync(CARDS_PATH, 'utf8'));
  let updated = 0;
  let unchanged = 0;
  let notFound = 0;

  for (const card of json.data) {
    const level = wordToLevel.get(card.character);
    if (level !== undefined) {
      if (card.hskLevel !== level) {
        card.hskLevel = level;
        updated++;
      } else {
        unchanged++;
      }
    } else {
      // Word not found in any level list — keep as 6 (it's in the HSK 6 file)
      notFound++;
      if (card.hskLevel !== 6) {
        card.hskLevel = 6;
        updated++;
      }
    }
  }

  writeFileSync(CARDS_PATH, JSON.stringify(json, null, 2), 'utf8');

  console.log(`\nDone!`);
  console.log(`  Updated:   ${updated}`);
  console.log(`  Unchanged: ${unchanged}`);
  console.log(`  Not found in mapping (kept as 6): ${notFound}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
