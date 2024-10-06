import CheckSquareIcon from '@/components/iconSvgs/CheckSquareIcon';
import StarIcon from '@/components/iconSvgs/StarIcon';
import { IEmailDocument } from '@/features/chat/interfaces';
import clsx from 'clsx';
import { FC } from 'react';
import useListMailHooks from './hooks';
import { getTimeLastMessage } from '@/core/utils';

type MailBoxProps = {
  isSelected: boolean;
  item: IEmailDocument;
  onSelectEmail: () => void;
};

const MailBoxItem: FC<MailBoxProps> = ({ isSelected, item, onSelectEmail }) => {
  return (
    <div
      onClick={onSelectEmail}
      className={clsx(
        'flex w-full cursor-pointer flex-row space-x-4 border-b border-b-secondary/20 px-4 py-4',
        isSelected ? 'bg-lightBlue' : 'bg-white'
      )}
    >
      <button className="h-fit">
        <CheckSquareIcon />
      </button>
      <div
        className={clsx(
          'flex flex-1 flex-col overflow-hidden font-Lato text-xs lg:text-sm 2xl:text-base',
          item.isRead ? 'text-primaryGrey' : 'text-primaryBlack'
        )}
      >
        <p className="truncate text-ellipsis font-bold">{item.senderName ?? item.recipients.join(', ')}</p>
        <p className="truncate text-ellipsis font-medium">{item.subject ?? '(No subject)'}</p>
        <div
          className="truncate text-ellipsis font-normal text-primaryGrey "
          dangerouslySetInnerHTML={{ __html: item.content.slice(0, 50) }}
        />
      </div>
      <div className="flex h-fit flex-col items-end gap-y-3">
        <p className="font-Lato text-2xs font-bold text-primaryBlack lg:text-xs 2xl:text-sm">
          {getTimeLastMessage(item.updatedAt)}
        </p>
        <button>
          <StarIcon isActive={item.isFavorite} />
        </button>
      </div>
    </div>
  );
};

type Props = {
  selectedEmail: IEmailDocument | null;
  onSelectEmail: (value: IEmailDocument | null) => void;
};

const ListMail: FC<Props> = ({ selectedEmail, onSelectEmail }) => {
  const { listEmails } = useListMailHooks();

  return (
    <div className="relative flex w-fit flex-1 flex-col overflow-x-hidden overflow-y-hidden bg-white 2xl:flex-1">
      <div className="flex flex-row items-center justify-between p-4">
        <p className="font-DMSans text-xs font-normal text-gray2 lg:text-sm 2xl:text-base">Inbox</p>
        <button className="rounded-lg bg-primary px-6 py-2.5 font-Lato text-xs font-bold text-white shadow lg:text-sm 2xl:text-base">
          New mail thread
        </button>
      </div>
      <div className="flex h-[calc(100dvh-64px-73px-72px)] flex-col overflow-y-auto py-2">
        {listEmails.map((item) => (
          <MailBoxItem
            isSelected={(selectedEmail && selectedEmail.id) === item.id}
            key={item.id}
            item={item}
            onSelectEmail={() => onSelectEmail(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default ListMail;
