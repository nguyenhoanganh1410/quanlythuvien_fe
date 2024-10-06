import { Dialog, Transition } from '@headlessui/react';
import React from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

const FileSizeAlertModal = React.memo(({ open, onClose }: Props) => {
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
                      <img
                        src="https://a.slack-edge.com/production-standard-emoji-assets/14.0/apple-medium/1f50d@2x.png"
                        width={24}
                        height={24}
                      />
                      <p className="ml-2 text-lg font-semibold not-italic leading-[normal] tracking-[0.18px] text-secondary">
                        Attachments exceeding 25MB limit!
                      </p>
                    </div>
                  </div>
                  <div className="h-auto space-y-4 overflow-y-auto rounded-[0px_0px_14px_14px] border-b border-l border-r border-solid border-x-borderWhiteLight border-b-borderWhiteLight px-8 py-8 text-start">
                    <div className="flex flex-row items-start space-x-1 text-base font-normal">
                      <img
                        src="https://a.slack-edge.com/production-standard-emoji-assets/14.0/apple-medium/1f6ab@2x.png"
                        width={24}
                        height={24}
                      />
                      <div>
                        <p className="inline font-semibold">Issue:</p> The file sent via email exceeds the 25MB limit
                        and does not have access to Google Drive links. Please reduce the file size or upload the file
                        directly to the website.
                      </div>
                    </div>
                    <p className="ml-2 font-medium">
                      If you encounter any issues or need assistance from us, please feel free to contact us via this
                      email Hello@goclarifi.com. We are always ready to help.
                    </p>
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
export default FileSizeAlertModal;
