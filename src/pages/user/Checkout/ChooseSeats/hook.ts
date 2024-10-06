import { CHECKOUT_STEPS, PRICE_DEFAULT } from '@/constants/trialConstants';
import { updateCheckoutStep, updateSeatsData } from '@/features/checkout/checkoutData';
import { ISeats } from '@/features/checkout/interfaces';
import { useAppDispatch } from '@/store/hooks';
import { useState } from 'react';

export const useChooseSeats = () => {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(PRICE_DEFAULT);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue === '' || (!isNaN(Number(newValue)) && Number(newValue) >= 1)) {
      setValue(Number(newValue));
      const newTotalPrice = Number(newValue) * 149;
      setTotalPrice(newTotalPrice);
    }
  };

  const handleContinue = () => {
    const SeatsRequest: ISeats = {
      seats: Number(value),
      price: Number(totalPrice),
      priceDiscount: Number((Number(totalPrice) - Number(totalPrice) * 0.15).toFixed(2)),
    };
    dispatch(updateSeatsData(SeatsRequest));
    dispatch(updateCheckoutStep(CHECKOUT_STEPS.step01));
  };
  return {
    value,
    totalPrice,
    handleChange,
    handleContinue,
  };
};
