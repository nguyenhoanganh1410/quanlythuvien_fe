import { icons } from '@/constants';
import { Dialog, Transition } from '@headlessui/react';
import React from 'react';
import { useDeteleCardModalHooks } from './hooks';
import Spinner from '@/components/LoadingPage/Spinner';

type Props = {
  open: boolean;
  onClose: () => void;
  cardId: string;
};
const DeleteCardModal = React.memo(({ open, onClose, cardId }: Props) => {
  const { isLoading, onDeleteCard } = useDeteleCardModalHooks({ cardId, onClose });

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
          <div className="fixed inset-0 bg-black/50  transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-x-0 inset-y-1/3 z-10 w-screen overflow-y-auto">
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
                <div className="mt-[36px] w-[350px] rounded-[14px] bg-white md:w-[450px]">
                  <div className="flex h-[65px] items-center justify-between rounded-[14px_14px_0px_0px] border border-solid border-borderWhiteLight bg-bgHeaderCard px-[24px] py-[18px] text-center">
                    <div className="flex items-center justify-start text-center">
                      <img src={icons.presentQuestion} alt="present-mail" />
                      <p className="ml-2 text-lg font-semibold not-italic leading-[normal] tracking-[0.18px] text-secondary">
                        Delete Card
                      </p>
                    </div>
                  </div>
                  <div className="h-auto overflow-y-auto rounded-[0px_0px_14px_14px] border-b border-l border-r border-solid border-x-borderWhiteLight border-b-borderWhiteLight px-[47px] py-[32px]">
                    <button
                      onClick={onDeleteCard}
                      disabled={isLoading}
                      className={`relative h-[40px] w-32 rounded-lg bg-primary`}
                    >
                      {isLoading ? <Spinner size="sm" /> : <p className="text-lg font-bold text-white">Delete</p>}
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
export default DeleteCardModal;
