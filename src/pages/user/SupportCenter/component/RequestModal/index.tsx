import { Dialog, Transition } from '@headlessui/react';
import React from 'react';
import { OPTIONS_DATA, useRequestModelHooks } from './hooks';
import { Input } from '@/components';

type Props = {
  articleId?: number;
  open: boolean;
  onClose: () => void;
};
const RequestModal = React.memo(({ open, articleId, onClose }: Props) => {
  const { formik } = useRequestModelHooks(open, onClose, articleId);
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
                      <p className="ml-2 text-lg font-semibold not-italic leading-[normal] tracking-[0.18px] text-secondary">
                        Request support
                      </p>
                    </div>
                  </div>
                  <div className="h-auto overflow-y-auto rounded-[0px_0px_14px_14px] border-b border-l border-r border-solid border-x-borderWhiteLight border-b-borderWhiteLight">
                    <div className="p-4 md:p-6">
                      <div className="flex flex-col">
                        <div className="flex w-full flex-col">
                          <span className="text-start text-[15px]">Select </span>
                          <select
                            name="type"
                            value={formik.values.type}
                            onChange={formik.handleChange}
                            className="mb-6 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                          >
                            {OPTIONS_DATA.map((item) => {
                              return (
                                <option key={item.value} value={item.name}>
                                  {item.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        <Input
                          name="title"
                          label="Title"
                          isArea={false}
                          placeholder="Type your title here......"
                          type="text"
                          value={formik.values.title}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          touched={formik.touched.title}
                          errorMessage={formik.errors.title}
                        />
                        <div className="mt-4">
                          <Input
                            name="feedback"
                            isArea
                            label="Feedback"
                            value={formik.values.feedback}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Type your feedback here......"
                            touched={formik.touched.feedback}
                            errorMessage={formik.errors.feedback}
                          />
                        </div>

                        <div className="mt-4 flex justify-end">
                          <button
                            type="button"
                            onClick={formik.submitForm}
                            className="relative my-2 w-24 rounded-lg border border-primary bg-primary py-2 text-[12px] font-normal text-white hover:bg-orange-500"
                          >
                            Send
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
  );
});
export default RequestModal;
