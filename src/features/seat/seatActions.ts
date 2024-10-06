import { apiClient } from '@/core/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setErrorMessage } from '../app/appSlice';
import { ICreateSeatRequest, IGetSeatRequest } from './interfaces';

export const getListSeats = createAsyncThunk(
  'getListSeats',
  async (payload: IGetSeatRequest, { rejectWithValue, dispatch }) => {
    const response: any = await apiClient.get(`payments/user_license?page=${payload.page}`, {
      headers: {},
    });
    if (response?.isError) {
      dispatch(setErrorMessage(response.data ?? response.message));
      return rejectWithValue(response.message);
    }
    return response;
  }
);

export const createSeat = createAsyncThunk(
  'createSeat',
  async (payload: ICreateSeatRequest, { rejectWithValue, dispatch }) => {
    const response: any = await apiClient.post('payments/user_license', payload, {
      headers: {},
    });
    if (response?.isError) {
      dispatch(setErrorMessage({ message: response.data.error }));
      return rejectWithValue(response.message);
    }
    await dispatch(getListSeats({ page: 1 }));
    return response;
  }
);

export const deleteSeat = createAsyncThunk('deleteSeat', async (payload: string, { rejectWithValue, dispatch }) => {
  const response: any = await apiClient.delete(`payments/user_license/${payload}`, {
    headers: {},
  });
  if (response?.isError) {
    dispatch(setErrorMessage(response.data ?? response.message));
    return rejectWithValue(response.message);
  }
  await dispatch(getListSeats({ page: 1 }));
  return response;
});
