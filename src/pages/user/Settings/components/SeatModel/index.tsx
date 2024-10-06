import { Dialog, Transition } from '@headlessui/react';
import React, { memo } from 'react';
import { useSeatModelHooks } from './hooks';
import { Input, LoadingPage } from '@/components';

type Props = {
  open: boolean;
  onClose: () => void;
};

const SeatModel = React.memo(({ open, onClose }: Props) => {
  const { formik, isLoading } = useSeatModelHooks(onClose);
  return (
    <React.Fragment>
      {isLoading && <LoadingPage />}
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
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100 w-full sm:w-auto"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100 w-full sm:w-auto"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="">
                  <div className="mt-[36px] w-full rounded-[14px] bg-white sm:w-[600px]">
                    <div className="flex h-[65px] items-center justify-between rounded-[14px_14px_0px_0px] border border-solid border-borderWhiteLight bg-bgHeaderCard px-[24px] py-[18px] text-center">
                      <div className="flex items-center justify-start text-center">
                        <p className="ml-2 text-lg font-semibold capitalize not-italic leading-[normal] tracking-[0.18px] text-secondary">
                          Define Now
                        </p>
                      </div>
                    </div>
                    <div className="h-auto overflow-y-auto rounded-[0px_0px_14px_14px] border-b border-l border-r border-solid border-x-borderWhiteLight border-b-borderWhiteLight">
                      <div className="p-4 md:p-6">
                        <div className="flex flex-col">
                          <div className="flex w-full flex-col">
                            <Input
                              name="email"
                              label="Email"
                              placeholder="Type email here......"
                              type="text"
                              value={formik.values.email}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              touched={formik.touched.email}
                              errorMessage={formik.errors.email}
                            />
                          </div>
                          <div className="mt-2 flex justify-end">
                            <button
                              type="button"
                              onClick={formik.submitForm}
                              className="relative my-2 w-24 rounded-lg border border-primary bg-primary py-2 text-sm font-normal text-white hover:bg-orange-500"
                            >
                              Save
                            </button>
                          </div>
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
    </React.Fragment>
  );
});
export default memo(SeatModel);
