import { TConstructorIngredient, TIngredient, TOrder } from "@utils-types";
import { getOrderBurger } from "./action";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

type TBurgerConstructor = {
    constructorItems: {
        bun: TConstructorIngredient | null;
        ingredients: TConstructorIngredient[];
    };
    orderRequest: boolean;
    orderModalData: TOrder | null;
    loading: boolean;
    error: string | null;
  };

export const initialState: TBurgerConstructor = {
    constructorItems: {
        bun: null,
        ingredients: [],
       },
        orderRequest: false,
        orderModalData: null,
        loading: false,
        error: null,
}

export const constructorSlice = createSlice({
    name: "constructorBurger",
    initialState,
    reducers: {
        addIngredient: {
            reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
              if (action.payload.type === 'bun') {
                state.constructorItems.bun = action.payload;
              } else {
                state.constructorItems.ingredients.push({ ...action.payload });
              }
            },
            prepare: (ingredient: TIngredient) => {
              const id = nanoid();
              return { payload: { ...ingredient, id: id } };
            }
          },
        removeIngredient: (state, action: PayloadAction<string>) => {
            state.constructorItems.ingredients = state.constructorItems.ingredients.filter(ingredient => ingredient.id!== action.payload);
        },
        moveDownIngredientCount: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            const ingredients = [...state.constructorItems.ingredients];
            if (index < ingredients.length - 1) {
              [ingredients[index], ingredients[index + 1]] = [ingredients[index + 1], ingredients[index]];
              state.constructorItems.ingredients = ingredients;
            }
        },
        moveUpIngredientCount: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            const ingredients = [...state.constructorItems.ingredients];
            if (index > 0) {
              [ingredients[index], ingredients[index - 1]] = [ingredients[index - 1], ingredients[index]];
              state.constructorItems.ingredients = ingredients;
            }
        },
        resetOrderModalData: (state) => { 
            state.constructorItems = {
                bun: null,
                ingredients: [],
            },         
            state.loading = false;
            state.error = null;
            state.orderModalData = null;
            state.orderRequest = false;
        }
    },
    selectors: {
        getConstructorItems: state => state.constructorItems,
        getOrderRequest: state => state.orderRequest,
        getOrderModalData: state => state.orderModalData,
        getLoading: state => state.loading,
        getError: state => state.error,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrderBurger.pending, (state) => {
                state.orderRequest = true;
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrderBurger.fulfilled, (state, action) => {
                state.orderRequest = false;
                state.loading = false;
                state.error = null;
                state.orderModalData = action.payload.order;
            })
            .addCase(getOrderBurger.rejected, (state, action) => {
                state.orderRequest = false;
                state.loading = false;
                state.error = action.error.message || 'Ошибка'
            })
    }
})

export const { addIngredient, removeIngredient, moveDownIngredientCount, moveUpIngredientCount, resetOrderModalData } = constructorSlice.actions;
export const { getConstructorItems, getOrderRequest, getOrderModalData, getLoading, getError } = constructorSlice.selectors;
export default constructorSlice;
