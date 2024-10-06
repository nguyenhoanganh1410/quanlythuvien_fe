import { apiClient } from '@/core/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setErrorMessage, setSuccessMessage } from '../app/appSlice';
import { ICreateReferral } from './interfaces';

export const createReferral = createAsyncThunk(
  'createReferral',
  async (payload: ICreateReferral, { rejectWithValue, dispatch }) => {
    const response: any = await apiClient.post('referrals/create', payload, {
      headers: {},
    });
    if (response?.isError) {
      dispatch(setErrorMessage(response.data ?? response.message));
      return rejectWithValue(response.message);
    }
    await dispatch(setSuccessMessage({ message: response.message }));
    return response.message;
  }
);
