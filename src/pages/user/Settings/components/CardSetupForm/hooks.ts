import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import { useCallback, useState } from 'react';
import { RootState } from '@/store';
import { updateUserInfo } from '@/features/user/userActions';
import { createCustomer, createSetupCard, getListCards, setDefaultPaymentMethod } from '@/features/card/cardActions';

interface IProps {
  closeCardSetUpForm: () => void;
}

export const useCardSetupFormHooks = ({ closeCardSetUpForm }: IProps) => {
  const { user } = useAppSelector((state: RootState) => state.userStore);
  const [isSubmitDisable, setSubmitDisable] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!stripe || !elements) {
        return;
      }
      try {
        setSubmitDisable(true);
        let stripeCustomerId = user?.stripeCustomerId;
        if (!stripeCustomerId) {
          const data = await createCustomer();
          stripeCustomerId = data?.stripe_customer_id;
        }
        const setupCardData = await createSetupCard();
        const comfirm = await stripe.confirmCardSetup(setupCardData?.client_secret!, {
          payment_method: {
            card: elements.getElement(CardElement)!,
          },
        });
        if (comfirm.setupIntent?.status == 'succeeded') {
          const payment_method_id = comfirm.setupIntent?.payment_method as string;
          await dispatch(
            updateUserInfo({
              paymentMethodId: payment_method_id,
            })
          );

          await setDefaultPaymentMethod(payment_method_id);
          await dispatch(getListCards());
          closeCardSetUpForm();
        }
      } catch (error) {
        console.log('error: ', error);
      } finally {
        setSubmitDisable(false);
      }
    },
    [stripe, elements]
  );

  return {
    stripe,
    isSubmitDisable,
    handleSubmit,
  };
};
