export interface SrsCard {
  cardId: string;
  easiness: number;     // easiness factor, min 1.3, default 2.5
  interval: number;     // days until next review, default 0
  repetitions: number;  // consecutive correct reviews, default 0
  nextReviewAt: number; // timestamp ms, default 0 (due immediately)
}

export const RATING_TO_QUALITY: Record<string, number> = {
  easy: 5,
  repeat: 3,
  hard: 1,
};

export function createSrsCard(cardId: string): SrsCard {
  return { cardId, easiness: 2.5, interval: 0, repetitions: 0, nextReviewAt: 0 };
}

export function applyRating(card: SrsCard, quality: number): SrsCard {
  let { easiness, interval, repetitions } = card;

  if (quality < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * easiness);

    easiness += 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02);
    if (easiness < 1.3) easiness = 1.3;
    repetitions += 1;
  }

  const nextReviewAt = Date.now() + interval * 24 * 60 * 60 * 1000;
  return { cardId: card.cardId, easiness, interval, repetitions, nextReviewAt };
}

export function isDue(card: SrsCard): boolean {
  return card.nextReviewAt <= Date.now();
}
