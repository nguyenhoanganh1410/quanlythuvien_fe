import clsx from 'clsx';
import { FC } from 'react';
import { IMessageChatBox } from '@/features/supportCenter/interfaces';

type Props = {
  message: IMessageChatBox;
  isOwnerMessage: boolean;
};

const MessageChat: FC<Props> = ({ message, isOwnerMessage }) => {
  return (
    <div
      key={message.id}
      className={clsx(
        'border-borderGray2 text-blackDark1 relative min-w-full rounded-lg border px-4 py-2',
        isOwnerMessage ? 'bg-lightWhite2 ' : 'bg-lightBlue'
      )}
    >
      <p
        className={clsx(
          'break-all font-Inter text-xs font-normal lg:text-sm 2xl:text-base',
          isOwnerMessage ? 'text-end' : 'text-start'
        )}
      >
        {message.message}
      </p>
    </div>
  );
};

export default MessageChat;
