import { payCurrentPayAsYouGoCost } from '@/features/payment/paymentActions';
import { getPaymentStatus } from '@/features/user/userActions';
import { IUsageData } from '@/interfaces';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

const defaultUsageData: IUsageData[] = [
  { angle: 0, label: '0%' },
  { angle: 100, label: '' },
];

export const useProfileSectionHooks = () => {
  const [isShowUpdateProfilePopup, setIsShowUpdateProfilePopup] = useState<boolean>(false);
  const [updateType, setUpdateType] = useState<string>('');
  const {
    isLoading: isLoadingUser,
    paymentStatus: paymentStatusData,
    user,
  } = useAppSelector((state: RootState) => state.userStore);
  const [usageData, setUsageData] = useState<IUsageData[]>(defaultUsageData);
  const dispatch = useAppDispatch();

  const onSelectUpdateProfile = useCallback(
    (updateType: string) => () => {
      setUpdateType(updateType);
      setIsShowUpdateProfilePopup(true);
    },
    []
  );

  const paymentStatus = useMemo(() => {
    return paymentStatusData;
  }, [paymentStatusData]);

  React.useEffect(() => {
    const fetchData = async () => {
      await dispatch(getPaymentStatus());
      if (paymentStatus) {
        const percentage = Math.round((paymentStatus.normalUsageCost.used / paymentStatus.normalUsageCost.limit) * 100);
        const newUsageData = [
          { angle: percentage, label: `${percentage}%` },
          { angle: 100 - percentage, label: '' },
        ];
        setUsageData(newUsageData);
      }
    };

    fetchData();
  }, []);

  const onPayCurrentPayAsYouGoCost = useCallback(async () => {
    await dispatch(payCurrentPayAsYouGoCost());
    await dispatch(getPaymentStatus());
    toast('Paid pay as you go subscription successfully!', {
      type: 'success',
      position: 'bottom-center',
      theme: 'light',
      autoClose: 5000,
      hideProgressBar: true,
      closeButton: false,
      bodyClassName: 'toast-body',
    });
  }, [dispatch]);

  const onCloseUpdateProfilePopup = useCallback(() => {
    setIsShowUpdateProfilePopup(false);
  }, []);

  return {
    isLoadingUser,
    user,
    updateType,
    isShowUpdateProfilePopup,
    paymentStatus,
    usageData,
    onCloseUpdateProfilePopup,
    onSelectUpdateProfile,
    onPayCurrentPayAsYouGoCost,
  };
};
