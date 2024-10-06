import { LIST_DOCUMENTS } from '@/constants/fakeData';
import { IDocument } from '@/features/policy/interfaces';
import { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';
import { useCallback, useState } from 'react';

export const useDocumentsHooks = () => {
  const { currentPolicy } = useAppSelector((state: RootState) => state.policyStore);
  const [listDocuments] = useState<IDocument[]>(LIST_DOCUMENTS);
  const [documentIdShowPopover, setDocumentIdShowPopover] = useState<string | null>(null);

  const onShowPopover = useCallback(
    (documentId: string) => () => {
      setDocumentIdShowPopover(documentId);
    },
    []
  );

  const onClosePopover = useCallback(() => {
    setDocumentIdShowPopover(null);
  }, []);

  const onDownloadDocument = useCallback(() => {
    setDocumentIdShowPopover(null);
  }, []);

  const onShareDocument = useCallback(() => {
    setDocumentIdShowPopover(null);
  }, []);

  const onDeleteDocument = useCallback(() => {
    setDocumentIdShowPopover(null);
  }, []);

  return {
    currentPolicy,
    documentIdShowPopover,
    listDocuments,
    onShowPopover,
    onClosePopover,
    onDownloadDocument,
    onShareDocument,
    onDeleteDocument,
  };
};
