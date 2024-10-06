import { createSlice } from '@reduxjs/toolkit';
import { IReferralSlide } from './interfaces';
import { createReferral } from './referralActions';

const initialState: IReferralSlide = {
  isLoading: true,
  error: null,
};

export const referralSlice = createSlice({
  name: 'referral',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //**** Add referral ***//
    builder.addCase(createReferral.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createReferral.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createReferral.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const {} = referralSlice.actions;

export default referralSlice.reducer;
