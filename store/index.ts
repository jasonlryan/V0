// Create store configuration
import { configureStore } from '@reduxjs/toolkit';
import { authReducer, documentsReducer, notesReducer, insightsReducer } from './slices';
import { useDispatch as useReduxDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    documents: documentsReducer,
    notes: notesReducer,
    insights: insightsReducer,
  },
});

// Added TypeScript types for store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useReduxDispatch<AppDispatch>(); 