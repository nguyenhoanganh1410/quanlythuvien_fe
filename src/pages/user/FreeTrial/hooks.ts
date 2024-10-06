import { PATHS } from '@/constants/route';
import { PAY_COST_PER_MONTH } from '@/constants/trialConstants';
import { useState } from 'react';

type Props = {};

export const useFreeTrialHooks = ({}: Props) => {
  const [isLoadingCost, setIsLoadingCost] = useState<boolean>(false);
  const [cost, setCost] = useState<string>(PAY_COST_PER_MONTH);
  const [isAgreementModal, setAgreementModal] = useState<boolean>(false);

  const onOrderSummary = (newLoading: boolean, newCost: string) => {
    setIsLoadingCost(newLoading);
    setCost(newCost);
  };

  const navHome = () => {
    window.location.href = PATHS.HOME;
  };

  const handleCloseAgreementModal = () => {
    setAgreementModal(true);
  };

  const handleOpenAgreementModal = () => {
    setAgreementModal(true);
  };

  return {
    cost,
    isLoadingCost,
    isAgreementModal,
    onOrderSummary,
    navHome,
    handleCloseAgreementModal,
    handleOpenAgreementModal,
  };
};
