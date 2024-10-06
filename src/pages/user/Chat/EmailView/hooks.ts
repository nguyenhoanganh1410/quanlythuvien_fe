import { IEmailDocument } from '@/features/chat/interfaces';
import { useCallback, useState } from 'react';

const useEmailViewHooks = () => {
  const [selectedEmail, setSelectedEmail] = useState<IEmailDocument | null>(null);

  const onSelectEmail = useCallback((value: IEmailDocument | null) => {
    setSelectedEmail(value);
  }, []);

  return {
    selectedEmail,
    onSelectEmail,
  };
};

export default useEmailViewHooks;
