import { ChangeEvent, useCallback, useRef, useState, KeyboardEvent, useMemo } from 'react';

import Quill from 'quill';
import { IEmailDocumentFormRequest } from '@/features/chat/interfaces';
import { IPolicy } from '@/features/policy/interfaces';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { fireStoreDb } from '@/config/firebase.config';
import { collectionFirebases } from '@/constants';

type Props = {
  currentPolicy: IPolicy;
};

const useMailInputHooks = ({ currentPolicy }: Props) => {
  const quillRef = useRef<Quill | null>(null);
  const [listRecipients, setListRecipients] = useState<string[]>([]);
  const [listCcEmails, setListCcEmails] = useState<string[]>([]);
  const [listBccEmails, setListBccEmails] = useState<string[]>([]);
  const [recipientValueInput, setRecipientValueInput] = useState<string>('');
  const [ccValueInput, setCcValueInput] = useState<string>('');
  const [bccValueInput, setBccValueInput] = useState<string>('');
  const [isShowCcEmail, setShowCcEmail] = useState<boolean>(false);
  const [isShowBccEmail, setShowBccEmail] = useState<boolean>(false);
  const [subjectValueInput, setSubjectValueInput] = useState<string>('');
  const [contentValueInput, setContentValueInput] = useState<string>('');

  const isDisabledSubmitButton = useMemo(() => {
    if (listRecipients.length > 0 && contentValueInput !== '' && contentValueInput !== '<p><br></p>') {
      return false;
    }
    return true;
  }, [listRecipients, contentValueInput]);

  const onClearForm = useCallback(() => {
    setListRecipients([]);
    setListCcEmails([]);
    setListBccEmails([]);
    setRecipientValueInput('');
    setCcValueInput('');
    setBccValueInput('');
    setShowCcEmail(false);
    setShowBccEmail(false);
    setSubjectValueInput('');
    setContentValueInput('');
    quillRef.current?.deleteText(0, quillRef.current.getLength());
  }, []);

  const onChangeSubjectValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSubjectValueInput(event.target.value);
  }, []);

  const onChangeRecipientValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setRecipientValueInput(event.target.value);
  }, []);

  const onKeyDownRecipientInput = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        const newListRecipients = [...listRecipients, recipientValueInput];
        setListRecipients(newListRecipients);
        setRecipientValueInput('');
      }
    },
    [listRecipients, recipientValueInput]
  );

  const onRemoveRecipient = useCallback(
    (removedItem: string) => () => {
      const newList = listRecipients.filter((item) => item !== removedItem);
      setListRecipients(newList);
    },
    [listRecipients]
  );

  const onToggleCcEmail = useCallback(() => {
    setListCcEmails([]);
    setShowCcEmail(!isShowCcEmail);
  }, [isShowCcEmail]);

  const onChangeCcValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setCcValueInput(event.target.value);
  }, []);

  const onKeyDownCcInput = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        const newListCc = [...listCcEmails, ccValueInput];
        setListCcEmails(newListCc);
        setCcValueInput('');
      }
    },
    [listCcEmails, ccValueInput]
  );

  const onRemoveCc = useCallback(
    (removedItem: string) => () => {
      const newList = listCcEmails.filter((item) => item !== removedItem);
      setListCcEmails(newList);
    },
    [listCcEmails]
  );

  const onToggleBccEmail = useCallback(() => {
    setListBccEmails([]);
    setShowBccEmail(!isShowBccEmail);
  }, [isShowBccEmail]);

  const onChangeBccValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setBccValueInput(event.target.value);
  }, []);

  const onKeyDownBccInput = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        const newListBcc = [...listBccEmails, bccValueInput];
        setListBccEmails(newListBcc);
        setBccValueInput('');
      }
    },
    [listBccEmails, bccValueInput]
  );

  const onRemoveBcc = useCallback(
    (removedItem: string) => () => {
      const newList = listBccEmails.filter((item) => item !== removedItem);
      setListBccEmails(newList);
    },
    [listBccEmails]
  );

  const onSubmitForm = useCallback(async () => {
    try {
      const values: IEmailDocumentFormRequest = {
        recipients: listRecipients,
        cc: listCcEmails,
        bcc: listBccEmails,
        content: `<div>${contentValueInput}</div>`,
        subject: subjectValueInput,
        policyId: currentPolicy.id,
        updatedAt: Timestamp.now(),
      };
      await addDoc(collection(fireStoreDb, collectionFirebases.emailDocuments), values);
      onClearForm();
    } catch (error) {
      console.log('Error when add mail box: ', error);
    }
  }, [contentValueInput, listBccEmails, listCcEmails, listRecipients, subjectValueInput, currentPolicy, onClearForm]);

  return {
    isDisabledSubmitButton,
    subjectValueInput,
    listCcEmails,
    listBccEmails,
    isShowBccEmail,
    isShowCcEmail,
    quillRef,
    listRecipients,
    recipientValueInput,
    ccValueInput,
    bccValueInput,
    contentValueInput,
    onChangeBccValue,
    onChangeCcValue,
    onChangeRecipientValue,
    onKeyDownRecipientInput,
    onRemoveRecipient,
    onToggleCcEmail,
    onToggleBccEmail,
    onRemoveBcc,
    onRemoveCc,
    onKeyDownBccInput,
    onKeyDownCcInput,
    onChangeSubjectValue,
    onSubmitForm,
    setContentValueInput,
  };
};

export default useMailInputHooks;
