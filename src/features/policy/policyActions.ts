import { apiClient } from '@/core/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setErrorMessage, setShowUnlock } from '../app/appSlice';
import { EFilterType, IDeletePolicyRequest, ISearchPoliciesRequest, IUpdatePolicyRequest } from './interfaces';
import { setShowPopupInCorrectPdf, setPdfFile } from './policySlice';

export const getListPolicies = createAsyncThunk(
  'policies/policy_captures',
  async (payload: ISearchPoliciesRequest, { rejectWithValue, dispatch }) => {
    const response: any = await apiClient.get('policies/policy_captures', {
      params: {
        search: payload.search ?? '',
        userId: payload.userId ?? null,
        filter: payload.filter ?? EFilterType.all,
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

export const getDetailPolicy = createAsyncThunk(
  'policies/policy_captures/:id',
  async (payload: string, { rejectWithValue, dispatch }) => {
    const response: any = await apiClient.get(`policies/policy_captures/${payload}`, {
      headers: {},
    });
    if (response?.isError) {
      dispatch(setErrorMessage(response.data ?? response.message));
      return rejectWithValue(response.message);
    }
    return response;
  }
);

export const checkPdfFile = createAsyncThunk(
  'policies/check_pdf',
  async (payload: FormData, { rejectWithValue, dispatch }) => {
    const response = await apiClient.post<FormData>('policies/check_pdf', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response?.isError) {
      if (response.data.message == 'Subscription has expired.') {
        dispatch(setShowUnlock(true));
        return rejectWithValue(response.message);
      }
      dispatch(setErrorMessage(response.data ?? response.message));
      return rejectWithValue(response.message);
    }
    if (response.isTextPdf) {
      payload.append('is_text_pdf', 'True');
      await dispatch(uploadPolicyFile(payload));
      dispatch(setShowPopupInCorrectPdf(false));
    } else {
      payload.append('is_text_pdf', 'False');
      dispatch(setShowPopupInCorrectPdf(true));
      dispatch(setPdfFile(payload));
    }
    return response;
  }
);

export const uploadPolicyFile = createAsyncThunk(
  'policies/new_attachments',
  async (payload: FormData, { rejectWithValue, dispatch }) => {
    const response = await apiClient.post<FormData>('policies/new_attachments', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response?.isError) {
      dispatch(setErrorMessage(response.data ?? response.message));
      return rejectWithValue(response.message);
    }
    dispatch(savePolicyFile(response.id));
    return response;
  }
);

export const savePolicyFile = createAsyncThunk(
  'policies/save',
  async (payload: string, { rejectWithValue, dispatch }) => {
    const response: any = await apiClient.put(`policies/save/${payload}`, undefined, {
      headers: {},
    });
    if (response?.isError) {
      dispatch(setErrorMessage(response.data ?? response.message));
      return rejectWithValue(response.message);
    }
    await dispatch(
      getListPolicies({
        search: '',
        filter: EFilterType.all,
      })
    );
    return response;
  }
);

export const getPolicyFileUrl = createAsyncThunk(
  'getFileUrl',
  async (payload: string, { rejectWithValue, dispatch }) => {
    const response: any = await apiClient.get(`policies/view/${payload}`, {
      headers: {},
    });
    if (response?.isError) {
      dispatch(setErrorMessage(response.data ?? response.message));
      return rejectWithValue(response.message);
    }
    return response;
  }
);

export const updatePolicy = createAsyncThunk(
  'updatePolicy',
  async (payload: IUpdatePolicyRequest, { rejectWithValue }) => {
    const response: any = await apiClient.put(`policies/policy_captures/${payload.id}`, payload, {
      headers: {},
    });
    if (response?.isError) {
      return rejectWithValue(response.message);
    }
    return response;
  }
);

export const deletePolicy = createAsyncThunk(
  'deletePolicy',
  async (payload: IDeletePolicyRequest, { rejectWithValue }) => {
    const response: any = await apiClient.delete(`policies/policy_captures/${payload.id}`, {
      headers: {},
    });
    if (response?.isError) {
      return rejectWithValue(response.message);
    }
    return response;
  }
);
