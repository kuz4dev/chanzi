import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Card } from '@/types';

type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

interface CardsState {
  cards: Card[];
  currentIndex: number;
  isFlipped: boolean;
  deckId: string | null;
  status: Status;
}

const initialState: CardsState = {
  cards: [],
  currentIndex: 0,
  isFlipped: false,
  deckId: null,
  status: 'idle',
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards(state, action: PayloadAction<Card[]>) {
      state.cards = action.payload;
      state.currentIndex = 0;
      state.isFlipped = false;
    },
    setDeckId(state, action: PayloadAction<string>) {
      state.deckId = action.payload;
    },
    flipCard(state) {
      state.isFlipped = !state.isFlipped;
    },
    nextCard(state) {
      if (state.currentIndex < state.cards.length - 1) {
        state.currentIndex += 1;
        state.isFlipped = false;
      }
    },
    prevCard(state) {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
        state.isFlipped = false;
      }
    },
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    resetDeck(state) {
      state.currentIndex = 0;
      state.isFlipped = false;
    },
    shuffleCards(state) {
      for (let i = state.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [state.cards[i], state.cards[j]] = [state.cards[j], state.cards[i]];
      }
      state.currentIndex = 0;
      state.isFlipped = false;
    },
  },
});

export const { setCards, setDeckId, flipCard, nextCard, prevCard, setStatus, resetDeck, shuffleCards } =
  cardsSlice.actions;

export default cardsSlice.reducer;
