import { apiClient } from '@/core/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setErrorMessage } from '../app/appSlice';
import { IRequestGetHomeValue } from './interfaces';

export const searchHomeValuation = createAsyncThunk(
  '/zillow/property',
  async (payload: IRequestGetHomeValue, { rejectWithValue, dispatch }) => {
    const response: any = await apiClient.post(`/zillow/property`, payload, {
      headers: {},
    });
    if (response?.isError) {
      dispatch(setErrorMessage(response.data ?? response.message));
      return rejectWithValue(response.message);
    }

    return response;
  }
);
