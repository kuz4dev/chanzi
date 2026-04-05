import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { HskLevel } from '@/types';

interface SettingsState {
  hskLevel: HskLevel;
  theme: 'light' | 'dark' | 'system';
  dailyGoal: number;
  language: 'ru' | 'en';
}

const initialState: SettingsState = {
  hskLevel: 1,
  theme: 'system',
  dailyGoal: 20,
  language: 'ru',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setHskLevel(state, action: PayloadAction<HskLevel>) {
      state.hskLevel = action.payload;
    },
    setTheme(state, action: PayloadAction<SettingsState['theme']>) {
      state.theme = action.payload;
    },
    setDailyGoal(state, action: PayloadAction<number>) {
      state.dailyGoal = action.payload;
    },
    setLanguage(state, action: PayloadAction<SettingsState['language']>) {
      state.language = action.payload;
    },
  },
});

export const { setHskLevel, setTheme, setDailyGoal, setLanguage } =
  settingsSlice.actions;

export default settingsSlice.reducer;
