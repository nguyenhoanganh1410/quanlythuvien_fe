import { RootState } from '@/store';
import { useSelector } from 'react-redux';

export const useCheckoutHooks = () => {
  const { checkOutStep } = useSelector((state: RootState) => state.checkoutStore);

  return {
    checkOutStep,
  };
};
