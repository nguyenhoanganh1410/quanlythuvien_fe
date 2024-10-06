import { fireStoreDb } from '@/config/firebase.config';
import { IMessage } from '@/features/chat/interfaces';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import moment from 'moment';
import { ChangeEvent, useCallback, useState } from 'react';
import { createFeedback } from '@/features/chat/chatActions';

type Props = {
  message: IMessage;
  onClose: () => void;
};

export const useFeedbackModalHooks = ({ message, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const { currentChatSession } = useAppSelector((state: RootState) => state.chatStore);
  const { user } = useAppSelector((state: RootState) => state.userStore);
  const [valueFeedback, setValueFeedback] = useState<string>('');

  const onChangeFeedback = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setValueFeedback(value);
  }, []);

  const onSubmit = useCallback(async () => {
    if (currentChatSession && user && message) {
      const feedbackData = {
        id: user.id + moment().unix().toString(),
        userId: user.id,
        feedback: valueFeedback,
        createAt: moment.utc(new Date()).format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ'),
      };
      onClose();
      await updateDoc(doc(fireStoreDb, 'chat', currentChatSession.id, 'feedbacks', message.id), {
        feedBacks: arrayUnion(feedbackData),
      });

      const feedBackData: IMessage = {
        value: message.value,
        thumbUpUsers: message.thumbUpUsers,
        feedbacks: feedbackData as any,
        metadata: {
          userId: 0,
          email: '',
        },
        role: '',
        id: '',
        status: '',
        annotations: [],
      };
      await dispatch(createFeedback(feedBackData));
    }
  }, [currentChatSession, user, message, valueFeedback, onClose]);

  return {
    valueFeedback,
    onChangeFeedback,
    onSubmit,
  };
};
