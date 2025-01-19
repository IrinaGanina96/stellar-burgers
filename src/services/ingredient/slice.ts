import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TIngredient } from "@utils-types";
import { getIngredient } from "./action";

type TIngredientsState = {
    ingredients: TIngredient[];
    loading: boolean;
    error: string | null;
}

export const initialState: TIngredientsState = {
    ingredients: [],
    loading: false,
    error: null,
}

export const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {
        setIngredients: (state, action: PayloadAction<TIngredient[]>) => {
        state.ingredients = action.payload
     }
 },
    selectors: {
        getIngredients: state => state.ingredients,
        getLoading: state => state.loading,
        getError: state => state.error,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getIngredient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getIngredient.fulfilled, (state, action) => {
                state.loading = false;
                state.ingredients = action.payload;
            })
            .addCase(getIngredient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Не удалось получить ингредиенты'
            })
        }
    })

export const { getIngredients, getLoading, getError } = ingredientsSlice.selectors;
export const { setIngredients } = ingredientsSlice.actions;
export default ingredientsSlice;
