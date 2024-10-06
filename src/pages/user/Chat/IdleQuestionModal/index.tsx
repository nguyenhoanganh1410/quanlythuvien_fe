import { images } from '@/constants';
import { Dialog, Transition } from '@headlessui/react';
import React from 'react';

type Props = {
  open: boolean;
  onDelete: () => void;
  onContinue: () => void;
};

const IdleQuestionModal = React.memo(({ open, onDelete, onContinue }: Props) => {
  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
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
                <div className="w-[600px] overflow-hidden rounded-[14px] border  border-borderWhiteLight">
                  <div className="relative flex  w-full flex-row items-center justify-between border-b border-borderWhiteLight bg-bgHeaderCard px-8 py-4 text-lg font-semibold text-secondary">
                    <div className="flex flex-row items-center">
                      <div className="mr-2 flex aspect-square w-7 items-center justify-center rounded-full bg-primary">
                        <img className="h-auto" src={images.iconLogo} alt="Clarifi logo" />
                      </div>
                      Clarifi is Still Thinking!
                    </div>
                  </div>
                  <div className="flex w-full  flex-col items-center justify-center bg-white px-8 py-4">
                    <div className="space-y-3 text-start text-base font-medium text-secondary">
                      <p>
                        We seem to be taking a bit longer than expected to process your request. Sometimes, the key to a
                        faster response is in the specifics of the question.
                      </p>
                      <div>
                        🤔<p className="inline italic"> Working on extracting details from the insurance policy...</p>
                      </div>
                      <p>
                        Why not try rephrasing your query? The more specific your question, the better we can assist
                        you.
                      </p>
                      <p>If you need help or have any questions, our support team is just a click away.</p>
                      <p>Thank you for using Clarifi</p>
                    </div>
                    <div className="flex w-full flex-row justify-center space-x-6">
                      <button
                        onClick={onDelete}
                        className="mt-6 rounded-lg bg-gray-100 px-6 py-2 font-Lato text-sm font-bold uppercase text-primaryText/80"
                      >
                        Remove
                      </button>
                      <button
                        onClick={onContinue}
                        className="mt-6 rounded-lg bg-primary  px-6 py-2 font-Lato text-sm font-bold uppercase text-white"
                      >
                        Continue
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

export default IdleQuestionModal;
