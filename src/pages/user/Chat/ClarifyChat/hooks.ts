import { fireStoreDb } from '@/config/firebase.config';
import { EPolicyStatus } from '@/constants/enum';
import { removeCharacterSource } from '@/core/utils';
import { sendQuestionChat } from '@/features/chat/chatActions';
import {
  EMessageStatus,
  FeedbackStatus,
  IFeedBackMessage,
  IMessage,
  IQuestionChatRequest,
} from '@/features/chat/interfaces';
import { IUpdatePolicyRequest } from '@/features/policy/interfaces';
import { updatePolicy } from '@/features/policy/policyActions';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';

type Props = {
  onBack: () => void;
  onPrintInvoicePdf: () => void;
};

export const useClarifyChatHooks = ({ onBack, onPrintInvoicePdf }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.userStore);
  const { currentPolicy } = useAppSelector((state: RootState) => state.policyStore);
  const { pingStatus, currentChatSession } = useAppSelector((state: RootState) => state.chatStore);
  const [valueChat, setValueChat] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [isShowPopupEndClarifi, setShowPopupEndClarifi] = useState<boolean>(false);
  const refListMessages = useRef<IMessage[]>([]);
  const [isEditingClaimNumber, setEditingClaimNumber] = useState<boolean>(false);
  const [valueClaimNumber, setValueClaimNumber] = useState<string>(currentPolicy?.claimNumber ?? '');
  const [checkedDownload, setCheckedDownload] = useState<boolean>(false);
  const [statusFeedback, setStatusFeedBack] = useState<string>('');
  const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(null);
  const [isShowPopupFeedback, setShowPopupFeedback] = useState<boolean>(false);
  const [isShowIdleQuestionModal, setShowIdleQuestionModal] = useState<boolean>(false);
  const [_isRefreshListMessages, setRefreshListMessages] = useState<boolean>(false);
  const [isShowEditPolicyForm, setShowEditPolicyForm] = useState<boolean>(false);

  const onClosePopupFeedback = useCallback(() => {
    setShowPopupFeedback(false);
    setSelectedMessage(null);
  }, []);

  const onChangeValueClaimNumber = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValueClaimNumber(event.target.value);
  }, []);

  const onSaveValueClaimNumber = useCallback(async () => {
    if (currentPolicy) {
      setEditingClaimNumber(false);
      await dispatch(
        updatePolicy({
          id: currentPolicy.id,
          claimNumber: valueClaimNumber,
        })
      );
    }
  }, [valueClaimNumber, currentPolicy]);

  const onShowEditPolicyForm = useCallback(() => {
    setShowEditPolicyForm(true);
  }, []);

  const onCloseEditPolicyForm = useCallback(() => {
    setShowEditPolicyForm(false);
  }, []);

  const onSelectEditClaimNumber = useCallback(() => {
    setEditingClaimNumber(true);
  }, []);

  const onCloseEditClaimNumber = useCallback(() => {
    setEditingClaimNumber(false);
  }, []);

  const onChangeValueChat = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValueChat(event.target.value);
  }, []);

  const onshowPopupEndClarifi = useCallback(() => {
    setShowPopupEndClarifi(true);
  }, []);

  const onClosePopupEndClarifi = useCallback(() => {
    setShowPopupEndClarifi(false);
  }, []);

  const onSend = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      setIsTyping(true);
      event.preventDefault();
      if (valueChat && currentChatSession) {
        const questionChatRequest: IQuestionChatRequest = {
          input: `${valueChat.trim()}`,
          chatSessionId: currentChatSession.id,
          threadId: currentChatSession.openaiThreadId,
        };
        const newMessage: IMessage = {
          id: new Date().toDateString(),
          status: EMessageStatus.new,
          metadata: {
            userId: user?.id!,
            email: user?.email!,
          },
          annotations: [],
          role: 'user',
          value: valueChat.trim(),
        };
        refListMessages.current = [newMessage, ...refListMessages.current];
        setValueChat('');
        await dispatch(sendQuestionChat(questionChatRequest));
      }
    },
    [valueChat, currentChatSession]
  );

  const onCheckedDownload = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setCheckedDownload(event.target.checked);
  }, []);

  const onEndClarification = useCallback(async () => {
    if (currentPolicy) {
      setShowPopupEndClarifi(false);
      onBack();
      checkedDownload && onPrintInvoicePdf();
      const request: IUpdatePolicyRequest = {
        id: currentPolicy.id,
        isOpenCase: false,
        status: EPolicyStatus.CLARIFIED,
      };
      await dispatch(updatePolicy(request));
    }
  }, [currentPolicy, checkedDownload, onBack, onPrintInvoicePdf]);

  const onContinueAnswer = useCallback(async () => {
    if (currentChatSession) {
      const listPendingMessages = refListMessages.current.filter((item) => item.status === EMessageStatus.pending);
      await Promise.all(
        listPendingMessages.map(async (pendingMessage) => {
          await updateDoc(doc(fireStoreDb, 'chat', currentChatSession.id, 'messages', pendingMessage.id), {
            status: EMessageStatus.new,
          });
        })
      );
      setShowIdleQuestionModal(false);
    }
  }, [currentChatSession]);

  const onRemoveAnswer = useCallback(async () => {
    if (currentChatSession) {
      const listPendingMessages = refListMessages.current.filter((item) => item.status === EMessageStatus.pending);
      await Promise.all(
        listPendingMessages.map(async (pendingMessage) => {
          await updateDoc(doc(fireStoreDb, 'chat', currentChatSession.id, 'messages', pendingMessage.id), {
            status: EMessageStatus.deleted,
          });
        })
      );
      setShowIdleQuestionModal(false);
    }
  }, []);

  const onThumbUpMessage = useCallback(
    (message: IMessage) => async () => {
      if (message.thumbUpUsers && message.thumbUpUsers.length > 0 && message.thumbUpUsers.includes(user?.id!)) {
        return;
      }
      if (currentChatSession && user) {
        const thumbUpUsers = message.thumbUpUsers ? [...message.thumbUpUsers!, user.id] : [user.id];
        const indexMessage = refListMessages.current.findIndex((item) => item.id === message.id);
        refListMessages.current[indexMessage].thumbUpUsers = thumbUpUsers;
        setStatusFeedBack(FeedbackStatus.thumbUp);
        setSelectedMessage(message);
        setShowPopupFeedback(true);
        await setDoc(doc(fireStoreDb, 'chat', currentChatSession.id, 'feedbacks', message.id), {
          thumbUpUsers: arrayUnion(user.id),
        });
      }
    },
    [currentChatSession, user]
  );

  const onThumbDownMessage = useCallback(
    (message: IMessage) => async () => {
      if (message.thumbDownUsers && message.thumbDownUsers.length > 0 && message.thumbDownUsers.includes(user?.id!)) {
        return;
      }
      if (currentChatSession && user) {
        const thumbDownUsers = message.thumbDownUsers ? [...message.thumbDownUsers!, user.id] : [user.id];
        const indexMessage = refListMessages.current.findIndex((item) => item.id === message.id);
        refListMessages.current[indexMessage].thumbDownUsers = thumbDownUsers;
        setStatusFeedBack(FeedbackStatus.thumbDown);
        setSelectedMessage(message);
        setShowPopupFeedback(true);
        await setDoc(doc(fireStoreDb, 'chat', currentChatSession.id, 'feedbacks', message.id), {
          thumbDownUsers: arrayUnion(user.id),
        });
      }
    },
    [currentChatSession, user]
  );

  useEffect(() => {
    if (currentChatSession) {
      try {
        const queryData = query(
          collection(fireStoreDb, 'chat', currentChatSession.id, 'messages'),
          orderBy('time', 'desc'),
          where('status', 'in', [EMessageStatus.new, EMessageStatus.pending])
        );
        const messagesListener = onSnapshot(queryData, async (querySnapshot) => {
          const dataMessages = querySnapshot.docs.map((messageDoc) => {
            return {
              id: messageDoc.id,
              ...messageDoc.data(),
            };
          }) as IMessage[];
          const newDataMessages = await Promise.all(
            dataMessages.map(async (message) => {
              const feedbackDocRef = doc(fireStoreDb, 'chat', currentChatSession.id, 'feedbacks', message.id);
              const feedbackDocSnap = await getDoc(feedbackDocRef);
              if (feedbackDocSnap.exists()) {
                const feedbackData = feedbackDocSnap.data() as IFeedBackMessage;
                return {
                  ...message,
                  thumbUpUsers: feedbackData.thumbUpUsers ?? [],
                  thumbDownUsers: feedbackData.thumbDownUsers ?? [],
                  feedbacks: feedbackData.feedbacks ?? [],
                };
              }
              return { ...message };
            })
          );
          if (newDataMessages && newDataMessages.length > 0) {
            const newListMessages = newDataMessages.map((item) => {
              const valueAfterRemoveSource = removeCharacterSource(item.value);
              const splitValues = valueAfterRemoveSource.split('\n');
              const lastValue = splitValues[splitValues.length - 1];
              if (lastValue.includes('page:')) {
                const splitLastValue = lastValue.split(': ');
                const pageNumber = splitLastValue[splitLastValue.length - 1];
                splitValues[splitValues.length - 1] = `<p><button>Click Here</button> to view this information.</p>`;
                const message = splitValues.join('\n');
                return { ...item, value: message, pageNumber: parseInt(pageNumber) };
              }
              return { ...item, value: removeCharacterSource(item.value) };
            });
            const firstMessageFromAI = newListMessages[0];
            const firstMessageCurrent = refListMessages.current[0];

            if (firstMessageFromAI.value.trim() === '') {
              setIsTyping(true);
              return;
            }
            if (firstMessageFromAI.value.trim() !== (firstMessageCurrent && firstMessageCurrent.value.trim())) {
              refListMessages.current = newListMessages;
              const pendingMessage = newListMessages.find((item) => item.status === EMessageStatus.pending);
              pendingMessage && setShowIdleQuestionModal(true);
              setRefreshListMessages((prev) => !prev);
              setIsTyping(false);
              return;
            }
          }
        });
        return () => messagesListener();
      } catch (e) {
        console.log('----------ERROR IN GET LIST MESSAGES ----------');
      }
    }
  }, [currentChatSession]);

  return {
    isShowEditPolicyForm,
    isShowIdleQuestionModal,
    selectedMessage,
    statusFeedback,
    isShowPopupFeedback,
    user,
    checkedDownload,
    refListMessages,
    isTyping,
    pingStatus,
    currentPolicy,
    valueChat,
    isShowPopupEndClarifi,
    isEditingClaimNumber,
    valueClaimNumber,
    onShowEditPolicyForm,
    onCloseEditPolicyForm,
    onContinueAnswer,
    onRemoveAnswer,
    onThumbUpMessage,
    onThumbDownMessage,
    setCheckedDownload,
    onChangeValueClaimNumber,
    onSelectEditClaimNumber,
    onCloseEditClaimNumber,
    onshowPopupEndClarifi,
    onClosePopupEndClarifi,
    onSend,
    onChangeValueChat,
    onEndClarification,
    onSaveValueClaimNumber,
    onCheckedDownload,
    onClosePopupFeedback,
  };
};
