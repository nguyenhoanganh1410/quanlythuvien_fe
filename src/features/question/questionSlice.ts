import { createSlice } from '@reduxjs/toolkit';
import { IPolicySlide } from './interfaces';
import { createQuestion, deleteQuestion, editQuestion, getListQuestions } from './questionActions';

const initialState: IPolicySlide = {
  isLoading: true,
  questionsData: null,
  listQuestions: null,
  error: null,
};

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //**** Get list questions ***//
    builder.addCase(getListQuestions.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getListQuestions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.questionsData = action.payload;
      state.listQuestions = action.payload.options;
    });
    builder.addCase(getListQuestions.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    //**** Add question ***//
    builder.addCase(createQuestion.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createQuestion.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createQuestion.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    //**** Edit question ***//
    builder.addCase(editQuestion.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editQuestion.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(editQuestion.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    //**** Delete question ***//
    builder.addCase(deleteQuestion.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteQuestion.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteQuestion.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const {} = questionSlice.actions;

export default questionSlice.reducer;
