import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CharacterWritingRecord {
  cardId: string;
  character: string;
  bestMistakes: number;
  totalAttempts: number;
  lastPracticedAt: number;
}

interface WritingProgressState {
  records: CharacterWritingRecord[];
  totalSessionsCompleted: number;
}

const initialState: WritingProgressState = {
  records: [],
  totalSessionsCompleted: 0,
};

const writingProgressSlice = createSlice({
  name: 'writingProgress',
  initialState,
  reducers: {
    recordWritingAttempt(
      state,
      action: PayloadAction<{ cardId: string; character: string; mistakes: number }>
    ) {
      const { cardId, character, mistakes } = action.payload;
      const existing = state.records.find((r) => r.cardId === cardId);
      if (existing) {
        if (mistakes < existing.bestMistakes) {
          existing.bestMistakes = mistakes;
        }
        existing.totalAttempts += 1;
        existing.lastPracticedAt = Date.now();
      } else {
        state.records.push({
          cardId,
          character,
          bestMistakes: mistakes,
          totalAttempts: 1,
          lastPracticedAt: Date.now(),
        });
      }
    },
    incrementSessionsCompleted(state) {
      state.totalSessionsCompleted += 1;
    },
    resetWritingProgress() {
      return initialState;
    },
  },
});

export const { recordWritingAttempt, incrementSessionsCompleted, resetWritingProgress } =
  writingProgressSlice.actions;

export default writingProgressSlice.reducer;
