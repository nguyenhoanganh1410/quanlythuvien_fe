import { icons } from '@/constants';
import { Dialog, Transition } from '@headlessui/react';
import React from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  onYes: () => void;
};

const PreventSignUpPopup = React.memo(({ open, onClose, onYes }: Props) => {
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
                    Create new account failed
                    <button onClick={onClose} className=" absolute right-6">
                      <img src={icons.xMark} className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex w-full flex-col items-center justify-center bg-white p-5">
                    <div className="text-start text-base  font-medium text-secondary">
                      Due to the large number of new users, we are temporarily pausing new sign ups. We apologize for
                      any inconvenience.
                      <br />
                      <br />
                      Please contact{' '}
                      <a className="text-blue-500 underline underline-offset-2" href="mailto:hello@goclarifi.com">
                        hello@goclarifi.com
                      </a>{' '}
                      to be added to our wait list. Thank You!
                    </div>
                    <button
                      onClick={onYes}
                      className="mt-6 w-fit rounded-lg bg-primary p-2 px-10 font-Lato text-sm font-bold uppercase text-white"
                    >
                      OK
                    </button>
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

export default PreventSignUpPopup;
