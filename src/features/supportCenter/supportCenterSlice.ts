import { createSlice } from '@reduxjs/toolkit';
import { ISupportCenterSlide } from './interfaces';
import {
  articleHelpful,
  createConversationChatBox,
  createRequest,
  getArticleHelpfulCount,
  sendMessageChatBox,
} from './supportCenterActions';

const initialState: ISupportCenterSlide = {
  isLoading: true,
  error: null,
  uerArticleHelpful: null,
  isSendingMessage: false,
};

export const questionSlice = createSlice({
  name: 'supportCenter',
  initialState,
  reducers: {
    setSendingMessage: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    //**** Add question ***//
    builder.addCase(createRequest.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createRequest.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createRequest.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    //**** get Article Helpful Count ***//
    builder.addCase(getArticleHelpfulCount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getArticleHelpfulCount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.uerArticleHelpful = action.payload;
    });
    builder.addCase(getArticleHelpfulCount.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    //**** article Helpful ***//
    builder.addCase(articleHelpful.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(articleHelpful.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(articleHelpful.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    //**** create conversation chat box ***//
    builder.addCase(createConversationChatBox.pending, (state) => {
      state.isSendingMessage = true;
    });
    builder.addCase(createConversationChatBox.fulfilled, (state) => {
      state.isSendingMessage = false;
    });
    builder.addCase(createConversationChatBox.rejected, (state, action) => {
      state.isSendingMessage = false;
      state.error = action.payload as string;
    });
    //**** send message chat box ***//
    builder.addCase(sendMessageChatBox.fulfilled, (state) => {
      state.isSendingMessage = false;
    });
    builder.addCase(sendMessageChatBox.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const { setSendingMessage } = questionSlice.actions;

export default questionSlice.reducer;
