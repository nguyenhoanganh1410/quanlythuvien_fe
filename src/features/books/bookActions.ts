import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@/core/api';
import { setErrorMessage } from '../app/appSlice';

export const getListBooks = createAsyncThunk('/books', async (_, { rejectWithValue }) => {
  const response: any = await apiClient.get('books', {
    headers: {},
  });
  if (response?.isError) {
    return rejectWithValue(response.message);
  }
  return response;
});

export const creatBook = createAsyncThunk('/books', async (payload: any, { rejectWithValue, dispatch }) => {
  const response: any = await apiClient.post('books', payload, {
    headers: {},
  });
  if (response?.isError) {
    dispatch(setErrorMessage({ message: response.data.error }));
    return rejectWithValue(response.message);
  }
  return response;
});
