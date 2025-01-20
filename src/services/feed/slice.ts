import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeed } from './action';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;

  loading: boolean;
  error: string | null;
};

export const initialState: TFeedState = {
  orders: [],
  loading: false,
  error: null,
  total: 0,
  totalToday: 0
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedState: (state) => state.orders,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday,
    getLoading: (state) => state.loading,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка';
      });
  }
});

export const { getFeedState, getTotal, getTotalToday, getLoading, getError } =
  feedSlice.selectors;
export default feedSlice;
