import { icons } from '@/constants';
import { Dialog, Transition } from '@headlessui/react';
import React from 'react';
import { useUpdateProfilePopupHooks } from './hooks';
import { EUpdateProfileType, IUser } from '@/features/user/interfaces';

type Props = {
  user: IUser;
  open: boolean;
  updateType: string;
  onClose: () => void;
};

const UpdateProfilePopup = React.memo(({ user, updateType, open, onClose }: Props) => {
  const { renderTitle, renderPlaceholderInput, valueUpdate, boolUpdate, onChangeValue, onUpdateProfile, onChangeBool } =
    useUpdateProfilePopupHooks({ user, updateType, onClose });

  if (!user) {
    return;
  }

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
              <Dialog.Panel className="">
                <div className="w-[350px] rounded-[14px] bg-white md:w-[450px]">
                  <div className="flex h-[65px] items-center justify-between rounded-[14px_14px_0px_0px] border border-solid border-borderWhiteLight bg-bgHeaderCard px-[24px] py-[18px] text-center">
                    <div className="flex items-center justify-start text-center">
                      <img src={icons.pencilFill} alt="edit profile" />
                      <p className="ml-2 text-lg font-semibold not-italic leading-[normal] tracking-[0.18px] text-secondary">
                        {renderTitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex h-auto flex-col items-center gap-4 overflow-y-auto rounded-[0px_0px_14px_14px] border-b border-l border-r border-solid border-x-borderWhiteLight border-b-borderWhiteLight px-[47px] py-[32px]">
                    {updateType.valueOf() === EUpdateProfileType.payAsYouGoMode.valueOf() ? (
                      <input
                        checked={boolUpdate}
                        onChange={onChangeBool}
                        type="checkbox"
                        className="h-[40px] w-[40px] rounded-lg border border-solid border-[#D1D5DB] focus:border-[#D1D5DB] focus:outline-none focus:ring-0"
                      />
                    ) : (
                      <input
                        value={valueUpdate}
                        onChange={onChangeValue}
                        placeholder={renderPlaceholderInput}
                        className="w-full rounded-lg border border-solid border-[#D1D5DB] focus:border-[#D1D5DB] focus:outline-none focus:ring-0"
                      />
                    )}

                    <button
                      disabled={updateType === EUpdateProfileType.payAsYouGoMode ? false : !valueUpdate}
                      onClick={onUpdateProfile}
                      className={` box-border h-[40px] w-[140px] rounded-lg  ${
                        (updateType === EUpdateProfileType.payAsYouGoMode ? false : !valueUpdate)
                          ? 'bg-primary/50'
                          : 'bg-primary'
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
export default UpdateProfilePopup;
