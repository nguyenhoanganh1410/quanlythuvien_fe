import { createSlice } from '@reduxjs/toolkit';
import { ISeatSlide } from './interfaces';
import { createSeat, deleteSeat, getListSeats } from './seatActions';

const initialState: ISeatSlide = {
  isLoading: false,
  seats: [],
  error: null,
  totalCount: 0,
  pageSize: 0,
};

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //**** Get list seats ***//
    builder.addCase(getListSeats.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getListSeats.fulfilled, (state, action) => {
      state.isLoading = false;
      state.seats = action.payload.options;
      state.totalCount = action.payload.totalCount;
      state.pageSize = action.payload.pageSize;
    });
    builder.addCase(getListSeats.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    //**** Add question ***//
    builder.addCase(createSeat.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createSeat.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createSeat.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    //**** Delete question ***//
    builder.addCase(deleteSeat.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteSeat.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteSeat.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const {} = questionSlice.actions;

export default questionSlice.reducer;
