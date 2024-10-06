import { createSlice } from '@reduxjs/toolkit';
import { IBooksSlide } from './interfaces';
import { creatBook, getListBooks } from './bookActions';

const initialState: IBooksSlide = {
  error: '',
  isLoading: false,
  listBooks: {
    count: 0,
    items: [],
  },
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    resetArticlesData: (state) => {
      state.listBooks = {
        count: 0,
        items: [],
      };
    },
  },
  extraReducers: (builder) => {
    //**** list messages ***//
    builder.addCase(getListBooks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getListBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listBooks = action.payload;
    });
    builder.addCase(getListBooks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // //**** Add question ***//
    // builder.addCase(creatBook.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(creatBook.fulfilled, (state) => {
    //   state.isLoading = false;
    // });
    // builder.addCase(creatBook.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload as string;
    // });
  },
});

export const { resetArticlesData } = booksSlice.actions;
export default booksSlice.reducer;
