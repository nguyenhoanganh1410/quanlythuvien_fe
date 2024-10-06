import { apiClient } from '@/core/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setErrorMessage } from '../app/appSlice';
import {} from './cardSlice';
import axios from 'axios';
import { localStorageKeys } from '@/constants';

export const getListCards = createAsyncThunk('customerCards', async (_, { rejectWithValue, dispatch }) => {
  const response: any = await apiClient.get('payments/stripe/customer_cards', {
    params: {},
    headers: {},
  });
  if (response?.isError) {
    dispatch(setErrorMessage(response.data ?? response.message));
    return rejectWithValue(response.message);
  }
  return response;
});

export const createCustomer = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URI}/payments/stripe/customer`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem(localStorageKeys.accessToken)}` },
      }
    );

    if (response.data.isError) {
      return { isError: true, message: response.data.message };
    }
    return response.data;
  } catch (error) {
    return { isError: true, message: 'An error occurred while creating a customer.' };
  }
};

export const createSetupCard = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URI}/payments/stripe/retrieve_setup_intent`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem(localStorageKeys.accessToken)}` },
      }
    );

    if (response.data.isError) {
      return { isError: true, message: response.data.message };
    }
    return response.data;
  } catch (error) {
    return { isError: true, message: 'An error occurred while creating a customer.' };
  }
};

export const setDefaultPaymentMethod = async (paymentMethodId: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URI}/payments/stripe/default_payment_method`,
      {
        payment_method_id: paymentMethodId,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem(localStorageKeys.accessToken)}` },
      }
    );

    if (response.data.isError) {
      return { isError: true, message: response.data.message };
    }
    return response.data;
  } catch (error) {
    return { isError: true, message: 'An error occurred while creating a customer.' };
  }
};

export const deleteCard = async (cardId: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URI}/payments/stripe/delete_card`,
      {
        card_id: cardId,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem(localStorageKeys.accessToken)}` },
      }
    );

    if (response.data.isError) {
      return { isError: true, message: response.data.message };
    }
    return response.data;
  } catch (error) {
    return { isError: true, message: 'An error occurred while creating a customer.' };
  }
};

export const checkOutPaymentUrl = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URI}/payments/stripe/checkout_payment_link`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem(localStorageKeys.accessToken)}` },
      }
    );

    if (response.data.isError) {
      return { isError: true, message: response.data.message };
    }
    return response.data;
  } catch (error) {
    return { isError: true, message: 'An error occurred while creating a customer.' };
  }
};
