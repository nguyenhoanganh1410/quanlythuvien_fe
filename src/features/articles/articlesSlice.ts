import { createSlice } from '@reduxjs/toolkit';
import { IArticlesSlide } from './interfaces';
import { getListArticles } from './articlesActions';

const initialState: IArticlesSlide = {
  isSearching: false,
  articlesData: null,
  listArticles: [],
  error: '',
  isLoading: false,
  isTyping: false,
};

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    resetArticlesData: (state) => {
      state.articlesData = null;
      state.listArticles = [];
    },
  },
  extraReducers: (builder) => {
    //**** list messages ***//
    builder.addCase(getListArticles.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getListArticles.fulfilled, (state, action) => {
      state.isLoading = false;
      state.articlesData = {
        page: action.payload.page,
        pageSize: action.payload.pageSize,
        totalCount: action.payload.totalCount,
        options: action.payload.options,
      };
      state.listArticles =
        action.payload.page > 1 ? [...state.listArticles, ...action.payload.options] : action.payload.options;
    });
    builder.addCase(getListArticles.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { resetArticlesData } = articlesSlice.actions;
export default articlesSlice.reducer;
