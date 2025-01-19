import { getFeedsApi, getOrderByNumberApi, getOrdersApi, orderBurgerApi } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getFeed = createAsyncThunk (
    "feed/getFeed",
    async () => {
        return getFeedsApi()
    }
);

export const getOrderByNumber = createAsyncThunk (
    "feed/getOrderBurger",
    async (number: number) => {
        return getOrderByNumberApi(number)
    }
);
