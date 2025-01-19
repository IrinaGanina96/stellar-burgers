import { createSlice} from "@reduxjs/toolkit";
import { TOrder } from "@utils-types";
import { getFeed, getOrderByNumber } from "./action";

type TFeedState = {
    orders: TOrder[];
    ordersState: TOrder | null;
    loading: boolean; 
    error: string | null; 
    total: number;
    totalToday: number;
}

export const initialState: TFeedState = {
    orders: [],
    ordersState: null,
    loading: false,  
    error: null,
    total: 0,
    totalToday: 0,
}

export const feedSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {},
    selectors: {
        getFeedState: state => state.orders,
        getOrdersState: state => state.ordersState,
        getTotal: state => state.total,
        getTotalToday: state => state.totalToday,
        getLoading: state => state.loading,
        getError: state => state.error,
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
                state.error = action.error.message || 'Ошибка'
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
                state.error = action.error.message || 'Ошибка'
            })
    }
})

export const { getFeedState, getOrdersState, getTotal, getTotalToday, getLoading, getError } = feedSlice.selectors;
export default feedSlice;
