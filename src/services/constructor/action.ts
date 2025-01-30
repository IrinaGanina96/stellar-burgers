import { orderBurgerApi } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrderBurger = createAsyncThunk(
  'order/getOrderBurger',
  async (data: string[]) => orderBurgerApi(data)
);
