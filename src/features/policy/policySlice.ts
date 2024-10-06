import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { EFilterType, IPoliciesData, IPolicySlide, StatusUploadPolicyFile } from './interfaces';
import {
  checkPdfFile,
  getDetailPolicy,
  getListPolicies,
  getPolicyFileUrl,
  savePolicyFile,
  updatePolicy,
  uploadPolicyFile,
  deletePolicy,
} from './policyActions';

const initialState: IPolicySlide = {
  isUpdatingPolicy: false,
  isLoading: true,
  isLoadingCurrentPolicy: true,
  isUploadingFile: false,
  isUploadFileSuccess: false,
  currentPolicy: null,
  policiesData: null,
  error: null,
  uploadFileStatus: null,
  currentFilePolicyUrl: null,
  searchPolicy: '',
  filterPolicy: EFilterType.all,
  listPolicies: [],
  isShowPopupInCorrectPdf: false,
  fromData: new FormData(),
};

export const policySlice = createSlice({
  name: 'policy',
  initialState,
  reducers: {
    setValueSearchPolicy: (state, action: PayloadAction<string>) => {
      state.searchPolicy = action.payload;
    },
    setValueFilterPolicy: (state, action: PayloadAction<string>) => {
      state.filterPolicy = action.payload;
    },
    resetCurrentPolicy: (state) => {
      state.currentFilePolicyUrl = null;
      state.currentPolicy = null;
      state.isLoadingCurrentPolicy = true;
    },
    setPoliciesData: (state, action: PayloadAction<IPoliciesData | null>) => {
      state.policiesData = action.payload;
      state.listPolicies = action.payload?.options ?? [];
    },
    setShowPopupInCorrectPdf: (state, action: PayloadAction<boolean>) => {
      state.isShowPopupInCorrectPdf = action.payload;
      if (action.payload) {
        state.isUploadingFile = false;
        state.isUploadFileSuccess = false;
      }
    },
    setPdfFile: (state, action: PayloadAction<FormData>) => {
      state.fromData = action.payload;
    },
  },
  extraReducers: (builder) => {
    //**** Get list Policies ***//
    builder.addCase(getListPolicies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getListPolicies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.policiesData = action.payload;
      state.listPolicies =
        action.payload.page > 1 ? [...state.listPolicies, ...action.payload.options] : action.payload.options;
    });
    builder.addCase(getListPolicies.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    //**** Update policy ***//
    builder.addCase(updatePolicy.pending, (state) => {
      state.isUpdatingPolicy = true;
    });
    builder.addCase(updatePolicy.fulfilled, (state, action) => {
      state.currentPolicy = action.payload;
      state.isUpdatingPolicy = false;
    });
    builder.addCase(updatePolicy.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isUpdatingPolicy = false;
    });
    //**** delete policy ***//
    builder.addCase(deletePolicy.fulfilled, (state, action) => {
      state.currentPolicy = action.payload;
    });
    builder.addCase(deletePolicy.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    //**** Get detail Policy ***//
    builder.addCase(getDetailPolicy.pending, (state) => {
      state.isLoadingCurrentPolicy = true;
    });
    builder.addCase(getDetailPolicy.fulfilled, (state, action) => {
      state.isLoadingCurrentPolicy = false;
      state.currentPolicy = action.payload;
    });
    builder.addCase(getDetailPolicy.rejected, (state, action) => {
      state.isLoadingCurrentPolicy = false;
      state.error = action.payload as string;
    });
    //**** Check policy file ***//
    builder.addCase(checkPdfFile.pending, (state) => {
      state.isUploadingFile = true;
      state.isUploadFileSuccess = false;
      state.uploadFileStatus = StatusUploadPolicyFile.UPLOADING;
    });
    builder.addCase(checkPdfFile.rejected, (state, action) => {
      state.isUploadingFile = false;
      state.isUploadFileSuccess = false;
      state.error = action.payload as string;
    });
    //**** Upload policy file ***//
    builder.addCase(uploadPolicyFile.fulfilled, (state) => {
      state.isUploadingFile = false;
      state.isUploadFileSuccess = true;
    });
    builder.addCase(uploadPolicyFile.rejected, (state, action) => {
      state.isUploadingFile = false;
      state.isUploadFileSuccess = false;
      state.error = action.payload as string;
    });
    //**** Get policy file url ***//
    builder.addCase(getPolicyFileUrl.pending, (state) => {
      state.isLoading = true;
      state.uploadFileStatus = StatusUploadPolicyFile.UPLOADING;
    });
    builder.addCase(getPolicyFileUrl.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentFilePolicyUrl = action.payload.url;
    });
    builder.addCase(getPolicyFileUrl.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    //**** Save policy file ***//
    builder.addCase(savePolicyFile.pending, (state) => {
      state.uploadFileStatus = StatusUploadPolicyFile.SAVING;
    });
    builder.addCase(savePolicyFile.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const {
  setShowPopupInCorrectPdf,
  resetCurrentPolicy,
  setValueSearchPolicy,
  setValueFilterPolicy,
  setPoliciesData,
  setPdfFile,
} = policySlice.actions;

export default policySlice.reducer;
