import { icons, images } from '@/constants';
import { IPolicy } from '@/features/policy/interfaces';
import { Dialog, Transition } from '@headlessui/react';
import React, { useCallback } from 'react';
import { FC } from 'react';
import useShareEmailPolicyHooks from './hooks';

type Props = {
  currentPolicy: IPolicy;
  open: boolean;
  onClose: () => void;
};

const ShareEmailPolicyModal: FC<Props> = ({ currentPolicy, open, onClose }) => {
  const { valueEmailInput, onChangeValueEmail, onShare } = useShareEmailPolicyHooks({ currentPolicy });

  const renderHeader = useCallback(() => {
    return (
      <div className="relative flex w-full flex-row items-center justify-between border-b border-borderWhiteLight bg-bgHeaderCard px-4 py-4 text-sm font-semibold text-secondary md:px-6 lg:text-base 2xl:text-lg">
        <div className="flex flex-row items-center">
          <div className="mr-2 flex aspect-square w-7 items-center justify-center rounded-full bg-primary">
            <img className="h-auto" src={images.iconLogo} alt="Clarifi logo" />
          </div>
          Share
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
          <div className="fixed inset-0 bg-black/60 transition-opacity" />
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
                <div className="w-[350px] overflow-hidden rounded-[14px] border border-borderWhiteLight bg-white md:w-[450px]">
                  {renderHeader()}
                  {/* List */}
                  <div className="flex w-full flex-col bg-white px-6 py-6">
                    <p className="text-left text-2xs font-semibold text-secondary lg:text-xs 2xl:text-sm">
                      Enter the policyholder's email
                    </p>
                    <input
                      type="email"
                      value={valueEmailInput}
                      onChange={onChangeValueEmail}
                      className="mt-2 w-full rounded-lg border border-borderGrey text-2xs text-secondary focus:border-borderGrey focus:outline-none focus:ring-0 lg:text-xs 2xl:text-sm"
                      placeholder="user@example.com"
                    />
                    <button
                      onClick={onShare}
                      className="mt-4 w-fit self-center rounded-lg bg-primary px-10 py-2.5 text-center text-2xs  text-white lg:text-xs 2xl:text-sm"
                    >
                      Share
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
};

export default ShareEmailPolicyModal;
