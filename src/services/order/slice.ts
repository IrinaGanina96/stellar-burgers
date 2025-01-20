import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrder, getOrderByNumber } from './action';

type TOrderState = {
  orders: TOrder[];
  ordersState: TOrder | null;
  loading: boolean;
  error: string | null;
  selectedOrderNumber: string | null;
};

export const initialState: TOrderState = {
  orders: [],
  ordersState: null,
  loading: false,
  error: null,
  selectedOrderNumber: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    getOrderState: (state) => state.orders,
    getOrdersState: (state) => state.ordersState,
    getLoading: (state) => state.loading,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка';
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.ordersState = action.payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка';
      });
  }
});

export const { getOrderState, getOrdersState, getLoading, getError } =
  orderSlice.selectors;
export default orderSlice;
