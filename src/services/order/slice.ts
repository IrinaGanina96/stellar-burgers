import { createSlice } from "@reduxjs/toolkit";
import { TOrder } from "@utils-types";
import { getOrder } from "./action";

type TOrderState = {
    orders: TOrder[];
    loading: boolean;
    error: string | null;
}

export const initialState: TOrderState = {
    orders: [],
    loading: false,  
    error: null
}

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    selectors: {
        getOrderState: state => state.orders,
        getLoading: state => state.loading,
        getError: state => state.error,
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
    }
})

export const { getOrderState, getLoading, getError } = orderSlice.selectors;
export default orderSlice;
