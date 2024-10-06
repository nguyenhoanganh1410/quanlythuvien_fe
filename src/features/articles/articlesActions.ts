import { createAsyncThunk } from '@reduxjs/toolkit';
import { setErrorMessage } from '../app/appSlice';
import { ISearchArticlesRequest } from './interfaces';
import axios from 'axios';
import { camelizeKeys } from 'humps';

export const getListArticles = createAsyncThunk(
  '/article/search',
  async (payload: ISearchArticlesRequest, { rejectWithValue, dispatch }) => {
    const response: any = await axios.get(`${import.meta.env.VITE_API_URI}/article/search`, {
      params: {
        pageSize: 10000,
        page: payload.page ?? 1,
      },
      headers: {},
    });
    if (response?.isError) {
      dispatch(setErrorMessage(response.data ?? response.message));

      return rejectWithValue(response.message);
    }
    const res = camelizeKeys(response.data);
    return res;
  }
);
