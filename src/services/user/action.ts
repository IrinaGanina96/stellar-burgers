import { forgotPasswordApi, getUserApi, loginUserApi, logoutApi, registerUserApi, resetPasswordApi, TLoginData, TRegisterData, updateUserApi} from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk (
    "user/login",
    async (data: TLoginData) => {
        return loginUserApi(data)
    }
);

export const logout = createAsyncThunk (
    "user/logout",
    async () => {
        return logoutApi()
    }
);

export const getUser = createAsyncThunk (
    "user/get",
    async () => {
        return getUserApi()
    }
);

export const updateUser = createAsyncThunk (
    "user/update",
    async (user: Partial<TRegisterData>) => {
        return updateUserApi(user)
    }
);

export const registerUser = createAsyncThunk (
    "user/register",
    async (data: TRegisterData) => {
        return registerUserApi(data)
    }
);

export const forgotPassword = createAsyncThunk (
    "user/forgotPassword",
    async (data: { email: string }) => {
        return forgotPasswordApi(data)
    }
);

export const resetPassword = createAsyncThunk (
    "user/resetPassword",
    async (data: { password: string; token: string }) => {
        return resetPasswordApi(data)
    }
);
