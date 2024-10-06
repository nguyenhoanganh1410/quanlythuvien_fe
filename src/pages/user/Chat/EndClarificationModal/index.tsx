import { icons, images } from '@/constants';
import { Dialog, Transition } from '@headlessui/react';
import React from 'react';

type Props = {
  open: boolean;
  checkedDownload: boolean;
  onClose: () => void;
  onYes: () => void;
  onCheckedDownload: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const EndClarificationModal = React.memo(({ checkedDownload, open, onClose, onYes, onCheckedDownload }: Props) => {
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
          <div className="fixed inset-0 bg-black/50 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-x-0 inset-y-1/4 z-10 w-screen overflow-y-auto">
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
                <div className="w-[350px] overflow-hidden rounded-[14px] border border-borderWhiteLight  md:w-[450px]">
                  <div className="relative flex  w-full flex-row items-center justify-between border-b border-borderWhiteLight bg-bgHeaderCard px-4 py-4 text-lg font-semibold text-secondary md:px-8">
                    <div className="flex flex-row items-center">
                      <div className="mr-2 flex aspect-square w-7 items-center justify-center rounded-full bg-primary">
                        <img className="h-auto" src={images.iconLogo} alt="Clarifi logo" />
                      </div>
                      CONGRATS, YOU DID IT!
                    </div>
                    <button onClick={onClose}>
                      <img src={icons.xMark} />
                    </button>
                  </div>
                  <div className="flex w-full flex-col items-center justify-center bg-white py-4">
                    <p className="text-base font-medium text-secondary">Are you sure you want to end clarification? </p>
                    <button
                      onClick={onYes}
                      className="mt-6 w-[55%] rounded-lg bg-primary p-2 font-Lato text-sm font-bold uppercase text-white"
                    >
                      Yes
                    </button>
                    <div className="mt-4 flex w-[55%] flex-row space-x-2">
                      <input
                        checked={checkedDownload}
                        onChange={onCheckedDownload}
                        type="checkbox"
                        className="rounded border border-secondary"
                      />
                      <p className="text-start text-xs font-medium text-secondary">
                        Check this box to instantly download the clarification report.
                      </p>
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
export default EndClarificationModal;
