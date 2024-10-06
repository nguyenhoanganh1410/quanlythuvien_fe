import { BarIcon } from '@/icons';
import { KeyboardEvent, memo } from 'react';
import DropdownUser from '../DropdownUser';
import DropdownNotification from '../DropdownNotification';

interface IProps {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen?: (arg0: boolean) => void;
  onChangeTextSearch?: (arg0: string) => void;
}

const Header = ({ sidebarOpen, setSidebarOpen }: IProps) => {

  return (
    <header className="dashboard-header z-10 no-input sticky top-0 border-b border-b-[#DCDCDC] h-full max-h-[72px] z-999 flex w-full drop-shadow-1">
      <div className="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen && setSidebarOpen(!sidebarOpen);
            }}
            className="block rounded-sm p-1.5 shadow-sm lg:hidden"
          >
            <BarIcon />
          </button>
        </div>

        <div className="hidden sm:flex gap-2 items-center">
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DropdownNotification />
          </ul>
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
