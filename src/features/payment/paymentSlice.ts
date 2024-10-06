import { createSlice } from '@reduxjs/toolkit';
import { IPaymentSlice, TransactionsHistoryItem } from './interfaces';
import { addSubscription, getListOrderHistories } from './paymentActions';

const initialState: IPaymentSlice = {
  isLoading: true,
  paymentsData: null,
  listPayments: null,
  error: null,
  transactionsHistory: null,
};

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //**** Get list Order Histories ***//
    builder.addCase(getListOrderHistories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getListOrderHistories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.transactionsHistory = action.payload as TransactionsHistoryItem[];
    });
    builder.addCase(getListOrderHistories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    //***Add  Subscription***//
    builder.addCase(addSubscription.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addSubscription.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addSubscription.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const {} = paymentSlice.actions;

export default paymentSlice.reducer;
