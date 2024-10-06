import { IMessageChatBox } from '@/features/supportCenter/interfaces';
import { FC } from 'react';

type Props = {
  message: IMessageChatBox;
};

const MessageTime: FC<Props> = ({ message }) => {
  return (
    <div className="flex w-full justify-center py-2">
      <p className="text-darkText6 text-center text-2xs lg:text-xs 2xl:text-sm">{message.groupDate}</p>
    </div>
  );
};

export default MessageTime;
