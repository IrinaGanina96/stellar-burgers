import { getOrderByNumberApi, getOrdersApi } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrder = createAsyncThunk('order/get', async () =>
  getOrdersApi()
);

export const getOrderByNumber = createAsyncThunk(
  'feed/getOrderBurger',
  async (number: number) => getOrderByNumberApi(number)
);
