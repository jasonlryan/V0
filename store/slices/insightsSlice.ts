import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Insight, SystemTag } from '../../types';

interface InsightsState {
  insights: Insight[];
  loading: boolean;
  error: string | null;
}

const initialState: InsightsState = {
  insights: [],
  loading: false,
  error: null,
};

export const insightsSlice = createSlice({
  name: 'insights',
  initialState,
  reducers: {
    setInsights: (state, action: PayloadAction<Insight[]>) => {
      state.insights = action.payload;
    },
    addInsight: (state, action: PayloadAction<Insight>) => {
      state.insights.push(action.payload);
    },
    removeInsight: (state, action: PayloadAction<string>) => {
      state.insights = state.insights.filter(insight => insight.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setInsights, addInsight, removeInsight, setLoading, setError } = insightsSlice.actions;
export const insightsReducer = insightsSlice.reducer; 