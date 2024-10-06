import { icons, images } from '@/constants';
import { IPolicy } from '@/features/policy/interfaces';
import { Dialog, Transition } from '@headlessui/react';
import { Formik } from 'formik';
import React from 'react';
import { FC } from 'react';
import useEditPolicyFormHooks from './hooks';
import { ErrorMessageForm, LoadingPage } from '@/components';

type Props = {
  open: boolean;
  onClose: () => void;
  currentPolicy: IPolicy | null;
};

const EditPolicyForm: FC<Props> = ({ open, currentPolicy, onClose }) => {
  const { isUpdatingPolicy, initialValues, onSubmitForm } = useEditPolicyFormHooks({ currentPolicy, onClose });

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
          <div className="fixed inset-0 bg-black/50 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-x-0 inset-y-0 z-10 w-screen overflow-y-auto">
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
                <div className="w-[350px] overflow-hidden rounded-[14px] border border-borderWhiteLight  md:w-[500px]">
                  <div className="relative flex  w-full flex-row items-center justify-between border-b border-borderWhiteLight bg-bgHeaderCard px-4 py-4 text-lg font-semibold text-secondary md:px-8">
                    <div className="flex flex-row items-center">
                      <div className="mr-2 flex aspect-square w-7 items-center justify-center rounded-full bg-primary">
                        <img className="h-auto" src={images.iconLogo} alt="Clarifi logo" />
                      </div>
                      Update Policy
                    </div>
                    <button onClick={onClose}>
                      <img src={icons.xMark} />
                    </button>
                  </div>
                  <div className="flex w-full flex-col items-center justify-center bg-white py-4">
                    <Formik initialValues={initialValues} validateOnMount={false} onSubmit={onSubmitForm}>
                      {(props) => (
                        <form onSubmit={props.handleSubmit} className="flex w-full flex-col gap-y-4 px-8">
                          <div>
                            <p className="text-start text-2xs font-medium text-gray-800 lg:text-xs 2xl:text-sm">
                              First Name
                            </p>
                            <div className="relative mt-2 flex flex-row items-center justify-center">
                              <input
                                className="w-full rounded-lg border border-gray-300 pr-10 text-xs font-normal capitalize text-gray-800 lg:text-sm 2xl:text-base"
                                name="firstName"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.firstName?.toLowerCase()}
                                placeholder="Type first name of policy"
                              />
                            </div>
                            <ErrorMessageForm name="firstName" />
                          </div>
                          <div>
                            <p className="text-start text-2xs font-medium text-gray-800 lg:text-xs 2xl:text-sm">
                              Address
                            </p>
                            <div className="relative mt-2 flex flex-row items-center justify-center">
                              <input
                                className="w-full rounded-lg border border-gray-300 pr-10 text-xs font-normal capitalize text-gray-800 lg:text-sm 2xl:text-base"
                                name="fullAddress"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.fullAddress?.toLowerCase()}
                                placeholder="Type address of policy"
                              />
                            </div>
                            <ErrorMessageForm name="fullAddress" />
                          </div>
                          <div>
                            <p className="text-start text-2xs font-medium text-gray-800 lg:text-xs 2xl:text-sm">
                              Provider
                            </p>
                            <div className="relative mt-2 flex flex-row items-center justify-center">
                              <input
                                className="w-full rounded-lg border border-gray-300 pr-10 text-xs font-normal text-gray-800 lg:text-sm 2xl:text-base"
                                name="provider"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.provider}
                                placeholder="Type provider of policy"
                              />
                            </div>
                            <ErrorMessageForm name="provider" />
                          </div>
                          <div>
                            <p className="text-start text-2xs font-medium text-gray-800 lg:text-xs 2xl:text-sm">
                              Policy Number
                            </p>
                            <div className="relative mt-2 flex flex-row items-center justify-center">
                              <input
                                className="w-full rounded-lg border border-gray-300 pr-10 text-xs font-normal text-gray-800 lg:text-sm 2xl:text-base"
                                name="policyNumber"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.policyNumber}
                                placeholder="Type policy number of policy"
                              />
                            </div>
                            <ErrorMessageForm name="policyNumber" />
                          </div>
                          <div>
                            <p className="text-start text-2xs font-medium text-gray-800 lg:text-xs 2xl:text-sm">
                              Claim Number
                            </p>
                            <div className="relative mt-2 flex flex-row items-center justify-center">
                              <input
                                className="w-full rounded-lg border border-gray-300 pr-10 text-xs font-normal text-gray-800 lg:text-sm 2xl:text-base"
                                name="claimNumber"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.claimNumber}
                                placeholder="Type claim number of policy"
                              />
                            </div>
                            <ErrorMessageForm name="claimNumber" />
                          </div>
                          <button type="submit" className="mt-2 h-10 w-full rounded-lg bg-primary">
                            <p className="text-base font-medium text-white">Save</p>
                          </button>
                        </form>
                      )}
                    </Formik>
                  </div>
                </div>
                {isUpdatingPolicy && <LoadingPage />}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default EditPolicyForm;
