import { icons, PATHS } from '@/constants';
import { NinjaIcon, OverviewIcon, SettingsIcon } from '@/icons';
import { clsx } from 'clsx';
import { FC, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ADMIN_PATHS = [
  {
    id: 'dashboard',
    path: PATHS.HOME,
    name: 'Tổng quan',
    icon: <OverviewIcon />,
    activeIcon: <OverviewIcon active={true} />,
  },
  {
    id: 'ninja',
    path: PATHS.BOOKS,
    name: 'Quản lý sách',
    icon: <NinjaIcon active={false} />,
    activeIcon: <NinjaIcon active={true} />,
  },
  {
    id: 'settings',
    path: PATHS.SETTINGS,
    name: 'Cài Đặt',
    icon: <SettingsIcon active={false} />,
    activeIcon: <SettingsIcon active={true} />,
  },
];

const LeftNav: FC = () => {
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const isCurrentPath = (path: string) => {
    return path == location.pathname;;
  }

  const handleClickItem = (path: string) => {
    navigate(path);
  }

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen && setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  return (
    <aside
      ref={sidebar}
      className={`flex fixed left-0 top-0 border border-l-gray-400 z-[999] h-screen w-full sm:max-w-[250px] flex-col overflow-y-hidden dark:bg-boxdark lg:static ease-in-out duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      <div className="flex h-[72px] items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5 mt-4">
        <div className="flex items-center">
          <div className="flex w-full flex-row items-center">
            <img src={icons.logo} className="mr-2 h-10 w-10" alt="logo" />
            <p className="font-bold text-secondary text-[17px]">Thư Viện VinhUni</p>
          </div>
        </div>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-1 py-4 px-4 lg:px-6">
          <div className="mb-6 flex flex-col gap-2">
            {ADMIN_PATHS.map((item) => {
              return (
                <div
                  onClick={() => handleClickItem(item.path)}
                  key={item.id}
                  className={`relative h-14 hover:bg-pink200 rounded-xl cursor-pointer font-Inter text-blackLight flex items-center font-medium text-base`}
                >
                  <div
                    className={clsx(
                      'rounded-xl opacity-20 w-full left-0 top-0 h-[52px] gap-2.5 py-2 px-4',
                      isCurrentPath(item.path) ? 'bg-pink200' : ''
                    )}
                  ></div>
                  <div className="absolute flex z-10 left-3 justify-center items-center">
                    {isCurrentPath(item.path) ? item.activeIcon : item.icon}
                    <span className={clsx('ml-3 font-SpaceGrotesk text-orange500 text-sm')}>
                      {item.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default LeftNav;
