import PolicyChatIcon from '@/components/iconSvgs/PolicyChatIcon';
import { FC, useCallback } from 'react';
import useChatBoxHooks from './hooks';
import { Formik } from 'formik';
import { supportContactFormValidator } from '@/core/utils/validator';
import { ErrorMessageForm } from '@/components';
import XMarkIcon from '@/components/iconSvgs/XMarkIcon';
import clsx from 'clsx';
import SendIcon from '@/components/iconSvgs/SendIcon';
import Spinner from '@/components/LoadingPage/Spinner';
import MessageView from '../MessageView';

const ChatBox: FC = () => {
  const {
    isSendingMessage,
    listMessages,
    initialValues,
    isShowFormContact,
    isShowChatBox,
    valueInputMessage,
    bottomListMessagesRef,
    onCloseChatBox,
    onOpenChatBox,
    onSubmitForm,
    onChangeMessage,
    onSendMessage,
  } = useChatBoxHooks();

  const renderFormContact = useCallback(() => {
    if (!isShowFormContact) {
      return null;
    }
    return (
      <div className="flex flex-1 flex-col overflow-y-auto bg-white py-4">
        <Formik
          validationSchema={supportContactFormValidator}
          initialValues={initialValues}
          validateOnMount={false}
          onSubmit={onSubmitForm}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit} className="flex flex-col gap-y-4 px-4">
              <div>
                <p className="text-sm font-medium text-gray-800">Full Name</p>
                <div className="relative mt-2 flex flex-row items-center justify-center">
                  <input
                    className="w-full rounded-lg border border-gray-300 pr-10 text-base font-normal text-gray-800"
                    name="name"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.name}
                  />
                </div>
                <ErrorMessageForm name="name" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Email</p>
                <div className="relative mt-2 flex flex-row items-center justify-center">
                  <input
                    className="w-full rounded-lg border border-gray-300 pr-10 text-base font-normal text-gray-800"
                    name="email"
                    type="email"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.email}
                  />
                </div>
                <ErrorMessageForm name="email" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Phone Number</p>
                <div className="relative mt-2 flex flex-row items-center justify-center">
                  <input
                    className="w-full rounded-lg border border-gray-300 pr-10 text-base font-normal text-gray-800"
                    name="phoneNumber"
                    type="number"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.phoneNumber}
                  />
                </div>
                <ErrorMessageForm name="phoneNumber" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Message</p>
                <div className="relative mt-2 flex flex-row items-center justify-center">
                  <input
                    className="w-full rounded-lg border border-gray-300 pr-10 text-base font-normal text-gray-800"
                    name="message"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.message}
                  />
                </div>
                <ErrorMessageForm name="message" />
              </div>
              <button type="submit" className="mt-2 h-10 w-full rounded-lg bg-primary">
                <p className="text-base font-medium text-white">Send</p>
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }, [initialValues, isShowFormContact, onSubmitForm]);

  const renderListMessages = useCallback(() => {
    if ((isShowFormContact && listMessages.length <= 0) || isSendingMessage) {
      return null;
    }
    return (
      <div className="flex h-full w-full flex-1 flex-col gap-y-3 overflow-y-auto px-4 py-4">
        {listMessages.map((item) => (
          <MessageView message={item} key={item.id} />
        ))}
        <div ref={bottomListMessagesRef} />
      </div>
    );
  }, [listMessages, isShowFormContact, isSendingMessage, bottomListMessagesRef]);

  const renderInputMessage = useCallback(() => {
    if ((isShowFormContact && listMessages.length <= 0) || isSendingMessage) {
      return null;
    }
    return (
      <div className="relative flex flex-row items-center justify-center border-t border-t-gray-300 py-1">
        <input
          className="w-full border-none text-xs font-normal text-gray-800 outline-none focus:ring-0 lg:text-sm 2xl:text-base"
          placeholder="Type your message"
          value={valueInputMessage}
          onChange={onChangeMessage}
        />
        <button
          onClick={onSendMessage}
          disabled={!valueInputMessage}
          type="submit"
          className="mr-2 flex items-center justify-center rounded-md bg-primary p-2"
        >
          <SendIcon width={16} height={16} />
        </button>
      </div>
    );
  }, [isSendingMessage, isShowFormContact, listMessages.length, valueInputMessage, onChangeMessage, onSendMessage]);

  return (
    <div className="fixed bottom-6 right-6 z-50 justify-end ">
      <div className="z-50 flex flex-col items-end gap-y-4">
        {isShowChatBox && (
          <div
            className={clsx(
              'mr-7 flex w-96 flex-col overflow-x-hidden rounded-lg border border-gray-200 bg-white shadow-md',
              (!isShowFormContact || isSendingMessage) && 'h-96'
            )}
          >
            <div className="flex h-10 w-full items-center bg-secondary px-4">
              <p className="text-xs font-medium text-white lg:text-sm 2xl:text-base">Support Center</p>
            </div>
            {isSendingMessage && !isShowFormContact && (
              <div className="flex flex-1 flex-col items-center justify-center bg-white">
                <p className="text-2xs font-medium lg:text-xs 2xl:text-sm">Connecting to support center...</p>
                <Spinner size="xs" className="mt-1" />
              </div>
            )}
            {renderFormContact()}
            {renderListMessages()}
            {renderInputMessage()}
          </div>
        )}
        <button
          onClick={isShowChatBox ? onCloseChatBox : onOpenChatBox}
          className="flex aspect-square w-14 items-center justify-center rounded-full bg-primary"
        >
          {isShowChatBox ? <XMarkIcon /> : <PolicyChatIcon status="" fill="white" />}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
