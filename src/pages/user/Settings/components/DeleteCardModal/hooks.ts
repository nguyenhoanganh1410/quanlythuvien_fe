import { deleteCard, getListCards } from '@/features/card/cardActions';
import { useCallback, useState } from 'react';
import { useAppDispatch } from '@/store/hooks';

type Props = {
  cardId: string;
  onClose: () => void;
};

export const useDeteleCardModalHooks = ({ cardId, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState<boolean>(false);

  const onDeleteCard = useCallback(async () => {
    setLoading(true);
    await deleteCard(cardId);
    await dispatch(getListCards());
    onClose();
    setLoading(false);
  }, [cardId, onClose]);

  return {
    isLoading,
    onDeleteCard,
  };
};
