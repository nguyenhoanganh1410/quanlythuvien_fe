import { createSlice } from '@reduxjs/toolkit';
import { IPolicySlide } from './interfaces';
import { getListCards } from './cardActions';

const initialState: IPolicySlide = {
  isLoading: true,
  cardsData: null,
  listCards: null,
  customer: null,
  error: null,
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //**** Get list customer card ***//
    builder.addCase(getListCards.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getListCards.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cardsData = action.payload;
      state.listCards = action.payload.cards;
    });
    builder.addCase(getListCards.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const {} = cardSlice.actions;

export default cardSlice.reducer;
