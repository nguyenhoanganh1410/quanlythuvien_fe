import { Dialog, Transition } from '@headlessui/react';
import React from 'react';
import { useUnlockPopupsHooks } from './hooks';

type Props = {
  open: boolean;
  onClose: () => void;
};

const UnlockPopups = React.memo(({ open, onClose }: Props) => {
  const { navFreeTrial } = useUnlockPopupsHooks({ onClose });

  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog as="div" className="relative z-50 " onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 transition-opacity " />
        </Transition.Child>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto px-4 py-8 ">
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
                <div className="max-w-[650px] rounded-sm">
                  <div className="flex h-[65px] items-center  justify-center rounded-[14px_14px_0px_0px] border border-solid border-borderWhiteLight bg-primary px-6 py-[18px] text-center text-white">
                    <div className="flex items-center text-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_1812_4995)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.84473 11.1235C4.1412 11.2181 3.81978 11.3842 3.60213 11.6019C3.38448 11.8196 3.2183 12.141 3.12371 12.8445C3.02517 13.5775 3.023 14.5569 3.023 16C3.023 17.4431 3.02517 18.4226 3.12371 19.1555C3.2183 19.8591 3.38448 20.1805 3.60213 20.3982C3.81978 20.6158 4.1412 20.782 4.84473 20.8766C5.57768 20.9751 6.55714 20.9773 8.00027 20.9773H16.0003C17.4434 20.9773 18.4228 20.9751 19.1558 20.8766C19.8593 20.782 20.1807 20.6158 20.3984 20.3981C20.6161 20.1805 20.7822 19.8591 20.8768 19.1555C20.9754 18.4226 20.9775 17.4431 20.9775 16C20.9775 14.5569 20.9754 13.5775 20.8768 12.8445C20.7822 12.141 20.6161 11.8196 20.3984 11.6019C20.1807 11.3842 19.8593 11.2181 19.1558 11.1235C18.4228 11.0249 17.4434 11.0228 16.0003 11.0228H8.00027C6.55714 11.0228 5.57768 11.0249 4.84473 11.1235ZM7.92833 8.9773H16.0722C17.4251 8.97726 18.5431 8.97723 19.4283 9.09626C20.3587 9.22134 21.1837 9.49451 21.8447 10.1555C22.5058 10.8166 22.779 11.6416 22.904 12.572C23.0231 13.4572 23.023 14.5752 23.023 15.9281V16.072C23.023 17.4249 23.0231 18.5428 22.904 19.4281C22.779 20.3584 22.5058 21.1835 21.8447 21.8445C21.1837 22.5055 20.3587 22.7787 19.4283 22.9038C18.5431 23.0228 17.4251 23.0228 16.0722 23.0228H7.92832C6.57538 23.0228 5.45746 23.0228 4.57217 22.9038C3.64182 22.7787 2.8168 22.5055 2.15576 21.8445C1.49474 21.1835 1.22158 20.3584 1.0965 19.4281C0.977473 18.5428 0.977503 17.4249 0.97754 16.072V15.9281C0.977503 14.5752 0.977473 13.4572 1.0965 12.572C1.22158 11.6416 1.49474 10.8166 2.15576 10.1556C2.8168 9.49451 3.64182 9.22134 4.57217 9.09626C5.45746 8.97723 6.57539 8.97726 7.92833 8.9773Z"
                            fill="white"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.0003 3.02275C9.25139 3.02275 7.02299 5.25115 7.02299 8.00002V10C7.02299 10.5649 6.5651 11.0227 6.00027 11.0227C5.43543 11.0227 4.97754 10.5649 4.97754 10V8.00002C4.97754 4.12148 8.12172 0.977295 12.0003 0.977295C15.274 0.977295 18.0221 3.21638 18.8017 6.24509C18.9425 6.79209 18.6132 7.34967 18.0662 7.49047C17.5192 7.63126 16.9616 7.30196 16.8208 6.75496C16.2682 4.60799 14.3181 3.02275 12.0003 3.02275Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1812_4995">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className="ml-2 text-sm font-semibold not-italic leading-[normal] tracking-[0.18px] sm:text-lg">
                        Unlock & Clarifi Unlimited Policies
                      </p>
                    </div>
                  </div>
                  <div className="h-auto overflow-y-auto rounded-[0px_0px_14px_14px] border-b border-l border-r border-solid border-x-borderWhiteLight border-b-borderWhiteLight bg-white">
                    <div className="flex flex-col gap-2 px-6 py-5 sm:px-10">
                      <p className="m-4 text-center text-lg font-medium leading-[21px] tracking-[0.14px] text-secondary sm:text-xl">
                        Unlock Full Access to Clarifi
                      </p>
                      <div className="mb-1 flex items-center gap-1">
                        <p className="text-start  text-sm font-medium leading-[21px] tracking-[0.14px] text-secondary">
                          <span className="font-bold">Immediate Policy Analysis:</span>
                          <br></br>
                          <span className="font-normal text-gray-500">
                            Get instant, in-depth analysis for every policy you upload.
                          </span>
                        </p>
                      </div>
                      <div className="mb-1 flex items-center gap-1">
                        <p className="text-start text-sm font-medium leading-[21px] tracking-[0.14px] text-secondary">
                          <span className="font-bold">Unlimited Document Uploads:</span>
                          <br></br>
                          <span className="font-normal text-gray-500">
                            {' '}
                            Say goodbye to limits - upload and manage as many policies as you need.
                          </span>
                        </p>
                      </div>
                      <div className="mb-1 flex items-center gap-1">
                        <p className="text-start text-sm font-medium leading-[21px] tracking-[0.14px] text-secondary">
                          <span className="font-bold">Advanced AI Insights:</span>
                          <br></br>
                          <span className="font-normal text-gray-500">
                            {' '}
                            Benefit from our continuously learning AI to uncover even the most nuanced policy details.
                          </span>
                        </p>
                      </div>
                      <div className="mb-1 flex items-center gap-1">
                        <p className="text-start text-sm font-medium leading-[21px] tracking-[0.14px] text-secondary">
                          <span className="font-bold">Custom Query Automation:</span>
                          <br></br>
                          <span className="font-normal text-gray-500">
                            {' '}
                            Set up and use custom queries to streamline your workflow across all documents.
                          </span>
                        </p>
                      </div>
                      <div className="mb-1 flex items-center gap-1">
                        <p className="text-start text-sm font-medium leading-[21px] tracking-[0.14px] text-secondary">
                          <span className="font-bold">Priority Customer Support: </span>
                          <br></br>
                          <span className="font-normal text-gray-500">
                            {' '}
                            Receive first-class support whenever you need assistance or have questions.
                          </span>
                        </p>
                      </div>
                      <div className="mb-1 flex items-center gap-1">
                        <p className="text-start text-sm font-medium leading-[21px] tracking-[0.14px] text-secondary">
                          <span className="font-bold">Secure Data Protection: </span>
                          <br></br>
                          <span className="font-normal text-gray-500">
                            {' '}
                            Rest assured your information is protected with top-tier encryption and security protocols.
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <p className="text-start text-sm font-medium leading-[21px] tracking-[0.14px] text-secondary">
                          <span className="font-bold">Continuous Updates and Improvements:</span>
                          <br></br>
                          <span className="font-normal text-gray-500">
                            {' '}
                            Enjoy regular updates to the Clarifi platform, ensuring you're always ahead of the curve.
                          </span>
                        </p>
                      </div>
                      <div className="mt-3 flex w-full justify-center">
                        <button
                          onClick={navFreeTrial}
                          className="h-10 w-[140px] rounded-lg border border-primary bg-primary py-2 text-sm font-medium text-white"
                        >
                          GET STARTED
                        </button>
                      </div>
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
export default UnlockPopups;
