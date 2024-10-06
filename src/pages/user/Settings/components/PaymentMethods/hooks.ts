import React, { useCallback, useState, useMemo } from 'react';
import { getListCards } from '@/features/card/cardActions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';

export const usePaymentMethodsHooks = () => {
  const { listCards: listCardsStore } = useAppSelector((state: RootState) => state.cardStore);

  const [isOpenCardSetupForm, setOpenCardSetupForm] = useState<boolean>(false);
  const [isOpenDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [cardId, setCardId] = useState<string>('');
  const dispatch = useAppDispatch();
  const onAddPaymentMethod = useCallback(async () => {
    setOpenCardSetupForm(true);
  }, []);

  const onCloseCardSetupForm = useCallback(() => {
    setOpenCardSetupForm(false);
  }, []);

  const onDeleteModal = useCallback(async (cardId: string) => {
    setCardId(cardId);
    setOpenDeleteModal(true);
  }, []);

  const onCloseDeleteModal = useCallback(async () => {
    setOpenDeleteModal(false);
  }, []);

  const listCards = useMemo(() => {
    return listCardsStore;
  }, [listCardsStore]);

  React.useEffect(() => {
    const loadCards = async () => {
      await dispatch(getListCards());
    };
    loadCards();
  }, []);

  return {
    listCards,
    isOpenCardSetupForm,
    isOpenDeleteModal,
    cardId,
    onAddPaymentMethod,
    onCloseCardSetupForm,
    onDeleteModal,
    onCloseDeleteModal,
  };
};
