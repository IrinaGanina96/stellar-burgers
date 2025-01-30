import { combineReducers } from "@reduxjs/toolkit";
import constructorSlice, { initialState as initialConstructorState } from './constructor/slice';
import feedSlice, { initialState as initialFeedState } from './feed/slice';
import ingredientsSlice, { initialState as initialIngredientsState } from './ingredient/slice';
import orderSlice, { initialState as initialOrderState } from './order/slice';
import userSlice, { initialState as initialUserState } from './user/slice';

describe('Root Reducer', () => {
        it('Должен возвращать начальное состояние', () => {

          const rootReducer = combineReducers({
            user: userSlice.reducer,
            ingredients: ingredientsSlice.reducer,
            feed: feedSlice.reducer,
            order: orderSlice.reducer,
            constructorBurger: constructorSlice.reducer
          }); 
          
          const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
      
          expect(initialState).toEqual({
            user: initialUserState,
            ingredients: initialIngredientsState,
            feed: initialFeedState,
            order: initialOrderState,
            constructorBurger: initialConstructorState,
          });
        });
})
