import { FC } from 'react';
import { IPolicy } from '@/features/policy/interfaces';
import EmailHeader from './components/EmailHeader';
import ListMessage from './components/ListMessage';
import ListMail from './components/ListMail';
import useEmailViewHooks from './hooks';

type Props = {
  currentPolicy: IPolicy;
};

const EmailView: FC<Props> = ({ currentPolicy }) => {
  const { selectedEmail, onSelectEmail } = useEmailViewHooks();

  if (!currentPolicy) {
    return null;
  }

  return (
    <div className="flex w-full flex-col">
      <EmailHeader currentPolicy={currentPolicy} />
      <div className="flex h-full w-full flex-row space-x-4 bg-lightWhite">
        <ListMail selectedEmail={selectedEmail} onSelectEmail={onSelectEmail} />
        <ListMessage currentPolicy={currentPolicy} />
      </div>
    </div>
  );
};

export default EmailView;
