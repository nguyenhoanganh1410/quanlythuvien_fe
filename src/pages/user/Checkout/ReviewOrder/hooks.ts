import { PATHS } from '@/constants';
import { CHECKOUT_STEPS } from '@/constants/trialConstants';
import { getListCards } from '@/features/card/cardActions';
import { addSubscription } from '@/features/checkout/checkoutActions';
import { updateCheckoutStep } from '@/features/checkout/checkoutData';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useReviewOrderHooks = () => {
  const { isValidPromoCode, paymentDetail, companyAddress, isLoadingCheckout, isCheckoutSuccess, seats } = useSelector(
    (state: RootState) => state.checkoutStore
  );
  const { listCards } = useAppSelector((state: RootState) => state.cardStore);

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onGotoStep01 = useCallback(() => {
    dispatch(updateCheckoutStep(CHECKOUT_STEPS.step01));
  }, [dispatch]);

  const onGotoStep02 = useCallback(() => {
    dispatch(updateCheckoutStep(CHECKOUT_STEPS.step02));
  }, [dispatch]);

  const onCheckout = useCallback(async () => {
    setIsLoading(true);
    await dispatch(
      addSubscription({
        seats: seats.seats,
        promoCode: paymentDetail.promoCode ? paymentDetail.promoCode.toUpperCase() : '',
        isPayAsYouGo: false,
      })
    );
    setIsLoading(false);
  }, [dispatch, paymentDetail]);

  useEffect(() => {
    if (isCheckoutSuccess) {
      window.location.href = PATHS.HOME;
    }
  }, [isCheckoutSuccess]);

  useEffect(() => {
    const loadCards = async () => {
      await dispatch(getListCards());
    };
    loadCards();
  }, []);

  return {
    isValidPromoCode,
    isLoadingCheckout,
    isCheckoutSuccess,
    companyAddress,
    seats,
    isLoading,
    listCards,
    onGotoStep01,
    onGotoStep02,
    onCheckout,
  };
};

export default useReviewOrderHooks;
