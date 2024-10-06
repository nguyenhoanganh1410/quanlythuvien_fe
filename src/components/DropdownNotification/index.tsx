import { NotificationIcon } from '@/icons';
import useNotificationHook from './hooks';

const DropdownNotification = () => {
    const { dropdown, dropdownOpen, trigger, notifications, setDropdownOpen } = useNotificationHook();
    return (
        <li className="relative">
            <div
                ref={trigger}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="relative flex h-6 w-6 items-center cursor-pointer justify-center rounded-full hover:text-primary"
            >
                <NotificationIcon />
            </div>

            <div
                ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
                className={`absolute mt-2.5 flex h-90 w-60 flex-col rounded-md border border-stroke bg-white shadow-xl -right-4 md:right-0 md:w-80 ${dropdownOpen === true ? 'block' : 'hidden'
                    }`}
            >
                <div className="px-4.5 py-3">
                    <h5 className="text-sm font-bold text-bodydark2 px-3 font-Inter">Thông báo</h5>
                </div>

                <ul className="flex h-auto flex-col overflow-y-auto">
                    <li>
                        <div className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-5 px-3 font-Inter">
                            <p className="text-xs font-Inter text-center">Bạn không có thông báo nào.</p>
                            <p className="font-Inter text-center text-xs">hông báo sẽ xuất hiện ở đây khi bạn nhận được.</p>
                        </div>
                    </li>
                    {notifications.map(() => {
                        return (
                            <li>
                                <div className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 px-3 font-Inter">
                                    <p className="text-sm font-Inter">
                                        <span className="text-black dark:text-white">Edit your information in a swipe</span>
                                        Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.
                                    </p>

                                    <p className="text-xs font-Inter">12 May, 2025</p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </li>
    );
};

export default DropdownNotification;
