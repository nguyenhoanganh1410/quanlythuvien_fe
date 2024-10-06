import ThumbDownIcon from '@/components/iconSvgs/ThumbDownIcon';
import ThumbUpIcon from '@/components/iconSvgs/ThumbUpIcon';
import { icons } from '@/constants';
import { FeedbackStatus, IMessage } from '@/features/chat/interfaces';
import { Dialog, Transition } from '@headlessui/react';
import React from 'react';
import { useFeedbackModalHooks } from './hooks';
import clsx from 'clsx';

type Props = {
  open: boolean;
  message: IMessage;
  statusFeedback: string;
  onClose: () => void;
};

const FeedbackModal = React.memo(({ message, open, statusFeedback, onClose }: Props) => {
  if (!message) {
    return null;
  }

  const { valueFeedback, onChangeFeedback, onSubmit } = useFeedbackModalHooks({ message, onClose });

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
                      <div className="mr-2 flex aspect-square w-7 items-center justify-center rounded-full bg-primary bg-opacity-20">
                        {statusFeedback === FeedbackStatus.thumbUp ? (
                          <ThumbUpIcon isActive={true} />
                        ) : (
                          <ThumbDownIcon isActive={true} />
                        )}
                      </div>
                      Provide additional feedback
                    </div>
                    <button onClick={onClose}>
                      <img src={icons.xMark} />
                    </button>
                  </div>
                  <div className="flex w-full flex-col items-center justify-center bg-white px-4 py-4 md:px-8">
                    <textarea
                      value={valueFeedback}
                      onChange={onChangeFeedback}
                      className="w-full flex-1 resize-none rounded-md border border-gray-200  bg-[#F4F7FF] text-base font-normal text-gray-800"
                      placeholder={
                        statusFeedback === FeedbackStatus.thumbUp
                          ? 'What do you like about the response?'
                          : 'What was the issue with the response? How could it be improved?'
                      }
                    />
                    <button
                      disabled={!valueFeedback.trim()}
                      onClick={onSubmit}
                      className={clsx(
                        'mt-6 w-fit rounded-lg px-8 py-2 font-Lato text-sm font-bold uppercase text-white',
                        !valueFeedback.trim() ? ' bg-primary/50' : ' bg-primary'
                      )}
                    >
                      Submit
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

export default FeedbackModal;
