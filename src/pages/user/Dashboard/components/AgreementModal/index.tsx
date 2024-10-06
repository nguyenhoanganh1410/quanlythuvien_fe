import { PATHS } from '@/constants/route';
import { Dialog, Transition } from '@headlessui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  open: boolean;
  onClose: () => void;
};

const AgreementModal = React.memo(({ open, onClose }: Props) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleContinue = () => {
    navigate(PATHS.HOME);
  };

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
                <div className="z-50 mt-[36px] max-w-2xl rounded-[14px] bg-white">
                  <div className="flex h-[65px] items-center justify-between rounded-[14px_14px_0px_0px] border border-solid border-borderWhiteLight bg-bgHeaderCard px-[24px] py-[18px] text-center">
                    <div className="flex items-center justify-start text-center">
                      <p className="ml-2 text-lg font-semibold not-italic leading-[normal] tracking-[0.18px] text-secondary">
                        Clarifi Purchase Agreement
                      </p>
                    </div>
                  </div>
                  <div className="h-auto space-y-4 overflow-y-auto rounded-[0px_0px_14px_14px] px-8 py-8">
                    <h2 className="text-2xl font-extrabold">Thank you for upgrading!</h2>
                    <h3 className="text-lg">We look forward to helping you effortlessly clarify insurance policies.</h3>
                    <div className="w-fill flex items-center justify-center gap-3">
                      <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                      <p className="text-sm font-normal text-slate-700">
                        Please accept our user agreement to continue.
                      </p>
                    </div>
                    <button
                      onClick={handleContinue}
                      disabled={!isChecked}
                      className={`mt-6 h-10 w-36 rounded-lg bg-primary p-2 text-center text-sm font-bold text-white
                          ${!isChecked ? 'bg-primary/50' : 'bg-primary'}`}
                    >
                      Continue
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
export default AgreementModal;
