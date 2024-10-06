import { icons } from '@/constants';
import { IMessage, MessageRoles } from '@/features/chat/interfaces';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { EPolicyStatus } from '@/constants/enum';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import ThumbUpIcon from '@/components/iconSvgs/ThumbUpIcon';
import ThumbDownIcon from '@/components/iconSvgs/ThumbDownIcon';
import { IUser } from '@/features/user/interfaces';
import { useMessageItemHooks } from './hooks';
import { IPolicy } from '@/features/policy/interfaces';

type IProps = {
  message: IMessage;
  index: number;
  user: IUser;
  isShowPopupEndClarifi: boolean;
  currentPolicy: IPolicy;
  onChangePagePdf: (page: number) => () => void;
  onshowPopupEndClarifi: () => void;
  onThumbUpMessage: (message: IMessage) => () => Promise<void>;
  onThumbDownMessage: (message: IMessage) => () => Promise<void>;
};

const MessageItem: FC<IProps> = ({
  currentPolicy,
  isShowPopupEndClarifi,
  user,
  message,
  index,
  onChangePagePdf,
  onshowPopupEndClarifi,
  onThumbUpMessage,
  onThumbDownMessage,
}) => {
  const { renderTitleAvatar, isActiveThumbUp, isActiveThumbDown } = useMessageItemHooks({ user, message });

  if (!user && !currentPolicy) {
    return;
  }

  return (
    <div
      key={message.id}
      className={`mt-2.5 flex flex-row space-x-4 px-4 py-4 xl:px-6 ${
        message.role === MessageRoles.user ? 'bg-white' : 'bg-transparent'
      }`}
    >
      {message.role === MessageRoles.user ? (
        <div className="flex h-full ">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-gray-400">
            <p className="text-sm font-bold text-white">{renderTitleAvatar}</p>
          </div>
        </div>
      ) : (
        <div className="flex h-full">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm">
            <img alt="avatar" src={icons.clarifiAvt} />
          </div>
        </div>
      )}
      <div className="flex h-fit flex-1 flex-col justify-center self-center">
        <ReactMarkdown
          className={'-mt-1 flex-1 whitespace-pre-line text-2xs font-normal text-[#343541] lg:text-xs xl:text-sm'}
          rehypePlugins={[rehypeRaw, remarkGfm]}
          components={{
            button(props) {
              const { node, ...rest } = props;
              return (
                <button
                  className="font-semibold text-[#343541] underline underline-offset-2"
                  onClick={onChangePagePdf(message.pageNumber ?? -1)}
                  {...rest}
                />
              );
            },
          }}
        >
          {message.value}
        </ReactMarkdown>
        {index === 0 &&
          message.role === MessageRoles.assistant &&
          !isShowPopupEndClarifi &&
          currentPolicy &&
          currentPolicy.isOpenCase &&
          currentPolicy.status === EPolicyStatus.TRAINING && (
            <button
              onClick={onshowPopupEndClarifi}
              className="mt-4 w-fit rounded-lg bg-primary/10 px-2 py-1.5 text-3xs font-bold uppercase text-primary lg:text-2xs xl:text-xs"
            >
              END CLARIFICATION
            </button>
          )}
      </div>
      {message.role === MessageRoles.assistant && (
        <div className="flex flex-[0.1] flex-row justify-end space-x-4">
          {!isActiveThumbDown && (
            <button onClick={onThumbUpMessage(message)} className="flex h-fit w-fit">
              <ThumbUpIcon isActive={isActiveThumbUp} />
            </button>
          )}
          {!isActiveThumbUp && (
            <button onClick={onThumbDownMessage(message)} className="flex h-fit w-fit">
              <ThumbDownIcon isActive={isActiveThumbDown} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageItem;
