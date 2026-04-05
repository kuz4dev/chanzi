import type { ApiResponse, Card, Deck } from '@/types';
import cardsData from '@/mock/cards.json';
import hsk6Data from '@/mock/cards-hsk6.json';
import decksData from '@/mock/decks.json';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// HSK 6 deck generated dynamically so we don't store 5000 IDs in decks.json
const hsk6Deck: Deck = {
  id: 'deck-hsk6',
  title: 'HSK 6 — Полный словарь',
  description: '5000 слов экзаменационного уровня HSK 6 с пиньинем и переводом на русский.',
  hskLevel: 6,
  cardIds: (hsk6Data.data as Card[]).map((c) => c.id),
  coverCharacter: '汉',
};

const allDecks: Deck[] = [...(decksData.data as Deck[]), hsk6Deck];
const allCards: Card[] = [
  ...(cardsData.data as Card[]),
  ...(hsk6Data.data as Card[]),
];

interface GetCardsParams {
  deckId?: string;
  hskLevel?: number;
  page?: number;
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

  return {
    data: cards,
    meta: {
      total: cards.length,
      page: params.page ?? 1,
      perPage: cards.length,
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
