import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "@utils-types";
import { forgotPassword, getUser, login, logout, registerUser, resetPassword, updateUser } from "./action";
import { deleteCookie, setCookie } from "../../utils/cookie";

type TUserState = {
    user: TUser | null; //данные пользователя (или null, если пользователь не аутентифицирован).
    isAuthChecked: boolean; //флаг для определения завершена ли проверка пользователя
    loading: boolean; //флаг, показывающий, что идёт загрузка.
    error: string | null; //строка с сообщением об ошибке
}

export const initialState: TUserState = {
    user: null,
    isAuthChecked: false,
    loading: false,  
    error: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
            state.isAuthChecked = action.payload;
        },
    },
    selectors: {
        getUserState: state => state.user,
        getIsAuthChecked: state => state.isAuthChecked,
        getLoading: state => state.loading,
        getError: state => state.error,
    },
    extraReducers: (builder) => {
        builder
        //обрабатывает момент начала загрузки 
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
        //обрабатывает успешный ответ, обновляет состояние
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthChecked = true;
                setCookie('accessToken', action.payload.accessToken);
                localStorage.setItem('refreshToken', action.payload.refreshToken);
            })
        //обрабатывает ошибку 
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка входа';
            })

            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthChecked = false;
                deleteCookie('accessToken');        
                localStorage.removeItem('refreshToken');
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка выхода';
            })

            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;         
                state.user = action.payload.user;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Не удалось получить доступ к пользователю';
            })

            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Не удалось обновить пользователя';
            })

            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                setCookie('accessToken', action.payload.accessToken);        
                localStorage.setItem('refreshToken', action.payload.refreshToken);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Не удалось выполнить регистрацию';
            })
            
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.loading = false;
                state.error = 'Отправлено электронное письмо для сброса пароля'
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Не удалось восстановить пароль';
            })

            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.loading = false;
                state.error = 'Сброс пароля завершен успешно';
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Не удалось сбросить пароль';
            });
    },
})

export const { getUserState, getIsAuthChecked, getLoading, getError } = userSlice.selectors;
export const { setIsAuthChecked } = userSlice.actions;
export default userSlice;

