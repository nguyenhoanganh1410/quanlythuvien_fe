import { IRequestPaymentForm } from '@/features/user/interfaces';
import { checkOutPaymentUrl } from '../../features/card/cardActions';
import { useCallback, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@/store/hooks';
import { applyPromoCode, getProfile } from '@/features/user/userActions';
import { PayloadAction } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/constants';
type Props = {
  onClose: () => void;
};

export const useUpgradePopupHooks = ({ onClose }: Props) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onCheckOutUrl = useCallback(async () => {
    setIsLoading(true);
    const url = await checkOutPaymentUrl();
    window.location.href = url.checkout_url;
    onClose();
    setIsLoading(false);
  }, [onClose]);

  const submitValidator = () => {
    return Yup.object().shape({
      promoCode: Yup.string().matches(/^[a-zA-Z0-9]{20}$/, 'Key must be 20 alphanumeric characters'),
    });
  };

  const initialValues: IRequestPaymentForm = {
    promoCode: '',
  };

  const navFreeTrial = async () => {
    navigate(PATHS.FREE_TRIAL);
  };

  const onSubmitForm = useCallback(async (values: IRequestPaymentForm) => {
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
      onClose();
      await dispatch(getProfile());
    }
  }, []);

  return {
    isLoading,
    initialValues,
    onCheckOutUrl,
    submitValidator,
    onSubmitForm,
    navFreeTrial,
  };
};
