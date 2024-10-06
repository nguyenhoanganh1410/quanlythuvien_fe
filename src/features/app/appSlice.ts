import { createSlice } from '@reduxjs/toolkit';
import { EAlertType, IAppState } from './interfaces';

const initialState: IAppState = {
  message: null,
  type: EAlertType.Success,
  loading: false,
  loadingProgress: 0,
  isShowUnlock: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoadingProgress: (state, action) => {
      state.loadingProgress = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.message = action.payload.message;
      state.type = EAlertType.Error;
    },
    setSuccessMessage: (state, action) => {
      state.message = action.payload.message;
      state.type = EAlertType.Success;
    },
    setWarningMessage: (state, action) => {
      state.message = action.payload.message;
      state.type = EAlertType.Warning;
    },
    clearAlertStore: (state) => {
      state.message = null;
      state.type = EAlertType.Success;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setShowUnlock: (state, action) => {
      state.isShowUnlock = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setErrorMessage,
  setSuccessMessage,
  setWarningMessage,
  clearAlertStore,
  setLoading,
  setLoadingProgress,
  setShowUnlock,
} = appSlice.actions;

export default appSlice.reducer;
