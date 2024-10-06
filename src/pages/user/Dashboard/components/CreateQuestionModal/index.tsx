import { icons } from '@/constants';
import { Dialog, Transition } from '@headlessui/react';
import React from 'react';
import { useCreateQuestionModalHooks } from './hooks';

type Props = {
  open: boolean;
  onClose: () => void;
};

const CreateQuestionModal = React.memo(({ open, onClose }: Props) => {
  const { valueAdd, onChangeValue, onSaveQuestion } = useCreateQuestionModalHooks({ onClose });

  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog as="div" className="relative z-20" onClose={onClose}>
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
        <div className="fixed inset-x-0  inset-y-[25%] z-10 flex w-screen items-center justify-center overflow-y-auto">
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
              <Dialog.Panel className="px-4">
                <div className=" max-w-[450px] rounded-[14px] bg-white">
                  <div className="flex h-[65px] items-center justify-between rounded-[14px_14px_0px_0px] border border-solid border-borderWhiteLight bg-bgHeaderCard px-[24px] py-[18px] text-center">
                    <div className="flex items-center justify-start text-center">
                      <img src={icons.presentQuestion} alt="present-mail" />
                      <p className="ml-2 text-lg font-semibold not-italic leading-[normal] tracking-[0.18px] text-secondary">
                        Add Preset Questions
                      </p>
                    </div>
                  </div>
                  <div className="h-auto overflow-y-auto rounded-[0px_0px_14px_14px] border-b border-l border-r border-solid border-x-borderWhiteLight border-b-borderWhiteLight px-[47px] py-[32px]">
                    <input
                      value={valueAdd}
                      onChange={onChangeValue}
                      placeholder="Add question here"
                      className="w-full rounded-lg border border-solid border-[#D1D5DB] focus:border-[#D1D5DB] focus:outline-none focus:ring-0"
                    />
                    <button
                      disabled={!valueAdd}
                      onClick={onSaveQuestion}
                      className={`ml-4 mt-[28px] box-border h-[40px] w-[140px] rounded-lg  ${
                        !valueAdd ? 'bg-primary/50' : 'bg-primary'
                      }  px-[10px] py-[10px] text-center font-Lato text-sm font-bold not-italic leading-5 text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]`}
                    >
                      Save
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
export default CreateQuestionModal;
