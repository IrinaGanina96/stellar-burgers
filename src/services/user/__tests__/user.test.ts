import { AnyAction } from "@reduxjs/toolkit";
import { forgotPassword, getUser, login, logout, registerUser, resetPassword, updateUser } from "../action";
import userSlice from "../slice";

describe('Тест orderSlice', () => {
    const initialState =  userSlice.getInitialState();

    it('должен возвращать начальное состояние', () => {
        const state = userSlice.reducer(undefined, {} as AnyAction);
        expect(state).toEqual(initialState);
    });
 
      it('должен обрабатывать setIsAuthChecked action', () => {
         const action = userSlice.actions.setIsAuthChecked(true);
         const state = userSlice.reducer(initialState, action);
         expect(state.isAuthChecked).toBe(true);
     });

    it('Должен обрабатывать pending login', () => {
        const action = { type: login.pending.type };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, loading: true});
    });

    it('Должен обрабатывать fulfilled login', () => {
        const user = {
            "email": "irina@yandex.ru",
            "name": "Ирина"
        }
        
        const action = { type: login.fulfilled.type, payload: {user}};
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, user: user, isAuthChecked: true});
    });

    it('Должен обрабатывать rejected login', () => {
        const action = { type: login.rejected.type, error: { message:"Test"} };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, error:"Test"});
    });

    it('Должен обрабатывать pending logout', () => {
        const action = { type: logout.pending.type };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, loading: true});
    });

    it('Должен обрабатывать fulfilled logout', () => {
        const action = { type: logout.fulfilled.type};
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, user: null, isAuthChecked: false});
    });

    it('Должен обрабатывать rejected logout', () => {
        const action = { type: logout.rejected.type, error: { message:"Test"} };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, error:"Test"});
    });

    it('Должен обрабатывать pending getUser', () => {
        const action = { type: getUser.pending.type };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, loading: true});
    });

    it('Должен обрабатывать fulfilled getUser', () => {
        const user = {
            "email": "irina@yandex.ru",
            "name": "Ирина"
        }
        
        const action = { type: getUser.fulfilled.type, payload: {user}};
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, user: user, isAuthChecked: true});
    });

    it('Должен обрабатывать rejected getUser', () => {
        const action = { type: getUser.rejected.type, error: { message:"Test"} };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, error:"Test"});
    });

    it('Должен обрабатывать pending updateUser', () => {
        const action = { type: updateUser.pending.type };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, loading: true});
    });

    it('Должен обрабатывать fulfilled updateUser', () => {
        const user = {
            "email": "irina@yandex.ru",
            "name": "Ирина"
        }
        
        const action = { type: updateUser.fulfilled.type, payload: {user}};
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, user: user});
    });

    it('Должен обрабатывать rejected updateUser', () => {
        const action = { type: updateUser.rejected.type, error: { message:"Test"} };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, error:"Test"});
    });

    it('Должен обрабатывать pending registerUser', () => {
        const action = { type: registerUser.pending.type };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, loading: true});
    });

    it('Должен обрабатывать fulfilled registerUser', () => {
        const user = {
            "email": "irina@yandex.ru",
            "name": "Ирина"
        }
        
        const action = { type: registerUser.fulfilled.type, payload: {user}};
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, user: user});
    });

    it('Должен обрабатывать rejected registerUser', () => {
        const action = { type: registerUser.rejected.type, error: { message:"Test"} };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, error:"Test"});
    });

    it('Должен обрабатывать pending forgotPassword', () => {
        const action = { type: forgotPassword.pending.type };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, loading: true});
    });

    it('Должен обрабатывать fulfilled forgotPassword', () => {
        const action = { type: forgotPassword.fulfilled.type};
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, error:"Отправлено электронное письмо для сброса пароля"});
    });

    it('Должен обрабатывать rejected forgotPassword', () => {
        const action = { type: forgotPassword.rejected.type, error: { message:"Test"} };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, error:"Test"});
    });

    it('Должен обрабатывать pending resetPassword', () => {
        const action = { type: resetPassword.pending.type };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, loading: true});
    });

    it('Должен обрабатывать fulfilled resetPassword', () => {
        const action = { type: resetPassword.fulfilled.type};
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, error:"Сброс пароля завершен успешно"});
    });

    it('Должен обрабатывать rejected resetPassword', () => {
        const action = { type: resetPassword.rejected.type, error: { message:"Test"} };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, error:"Test"});
    });

})
