import { icons } from '@/constants';
import { IAIResponse } from '@/features/chat/interfaces';
import clsx from 'clsx';
import moment from 'moment';
import { FC } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

interface Props {
  index: number;
  mess: IAIResponse;
}

const AIResponseItem: FC<Props> = ({ index, mess }) => {
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
            {mess?.questions?.metadata?.email}
          </div>
          <div>
            <p className="mt-[10px] text-right text-[8px] font-medium not-italic leading-[normal] text-gray-400">
              {moment(mess.time).format('MMM DD, YYYY, HH:mm A')}
            </p>
          </div>
        </div>
        <div className="flex flex-col rounded-md bg-white">
          <div className="flex items-center gap-2 border-b  border-solid p-2 ">
            <div className="flex h-full">
              <div className="flex h-8 w-8 items-center justify-center rounded-sm">
                <img className="left-5 top-0.5 h-4 w-4 " src={icons.person} alt="person" />
              </div>
            </div>
            <ReactMarkdown
              className="flex-1 whitespace-pre-line text-sm font-normal text-[#343541]"
              rehypePlugins={[rehypeRaw, remarkGfm]}
            >
              {mess?.questions?.value}
            </ReactMarkdown>
          </div>
          <div className="flex items-center gap-2 p-2">
            <div className="flex h-full">
              <div className="flex h-8 w-8 items-center justify-center rounded-sm">
                <img className="left-5 top-0.5 h-4 w-4 " src={icons.clarifiAvt} alt="person" />
              </div>
            </div>
            <ReactMarkdown
              className="flex-1 whitespace-pre-line text-sm font-normal text-[#343541]"
              rehypePlugins={[rehypeRaw, remarkGfm]}
            >
              {mess?.value}
            </ReactMarkdown>
            {/* <p className="whitespace-pre-line text-[12px] font-bold text-[#343541]">
              ${(mess.questions.usage?.totalTokens / 1000) * 0.01}
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AIResponseItem;
