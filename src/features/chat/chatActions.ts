/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from '@/core/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setErrorMessage, setShowUnlock } from '../app/appSlice';
import {
  IChatSession,
  ICreateChatSessionRequest,
  IMessage,
  IQuestionChatRequest,
  ISearchFeedbacksRequest,
} from './interfaces';
import { setCurrentChatSession } from './chatSlice';

export const getListChatSessions = createAsyncThunk(
  'getListChat',
  async (payload: string, { rejectWithValue, dispatch }) => {
    const response: any = await apiClient.get('chat/chat_sessions', {
      params: {
        policy_capture: payload,
      },
      headers: {},
    });
    if (response?.isError) {
      dispatch(setErrorMessage(response.data ?? response.message));
      return rejectWithValue(response.message);
    }
    const options: IChatSession[] = response.options;
    const lastChatSession = options.pop();
    // lastChatSession && (await dispatch(getDetailChatSession(lastChatSession.id)));
    lastChatSession && (await dispatch(setCurrentChatSession(lastChatSession)));
    return response;
  }
);

export const getDetailChatSession = createAsyncThunk(
  'getDetailChat',
  async (payload: string, { rejectWithValue, dispatch }) => {
    const response: any = await apiClient.get(`chat/chat_sessions/${payload}`, {
      headers: {},
    });
    if (response?.isError) {
      dispatch(setErrorMessage(response.data ?? response.message));
      return rejectWithValue(response.message);
    }
    return response;
  }
);

export const createChatSession = createAsyncThunk(
  'createChatSession',
  async (payload: ICreateChatSessionRequest, { rejectWithValue, dispatch }) => {
    const response: any = await apiClient.post('chat/chat_sessions', payload, {
      headers: {},
    });
    if (response?.isError) {
      dispatch(setErrorMessage(response.data ?? response.message));
      return rejectWithValue(response.message);
    }
    return response;
  }
);

export const sendQuestionChat = createAsyncThunk(
  'sendQuestionChat',
  async (payload: IQuestionChatRequest, { rejectWithValue, dispatch }) => {
    const response: any = await apiClient.post(`chat/chat_sessions/${payload.chatSessionId}`, payload, {
      headers: {},
    });
    if (response?.isError) {
      if (response.data.error == 'Subscription has expired.') {
        dispatch(setShowUnlock(true));
        return rejectWithValue(response.message);
      }
      dispatch(setErrorMessage(response.data ?? response.message));
      return rejectWithValue(response.message);
    }
    return response;
  }
);

export const createFeedback = createAsyncThunk(
  'createFeedback',
  async (payload: IMessage, { rejectWithValue, dispatch }) => {
    const response: any = await apiClient.post('chat/feedback', payload, {
      headers: {},
    });
    if (response?.isError) {
      dispatch(setErrorMessage(response.data ?? response.message));
      return rejectWithValue(response.message);
    }
    return response;
  }
);

export const getListFeedbacks = createAsyncThunk(
  'getListFeedbacks',
  async (payload: ISearchFeedbacksRequest, { rejectWithValue, dispatch }) => {
    const response: any = await apiClient.get('chat/feedback', {
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

export const getListMessages = createAsyncThunk(
  'getListMessages',
  async (payload: ISearchFeedbacksRequest, { rejectWithValue, dispatch }) => {
    const response: any = await apiClient.get('chat/messages', {
      params: {
        pageSize: payload.pageSize ?? 10,
        pageNumber: payload.page ?? 1,
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
