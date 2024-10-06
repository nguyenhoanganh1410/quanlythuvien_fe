import { REQUIRED_FIELD } from '@/constants/messages';
import { CHECKOUT_STEPS } from '@/constants/trialConstants';
import { checkPromoCode } from '@/features/checkout/checkoutActions';
import { updateCheckoutStep, updatePaymentDetail } from '@/features/checkout/checkoutData';
import { IPaymentDetail } from '@/features/checkout/interfaces';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useFormik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { StripeCardNumberElementChangeEvent } from '@stripe/stripe-js';
import { CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { createCustomer, createSetupCard, setDefaultPaymentMethod } from '@/features/card/cardActions';
import { getProfile, updateUserInfo } from '@/features/user/userActions';

const usePaymentDetailHooks = () => {
  const { isValidPromoCode, isCheckingPromoCode, companyAddress } = useSelector(
    (state: RootState) => state.checkoutStore
  );
  const { user } = useAppSelector((state: RootState) => state.userStore);
  const [isCardNumberEmpty, setIsCardNumberEmpty] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();

  const initialValues: IPaymentDetail = {
    promoCode: '',
    nameOnCard: '',
    billingAddress: companyAddress.addressLine1 + ', ' + companyAddress.city + ', ' + companyAddress.country,
  };

  const handleSubmit = async (values: IPaymentDetail) => {
    setIsLoading(true);
    dispatch(updatePaymentDetail(values));

    if (stripe && elements && isCardNumberEmpty === false) {
      let stripeCustomerId = user?.stripeCustomerId;
      if (!stripeCustomerId) {
        const data = await createCustomer();
        stripeCustomerId = data?.stripe_customer_id;
      }
      const setupCardData = await createSetupCard();
      const comfirm = await stripe.confirmCardSetup(setupCardData?.client_secret!, {
        payment_method: {
          card: elements.getElement(CardNumberElement)!,
        },
      });
      if (comfirm.setupIntent?.status == 'succeeded') {
        const payment_method_id = comfirm.setupIntent?.payment_method as string;
        await dispatch(
          updateUserInfo({
            payAsYouGoMode: false,
            paymentMethodId: payment_method_id,
          })
        );
        await setDefaultPaymentMethod(payment_method_id);
        await dispatch(getProfile());
        dispatch(updateCheckoutStep(CHECKOUT_STEPS.step03));
      }
    }
    setIsLoading(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      billingAddress: Yup.string().trim().required(REQUIRED_FIELD),
    }),
    onSubmit: handleSubmit,
    validateOnChange: true,
    validateOnBlur: false,
  });

  const onCheckPromoCode = useCallback(async () => {
    await dispatch(
      checkPromoCode({
        promoCode: formik.values.promoCode,
      })
    );
  }, [formik.values.promoCode, dispatch]);

  const onChangeAddress = useCallback(() => {
    dispatch(updateCheckoutStep(CHECKOUT_STEPS.step01));
  }, [dispatch]);

  useEffect(() => {
    if (formik.values.promoCode) {
      onCheckPromoCode();
    }
  }, [formik.values.promoCode, onCheckPromoCode]);

  const onChangeCardNumber = useCallback(
    async (event: StripeCardNumberElementChangeEvent) => {
      const cardNumberValue = event.empty;
      setIsCardNumberEmpty(cardNumberValue);
    },
    [isCardNumberEmpty]
  );

  const onReadyCardNumber = () => {
    setIsCardNumberEmpty(true);
  };

  return {
    isValidPromoCode,
    isCheckingPromoCode,
    formik,
    companyAddress,
    isLoading,
    handleSubmit,
    onChangeAddress,
    onCheckPromoCode,
    onChangeCardNumber,
    onReadyCardNumber,
  };
};

export default usePaymentDetailHooks;
