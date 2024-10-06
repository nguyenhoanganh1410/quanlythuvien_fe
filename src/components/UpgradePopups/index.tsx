import { icons } from '@/constants';
import { Dialog, Transition } from '@headlessui/react';
import React from 'react';
import { useUpgradePopupHooks } from './hooks';
import Spinner from '@/components/LoadingPage/Spinner';
import { FaCheck } from 'react-icons/fa';
import { Formik, Form, Field } from 'formik';
import ErrorMessageForm from '../ErrorMessageForm';

type Props = {
  open: boolean;
  onClose: () => void;
};
const UpgradePopups = React.memo(({ open, onClose }: Props) => {
  const { isLoading, initialValues, onSubmitForm, submitValidator, navFreeTrial } = useUpgradePopupHooks({ onClose });

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
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="">
                <div className="mt-[36px] w-[600px] rounded-[14px] bg-white">
                  <div className="flex h-[65px] items-center justify-between rounded-[14px_14px_0px_0px] border border-solid border-borderWhiteLight bg-bgHeaderCard px-[24px] py-[18px] text-center">
                    <div className="flex items-center justify-start text-center">
                      <img src={icons.presentQuestion} alt="present-mail" />
                      <p className="ml-2 text-lg font-semibold not-italic leading-[normal] tracking-[0.18px] text-secondary">
                        Upgrade your plan
                      </p>
                    </div>
                  </div>
                  <div className="h-auto overflow-y-auto rounded-[0px_0px_14px_14px] border-b border-l border-r border-solid border-x-borderWhiteLight border-b-borderWhiteLight">
                    <div className="flex">
                      <div className="flex-1 border-r p-4 text-start">
                        <h2 className="mb-2 text-xl font-bold">Free</h2>
                        <p className="text-gray-400">USD $0</p>
                        <Formik
                          validationSchema={submitValidator}
                          initialValues={initialValues}
                          validateOnMount={false}
                          onSubmit={onSubmitForm}
                        >
                          <Form className="mt-4">
                            <Field
                              type="text"
                              name="promoCode"
                              maxLength={20}
                              placeholder="promo code"
                              className="w-full rounded-lg border border-solid border-[#D1D5DB] focus:border-[#D1D5DB] focus:outline-none focus:ring-0"
                            />
                            <ErrorMessageForm name="promoCode" component="div" />
                            <button className="relative my-4 w-full  rounded-lg border border-primary bg-primary py-2 font-bold text-white">
                              {isLoading ? <Spinner size="sm" /> : <p className="text-lg font-bold">Confirm</p>}
                            </button>
                          </Form>
                        </Formik>
                        <p className="font-bold">For people just getting started with Clarifi</p>
                        <br />
                        <div className="flex items-center gap-4">
                          <FaCheck className="text-gray-400" />
                          <p className="">Sign Up Today</p>
                        </div>
                      </div>
                      <div className="flex-1 p-4 text-start">
                        <h2 className="mb-2 text-xl font-bold">Plus</h2>
                        <p className="text-gray-400">USD $20</p>
                        <button
                          onClick={navFreeTrial}
                          className="my-4 w-full rounded-lg border border-primary bg-primary  py-2 font-bold text-white"
                        >
                          Upgrade to Plus
                        </button>
                        <p className="font-bold">Everything in Free, and:</p>
                        <br />
                        <div className="flex items-center gap-4">
                          <FaCheck className="text-gray-400" />
                          <p className="">Everything in Free</p>
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
export default UpgradePopups;
