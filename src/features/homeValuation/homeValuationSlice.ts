import { createSlice } from '@reduxjs/toolkit';
import { IHomeValuationSlide } from './interfaces';
import { searchHomeValuation } from './homeValuationActions';

const initialState: IHomeValuationSlide = {
  isSearching: false,
  homeValuationData: null,
  error: '',
};

export const homeValuationSlice = createSlice({
  name: 'policy',
  initialState,
  reducers: {
    resetHomeValuationData: (state) => {
      state.homeValuationData = null;
    },
  },
  extraReducers: (builder) => {
    //**** Get list Policies ***//
    builder.addCase(searchHomeValuation.pending, (state) => {
      state.isSearching = true;
    });
    builder.addCase(searchHomeValuation.fulfilled, (state, action) => {
      state.isSearching = false;
      state.homeValuationData = action.payload;
    });
    builder.addCase(searchHomeValuation.rejected, (state, action) => {
      state.isSearching = false;
      state.error = action.payload as string;
    });
  },
});

export const { resetHomeValuationData } = homeValuationSlice.actions;

export default homeValuationSlice.reducer;
