/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from '@/core/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setErrorMessage } from '../app/appSlice';
import {
  IRequestPaymentForm,
  IRequestForgotPassword,
  IRequestLogout,
  IRequestRefreshToken,
  IRequestResetPassword,
  IRequestSignIn,
  IRequestSignUp,
  IRequestUpdateUser,
  IRequestVerifyTokenResetPassword,
  ISearchUserOptions,
} from './interfaces';
import { localStorageKeys } from '@/constants';
import { setShowPopupExistEmail } from './userSlice';

export const signUp = createAsyncThunk(
  'user/signup',
  async (payload: IRequestSignUp, { rejectWithValue, dispatch }) => {
    const response = await apiClient.post<IRequestSignUp>('user/signup', payload, {
      headers: {
        Authorization: '',
      },
    });
    if (response?.isError) {
      // dispatch(setErrorMessage(response.data ?? response.message));
      if (response.data.message === 'Email already exists.') {
        await dispatch(setShowPopupExistEmail(true));
      }
      return rejectWithValue(response.message);
    }
    await dispatch(
      signIn({
        email: payload.email,
        password: payload.password,
      })
    );
    return response;
  }
);

export const signIn = createAsyncThunk('auth/sign-in', async (payload: IRequestSignIn, { rejectWithValue, dispatch }) => {
  const response = await apiClient.post<IRequestSignIn>('auth/sign-in', payload, {
    headers: {
      Authorization: '',
    },
  });
  if (response?.isError) {
    dispatch(setErrorMessage(response.data ?? response.message));
    return rejectWithValue(response.message);
  }
  return response;
});

export const logout = createAsyncThunk('user/logout', async () => {
  return true;
});

export const refreshNewToken = createAsyncThunk('user/token_refresh', async (_, { rejectWithValue, dispatch }) => {
  const response = await apiClient.post<IRequestRefreshToken>(
    'user/token_refresh',
    {
      refresh: localStorage.getItem(localStorageKeys.refreshToken)!,
    },
    {
      headers: {
        Authorization: '',
      },
    }
  );
  if (response?.isError) {
    await dispatch(logout());
    dispatch(setErrorMessage(response.data ?? response.message));
    return rejectWithValue(response.message);
  }
  return response;
});

export const getProfile = createAsyncThunk('users/my-profile', async (_, { rejectWithValue }) => {
  const response: any = await apiClient.get('users/my-profile', {
    headers: {},
  });
  // localStorage.setItem(localStorageKeys.accessToken, action.payload.accessToken);
  if (response?.isError) {
    return rejectWithValue(response.message);
  }
  return response;
});

export const getPaymentStatus = createAsyncThunk('payments/status', async (_, { rejectWithValue }) => {
  const response: any = await apiClient.get('payments/status', {
    headers: {},
  });
  if (response?.isError) {
    return rejectWithValue(response.message);
  }
  return response;
});

export const updateUserInfo = createAsyncThunk(
  'user/update-my-profile',
  async (payload: IRequestUpdateUser, { rejectWithValue }) => {
    const response: any = await apiClient.put(`user/my_profile`, payload, {
      headers: {},
    });
    if (response?.isError) {
      return rejectWithValue(response.message);
    }
    return response;
  }
);

export const forgotPassword = createAsyncThunk(
  `forgotPassword`,
  async (payload: IRequestForgotPassword, { rejectWithValue }) => {
    const response: any = await apiClient.post(`user/password_reset`, payload, {
      headers: {
        Authorization: '',
      },
    });
    if (response?.isError) {
      return rejectWithValue({
        message: response.message,
      });
    }
    return response;
  }
);

export const resetPassword = createAsyncThunk(
  `resetPassword`,
  async (payload: IRequestResetPassword, { rejectWithValue }) => {
    const response: any = await apiClient.post(`user/password_reset/confirm`, payload, {
      headers: {
        Authorization: '',
      },
    });
    if (response?.isError) {
      return rejectWithValue({
        message: response.message,
      });
    }
    return response;
  }
);

export const verifyTokenResetPassword = createAsyncThunk(
  `verifyTokenResetPassword`,
  async (payload: IRequestVerifyTokenResetPassword, { rejectWithValue }) => {
    const response: any = await apiClient.post(`user/password_reset/validate_token`, payload, {
      headers: {
        Authorization: '',
      },
    });
    if (response?.isError) {
      return rejectWithValue({
        message: response.message,
      });
    }
    return response;
  }
);

export const applyPromoCode = createAsyncThunk(
  'user/apply_promo_code',
  async (payload: IRequestPaymentForm, { rejectWithValue }) => {
    const response: any = await apiClient.post(`user/apply_promo_code`, payload, {
      headers: {},
    });
    if (response?.isError) {
      return rejectWithValue(response.message);
    }
    return response;
  }
);

export const checkPromoCode = createAsyncThunk(
  'user/check_promo_code',
  async (payload: IRequestPaymentForm, { rejectWithValue }) => {
    const response: any = await apiClient.post(`user/check_promo_code`, payload, {
      headers: {},
    });
    if (response?.isError) {
      return rejectWithValue(response.message);
    }
    return response;
  }
);

export const getListUserOptions = createAsyncThunk(
  'user/users',
  async (payload: ISearchUserOptions, { rejectWithValue, dispatch }) => {
    const response: any = await apiClient.get('user/users', {
      params: {
        search: payload.search ?? '',
        pageSize: 10,
        page: payload.page ?? 1,
      },
      headers: {},
    });
    if (response?.isError) {
      dispatch(setErrorMessage(response.data ?? response.message));
      return rejectWithValue(response.message);
    }
    return response;
  }
);
