import { RootState } from '@/store';
import { useSelector } from 'react-redux';

export const CHECKOUT_VALUES = ['Company', 'Payment', 'Review', 'Complete'];

export const useCheckoutHeader = () => {
  const { checkOutStep } = useSelector((state: RootState) => state.checkoutStore);

  return {
    checkOutStep,
  };
};
