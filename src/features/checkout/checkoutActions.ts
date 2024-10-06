import { apiClient } from '@/core/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICheckPromoCodeRequest, ICheckoutRequest } from './interfaces';

export const addSubscription = createAsyncThunk(
  'addSubscription',
  async (payload: ICheckoutRequest, { rejectWithValue }) => {
    const response: any = await apiClient.post<ICheckoutRequest>(`payments/stripe/subscription`, payload, {
      headers: {},
    });
    if (response?.isError) {
      return rejectWithValue(response.message);
    }
    return response;
  }
);

export const checkPromoCode = createAsyncThunk(
  'checkPromoCode',
  async (payload: ICheckPromoCodeRequest, { rejectWithValue }) => {
    const response = await apiClient.post<ICheckPromoCodeRequest>(`user/check_promo_code`, payload, {
      headers: {},
    });
    if (response?.isError) {
      return rejectWithValue(response.message);
    }
    return response;
  }
);
