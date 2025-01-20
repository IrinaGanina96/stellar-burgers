import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user/slice';
import { ingredientsSlice } from './ingredient/slice';
import { feedSlice } from './feed/slice';
import { orderSlice } from './order/slice';
import { constructorSlice } from './constructor/slice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  ingredients: ingredientsSlice.reducer,
  feed: feedSlice.reducer,
  order: orderSlice.reducer,
  constructorBurger: constructorSlice.reducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
