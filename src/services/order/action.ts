import { getOrdersApi } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getOrder = createAsyncThunk (
    "order/get",
    async () => {
        return getOrdersApi()
    }
);
