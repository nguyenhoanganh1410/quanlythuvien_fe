import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  createChatSession,
  createFeedback,
  getListChatSessions,
  getListFeedbacks,
  sendQuestionChat,
  getListMessages,
} from './chatActions';
import { IChatSession, IChatSlice } from './interfaces';

const initialState: IChatSlice = {
  isTyping: true,
  pingStatus: '',
  isLoading: false,
  error: null,
  listMessages: [],
  messagesData: null,
  currentChatSession: null,
  newQuestionChat: null,
  isScrollToPage: false,
  chatsData: null,
  listFeedbacks: [],
  feedbacksData: null,
  listAIResponse: [],
  aiResponseData: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    resetChatSessionData: (state) => {
      state.currentChatSession = null;
      state.newQuestionChat = null;
      state.chatsData = null;
      state.pingStatus = '';
    },
    setCurrentChatSession: (state, action: PayloadAction<IChatSession>) => {
      state.currentChatSession = action.payload;
    },
    setScrollToPage: (state, action: PayloadAction<boolean>) => {
      state.isScrollToPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    //**** Get list chat sessions ***//
    builder.addCase(getListChatSessions.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getListChatSessions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chatsData = action.payload;
    });
    builder.addCase(getListChatSessions.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    //**** Create chat session ***//
    builder.addCase(createChatSession.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createChatSession.fulfilled, (state, action) => {
      state.isTyping = true;
      state.isLoading = false;
      state.currentChatSession = action.payload;
    });
    builder.addCase(createChatSession.rejected, (state, action) => {
      state.isTyping = false;
      state.isLoading = false;
      state.error = action.payload as string;
    });
    //**** Send question chat ***//
    builder.addCase(sendQuestionChat.pending, (state) => {
      state.isTyping = true;
      state.pingStatus = 'in-progress';
    });
    builder.addCase(sendQuestionChat.fulfilled, (state, action) => {
      state.newQuestionChat = action.payload;
    });
    builder.addCase(sendQuestionChat.rejected, (state, action) => {
      state.isTyping = false;
      state.error = action.payload as string;
    });

    //**** create Feedback chat ***//
    builder.addCase(createFeedback.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createFeedback.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createFeedback.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    //**** list Feedback chat ***//
    builder.addCase(getListFeedbacks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getListFeedbacks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.feedbacksData = action.payload;
      state.listFeedbacks =
        action.payload.page > 1 ? [...state.listFeedbacks, ...action.payload.options] : action.payload.options;
    });
    builder.addCase(getListFeedbacks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    //**** list messages ***//
    builder.addCase(getListMessages.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getListMessages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.aiResponseData = action.payload;
      state.listAIResponse =
        action.payload.page > 1 ? [...state.listAIResponse, ...action.payload.options] : action.payload.options;
    });
    builder.addCase(getListMessages.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { resetChatSessionData, setCurrentChatSession, setScrollToPage } = chatSlice.actions;

export default chatSlice.reducer;
