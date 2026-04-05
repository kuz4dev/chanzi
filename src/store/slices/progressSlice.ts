import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CardProgress, Rating } from '@/types';

interface Session {
  id: string;
  deckId: string;
  date: number;
  cardsReviewed: number;
}

interface ProgressState {
  sessions: Session[];
  streak: number;
  totalReviewed: number;
  cardProgress: CardProgress[];
  lastSessionDate: number | null;
}

const initialState: ProgressState = {
  sessions: [],
  streak: 0,
  totalReviewed: 0,
  cardProgress: [],
  lastSessionDate: null,
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    recordRating(
      state,
      action: PayloadAction<{ cardId: string; rating: Rating }>
    ) {
      const { cardId, rating } = action.payload;
      const existing = state.cardProgress.find((p) => p.cardId === cardId);
      if (existing) {
        existing.rating = rating;
        existing.reviewedAt = Date.now();
      } else {
        state.cardProgress.push({ cardId, rating, reviewedAt: Date.now() });
      }
      state.totalReviewed += 1;
    },
    addSession(state, action: PayloadAction<Omit<Session, 'id'>>) {
      const session: Session = {
        ...action.payload,
        id: `session-${Date.now()}`,
      };
      state.sessions.push(session);
      state.lastSessionDate = session.date;
    },
    updateStreak(state, action: PayloadAction<number>) {
      state.streak = action.payload;
    },
    resetProgress() {
      return initialState;
    },
  },
});

export const { recordRating, addSession, updateStreak, resetProgress } =
  progressSlice.actions;

export default progressSlice.reducer;
