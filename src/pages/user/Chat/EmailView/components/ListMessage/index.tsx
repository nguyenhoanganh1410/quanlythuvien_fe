import clsx from 'clsx';
import { Timestamp } from 'firebase/firestore';
import { FC } from 'react';
import MailInput from '../MailInput';
import { IPolicy } from '@/features/policy/interfaces';

type Props = {
  currentPolicy: IPolicy;
};

interface IMessageMailBox {
  id: string;
  name: string;
  content: string;
  createdAt: Timestamp;
  isOwner: boolean;
}

type MessageMailBoxProps = {
  item: IMessageMailBox;
};

const LIST_MESSAGES: IMessageMailBox[] = [
  {
    id: '1',
    name: 'Name',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    createdAt: Timestamp.now(),
    isOwner: false,
  },
  {
    id: '2',
    name: 'Name',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    createdAt: Timestamp.now(),
    isOwner: true,
  },
  // Cut here
  {
    id: '3',
    name: 'Name',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    createdAt: Timestamp.now(),
    isOwner: false,
  },
  {
    id: '4',
    name: 'Name',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    createdAt: Timestamp.now(),
    isOwner: true,
  },
  {
    id: '5',
    name: 'Name',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    createdAt: Timestamp.now(),
    isOwner: false,
  },
  {
    id: '6',
    name: 'Name',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    createdAt: Timestamp.now(),
    isOwner: true,
  },
  {
    id: '7',
    name: 'Name',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    createdAt: Timestamp.now(),
    isOwner: false,
  },
  {
    id: '8',
    name: 'Name',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    createdAt: Timestamp.now(),
    isOwner: true,
  },
  {
    id: '9',
    name: 'Name',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    createdAt: Timestamp.now(),
    isOwner: false,
  },
  {
    id: '10',
    name: 'Name',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    createdAt: Timestamp.now(),
    isOwner: true,
  },
];

const MessageMailBoxItem: FC<MessageMailBoxProps> = ({ item }) => {
  return (
    <div
      className={clsx(
        'flex w-[90%] flex-col gap-y-4 rounded border border-borderGrey px-4 py-2.5 ',
        item.isOwner ? 'mr-4 self-end bg-white' : 'self-start bg-lightWhite'
      )}
    >
      <div className="flex flex-row items-center justify-between">
        <p className="font-Inter text-2xs font-medium text-black lg:text-xs 2xl:text-sm">{item.name}</p>
        <p className="font-Inter text-2xs font-medium text-grey400 lg:text-xs 2xl:text-sm">May 6 10:40 am</p>
      </div>
      <p className="font-Inter text-2xs font-normal leading-6 text-black lg:text-xs 2xl:text-sm">{item.content}</p>
    </div>
  );
};

const ListMessage: FC<Props> = ({ currentPolicy }) => {
  return (
    <div className="flex h-[calc(100dvh-137px)] flex-[3] flex-col overflow-y-hidden bg-lightWhite">
      <div className="flex h-full w-full flex-col space-y-0">
        {/* List Messages */}
        <div className="flex  flex-col gap-y-4 overflow-y-auto py-4">
          {LIST_MESSAGES.map((item) => (
            <MessageMailBoxItem key={item.id} item={item} />
          ))}
        </div>
        <MailInput currentPolicy={currentPolicy} />
      </div>
    </div>
  );
};

// calc(100dvh - 80px)

export default ListMessage;
