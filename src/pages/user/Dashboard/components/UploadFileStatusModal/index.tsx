import { StatusUploadPolicyFile } from '@/features/policy/interfaces';
import { Dialog, Transition } from '@headlessui/react';
import React from 'react';

type Props = {
  open: boolean;
  status: string | null;
};

const UploadFileStatusModal = React.memo(({ open, status }: Props) => {
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
                <div className=" min-w-[350px] self-center rounded-[14px] bg-white sm:min-w-[450px]">
                  <div className="flex h-[65px] items-center justify-between rounded-[14px_14px_0px_0px] border border-solid border-borderWhiteLight bg-bgHeaderCard px-[24px] py-[18px] text-center">
                    <div className="flex items-center justify-start text-center">
                      <p className="ml-2 text-lg font-semibold not-italic leading-[normal] tracking-[0.18px] text-secondary">
                        Upload policy file status
                      </p>
                    </div>
                  </div>
                  <div className="h-auto overflow-y-auto rounded-[0px_0px_14px_14px] border-b border-l border-r border-solid border-x-borderWhiteLight border-b-borderWhiteLight px-[47px] py-[32px]">
                    {status === StatusUploadPolicyFile.SAVING ? 'Saving...' : 'Uploading...'}
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
export default UploadFileStatusModal;
