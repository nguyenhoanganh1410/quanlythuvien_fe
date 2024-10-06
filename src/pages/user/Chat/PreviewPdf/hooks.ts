import { useCallback, useEffect, useRef, useState } from 'react';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { setScrollToPage } from '@/features/chat/chatSlice';

type Props = {
  currentPageNumber: number;
};

export const usePreviewPdfHooks = ({ currentPageNumber }: Props) => {
  const { currentPolicy, currentFilePolicyUrl } = useAppSelector((state: RootState) => state.policyStore);
  const { isScrollToPage } = useAppSelector((state: RootState) => state.chatStore);
  const dispatch = useAppDispatch();
  const [numPages, setNumPages] = useState<number>();
  const [isLoadingFile, setLoadingFile] = useState<boolean>(true);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const onDocumentLoadSuccess = useCallback(({ numPages }: PDFDocumentProxy) => {
    setNumPages(numPages);
    setLoadingFile(false);
  }, []);

  useEffect(() => {
    const onScrollPage = async () => {
      pageRefs.current[currentPageNumber]?.scrollIntoView({ behavior: 'smooth' });
      await dispatch(setScrollToPage(false));
    };
    if (isScrollToPage) {
      onScrollPage();
    }
  }, [currentPageNumber, isScrollToPage]);

  return {
    currentFilePolicyUrl,
    currentPolicy,
    isLoadingFile,
    numPages,
    pageRefs,
    onDocumentLoadSuccess,
  };
};
