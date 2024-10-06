import { FC } from 'react';
import { useChooseSeats } from './hook';

interface IProps {}

const ChooseSeats: FC<IProps> = () => {
  const { value, totalPrice, handleChange, handleContinue } = useChooseSeats();

  return (
    <div className="mx-auto flex w-full max-w-[80%] flex-col gap-0 py-8 md:flex-row md:gap-x-12 2xl:gap-x-20 ">
      <div className="flex w-full flex-col gap-4 xl:gap-6 2xl:gap-8">
        <div className="flex w-full justify-center">
          <ul className="flex w-full items-center justify-between md:w-2/4">
            <li aria-current="false" className="flex flex-1 flex-col gap-x-0">
              <div className="flex flex-1 flex-row items-center">
                <hr className="block w-full border border-none" />
                <div className="flex h-4 w-4 flex-none items-center justify-center rounded-full border-2 border-orange-500">
                  <span className="hidden h-2.5 w-2.5 rounded-full text-orange-500"></span>
                </div>
                <hr className="h-auto w-full border border-orange-500" />
              </div>
              <div className="mt-3 flex h-auto items-center justify-center">
                <span className="text-2xs font-normal">Choose seats</span>
              </div>
            </li>
            <li aria-current="false" className="flex flex-1 flex-col gap-x-0">
              <div className="flex flex-1 flex-row items-center">
                <hr className="block w-full border border-orange-500" />
                <div className="flex h-4 w-4 flex-none items-center justify-center rounded-full border-2">
                  <span className="hidden h-2.5 w-2.5 rounded-full text-orange-500"></span>
                </div>
                <hr className="h-auto w-full border border-none" />
              </div>
              <div className="mt-3 flex h-auto items-center justify-center">
                <span className="text-2xs font-normal">Check out</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="flex w-full flex-col items-center">
          <div className="flex max-w-[580px] flex-col items-center gap-5">
            <div className="mb-2 font-Inter text-base font-semibold text-slate-600">Choose your seats</div>
            <div className="text-center font-Inter text-xs font-normal text-slate-600">
              We recommend at least 2 Core Seats (Starter) so all your current users have full access to Starter
              Customer Platform
            </div>
            <div className="w-full rounded-sm border border-solid border-gray-200 p-5 md:p-10">
              <div className="grid-rows grid gap-4 md:grid-cols-3">
                <div className="col-span-2">
                  <div className="flex flex-col gap-5 text-[13px]">
                    <p>Core Seats (Starter)</p>
                    <p>Great for anyone who needs edit access in HubSpo</p>
                    <p>Core Seats give you access to the full functionality and limits of Starter Customer Platform.</p>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex flex-col items-start gap-1 text-[13px] md:items-center">
                    <input
                      type="number"
                      id="number-input"
                      aria-describedby="helper-text-explanation"
                      className=" block w-2/3 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="seats"
                      value={value}
                      onChange={handleChange}
                      required
                    />
                    <p>${totalPrice}/mo/seat</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full rounded-sm bg-[#F6F8FA] p-5 md:p-10">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-3">
                  <div className="flex flex-col gap-5 text-[13px]">
                    <div className="flex place-content-between">
                      <p>View-Only Seat</p>
                      <p>${totalPrice}/mo/seat</p>
                    </div>
                    <p>Users without a Core Seat (Starter) will be assigned a View-Only Seat.</p>
                    <p>
                      View-Only Seats give you visibility into certain pages in your HubSpot account. These users can’t
                      create,publish,edit, or delete any information in your account.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="flex flex-col items-center gap-10">
                <p className="w-full text-start text-[13px] text-primary">Add marketing contacts</p>
                <button
                  onClick={handleContinue}
                  disabled={Number(value) == 0}
                  className={`mb-6 inline-flex max-w-[116px] cursor-pointer items-center justify-center gap-2.5 rounded-md bg-orange-500 p-2.5 text-center hover:opacity-70
                  ${Number(value) == 0 ? 'bg-primary/50' : 'bg-primary'}`}
                >
                  <div className="text-center font-Inter text-xs font-semibold text-white">Continue</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseSeats;
