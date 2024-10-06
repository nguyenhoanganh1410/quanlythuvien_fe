import { fireStoreDb } from '@/config/firebase.config';
import { collectionFirebases } from '@/constants';
import { IEmailDocument } from '@/features/chat/interfaces';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const useListMailHooks = () => {
  const [listEmails, setListEmails] = useState<IEmailDocument[]>([]);

  useEffect(() => {
    const queryData = query(collection(fireStoreDb, collectionFirebases.emailDocuments), orderBy('updatedAt', 'desc'));
    const emailDocumentsListener = onSnapshot(queryData, async (querySnapshot) => {
      const dataEmails = querySnapshot.docs.map((emailDoc) => {
        return {
          id: emailDoc.id,
          ...emailDoc.data(),
        };
      }) as IEmailDocument[];
      setListEmails(dataEmails);
    });
    return () => emailDocumentsListener();
  }, []);

  return {
    listEmails,
  };
};

export default useListMailHooks;
