import type { ApiResponse, Card, Deck, HskLevel } from '@/types';
import cardsData from '@/mock/cards.json';
import hsk6Data from '@/mock/cards-hsk6.json';
import decksData from '@/mock/decks.json';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const allCards: Card[] = [
  ...(cardsData.data as Card[]),
  ...(hsk6Data.data as Card[]),
];

const HSK_COVERS: Record<number, string> = {
  1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六',
};

const HSK_DESCRIPTIONS: Record<number, string> = {
  1: 'Базовая лексика для начинающих',
  2: 'Повседневное общение',
  3: 'Расширенный бытовой словарь',
  4: 'Уверенное владение языком',
  5: 'Продвинутый уровень',
  6: 'Профессиональное владение',
};

// One virtual deck per HSK level, generated dynamically
const hskLevelDecks: Deck[] = ([1, 2, 3, 4, 5, 6] as HskLevel[]).map((level) => {
  const cardIds = allCards.filter((c) => c.hskLevel === level).map((c) => c.id);
  return {
    id: `hsk-level-${level}`,
    title: `HSK ${level}`,
    description: HSK_DESCRIPTIONS[level],
    hskLevel: level,
    cardIds,
    coverCharacter: HSK_COVERS[level],
  };
});

const allDecks: Deck[] = [...(decksData.data as Deck[]), ...hskLevelDecks];

interface GetCardsParams {
  deckId?: string;
  hskLevel?: number;
  page?: number;
  search?: string;
}

const SEARCH_LIMIT = 50;

function normalizePinyin(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export async function fetchCards(
  params: GetCardsParams = {}
): Promise<ApiResponse<Card[]>> {
  await delay(300);

  let cards = allCards;

  if (params.deckId) {
    const deck = allDecks.find((d) => d.id === params.deckId);
    if (deck) {
      const idSet = new Set(deck.cardIds);
      cards = cards.filter((c) => idSet.has(c.id));
    }
  }

  if (params.hskLevel) {
    cards = cards.filter((c) => c.hskLevel === params.hskLevel);
  }

  if (params.search) {
    const q = params.search.trim().toLowerCase();
    const qn = normalizePinyin(q);
    cards = cards.filter(
      (c) =>
        c.character.includes(q) ||
        normalizePinyin(c.pinyin).includes(qn) ||
        c.translation.toLowerCase().includes(q)
    );
  }

  const total = cards.length;

  if (params.search) {
    cards = cards.slice(0, SEARCH_LIMIT);
  }

  return {
    data: cards,
    meta: {
      total,
      page: params.page ?? 1,
      perPage: params.search ? SEARCH_LIMIT : cards.length,
    },
  };
}

export async function fetchDeckById(id: string): Promise<ApiResponse<Deck>> {
  await delay(300);

  const deck = allDecks.find((d) => d.id === id);
  if (!deck) {
    throw new Error(`Deck not found: ${id}`);
  }

  return {
    data: deck,
    meta: { total: 1, page: 1, perPage: 1 },
  };
}

export async function fetchCardById(id: string): Promise<ApiResponse<Card>> {
  await delay(300);

  const card = allCards.find((c) => c.id === id);
  if (!card) {
    throw new Error(`Card not found: ${id}`);
  }

  return {
    data: card,
    meta: { total: 1, page: 1, perPage: 1 },
  };
}

export async function fetchDecks(): Promise<ApiResponse<Deck[]>> {
  await delay(300);
  return {
    data: allDecks,
    meta: {
      total: allDecks.length,
      page: 1,
      perPage: allDecks.length,
    },
  };
}
