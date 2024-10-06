import { IMessageChatBox } from '@/features/supportCenter/interfaces';
import { Timestamp } from 'firebase/firestore';
import moment from 'moment';

export const removeCharacterSource = (value: string) => {
  let regex = /【(\d+)†source】/gm;
  return value.replace(regex, '');
};

const timeGroupYearFormat = 'MMM DD, YYYY hh:mm A';
const timeGroupDayFormat = 'MMM DD, hh:mm A';
const HOUR = 2;
const IDLE_MINUTE = 60;
const MIN_TO_SECOND = 60;
const SECOND_TO_MILLI = 1000;
const precision = HOUR * IDLE_MINUTE * MIN_TO_SECOND * SECOND_TO_MILLI;

export const groupedDays = (messages: IMessageChatBox[]) => {
  return messages.reduce((acc: { [day: string]: IMessageChatBox[] }, el) => {
    const messageDay = moment(Math.floor(el?.createdAt?.toDate().getTime() / precision) * precision).format(
      timeGroupYearFormat
    );
    if (acc[messageDay]) {
      return { ...acc, [messageDay]: acc[messageDay].concat([el]) };
    }
    return { ...acc, [messageDay]: [el] };
  }, {});
};

export const generateGroupUserMessages = (messages: IMessageChatBox[]) => {
  const newMessages: IMessageChatBox[] = [];
  messages.forEach((message, index) => {
    if (messages.length > 1) {
      const prevMessage = messages[index - 1];
      const nextMessage = messages[index + 1];
      const prevMessageUserUid = prevMessage && prevMessage.ownerId;
      const nextMessageUserUid = nextMessage && nextMessage.ownerId;
      const ownerUid = message.ownerId;
      if (
        (!prevMessageUserUid && nextMessageUserUid !== ownerUid) ||
        (prevMessageUserUid !== ownerUid && !nextMessageUserUid) ||
        (prevMessageUserUid !== ownerUid && nextMessageUserUid !== ownerUid)
      ) {
        newMessages.push({ ...message, groupMessageType: 'firstLast' });
      } else if (
        (!prevMessageUserUid && nextMessageUserUid === ownerUid) ||
        (prevMessageUserUid !== ownerUid && nextMessageUserUid === ownerUid)
      ) {
        newMessages.push({ ...message, groupMessageType: 'last' });
      } else if (
        (!nextMessageUserUid && prevMessageUserUid === ownerUid) ||
        (nextMessageUserUid !== ownerUid && prevMessageUserUid === ownerUid)
      ) {
        newMessages.push({ ...message, groupMessageType: 'first' });
      } else {
        newMessages.push({ ...message, groupMessageType: 'middle' });
      }
    } else newMessages.push(message);
  });
  return newMessages;
};

export const generateDisplayMessages = (messages: IMessageChatBox[]) => {
  const days = groupedDays(messages);
  const sortByUsers = Object.keys(days).reduce((acc: { [day: string]: IMessageChatBox[] }, key) => {
    return { ...acc, [key]: generateGroupUserMessages(days[key]) };
  }, {});
  const sortedDays = Object.keys(sortByUsers).sort(
    (x, y) => moment(y, timeGroupYearFormat).unix() - moment(x, timeGroupYearFormat).unix()
  );

  const items = sortedDays.reduce((acc: IMessageChatBox[], date) => {
    const sortedMessages: IMessageChatBox[] = sortByUsers[date].sort((x, y) => {
      const totalTimeX = x.createdAt.seconds;
      const totalTimeY = y.createdAt.seconds;
      return totalTimeY - totalTimeX;
    });
    const lastItem = sortedMessages[sortedMessages.length - 1];
    const createdDate = moment(lastItem?.createdAt?.toDate());
    let messageDate = createdDate.format(timeGroupYearFormat);
    if (createdDate.isSame(moment(), 'day')) {
      messageDate = createdDate.startOf('minutes').fromNow();
    } else if (createdDate.isSame(moment(), 'year')) {
      messageDate = createdDate.format(timeGroupDayFormat);
    }
    if (acc.findIndex((item) => item.id == messageDate) == -1) {
      sortedMessages.push({
        ...lastItem,
        groupDate: messageDate,
        id: messageDate,
        type: 'time',
      });
    }
    return [...acc, ...sortedMessages];
  }, []);
  return items.reverse();
};

export const getFormatTimeCreatedMessage = (timeValue: Timestamp) => {
  const currentDate = moment();
  const sentDate = moment(timeValue.toDate());
  const timeFormat = sentDate.format('hh:mm A');
  if (sentDate.isSame(currentDate, 'day')) {
    return timeFormat;
  }
  const yesterday = moment().subtract(1, 'days');
  if (sentDate.isSame(yesterday, 'day')) {
    return `Yesterday at ${timeFormat}`;
  }
  return `${sentDate.format('MMMM DD, YYYY')} at ${timeFormat}`;
};

export const getTimeLastMessage = (timeValue: Timestamp) => {
  const createdDate = moment(timeValue.toDate());
  let messageDate = '';
  if (createdDate.isSame(moment(), 'day')) {
    messageDate = createdDate.startOf('minutes').fromNow();
  } else if (createdDate.isSame(moment(), 'year')) {
    messageDate = createdDate.format(timeGroupDayFormat);
  }
  return messageDate;
};
