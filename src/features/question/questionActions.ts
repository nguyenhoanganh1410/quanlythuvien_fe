import { apiClient } from '@/core/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setErrorMessage } from '../app/appSlice';
import { ICreateQuestionRequest, IEditQuestionRequest } from './interfaces';

export const getListQuestions = createAsyncThunk('getListQuestions', async (_, { rejectWithValue, dispatch }) => {
  const response: any = await apiClient.get('questions/my_questions', {
    headers: {},
  });
  if (response?.isError) {
    dispatch(setErrorMessage(response.data ?? response.message));
    return rejectWithValue(response.message);
  }
  return response;
});

export const createQuestion = createAsyncThunk(
  'createQuestion',
  async (payload: ICreateQuestionRequest, { rejectWithValue, dispatch }) => {
    const response: any = await apiClient.post('questions/my_questions', payload, {
      headers: {},
    });
    if (response?.isError) {
      dispatch(setErrorMessage(response.data ?? response.message));
      return rejectWithValue(response.message);
    }
    await dispatch(getListQuestions());
    return response;
  }
);

export const editQuestion = createAsyncThunk(
  'editQuestion',
  async (payload: IEditQuestionRequest, { rejectWithValue, dispatch }) => {
    const response: any = await apiClient.put(`questions/my_questions/${payload.id}`, payload, {
      headers: {},
    });
    if (response?.isError) {
      dispatch(setErrorMessage(response.data ?? response.message));
      return rejectWithValue(response.message);
    }
    await dispatch(getListQuestions());
    return response;
  }
);

export const deleteQuestion = createAsyncThunk(
  'deleteQuestion',
  async (payload: string, { rejectWithValue, dispatch }) => {
    const response: any = await apiClient.delete(`questions/my_questions/${payload}`, {
      headers: {},
    });
    if (response?.isError) {
      dispatch(setErrorMessage(response.data ?? response.message));
      return rejectWithValue(response.message);
    }
    await dispatch(getListQuestions());
    return response;
  }
);
