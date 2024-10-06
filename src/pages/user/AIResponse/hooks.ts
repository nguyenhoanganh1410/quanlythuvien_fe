import { getListMessages } from '@/features/chat/chatActions';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { useMemo, ChangeEvent, useCallback, useState } from 'react';

export const useAIResponseHooks = () => {
  const { aiResponseData: messagesDataStore, listAIResponse: listMessagesStore } = useAppSelector(
    (state: RootState) => state.chatStore
  );

  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState<string>('');

  const onChangeSearchValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setSearchValue(search);
  }, []);

  React.useEffect(() => {
    const loadMessages = async () => {
      await dispatch(
        getListMessages({
          search: searchValue,
        })
      );
    };
    loadMessages();
  }, [searchValue]);

  const listMessages = useMemo(() => {
    return listMessagesStore;
  }, [listMessagesStore]);

  const messagesData = useMemo(() => {
    return messagesDataStore;
  }, [messagesDataStore]);

  const onFetchMoreMessages = useCallback(async () => {
    if (messagesData) {
      const nextPage = messagesData.page + 1;
      await dispatch(
        getListMessages({
          page: nextPage,
        })
      );
    }
  }, [messagesData, listMessages, searchValue]);

  return {
    listMessages,
    messagesData,
    searchValue,
    onChangeSearchValue,
    onFetchMoreMessages,
  };
};
