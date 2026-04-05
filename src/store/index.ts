import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cardsReducer from './slices/cardsSlice';
import progressReducer from './slices/progressSlice';
import settingsReducer from './slices/settingsSlice';
import { cardsApi } from '@/services/api/cardsApi';

const persistConfig = {
  key: 'chanzhi-root',
  storage,
  whitelist: ['progress', 'settings'],
};

const rootReducer = combineReducers({
  cards: cardsReducer,
  progress: progressReducer,
  settings: settingsReducer,
  [cardsApi.reducerPath]: cardsApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER',
        ],
      },
    }).concat(cardsApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
