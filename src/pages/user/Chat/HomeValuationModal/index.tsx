import { icons, images } from '@/constants';
import { HomeValue } from '@/features/policy/interfaces';
import { Dialog, Transition } from '@headlessui/react';
import React, { useCallback } from 'react';
import { FC } from 'react';

type Props = {
  homeValuations: HomeValue[];
  open: boolean;
  onClose: () => void;
};

const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const HomeValuationModal: FC<Props> = ({ homeValuations, open, onClose }) => {
  const renderHeader = useCallback(() => {
    return (
      <div className="relative flex w-full flex-row items-center justify-between border-b border-borderWhiteLight bg-bgHeaderCard px-4 py-4 text-lg font-semibold text-secondary md:px-8">
        <div className="flex flex-row items-center">
          <div className="mr-2 flex aspect-square w-7 items-center justify-center rounded-full bg-primary">
            <img className="h-auto" src={images.iconLogo} alt="Clarifi logo" />
          </div>
          Home Valuation
        </div>
        <button onClick={onClose}>
          <img src={icons.xMark} />
        </button>
      </div>
    );
  }, [onClose]);

  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-x-0 inset-y-1/3 z-10 w-screen">
          <div className="flex items-end justify-center text-center sm:items-center sm:p-0">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel>
                <div className="w-[350px] overflow-hidden rounded-[14px] border border-borderWhiteLight bg-white md:w-[550px]">
                  {renderHeader()}
                  {/* List */}
                  <div className="flex w-full flex-row items-center justify-between space-x-4 bg-white px-4 py-2 text-2xs font-medium text-secondary lg:text-sm 2xl:text-sm">
                    <p className="flex flex-[1.5] md:flex-[2]">Address</p>
                    <p className="flex flex-1">Home Value</p>
                    <p className="flex flex-1">Policy Coverage</p>
                  </div>
                  <div className="flex max-h-64 w-full flex-col items-center justify-center overflow-y-scroll bg-white pb-2">
                    {homeValuations &&
                      homeValuations.length > 0 &&
                      homeValuations.map((item) => (
                        <div
                          key={item.id}
                          className="flex w-full flex-row items-center justify-between space-x-4 px-4 py-1 font-medium text-secondary"
                        >
                          <p className="flex flex-[1.5] text-start text-2xs capitalize text-grey400 md:flex-[2] lg:text-xs 2xl:text-sm">
                            {item.address.toLowerCase()}
                          </p>
                          <p className="flex flex-1 text-sm text-grey400 lg:text-lg 2xl:text-xl">
                            {USDollar.format(parseInt(item.price))}
                          </p>
                          <p className="flex flex-1 text-sm text-red-600 lg:text-lg 2xl:text-xl">0%</p>
                        </div>
                      ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default HomeValuationModal;
