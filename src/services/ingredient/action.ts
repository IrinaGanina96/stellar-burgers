import { getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getIngredient = createAsyncThunk('ingredients/get', async () =>
  getIngredientsApi()
);
