import { DropDownUser } from '@/components';
import { useSupportCenterHeaderHooks } from './hooks';
import RequestModal from '../RequestModal';
import { memo } from 'react';

interface IProps {}
const SupportCenterHeader = ({}: IProps) => {
  const {
    onLogout,
    navHome,
    navLogin,
    isMenuOpen,
    onClickOpenSubmit,
    isAuthentication,
    isShowRequestModal,
    onCloseRequestModel,
    toggleMenu,
  } = useSupportCenterHeaderHooks();

  return (
    <header className="dashboard-header no-input z-999 drop-shadow-1 sticky top-0 z-10 flex h-full  w-full border-b border-b-[#c6c6c6] bg-white">
      <nav className="w-full border-gray-200 bg-white">
        <div className="mx-auto flex max-w-[1980px] flex-wrap items-center justify-between px-5 py-1">
          <div className="z-[999] flex cursor-pointer items-center gap-1" onClick={navHome}>
            <svg width="42" height="39" viewBox="0 0 42 39" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22.5655 39C12.9514 39 5.12832 31.3736 5.12832 22.0013C5.12832 12.629 12.9514 5.00255 22.5655 5.00255C28.0301 5.00255 33.1345 7.48726 36.4343 11.7046L38.7894 10.6445C35.0308 5.53593 29.07 2.52778 22.5689 2.52778C11.711 2.52778 2.848 11.0155 2.59652 21.5375C2.58973 21.7926 2.37903 22.0013 2.11735 22.0013H0.482724C0.214251 22.0013 -0.00664401 21.7859 0.000152771 21.5242C0.261829 9.61086 10.2837 0 22.5655 0C30.4531 0 37.6339 3.9159 41.7868 10.4788C41.9023 10.6611 41.9839 10.8698 41.9975 11.0851C42.0314 11.6284 41.7222 12.1088 41.2464 12.3242L36.543 14.4378C35.9653 14.6962 35.2754 14.5107 34.922 13.9906C32.1523 9.94546 27.5305 7.53033 22.5621 7.53033C14.3753 7.53033 7.7179 14.0237 7.7179 22.0013C7.7179 29.9788 14.3787 36.4722 22.5621 36.4722C27.0174 36.4722 31.194 34.5275 34.0078 31.208L31.6052 30.1279C29.0598 32.8214 25.4337 34.2393 21.6071 33.9577C15.5308 33.5104 10.6473 28.6669 10.2803 22.7401C9.84869 15.7895 15.524 10.0018 22.5621 10.0018C24.7982 10.0018 26.9902 10.5948 28.9001 11.7179C29.4404 12.0359 29.6749 12.682 29.4506 13.2584L27.5713 18.0489C27.4829 18.2775 27.3368 18.4896 27.1329 18.632C26.6265 18.9931 25.9639 18.9501 25.5153 18.5856C24.2069 17.5089 22.3276 17.2008 20.6556 17.9396C19.1399 18.6088 18.1068 20.0698 17.9946 21.6899C17.8145 24.2905 19.9317 26.4638 22.5621 26.4638C23.4966 26.4638 24.4108 26.1855 25.172 25.6687C25.3759 25.5329 25.6512 25.5693 25.8075 25.7515L26.861 26.9707C27.0411 27.1794 27.0038 27.4975 26.7761 27.6565C25.556 28.5212 24.0777 28.9916 22.5587 28.9916C18.6029 28.9916 15.3881 25.8542 15.3881 22.0013C15.3881 18.1483 18.6063 15.011 22.5587 15.011C23.6563 15.011 24.7336 15.2561 25.7056 15.7199L26.6163 13.4009C25.3487 12.831 23.9656 12.5329 22.5587 12.5329C17.0295 12.5329 12.5674 17.0584 12.8597 22.5082C13.1179 27.3119 17.1518 31.2278 22.0829 31.4564C25.2808 31.6055 28.285 30.2472 30.2424 27.7857C30.6061 27.3285 31.2551 27.1927 31.7921 27.4345L36.4989 29.5482C36.7062 29.6409 36.8965 29.7734 37.0324 29.9523C37.3722 30.3996 37.3722 30.9827 37.0732 31.4167C33.8209 36.1674 28.3937 39 22.5587 39H22.5655Z"
                fill="url(#paint0_linear_2282_5200)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_2282_5200"
                  x1="37.5"
                  y1="6"
                  x2="5.5"
                  y2="39"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F9A01B" />
                  <stop offset="1" stopColor="#F26524" />
                </linearGradient>
              </defs>
            </svg>
            <p className="text-[35px] font-bold text-white">Clarifi</p>
          </div>

          <div className="flex gap-6">
            <div
              id="mega-menu"
              className={`absolute left-0 top-[63px] w-full items-center justify-between rounded-b-lg bg-white shadow-md md:static md:order-1 md:flex md:w-auto md:shadow-none ${
                isMenuOpen ? '' : 'hidden'
              }`}
            >
              <ul className="mt-4 flex flex-col font-medium rtl:space-x-reverse md:mt-0 md:flex-row md:items-center md:space-x-8">
                <li onClick={onClickOpenSubmit}>
                  <a
                    href="#"
                    className="block px-3 py-2 text-gray-900 hover:bg-gray-50 md:p-0  md:hover:bg-transparent"
                  >
                    Submit A Request.
                  </a>
                </li>

                <li className="flex cursor-pointer items-center hover:bg-gray-50 sm:gap-1">
                  <a href="#" className="block px-3 py-2 text-gray-900  md:p-0  md:hover:bg-transparent">
                    Index Status: <span className="text-green500">Normal</span>
                  </a>
                  <div className="h-3 w-3 rounded-md bg-lime-500"></div>
                </li>
                {isAuthentication ? (
                  <li className="hidden md:flex">
                    <DropDownUser />
                  </li>
                ) : (
                  <li className="flex cursor-pointer items-center pb-2 hover:bg-gray-50 sm:gap-1 md:pb-0">
                    <a
                      onClick={navLogin}
                      className="block px-3 py-2 font-medium text-gray-900 md:p-0 md:hover:bg-transparent"
                    >
                      Sign in
                    </a>
                  </li>
                )}
                {isAuthentication && (
                  <li
                    onClick={onLogout}
                    className="flex cursor-pointer items-center pb-2 hover:bg-gray-50 sm:gap-1 md:hidden md:pb-0"
                  >
                    <span className="block px-3 py-2 font-medium text-gray-900 md:p-0 md:hover:bg-transparent">
                      Logout
                    </span>
                  </li>
                )}
              </ul>
            </div>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
              onClick={toggleMenu}
            >
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <RequestModal onClose={onCloseRequestModel} open={isShowRequestModal} />
    </header>
  );
};

export default memo(SupportCenterHeader);
