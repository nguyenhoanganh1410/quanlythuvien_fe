import { IPresetQuestion } from '@/features/question/interfaces';
import { deleteQuestion, editQuestion } from '@/features/question/questionActions';
import { useAppDispatch } from '@/store/hooks';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';

type Props = {
  question: IPresetQuestion | null;
  onClose: () => void;
};

export const useEditQuestionModalHooks = ({ question, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const [editValue, setEditValue] = useState<string>(question?.description ?? '');

  const disabledButton = useMemo(() => {
    if (!editValue || (question && question.description) === editValue) {
      return true;
    }
    return false;
  }, [question, editValue]);

  const onChangeEditValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEditValue(value);
  }, []);

  const onSaveEditQuestion = useCallback(async () => {
    if (question) {
      onClose();
      await dispatch(
        editQuestion({
          id: question.id,
          description: editValue,
        })
      );
      setEditValue('');
    }
  }, [editValue, question, onClose]);

  const onDeleteQuestion = useCallback(async () => {
    if (question) {
      onClose();
      await dispatch(deleteQuestion(question.id));
    }
  }, [editValue, question, onClose]);

  return {
    disabledButton,
    editValue,
    onSaveEditQuestion,
    onChangeEditValue,
    onDeleteQuestion,
  };
};
