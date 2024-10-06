import { icons } from '@/constants';
import { ChangeEvent, FC } from 'react';

type IProps = {
  searchValue: string;
  onChangeSearchValue: (event: ChangeEvent<HTMLInputElement>) => void;
};

const SettingHeader: FC<IProps> = ({ searchValue, onChangeSearchValue }) => {
  return (
    <div className="mb-4 hidden justify-between px-10 xl:flex">
      <div className="text-left">
        <h1 className="text-[32px] font-semibold not-italic leading-[normal] tracking-[0.16px] text-secondary">
          Settings
        </h1>
      </div>
      <div className="relative ">
        <input
          value={searchValue}
          onChange={onChangeSearchValue}
          type="text"
          className="input-search h-[48px] w-[200px] rounded-[55px] border-none bg-white pl-[40px] shadow-[0px_2px_20px_0px_rgba(0,0,0,0.05)] focus:border-none focus:border-current focus:outline-none focus:ring-0 active:outline-none md:w-[360px]"
          placeholder="Search for anything..."
        />
        <div className="absolute inset-y-0 left-[10px] top-[15px] flex h-fit items-center pr-3">
          <img src={icons.searchInput} alt="search-input" />
        </div>
      </div>
    </div>
  );
};

export default SettingHeader;
