import { getInvoiceDetail, getListOrderHistories } from '@/features/payment/paymentActions';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { PayloadAction } from '@reduxjs/toolkit';
import { useCallback, useEffect } from 'react';

export const useOrderHistoryHooks = () => {
  const { transactionsHistory, isLoading } = useAppSelector((state: RootState) => state.paymentStore);
  const dispatch = useAppDispatch();

  const onOpenInvoice = useCallback(
    async (invoiceId: string) => {
      const data: PayloadAction<any> = await dispatch(getInvoiceDetail({ invoiceId }));
      if (data && data.payload.hostedInvoiceUrl) {
        if (!window.open(data.payload.hostedInvoiceUrl)) {
          window.location.href = data.payload.hostedInvoiceUrl;
        }
      }
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getListOrderHistories());
  }, [dispatch]);

  return {
    transactionsHistory,
    onOpenInvoice,
    isLoading,
  };
};
