import { Dialog, Transition } from '@headlessui/react';
import React from 'react';
import { useInCorrectPdfModalHooks } from './hooks';
import ClarifiRoundIcon from '@/components/iconSvgs/ClarifiRoundIcon';

type Props = {
  open: boolean;
  onClose: () => void;
};

const InCorrectPdfModal = React.memo(({ open, onClose }: Props) => {
  const { step, isChecked, continueUploadPDFfile, handleCheckboxChange, handleClose } = useInCorrectPdfModalHooks({
    onClose,
  });

  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60 transition-opacity" />
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
                <div className="z-50 mt-[36px]  max-w-2xl rounded-[14px] bg-white">
                  <div className="flex h-[65px] items-center justify-between rounded-[14px_14px_0px_0px] border border-solid border-borderWhiteLight bg-bgHeaderCard px-[24px] py-[18px] text-center">
                    <div className="flex items-center justify-start text-center">
                      <ClarifiRoundIcon />
                      {step === 1 && (
                        <p className="ml-2 text-lg font-semibold not-italic leading-[normal] tracking-[0.18px] text-secondary">
                          Please Hang Tight!
                        </p>
                      )}
                      {step === 2 && (
                        <p className="ml-2 text-lg font-semibold not-italic leading-[normal] tracking-[0.18px] text-secondary">
                          Clarifi Policy Processing
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="h-auto space-y-4 overflow-y-auto rounded-[0px_0px_14px_14px] border-b border-l border-r border-solid border-x-borderWhiteLight border-b-borderWhiteLight px-8 py-8 text-start">
                    <div className="h-[auto] w-[400px] text-center text-lg font-medium leading-[21px] tracking-tight text-slate-700">
                      {step === 1 && (
                        <p>
                          We’re received your document. It looks like it's in an image format, which is perfecly fine.
                        </p>
                      )}
                      {step === 2 && (
                        <p className="text-lg font-semibold not-italic leading-[normal] tracking-[0.18px] text-secondary">
                          We’re swiftly converting your policy to a readable format and prepping it for AI
                          implementation. This usually takes a couple of minutes, though larger policies might take a
                          bit longer. You policy will be ready as soon as possible. <br />
                          Happy Clarifi’ing!
                        </p>
                      )}
                    </div>
                    <div className="w-fill flex justify-center">
                      <button
                        onClick={continueUploadPDFfile}
                        className={` box-border h-[40px] w-[140px] rounded-lg bg-primary px-[10px] py-[10px] text-center font-Lato text-sm font-bold not-italic leading-5 text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]`}
                      >
                        Continue
                      </button>
                    </div>
                    {step === 2 && (
                      <div className="w-fill flex items-center justify-center gap-3">
                        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                        <p className="text-sm font-normal text-slate-700">Don’t show this message to me again</p>
                      </div>
                    )}
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
export default InCorrectPdfModal;
