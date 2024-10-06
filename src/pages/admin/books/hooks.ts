import { getListBooks } from '@/features/books/bookActions';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useCallback, useEffect, useState } from 'react';

export const useAdminBookHooks = () => {
  const dispatch = useAppDispatch();
  const { listBooks, isLoading } = useAppSelector((state: RootState) => state.bookStore);
  const [showModelAddBook, setShowModelAddBook] = useState(false);

  const onShowModeAddBook = useCallback(() => {
    setShowModelAddBook(true);
  }, []);

  const onCloseModeAddBook = useCallback(() => {
    setShowModelAddBook(false);
  }, []);

  useEffect(() => {
    const loadArticles = async () => {
      await dispatch(getListBooks());
    };
    loadArticles();
  }, []);

  return {
    listBooks,
    isLoading,
    showModelAddBook,
    onShowModeAddBook,
    onCloseModeAddBook,
  };
};
