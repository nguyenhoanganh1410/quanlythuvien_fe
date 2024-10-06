import { createQuestion } from '@/features/question/questionActions';
import { useAppDispatch } from '@/store/hooks';
import { ChangeEvent, useCallback, useState } from 'react';

type Props = {
  onClose: () => void;
};

export const useCreateQuestionModalHooks = ({ onClose }: Props) => {
  const dispatch = useAppDispatch();
  const [valueAdd, setValueAdd] = useState<string>('');

  const onChangeValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValueAdd(value);
  }, []);

  const onSaveQuestion = useCallback(async () => {
    if (valueAdd.trim()) {
      onClose();
      await dispatch(
        createQuestion({
          description: valueAdd,
        })
      );
      setValueAdd('');
    }
  }, [valueAdd, onClose]);

  return {
    valueAdd,
    onChangeValue,
    onSaveQuestion,
  };
};
