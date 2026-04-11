import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { applyRating, createSrsCard, RATING_TO_QUALITY, type SrsCard } from '@/lib/sm2';
import type { Rating } from '@/types';

interface SrsState {
  cards: SrsCard[];
}

const initialState: SrsState = {
  cards: [],
};

const srsSlice = createSlice({
  name: 'srs',
  initialState,
  reducers: {
    updateSrsCard(
      state,
      action: PayloadAction<{ cardId: string; rating: Rating }>
    ) {
      const { cardId, rating } = action.payload;
      const quality = RATING_TO_QUALITY[rating];
      const existing = state.cards.find((c) => c.cardId === cardId);
      const base = existing ?? createSrsCard(cardId);
      const updated = applyRating(base, quality);

      if (existing) {
        Object.assign(existing, updated);
      } else {
        state.cards.push(updated);
      }
    },
    resetSrs() {
      return initialState;
    },
  },
});

export const { updateSrsCard, resetSrs } = srsSlice.actions;
export default srsSlice.reducer;
