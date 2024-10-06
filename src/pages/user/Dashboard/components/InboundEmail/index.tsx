import { icons } from '@/constants';
import { FC } from 'react';

interface Props {
  portalEmail: string;
  onClickCopy: () => void;
}

const InboundEmail: FC<Props> = ({ portalEmail, onClickCopy }) => {
  return (
    <div className="five-step rounded-[14px]">
      <div className="flex h-[65px] items-center justify-start rounded-[14px_14px_0px_0px] border border-solid border-borderWhiteLight bg-bgHeaderCard px-6 py-[18px] text-center">
        <img src={icons.inboundMail} alt="inbound-mail" />{' '}
        <p className="ml-2 text-base font-semibold not-italic leading-[normal] tracking-[0.18px] text-secondary lg:text-lg">
          Inbound Portal Email
        </p>
      </div>
      <div className="mh-[86px] flex flex-wrap items-center justify-between gap-y-4 rounded-[0px_0px_14px_14px] border-b border-l border-r border-solid border-x-borderWhiteLight border-b-borderWhiteLight bg-bgBodyCard px-6  py-[18px]	">
        <div className="w-[90%]">
          <h3 className="truncate text-xs font-semibold not-italic leading-[normal] tracking-[0.14px] text-secondary lg:text-sm">
            {portalEmail}
          </h3>
          <p className="mt-2 text-3xs font-medium not-italic leading-[normal] tracking-[0.1px] text-gray-400 lg:text-2xs">
            Send this to your clients for automatic upload into your portal.{' '}
          </p>
        </div>
        <button
          onClick={onClickCopy}
          className="h-[28px] w-[50px] rounded-[999px] border border-solid border-gray-300 bg-gray-300 p-[6px] text-3xs font-semibold not-italic leading-4 tracking-[0.05px] text-gray-800 hover:border-black lg:text-2xs"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default InboundEmail;
