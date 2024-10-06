import appSlice from '@/features/app/appSlice';
import chatSlice from '@/features/chat/chatSlice';
import policySlice from '@/features/policy/policySlice';
import questionSlice from '@/features/question/questionSlice';
import userSlice from '@/features/user/userSlice';
import cardSlice from '@/features/card/cardSlice';
import { combineReducers } from '@reduxjs/toolkit';
import paymentSlice from '@/features/payment/paymentSlice';
import referralSlice from '@/features/referral/referralSlice';
import checkoutSlice from '@/features/checkout/checkoutData';
import homeValuationSlice from '@/features/homeValuation/homeValuationSlice';
import supportCenterSlice from '@/features/supportCenter/supportCenterSlice';
import articlesSlice from '@/features/articles/articlesSlice';
import seatSlice from '@/features/seat/seatSlice';

const rootReducer = combineReducers({
  userStore: userSlice,
  appStore: appSlice,
  policyStore: policySlice,
  chatStore: chatSlice,
  questionStore: questionSlice,
  cardStore: cardSlice,
  paymentStore: paymentSlice,
  referralStore: referralSlice,
  checkoutStore: checkoutSlice,
  homeValuationStore: homeValuationSlice,
  supportCenterStore: supportCenterSlice,
  articlesStore: articlesSlice,
  seatStore: seatSlice,
});

export default rootReducer;
