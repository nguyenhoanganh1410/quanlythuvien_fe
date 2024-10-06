import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { PiWarningCircleThin } from 'react-icons/pi';

type Props = {
  title?: string | null;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmPopups = React.memo(({ open, onClose, onConfirm, title }: Props) => {
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
              <Dialog.Panel className="">
                <div className="mt-[36px] w-[450px] rounded-[14px] bg-white">
                  <div className="relative max-h-full w-full max-w-md p-4">
                    <div className="relative bg-white">
                      <div className="flex flex-col items-center p-4 text-center md:p-5">
                        <PiWarningCircleThin className="h-10 w-10 text-gray-500" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500">
                          {title ? title : 'Are you sure you want to delete this product?'}
                        </h3>
                        <div className="flex">
                          <button
                            onClick={onConfirm}
                            className="second-step pointer-events-auto ml-4 box-border h-[40px] w-[140px] rounded-lg border-[0.5px] border-solid border-primary bg-primary px-[10px] py-[10px] text-center font-Lato text-sm font-bold not-italic leading-5 text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:bg-buttonSecondary hover:text-primary"
                          >
                            Yes, I'm sure
                          </button>
                          <button
                            onClick={onClose}
                            className="second-step border-gray pointer-events-auto ml-4 box-border h-[40px] w-[140px] rounded-lg border-[0.5px] border-solid bg-white px-[10px] py-[10px] text-center font-Lato text-sm font-bold not-italic leading-5 text-gray-500 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] "
                          >
                            No, cancel
                          </button>
                        </div>
                      </div>
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

export default ConfirmPopups;
