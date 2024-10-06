import { FC, useCallback } from 'react';
import clsx from 'clsx';
import { IMessageChatBox, MessageType } from '@/features/supportCenter/interfaces';
import MessageTime from '../MessageTime';
import MessageChat from '../MessageChat';

interface Props {
  message: IMessageChatBox;
}

const MessageView: FC<Props> = ({ message }) => {
  const renderMessageView = useCallback(() => {
    switch (message.type) {
      case MessageType.time:
        return <MessageTime message={message} />;
      case MessageType.chat:
        return <MessageChat message={message} isOwnerMessage={message.fromContact ?? false} />;
      default:
        return null;
    }
  }, [message]);

  return (
    <div
      key={message.id}
      className={clsx(
        'h-fit gap-2 ',
        message.fromContact ? 'flex-row-reverse justify-start' : '',
        message.type === MessageType.time && 'justify-center'
      )}
    >
      <div id={`message-view-${message.id}`}>{renderMessageView()}</div>
    </div>
  );
};

export default MessageView;
