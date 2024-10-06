import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICompanyAddress, IElementStripe, IPaymentDetail, ISeats } from './interfaces';
import { CHECKOUT_STEPS, DEFAULT_COUNTRY, PRICE_DEFAULT, PRICE_DISCOUNT_DEFAULT } from '@/constants/trialConstants';
import { addSubscription, checkPromoCode } from './checkoutActions';

interface checkoutState {
  companyAddress: ICompanyAddress;
  paymentDetail: IPaymentDetail;
  checkOutStep: number;
  isValidPromoCode: boolean;
  isCheckingPromoCode: boolean;
  isLoadingCheckout: boolean;
  isCheckoutSuccess: boolean;
  seats: ISeats;
  paymentMethodId?: string;
  stripeElement?: IElementStripe;
}

const initialState: checkoutState = {
  isCheckoutSuccess: false,
  isLoadingCheckout: false,
  isValidPromoCode: false,
  isCheckingPromoCode: false,
  checkOutStep: CHECKOUT_STEPS.step00,
  seats: { seats: 1, price: PRICE_DEFAULT, priceDiscount: PRICE_DISCOUNT_DEFAULT },
  companyAddress: {
    addressLine1: '',
    city: '',
    companyName: '',
    country: DEFAULT_COUNTRY,
    postalCode: '',
    addressLine2: '',
    state: '',
  },
  paymentDetail: {
    promoCode: '',
    nameOnCard: '',
    billingAddress: '',
  },
  paymentMethodId: '',
  stripeElement: {
    stripe: undefined,
    stripeEmplements: undefined,
    cardElements: undefined,
  },
};

const checkoutDataSlice = createSlice({
  name: 'checkoutData',
  initialState,
  reducers: {
    updateCompanyAddress(state, action: PayloadAction<ICompanyAddress>) {
      state.companyAddress = action.payload;
    },
    updatePaymentDetail(state, action: PayloadAction<IPaymentDetail>) {
      state.paymentDetail = action.payload;
    },
    updateCheckoutStep(state, action: PayloadAction<number>) {
      state.checkOutStep = action.payload;
    },
    updateSeatsData(state, action: PayloadAction<ISeats>) {
      state.seats = action.payload;
    },
    updatePaymentMethodId(state, action: PayloadAction<string>) {
      state.paymentMethodId = action.payload;
    },
    updateStripeElements(state, action: PayloadAction<IElementStripe>) {
      state.stripeElement = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkPromoCode.pending, (state) => {
      state.isCheckingPromoCode = true;
    });
    builder.addCase(checkPromoCode.fulfilled, (state) => {
      state.isValidPromoCode = true;
      state.isCheckingPromoCode = false;
    });
    builder.addCase(checkPromoCode.rejected, (state) => {
      state.isValidPromoCode = false;
      state.isCheckingPromoCode = false;
    });
    //***Add  Subscription***//
    builder.addCase(addSubscription.pending, (state) => {
      state.isLoadingCheckout = true;
    });
    builder.addCase(addSubscription.fulfilled, (state) => {
      state.isLoadingCheckout = false;
      state.isCheckoutSuccess = true;
    });
    builder.addCase(addSubscription.rejected, (state) => {
      state.isLoadingCheckout = false;
      state.isCheckoutSuccess = false;
      // state.error = action.payload as string;
    });
  },
});

export const {
  updateCompanyAddress,
  updateCheckoutStep,
  updatePaymentDetail,
  updateSeatsData,
  updatePaymentMethodId,
  updateStripeElements,
} = checkoutDataSlice.actions;

export default checkoutDataSlice.reducer;
