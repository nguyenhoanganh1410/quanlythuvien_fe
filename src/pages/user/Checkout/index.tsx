import { FC, useCallback } from 'react';
// import 'react-loading-skeleton/dist/skeleton.css';
import CheckoutHeader from './CheckoutHeader';
import CompanyAddress from './CompanyAddress';
import { useCheckoutHooks } from './hooks';
import { CHECKOUT_STEPS } from '@/constants/trialConstants';
import ReviewOrder from './ReviewOrder';
import PaymentDetail from './PaymentDetail';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ChooseSeats from './ChooseSeats';

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_STRIPE_KEY ?? '');

interface IProps {}

const CheckoutPage: FC<IProps> = () => {
  const { checkOutStep } = useCheckoutHooks();

  const renderStepUI = useCallback(() => {
    switch (checkOutStep) {
      case CHECKOUT_STEPS.step00:
        return <ChooseSeats />;
      case CHECKOUT_STEPS.step01:
        return <CompanyAddress />;
      case CHECKOUT_STEPS.step02:
        return <PaymentDetail />;
      case CHECKOUT_STEPS.step03:
        return <ReviewOrder />;
      default:
        return <ReviewOrder />;
    }
  }, [checkOutStep]);

  return (
    <div className="flex h-full w-full flex-col">
      <Elements stripe={stripePromise}>
        <CheckoutHeader />
        <div className="flex h-full w-full overflow-y-auto md:h-[calc(100dvh-80px)]">{renderStepUI()}</div>
      </Elements>
    </div>
  );
};
export default CheckoutPage;
