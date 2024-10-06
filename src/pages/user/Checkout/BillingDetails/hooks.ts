import { CHECKOUT_STEPS } from '@/constants/trialConstants';
import { updateCheckoutStep } from '@/features/checkout/checkoutData';
import { RootState } from '@/store';
import { useAppDispatch } from '@/store/hooks';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

export const useBillingDetailsHooks = () => {
  const dispatch = useAppDispatch();

  const { isValidPromoCode, seats } = useSelector((state: RootState) => state.checkoutStore);
  const onClickEdit = useCallback(() => {
    dispatch(updateCheckoutStep(CHECKOUT_STEPS.step00));
  }, []);

  return {
    seats,
    isValidPromoCode,
    onClickEdit,
  };
};
