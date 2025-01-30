import { getIngredient } from "../action";
import ingredientsSlice from "../slice";

describe('Тест ingredientsSlice', () => {
    const initialState =  ingredientsSlice.getInitialState();

    it('Должен обрабатывать pending', () => {
        const action = { type: getIngredient.pending.type };
        const state = ingredientsSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, loading: true});
    });

    it('Должен обрабатывать fulfilled', () => {
        const ingredients = [
            {
                _id: "1",
                name: "Краторная булка N-200i",
                type: "bun",
                proteins: 80,
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: "https://code.s3.yandex.net/react/code/bun-02.png",
                image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png"
            },
            {
                _id: "2",
                name: "Биокотлета из марсианской Магнолии",
                type: "main",
                proteins: 420,
                fat: 142,
                carbohydrates: 242,
                calories: 4242,
                price: 424,
                image: "https://code.s3.yandex.net/react/code/meat-01.png",
                image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png"
            }
        ];

        const action = { type: getIngredient.fulfilled.type, payload: ingredients };
        const state = ingredientsSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, ingredients});
    });

    it('Должен обрабатывать rejected', () => {
        const action = { type: getIngredient.rejected.type, error: { message:"Test"} };
        const state = ingredientsSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, error:"Test"});
    });
})
