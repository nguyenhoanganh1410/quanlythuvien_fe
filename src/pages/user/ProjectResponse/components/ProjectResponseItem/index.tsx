import { icons } from '@/constants';
import { IFeedback } from '@/features/chat/interfaces';
import clsx from 'clsx';
import moment from 'moment';
import { FC } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

interface Props {
  index: number;
  feedback: IFeedback;
}

const ProjectResponseItem: FC<Props> = ({ index, feedback }) => {
  const isEven = index % 2 === 0;

  return (
    <div
      className={clsx(
        'box-border flex h-auto min-h-[130px] flex-row space-x-10 px-[18px] py-[22px]',
        isEven ? 'bg-bgBodyCard' : 'bg-bgBodyCardSecond',
        index === 0 && 'three-step'
      )}
    >
      <div className="flex flex-grow flex-col space-y-2">
        <div className="flex justify-between">
          <div className="items-cent flex h-[22px] w-[fit-content] items-center justify-between gap-2 py-[6px] text-sm font-semibold not-italic leading-[10px] tracking-[0.05px] text-secondary">
            <img className="left-5 top-0.5 h-4 w-4 " src={icons.person} alt="person" />
            {feedback.userInfo?.firstName + ' ' + feedback.userInfo?.lastName}
          </div>
          <div>
            <p className="mt-[10px] text-right text-[8px] font-medium not-italic leading-[normal] text-gray-400">
              {moment(feedback.createdAt).format('MMM DD, YYYY, HH:mm A')}
            </p>
          </div>
        </div>
        <div className="rounded-md bg-white">
          <div className="border-b p-4">
            <p className="text-sm font-bold">Feedback</p>
            <p className="text-gray-600">{feedback.feedback}</p>
          </div>
          <div className="flex items-center gap-5 p-2">
            <div className="flex h-full">
              <div className="flex h-8 w-8 items-center justify-center rounded-sm">
                <img alt="avatar" src={icons.clarifiAvt} />
              </div>
            </div>
            <ReactMarkdown
              className="flex-1 whitespace-pre-line text-sm font-normal text-[#343541]"
              rehypePlugins={[rehypeRaw, remarkGfm]}
            >
              {feedback.message}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProjectResponseItem;
