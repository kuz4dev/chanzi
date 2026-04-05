export type Tone = 0 | 1 | 2 | 3 | 4;
export type Rating = 'hard' | 'repeat' | 'easy';
export type HskLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface ApiResponse<T> {
  data: T;
  meta: {
    total: number;
    page: number;
    perPage: number;
  };
}

export interface Card {
  id: string;
  character: string;
  pinyin: string;
  tone: Tone;
  translation: string;
  description: string;
  example: { chinese: string; russian: string };
  hskLevel: HskLevel;
  tags: string[];
}

export interface Deck {
  id: string;
  title: string;
  description: string;
  hskLevel: HskLevel;
  cardIds: string[];
  coverCharacter: string;
}

export interface CardProgress {
  cardId: string;
  rating: Rating;
  reviewedAt: number;
}

export interface GrammarTopic {
  slug: string;
  title: string;
  level: HskLevel;
  description: string;
}
