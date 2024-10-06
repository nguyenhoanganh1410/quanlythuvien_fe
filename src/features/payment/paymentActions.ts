import { apiClient } from '@/core/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setErrorMessage } from '../app/appSlice';
import {} from './paymentSlice';
import { IRequestPaymentForm } from '../user/interfaces';

export const getListOrderHistories = createAsyncThunk(
  'getListOrderHistories',
  async (_, { rejectWithValue, dispatch }) => {
    const response: any = await apiClient.get(`payments/transactions`, {
      headers: {},
    });
    if (response?.isError) {
      dispatch(setErrorMessage(response.data ?? response.message));
      return rejectWithValue(response.message);
    }
    return response;
  }
);

export const getInvoiceDetail = createAsyncThunk(
  'getInvoiceDetail',
  async (payload: { invoiceId: string }, { rejectWithValue, dispatch }) => {
    try {
      const response: any = await apiClient.get(`payments/stripe/invoice/${payload.invoiceId}`, {
        headers: {},
      });
      if (response?.isError) {
        dispatch(setErrorMessage(response.data ?? response.message));
        return rejectWithValue(response.message);
      }
      return response as { hostedInvoiceUrl: string };
    } catch (error) {
      // Handle errors if any
      console.error('Error fetching invoice detail:', error);
      return rejectWithValue('Failed to fetch invoice detail');
    }
  }
);

export const addSubscription = createAsyncThunk(
  'addSubscription',
  async (payload: IRequestPaymentForm, { rejectWithValue }) => {
    const response: any = await apiClient.post<IRequestPaymentForm>(`payments/stripe/subscription`, payload, {
      headers: {},
    });
    if (response?.isError) {
      return rejectWithValue(response.message);
    }
    return response;
  }
);

export const payCurrentPayAsYouGoCost = createAsyncThunk('payCurrentPaygCost', async (_, { rejectWithValue }) => {
  const response: any = await apiClient.post(`payments/pay_current_pay_as_you_go`, {
    headers: {},
  });
  if (response?.isError) {
    return rejectWithValue(response.message);
  }
  return response;
});
