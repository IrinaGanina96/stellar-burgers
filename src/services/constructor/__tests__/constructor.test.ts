import { TIngredient } from "@utils-types";
import constructorSlice, { addIngredient, removeIngredient } from "../slice";
import { AnyAction } from "@reduxjs/toolkit";
import { getOrderBurger } from "../action";

describe('Тест constructorSlice', () => {
    const initialState = constructorSlice.getInitialState();

    it('Начальное состояние', () => {
        const state = constructorSlice.reducer(undefined, {} as AnyAction);
        expect(state).toEqual(initialState);
      });

    it('Добавление булки', () => {
        const bun = {
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
        }

        const action = constructorSlice.actions.addIngredient(bun);   
        const state = constructorSlice.reducer(initialState, action);
        expect(state.constructorItems.bun).toEqual({...bun, id: expect.any(String)});
        expect(state.constructorItems.ingredients).toEqual([]);
    }); 

    it('Добавление ингредиента', () => {
        const ingredient:TIngredient= {
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
    
        const action = constructorSlice.actions.addIngredient(ingredient);   
        const state = constructorSlice.reducer(initialState, action);
        expect(state.constructorItems.ingredients).toEqual([{...ingredient, id: expect.any(String)}]);
        expect(state.constructorItems.bun).toBeNull();
    }); 

    it('Удаление ингредиента', () => {
        const ingredient:TIngredient= {
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

        const actionAdd = constructorSlice.actions.addIngredient(ingredient); 
        const stateWithIngredient = constructorSlice.reducer(initialState, actionAdd);
        const ingredientToRemoveId = stateWithIngredient.constructorItems.ingredients[0].id;
        const actionRemove = constructorSlice.actions.removeIngredient(ingredientToRemoveId);
        const state = constructorSlice.reducer(stateWithIngredient, actionRemove);
        expect(state.constructorItems.ingredients).toEqual([]);
    }); 

    it('Перемещение ингредиента вниз', () => {
        const ingredient:TIngredient= {
            _id: "1",
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
        const ingredient2:TIngredient= {
            _id: "2",
            name: "Соус Spicy-X",
            type: "sauce",
            proteins: 30,
            fat: 20,
            carbohydrates: 40,
            calories: 30,
            price: 90,
            image: "https://code.s3.yandex.net/react/code/sauce-02.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
        }
        
        const actionAdd = constructorSlice.actions.addIngredient(ingredient); 
        const stateWithIngredient = constructorSlice.reducer(initialState, actionAdd);
        const actionAdd2 = constructorSlice.actions.addIngredient(ingredient2); 
        const stateWithIngredient2 = constructorSlice.reducer(stateWithIngredient, actionAdd2);
        
        const moveDownIngredientAction = constructorSlice.actions.moveDownIngredientCount(0); 
        const stateAfterMove = constructorSlice.reducer(stateWithIngredient2, moveDownIngredientAction);
        expect(stateAfterMove.constructorItems.ingredients[0].name).toBe(ingredient2.name);
        expect(stateAfterMove.constructorItems.ingredients[1].name).toBe(ingredient.name);
    }); 

    it('Перемещение ингредиента вверх', () => {
        const ingredient:TIngredient= {
            _id: "1",
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
        const ingredient2:TIngredient= {
            _id: "2",
            name: "Соус Spicy-X",
            type: "sauce",
            proteins: 30,
            fat: 20,
            carbohydrates: 40,
            calories: 30,
            price: 90,
            image: "https://code.s3.yandex.net/react/code/sauce-02.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
        }
        
        const actionAdd = constructorSlice.actions.addIngredient(ingredient); 
        const stateWithIngredient = constructorSlice.reducer(initialState, actionAdd);
        const actionAdd2 = constructorSlice.actions.addIngredient(ingredient2); 
        const stateWithIngredient2 = constructorSlice.reducer(stateWithIngredient, actionAdd2);
        
        const moveUpIngredientAction = constructorSlice.actions.moveUpIngredientCount(1); 
        const stateAfterMove = constructorSlice.reducer(stateWithIngredient2, moveUpIngredientAction);
        expect(stateAfterMove.constructorItems.ingredients[0].name).toBe(ingredient2.name);
        expect(stateAfterMove.constructorItems.ingredients[1].name).toBe(ingredient.name);
    }); 

    it('Очищение конструктора', () => {
        const ingredient:TIngredient= {
            _id: "1",
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
        const actionAdd = constructorSlice.actions.addIngredient(ingredient); 
        const stateWithIngredient = constructorSlice.reducer(initialState, actionAdd);
        const resetAction = constructorSlice.actions.resetOrderModalData(); 
        const state = constructorSlice.reducer(stateWithIngredient, resetAction);
        expect(state).toEqual(initialState);
    }); 

    it('Должен обрабатывать pending', () => {
        const action = { type: getOrderBurger.pending.type };
        const state = constructorSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, loading: true, orderRequest: true});
    });

    it('Должен обрабатывать fulfilled', () => {
        const action = { type: getOrderBurger.fulfilled.type, payload: { order: 123} };
        const state = constructorSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, orderModalData: 123});
    });

    it('Должен обрабатывать rejected', () => {
        const action = { type: getOrderBurger.rejected.type, error: { message:"Test"} };
        const state = constructorSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, error:"Test"});
    });
})
