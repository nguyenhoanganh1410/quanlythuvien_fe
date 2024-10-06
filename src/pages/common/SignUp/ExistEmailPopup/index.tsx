import { icons } from '@/constants';
import { Dialog, Transition } from '@headlessui/react';
import React from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  onYes: () => void;
};

const ExistEmailPopup = React.memo(({ open, onClose, onYes }: Props) => {
  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
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
                <div className="w-[500px] overflow-hidden rounded-[14px] border  border-borderWhiteLight">
                  <div className="relative flex w-full flex-row items-center justify-center  border-b border-borderWhiteLight bg-bgHeaderCard px-8 py-4 text-lg font-semibold text-secondary">
                    Account Creation Failed
                    <button onClick={onClose} className=" absolute right-6">
                      <img src={icons.xMark} className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex w-full flex-col items-center justify-center bg-white p-5">
                    <p className="text-base font-medium text-secondary">
                      It looks like you already have an account with us using this email address. Please try logging in,
                      or use the 'Forgot Password' option if you need to reset your password.
                    </p>
                    <div className="flex w-2/3 flex-row items-center justify-between space-x-8">
                      <button
                        onClick={onClose}
                        className="mt-6 w-full rounded-lg bg-primary/10 p-2 font-Lato text-sm font-bold uppercase text-primary/80"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={onYes}
                        className="mt-6 w-full rounded-lg bg-primary p-2 font-Lato text-sm font-bold uppercase text-white"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
});

export default ExistEmailPopup;
