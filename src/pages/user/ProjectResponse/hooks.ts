import { getListFeedbacks } from '@/features/chat/chatActions';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { useMemo } from 'react';
import { ChangeEvent, useCallback, useState } from 'react';

export const useProjectResponseHooks = () => {
  const { feedbacksData: feedbacksDataStore, listFeedbacks: listFeedbacksStore } = useAppSelector(
    (state: RootState) => state.chatStore
  );

  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState<string>('');

  const onChangeSearchValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setSearchValue(search);
  }, []);

  React.useEffect(() => {
    const loadFeedbacks = async () => {
      await dispatch(
        getListFeedbacks({
          search: searchValue,
        })
      );
    };
    loadFeedbacks();
  }, [searchValue]);

  const listFeekbacks = useMemo(() => {
    return listFeedbacksStore;
  }, [listFeedbacksStore]);

  const feedbacksData = useMemo(() => {
    return feedbacksDataStore;
  }, [feedbacksDataStore]);

  const onFetchMoreFeekbacks = useCallback(async () => {
    if (feedbacksData) {
      const nextPage = feedbacksData.page + 1;
      await dispatch(
        getListFeedbacks({
          search: searchValue,
          page: nextPage,
        })
      );
    }
  }, [feedbacksData, searchValue]);

  return {
    listFeekbacks,
    feedbacksData,
    searchValue,
    onChangeSearchValue,
    onFetchMoreFeekbacks,
  };
};
