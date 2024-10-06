import NavHomeValuationIcon from '@/components/iconSvgs/NavHomeValuationIcon';
import { icons } from '@/constants';
import clsx from 'clsx';
import { FC } from 'react';

interface IProps {
  indexTab: number;
  onSelectTab: (index: number) => () => void;
  onBack: () => void;
  onPrintInvoicePdf: () => void;
  onClickHomeValuationIcon: () => void;
  onClickShareIcon: () => void;
}

const BorderBottomLeftButton: FC = () => {
  return (
    <svg
      className="absolute -bottom-[1px] -left-4 z-50"
      width="38"
      height="17"
      viewBox="0 0 38 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 16.5C13.2 16.5 16.5 5.5 16.5 0H37.5V16.5H0Z" fill="white" />
    </svg>
  );
};

const BorderBottomRightButton: FC = () => {
  return (
    <svg
      className="absolute -bottom-[1px] -right-4 z-50"
      width="38"
      height="17"
      viewBox="0 0 38 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M37.5 16.5C24.3 16.5 21 5.5 21 0H0V16.5H37.5Z" fill="white" />
    </svg>
  );
};

const HeaderChat: FC<IProps> = ({
  indexTab,
  onPrintInvoicePdf,
  onSelectTab,
  onBack,
  onClickHomeValuationIcon,
  onClickShareIcon,
}) => {
  return (
    <div className="flex h-16 w-full gap-x-10 bg-secondary px-4 pt-4 md:px-12">
      <div className="flex">
        <button onClick={onBack} className="flex flex-row items-center space-x-1">
          <img src={icons.chevronLeft} alt="chevron-left" />
          <p className=" text-sm font-medium text-white lg:text-base 2xl:text-lg">Back</p>
        </button>
      </div>
      <div className="flex flex-row justify-center -space-x-1 bg-secondary">
        <button
          onClick={onSelectTab(0)}
          className={clsx(
            'relative w-48 px-6 text-sm font-semibold lg:text-base 2xl:text-lg',
            indexTab === 0 ? 'z-20 rounded-lg bg-white text-primary' : 'z-10 rounded-l-lg bg-lightSecondary text-white'
          )}
        >
          {indexTab === 0 && <BorderBottomLeftButton />}
          <p>Start Clarifying!</p>
          {indexTab === 0 && <BorderBottomRightButton />}
        </button>
        <button
          onClick={onSelectTab(1)}
          className={clsx(
            'relative w-48 px-6 text-sm font-semibold lg:text-base 2xl:text-lg',
            indexTab === 1 ? 'z-20 rounded-lg bg-white text-primary' : 'z-10 rounded-r-lg bg-lightSecondary text-white'
          )}
        >
          {indexTab === 1 && <BorderBottomLeftButton />}
          <p>Email</p>
          {indexTab === 1 && <BorderBottomRightButton />}
        </button>
      </div>
      <div className="flex flex-1 flex-row items-center justify-end space-x-4 md:space-x-6">
        <button
          onClick={onClickHomeValuationIcon}
          className="flex w-fit flex-row items-center justify-center rounded-lg bg-primary p-1 md:space-x-2 md:px-4 md:py-2"
        >
          <NavHomeValuationIcon isActive={false} className="h-5 w-5 md:h-6 md:w-6" />
          <p className="hidden text-xs font-bold capitalize text-white md:flex lg:text-sm 2xl:text-base">
            home valuation
          </p>
        </button>
        {indexTab === 0 && (
          <button onClick={onPrintInvoicePdf}>
            <img src={icons.downloadChat} alt="download-chat" />
          </button>
        )}
        {indexTab === 1 && (
          <button onClick={onClickShareIcon}>
            <img src={icons.shareChat} alt="download-chat" />
          </button>
        )}
      </div>
    </div>
  );
};

export default HeaderChat;
