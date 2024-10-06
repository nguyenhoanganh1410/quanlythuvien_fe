import { IMessage } from '@/features/chat/interfaces';
import { IUser } from '@/features/user/interfaces';
import { useMemo } from 'react';

type IProps = {
  message: IMessage;
  user: IUser | null;
};

export const useMessageItemHooks = ({ user, message }: IProps) => {
  const renderTitleAvatar = useMemo(() => {
    if (user) {
      const firstChar = user.firstName.charAt(0);
      return firstChar;
    }
    return 'A';
  }, [user]);

  const isActiveThumbUp = useMemo(() => {
    if (message.thumbUpUsers && message.thumbUpUsers.length > 0 && message.thumbUpUsers.includes(user?.id!)) {
      return true;
    } else {
      return false;
    }
  }, [message.thumbUpUsers, user]);

  const isActiveThumbDown = useMemo(() => {
    if (message.thumbDownUsers && message.thumbDownUsers.length > 0 && message.thumbDownUsers.includes(user?.id!)) {
      return true;
    } else {
      return false;
    }
  }, [message.thumbDownUsers, user]);

  return {
    isActiveThumbDown,
    isActiveThumbUp,
    renderTitleAvatar,
  };
};
