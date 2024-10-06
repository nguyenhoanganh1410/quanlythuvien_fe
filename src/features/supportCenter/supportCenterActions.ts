import { apiClient } from '@/core/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setErrorMessage } from '../app/appSlice';
import {
  IArticleHelpfulRequest,
  ICreateConversationChatBoxResponse,
  ICreateRequest,
  ISendMessageChatBoxRequest,
  ISupportContactFormRequest,
} from './interfaces';

export const createRequest = createAsyncThunk(
  'article/feedback',
  async (payload: ICreateRequest, { rejectWithValue, dispatch }) => {
    const response = await apiClient.post('article/feedback', payload, {
      headers: {},
    });

    if (response?.isError) {
      dispatch(setErrorMessage(response.data ?? response.message));
      return rejectWithValue(response.message);
    }
    return response;
  }
);

export const getArticleHelpfulCount = createAsyncThunk(
  'articleHelpfulCount',
  async (payload: number, { rejectWithValue, dispatch }) => {
    const response: any = await apiClient.get(`article/${payload}/helpful`, {
      params: {},
      headers: {},
    });
    if (response?.isError) {
      dispatch(setErrorMessage(response.data ?? response.message));
      return rejectWithValue(response.message);
    }
    return response;
  }
);

export const Post = createAsyncThunk('postArticleHelpful', async (payload: number, { rejectWithValue, dispatch }) => {
  const response: any = await apiClient.get(`article/${payload}/helpful`, {
    params: {},
    headers: {},
  });
  if (response?.isError) {
    dispatch(setErrorMessage(response.data ?? response.message));
    return rejectWithValue(response.message);
  }
  return response;
});

export const articleHelpful = createAsyncThunk(
  'articleHelpful',
  async (payload: IArticleHelpfulRequest, { rejectWithValue, dispatch }) => {
    const response: any = await apiClient.post('article/helpful', payload, {
      headers: {},
    });
    if (response?.isError) {
      dispatch(setErrorMessage(response.data ?? response.message));
      return rejectWithValue(response.message);
    }
    return response;
  }
);

export const createConversationChatBox = createAsyncThunk(
  'createConversationChatBox',
  async (payload: ISupportContactFormRequest, { rejectWithValue, dispatch }) => {
    const req = {
      ...payload,
      phoneNumber: '+' + payload.phoneNumber,
    };
    const response: ICreateConversationChatBoxResponse = await apiClient.post('article/conversations/send', req, {
      headers: {},
    });
    if (response?.isError) {
      dispatch(setErrorMessage(response.message));
      return rejectWithValue(response.message);
    }
    return response;
  }
);

export const sendMessageChatBox = createAsyncThunk(
  'sendMessageChatBox',
  async (payload: ISendMessageChatBoxRequest, { rejectWithValue, dispatch }) => {
    const response: ICreateConversationChatBoxResponse = await apiClient.post('article/conversations', payload, {
      headers: {},
    });
    if (response?.isError) {
      dispatch(setErrorMessage(response.message));
      return rejectWithValue(response.message);
    }
    return response;
  }
);
