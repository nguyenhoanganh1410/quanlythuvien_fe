import { memo } from 'react';
import { useDropDownUserHooks } from './hooks';

const DropdownUser = () => {
  const { trigger, dropdown, onLogout, dropdownOpen, getRoleName, getFullName, getFirstCharacter, setDropdownOpen } =
    useDropDownUserHooks();
  return (
    <div className="relative">
      <div
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex cursor-pointer items-center gap-2"
      >
        <div className="relative aspect-square h-8 w-8 rounded-full">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-orange-500 uppercase">
            <span className="uppercase text-white">{getFirstCharacter}</span>
          </div>
        </div>
        <span className="hidden text-left lg:block">
          <span className="text-blackLight font-SpaceGrotesk block w-24 truncate text-sm font-medium capitalize">
            {getFullName}
          </span>
          <span className="font-SpaceGrotesk block w-24 truncate text-sm capitalize">
            {getRoleName}
          </span>
        </span>
      </div>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`w-62.5 border-stroke absolute right-0 mt-4 flex flex-col rounded-sm border bg-white shadow-xl ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <button
          onClick={onLogout}
          className="flex items-center px-4 py-4 text-sm font-normal duration-300 ease-in-out hover:text-primary"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            ></path>
          </svg>
          <span className="ml-2">Đăng Xuất</span>
        </button>
      </div>
    </div>
  );
};

export default memo(DropdownUser);
