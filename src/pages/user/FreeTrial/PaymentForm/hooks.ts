import { PATHS } from '@/constants';
import { PAY_COST_PER_MONTH, PAY_AS_YOU_GO, FREE_TRIAL } from '@/constants/trialConstants';
import { createCustomer, createSetupCard } from '@/features/card/cardActions';
import { addSubscription } from '@/features/payment/paymentActions';
import { IRequestPaymentForm } from '@/features/user/interfaces';
import { applyPromoCode, checkPromoCode, getProfile, updateUserInfo } from '@/features/user/userActions';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { PayloadAction } from '@reduxjs/toolkit';
import { CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeCardNumberElementChangeEvent } from '@stripe/stripe-js';
import { useFormik } from 'formik';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

interface IProps {
  onOrderSummary: (newLoading: boolean, newCost: string) => void;
  handleOpenAgreementModal: () => void;
}

export const usePaymentFormHooks = ({ onOrderSummary, handleOpenAgreementModal }: IProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state: RootState) => state.userStore);

  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCardNumberEmpty, setIsCardNumberEmpty] = useState<boolean>();

  const validationSchema = Yup.object()
    .shape({
      promoCode: Yup.string()
        .nullable()
        .matches(/^[a-zA-Z0-9]{10}$/, 'The key must have at least 10 alphanumeric characters')
        .test('checkPromoCode', 'Invalid promoCode', async function (value, { parent }) {
          const isPayAsYouGoValue = parent.isPayAsYouGo;
          if (value?.length === 10) {
            setIsLoading(true);
            onOrderSummary(true, PAY_COST_PER_MONTH);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const isValid = await dispatch(
              checkPromoCode({
                promoCode: value,
              })
            );
            if (isValid.payload.message !== 'Promo code is valid') {
              onOrderSummary(false, PAY_COST_PER_MONTH);
              setIsLoading(false);
              return false;
            } else {
              onSubmit({ promoCode: value, isPayAsYouGo: false });
            }
            if (isPayAsYouGoValue === false) {
              onOrderSummary(false, FREE_TRIAL);
            }
          }
          return true;
        }),
      isPayAsYouGo: Yup.boolean().test('checkIsPayAsYouGo', 'Invalid IsPayAsYouGo', function (value, { parent }) {
        const promoCodeValue = parent.promoCode;
        if (value === true) {
          onOrderSummary(true, PAY_AS_YOU_GO);
          setTimeout(() => {
            onOrderSummary(false, PAY_AS_YOU_GO);
          }, 1000);
        }
        if (value === false && !promoCodeValue) {
          onOrderSummary(true, PAY_COST_PER_MONTH);
          setTimeout(() => {
            onOrderSummary(false, PAY_COST_PER_MONTH);
          }, 1000);
        }
        return true;
      }),
    })
    .defined({ validateOnChange: false });

  const initialValues: IRequestPaymentForm = {
    promoCode: '',
    isPayAsYouGo: false,
  };

  const navFreeTrial = async () => {
    navigate(PATHS.FREE_TRIAL);
  };

  const onSubmit = useCallback(
    async (values: IRequestPaymentForm) => {
      setIsLoading(true);
      try {
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
            await dispatch(
              updateUserInfo({
                payAsYouGoMode: values.isPayAsYouGo,
                paymentMethodId: comfirm.setupIntent?.id,
              })
            );
            await dispatch(getProfile());
            await dispatch(
              addSubscription({
                isPayAsYouGo: values.isPayAsYouGo,
              })
            );
            toast('Payment has been successful!', {
              type: 'success',
              position: 'bottom-center',
              theme: 'light',
              autoClose: 5000,
              hideProgressBar: true,
              closeButton: false,
              bodyClassName: 'toast-body',
            });

            await dispatch(getProfile());
            setTimeout(() => {
              handleOpenAgreementModal();
              setIsLoading(false);
            }, 3000);
            return;
          } else {
            toast('Apply Card Fail!', {
              type: 'error',
              position: 'bottom-center',
              theme: 'light',
              autoClose: 1000,
              hideProgressBar: true,
              closeButton: false,
              bodyClassName: 'toast-body',
            });
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.log('error: ', error);
      }

      const res: PayloadAction<any> = await dispatch(
        applyPromoCode({
          promoCode: values.promoCode,
        })
      );

      if (res.payload.message === 'Promo code applied successfully') {
        toast('Apply promo code success!', {
          type: 'success',
          position: 'bottom-center',
          theme: 'light',
          autoClose: 500,
          hideProgressBar: true,
          closeButton: false,
          bodyClassName: 'toast-body',
        });
        await dispatch(getProfile());
        setTimeout(() => {
          handleOpenAgreementModal();
          setIsLoading(false);
        }, 3000);
      } else {
        setIsLoading(false);
      }
    },
    [stripe, elements, isCardNumberEmpty]
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnMount: false,
  });

  // useEffect(() => {
  //   formik.setFieldTouched('promoCode', true);
  // }, []);

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
    isLoading,
    initialValues,
    formik,
    navFreeTrial,
    onChangeCardNumber,
    onReadyCardNumber,
  };
};
