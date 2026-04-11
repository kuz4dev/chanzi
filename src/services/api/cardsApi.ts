import { createApi, fetchBaseQuery, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import type { ApiResponse, Card, Deck, HskLevel } from '@/types';
import {
  fetchCards,
  fetchCardById,
  fetchDeckById,
  fetchDecks,
} from './mockAdapter';

interface GetCardsParams {
  deckId?: string;
  hskLevel?: HskLevel;
  page?: number;
  search?: string;
}

const mockBaseQuery: BaseQueryFn<
  { fn: () => Promise<unknown> },
  unknown,
  unknown
> = async ({ fn }) => {
  try {
    const data = await fn();
    return { data };
  } catch (error) {
    return { error: { status: 'CUSTOM_ERROR', error: String(error) } };
  }
};

const isDev = process.env.NODE_ENV === 'development';

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: isDev
    ? mockBaseQuery
    : fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Card', 'Deck'],
  endpoints: (builder) => ({
    getCards: builder.query<ApiResponse<Card[]>, GetCardsParams>({
      query: (params) =>
        isDev
          ? ({ fn: () => fetchCards(params) } as never)
          : (`/cards?${new URLSearchParams(params as Record<string, string>)}` as never),
      providesTags: ['Card'],
    }),

    getDecks: builder.query<ApiResponse<Deck[]>, void>({
      query: () =>
        isDev
          ? ({ fn: () => fetchDecks() } as never)
          : ('/decks' as never),
      providesTags: ['Deck'],
    }),

    getDeckById: builder.query<ApiResponse<Deck>, string>({
      query: (id) =>
        isDev
          ? ({ fn: () => fetchDeckById(id) } as never)
          : (`/decks/${id}` as never),
      providesTags: (_result, _error, id) => [{ type: 'Deck', id }],
    }),

    getCardById: builder.query<ApiResponse<Card>, string>({
      query: (id) =>
        isDev
          ? ({ fn: () => fetchCardById(id) } as never)
          : (`/cards/${id}` as never),
      providesTags: (_result, _error, id) => [{ type: 'Card', id }],
    }),
  }),
});

export const {
  useGetCardsQuery,
  useGetDecksQuery,
  useGetDeckByIdQuery,
  useGetCardByIdQuery,
} = cardsApi;
