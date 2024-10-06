import { PayloadAction, createSlice, isAllOf, isAnyOf } from '@reduxjs/toolkit';
import { IUserState } from './interfaces';
import {
  applyPromoCode,
  checkPromoCode,
  getListUserOptions,
  getPaymentStatus,
  getProfile,
  logout,
  refreshNewToken,
  resetPassword,
  signIn,
  signUp,
  updateUserInfo,
  verifyTokenResetPassword,
} from './userActions';
import { localStorageKeys } from '@/constants';
import { EVerifyTokenResetPasswordStatus } from '@/constants/enum';

const initialState: IUserState = {
  isLoading: false,
  isAuthentication: localStorage.getItem(localStorageKeys.accessToken) ? true : false,
  user: null,
  userOptionsData: null,
  listUserOptions: [],
  error: null,
  statusVerifyTokenPassword: '',
  isShowPopupExistEmail: false,
  paymentStatus: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    restUserStore: () => initialState,
    setShowPopupExistEmail: (state, action: PayloadAction<boolean>) => {
      state.isShowPopupExistEmail = action.payload;
    },
  },

  extraReducers: (builder) => {
    //**** Sign Up ***//
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signUp.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    //**** Sign In ***//
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthentication = true;
      localStorage.setItem(localStorageKeys.accessToken, action.payload.accessToken);
      localStorage.setItem(localStorageKeys.refreshToken, action.payload.refreshToken);
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    //**** Log out ***//
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
      state.isAuthentication = false;
      state.user = null;
      localStorage.removeItem(localStorageKeys.accessToken);
      localStorage.removeItem(localStorageKeys.refreshToken);
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.isLoading = false;
      state.isAuthentication = false;
      state.user = null;
      localStorage.removeItem(localStorageKeys.accessToken);
      localStorage.removeItem(localStorageKeys.refreshToken);
      state.error = action.payload as string;
    });

    //**** Get profile ***//
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(getPaymentStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.paymentStatus = action.payload;
    });
    builder.addCase(getPaymentStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    //**** Update User Info ***//
    builder.addCase(updateUserInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(updateUserInfo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    //**** Verify token reset password***//
    builder.addCase(verifyTokenResetPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(verifyTokenResetPassword.fulfilled, (state) => {
      state.isLoading = false;
      state.statusVerifyTokenPassword = EVerifyTokenResetPasswordStatus.SUCCESS;
    });
    builder.addCase(verifyTokenResetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.statusVerifyTokenPassword = EVerifyTokenResetPasswordStatus.FAIL;
      state.error = action.payload as string;
    });

    //**** Reset password***//
    builder.addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    //**** Refresh New Token ***//
    builder.addCase(refreshNewToken.fulfilled, (_state, action) => {
      const newToken = action.payload.access;
      localStorage.setItem(localStorageKeys.accessToken, newToken);
    });
    builder.addCase(refreshNewToken.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    //**** apply Promo Code ***//
    builder.addCase(applyPromoCode.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(applyPromoCode.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(applyPromoCode.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    //**** check Promo Code ***//
    builder.addCase(checkPromoCode.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(checkPromoCode.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(checkPromoCode.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    //**** Get list Policies ***//
    builder.addCase(getListUserOptions.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getListUserOptions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userOptionsData = action.payload;
      state.listUserOptions =
        action.payload.page > 1 ? [...state.listUserOptions, ...action.payload.options] : action.payload.options;
    });
    builder.addCase(getListUserOptions.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addMatcher(isAnyOf(getPaymentStatus.pending, getProfile.pending), (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(isAllOf(getPaymentStatus.fulfilled, getProfile.fulfilled), (state) => {
      state.isLoading = false;
    });
  },
});

export const { restUserStore, setShowPopupExistEmail } = userSlice.actions;

export default userSlice.reducer;
