import { fireStoreDb } from '@/config/firebase.config';
import { collectionFirebases } from '@/constants';
import { generateDisplayMessages } from '@/core/utils';
import {
  IMessageChatBox,
  ISendMessageChatBoxRequest,
  ISupportContactFormRequest,
  MessageType,
} from '@/features/supportCenter/interfaces';
import { createConversationChatBox, sendMessageChatBox } from '@/features/supportCenter/supportCenterActions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { collection, onSnapshot, orderBy, query, where, getDocs, doc, Timestamp } from 'firebase/firestore';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

const useChatBoxHooks = () => {
  const dispatch = useAppDispatch();
  const { isSendingMessage } = useAppSelector((store) => store.supportCenterStore);
  const { user } = useAppSelector((store) => store.userStore);
  const [isShowChatBox, setShowChatBox] = useState<boolean>(false);
  const [isShowFormContact, setShowFormContact] = useState<boolean>(true);
  const [listMessages, setListMessages] = useState<IMessageChatBox[]>([]);
  const [valueInputMessage, setValueInputMessage] = useState<string>('');
  const [emailContact, setEmailContact] = useState<string>('');
  const [conversationId, setConversationId] = useState<string>('');
  const [isRefreshMessages, setRefreshMessages] = useState<boolean>(false);
  const bottomListMessagesRef = useRef<HTMLDivElement>(null);

  const initialValues: ISupportContactFormRequest = {
    email: '',
    phoneNumber: '',
    name: '',
    message: '',
  };

  const onChangeMessage = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValueInputMessage(value);
  }, []);

  const onOpenChatBox = useCallback(() => {
    setShowChatBox(true);
  }, []);

  const onCloseChatBox = useCallback(() => {
    setShowChatBox(false);
  }, []);

  const onSendMessage = useCallback(async () => {
    try {
      const tempMessage: IMessageChatBox = {
        id: 'temp',
        message: valueInputMessage,
        conversationId: '',
        type: MessageType.chat,
        ownerId: '',
        fullName: '',
        createdAt: Timestamp.now(),
        fromContact: true,
      };
      setListMessages([...listMessages, tempMessage]);
      if (listMessages && listMessages.length <= 0 && user) {
        const values: ISupportContactFormRequest = {
          email: user.email,
          phoneNumber: '',
          name: user.firstName + ' ' + user.lastName,
          message: valueInputMessage,
        };
        setValueInputMessage('');
        await dispatch(createConversationChatBox(values));
      } else {
        const values: ISendMessageChatBoxRequest = {
          message: valueInputMessage,
          email: emailContact,
        };
        setValueInputMessage('');
        await dispatch(sendMessageChatBox(values));
      }
      setRefreshMessages(true);
    } catch (error) {
      console.log('error when send message: ', error);
    }
  }, [valueInputMessage, emailContact, listMessages, user, dispatch]);

  const onSubmitForm = useCallback(
    async (values: ISupportContactFormRequest) => {
      try {
        setShowFormContact(false);
        setEmailContact(values.email);
        await dispatch(createConversationChatBox(values));
        setRefreshMessages(true);
      } catch (error) {
        console.log('error when submit form: ', error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (conversationId) {
      const queryData = query(
        collection(
          doc(fireStoreDb, collectionFirebases.conversations, conversationId),
          collectionFirebases.conversationMessages
        ),
        orderBy('createdAt', 'desc')
      );
      const unsubscribe = onSnapshot(queryData, (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as IMessageChatBox[];
        const filterData = data.filter((item) => item.type === MessageType.chat);
        const displayData = generateDisplayMessages(filterData);
        setListMessages(displayData);
      });
      return () => unsubscribe();
    }
  }, [conversationId]);

  useEffect(() => {
    const getConversationId = async () => {
      const q = query(
        collection(fireStoreDb, collectionFirebases.conversations),
        where('contact.email', '==', emailContact)
      );
      const conversationDocs = await getDocs(query(q));
      if (conversationDocs.empty) {
        return null;
      }
      const conversationDoc = conversationDocs.docs[0];
      setConversationId(conversationDoc.id);
      return conversationDoc;
    };
    if (emailContact && isRefreshMessages) {
      getConversationId();
      setRefreshMessages(false);
    }
  }, [emailContact, isRefreshMessages]);

  useEffect(() => {
    bottomListMessagesRef.current?.scrollIntoView({ behavior: 'auto', block: 'end' });
  }, [listMessages.length, bottomListMessagesRef]);

  useEffect(() => {
    if (user) {
      setShowFormContact(false);
      setEmailContact(user.email);
      setRefreshMessages(true);
    }
  }, [user]);

  return {
    bottomListMessagesRef,
    isSendingMessage,
    valueInputMessage,
    listMessages,
    initialValues,
    isShowFormContact,
    isShowChatBox,
    onCloseChatBox,
    onOpenChatBox,
    onSubmitForm,
    onChangeMessage,
    onSendMessage,
  };
};

export default useChatBoxHooks;
