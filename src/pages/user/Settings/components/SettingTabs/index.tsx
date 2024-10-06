import CardPaymentIcon from '@/components/iconSvgs/CardPaymentIcon';
import OrderHistoriesIcon from '@/components/iconSvgs/OrderHistoriesIcon';
import PersonIcon from '@/components/iconSvgs/PersonIcon';
import clsx from 'clsx';
import { FC } from 'react';

type Props = {
  selectedTab: number;
  onSelectTab: (value: number) => () => void;
};

const SettingTab: FC<Props> = ({ selectedTab, onSelectTab }) => {
  return (
    <div className="flex items-center justify-between rounded-tl-2xl rounded-tr-2xl bg-stone-100 p-3 px-10 text-center text-secondary">
      <div className="flex w-full flex-row justify-center  space-x-10 text-base font-semibold text-secondary xl:text-xl">
        <button
          onClick={onSelectTab(0)}
          className={clsx(
            'flex items-center gap-3 rounded-[10px] p-2.5',
            selectedTab === 0 && 'bg-primary/10 text-primary'
          )}
        >
          <PersonIcon isActive={selectedTab === 0} />
          <span className="hidden md:block">Your Account </span>
        </button>
        <button
          onClick={onSelectTab(1)}
          className={clsx(
            'flex items-center gap-3 rounded-[10px] p-2.5',
            selectedTab === 1 && 'bg-primary/10 text-primary'
          )}
        >
          <PersonIcon isActive={selectedTab === 1} />
          <span className="hidden md:block">Your Seats </span>
        </button>
        <button
          onClick={onSelectTab(2)}
          className={clsx(
            'flex items-center gap-3 rounded-[10px] p-2.5',
            selectedTab === 2 && 'bg-primary/10 text-primary'
          )}
        >
          <OrderHistoriesIcon isActive={selectedTab === 2} />
          <span className="hidden md:block"> Order History </span>
        </button>
        <button
          onClick={onSelectTab(3)}
          className={clsx(
            'flex items-center gap-3 rounded-[10px] p-2.5',
            selectedTab === 3 && 'bg-primary/10 text-primary'
          )}
        >
          <CardPaymentIcon isActive={selectedTab === 3} />
          <span className="hidden md:block"> Payment Methods </span>
        </button>
      </div>
    </div>
  );
};

export default SettingTab;
