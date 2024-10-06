import { icons } from '@/constants';
import { FC } from 'react';
import { useClarifyChatHooks } from './hooks';
import moment from 'moment';
import EndClarificationModal from '../EndClarificationModal';
import MessageItem from '../MessageItem';
import FeedbackModal from '../FeedbackModal';
import IdleQuestionModal from '../IdleQuestionModal';
import EditPolicyForm from '../EditPolicyForm';

interface IProps {
  componentConversationPdfRef: React.MutableRefObject<null>;
  onBack: () => void;
  onChangePagePdf: (page: number) => () => void;
  onPrintInvoicePdf: () => void;
}

const ClarifyChat: FC<IProps> = ({ componentConversationPdfRef, onChangePagePdf, onBack, onPrintInvoicePdf }) => {
  const {
    isShowIdleQuestionModal,
    selectedMessage,
    statusFeedback,
    isShowPopupFeedback,
    user,
    refListMessages,
    isTyping,
    currentPolicy,
    valueChat,
    isShowPopupEndClarifi,
    isEditingClaimNumber,
    valueClaimNumber,
    checkedDownload,
    isShowEditPolicyForm,
    onChangeValueClaimNumber,
    onSelectEditClaimNumber,
    onCloseEditClaimNumber,
    onshowPopupEndClarifi,
    onClosePopupEndClarifi,
    onChangeValueChat,
    onSend,
    onEndClarification,
    onSaveValueClaimNumber,
    onCheckedDownload,
    onThumbUpMessage,
    onThumbDownMessage,
    onClosePopupFeedback,
    onContinueAnswer,
    onRemoveAnswer,
    onShowEditPolicyForm,
    onCloseEditPolicyForm,
  } = useClarifyChatHooks({ onBack, onPrintInvoicePdf });

  return (
    <div className="no-scrollbar flex h-full max-w-full flex-1 flex-col border-l border-gray-200 bg-gray-50 md:max-w-[48%]">
      <div className="flex w-full flex-col space-y-3 border-b border-gray-200 bg-white px-4 py-4 md:flex-row md:space-y-0 md:border-t xl:px-6">
        <div className="flex w-full flex-row space-x-2 md:justify-between md:space-x-4 xl:space-x-8">
          {/* Name */}
          <div className="flex h-fit flex-1 flex-row space-x-2 md:space-x-4">
            <div className="flex h-fit w-fit items-center justify-center rounded-lg bg-primary/10 p-2">
              <img alt="pdf-type" src={icons.pdfType} className="h-4 w-4 md:h-6 md:w-6" />
            </div>
            <div className="flex flex-col">
              <p className="text-xs font-bold capitalize text-primary lg:text-sm 2xl:text-base">
                {currentPolicy?.firstName?.toLowerCase() + ' ' + currentPolicy?.lastName?.toLowerCase()}
              </p>
              <p className="text-3xs font-medium text-gray-400 lg:text-3xs 2xl:text-2xs">
                {moment(currentPolicy?.date).format('MMM DD, YYYY, HH:mm A')}
              </p>
              <p
                onClick={onShowEditPolicyForm}
                className="mt-2 w-fit cursor-pointer text-2xs font-medium text-primary lg:text-xs 2xl:text-sm"
              >
                Edit Policy
              </p>
            </div>
          </div>
          {/*  Provider and Address */}
          <div className="hidden flex-[0.5] flex-col md:flex">
            <p className="text-xs font-medium capitalize text-gray-500 lg:text-sm 2xl:text-base">
              {currentPolicy?.provider?.toLowerCase()}
            </p>
            <p className="text-3xs font-medium capitalize text-gray-400 lg:text-2xs 2xl:text-xs">
              {currentPolicy?.address?.full.toLowerCase()}
            </p>
          </div>
          {/* Policy Number  */}
          <div className="relative flex flex-1 flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-3">
            <div className="flex w-full flex-col items-center justify-start rounded-full  bg-primary/10 px-2 py-[6px] text-3xs font-bold text-primary sm:flex-row lg:text-2xs xl:text-xs">
              POLICY NUMBER: <p className="inline font-medium sm:mx-2">{currentPolicy?.policyNumber}</p>
            </div>
            <div className="relative flex w-full flex-col items-center justify-start rounded-full bg-gray-800/10 px-2 py-[6px] text-3xs font-bold text-gray-800 sm:flex-row lg:text-2xs xl:text-xs">
              CLAIM NUMBER: <p className="inline font-medium sm:mx-2">{currentPolicy?.claimNumber}</p>
              <button onClick={onSelectEditClaimNumber} className="ml-1">
                <img alt="pencil-fill" src={icons.pencilFill} className="h-2.5 w-2.5 md:h-3 md:w-3" />
              </button>
              {isEditingClaimNumber && (
                <div className="absolute left-0 right-0 top-8 z-30 flex flex-row rounded-lg border border-[#E5E7EB] bg-white p-2.5 shadow">
                  <input
                    value={valueClaimNumber}
                    onChange={onChangeValueClaimNumber}
                    className="h-8 w-full rounded-l border border-[#D1D5DB]  text-3xs font-medium text-[#6B7280] focus:border-[#D1D5DB] focus:outline-none focus:ring-0 lg:text-2xs xl:text-xs"
                  />
                  <button
                    onClick={onSaveValueClaimNumber}
                    className="rounded-r bg-primary px-2 text-3xs font-bold text-white lg:text-2xs xl:text-xs"
                  >
                    OK
                  </button>
                </div>
              )}
              {isEditingClaimNumber && <div onClick={onCloseEditClaimNumber} className="fixed inset-0" />}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between md:hidden">
          <p className="w-full text-xs font-medium capitalize text-gray-500">
            {currentPolicy?.provider?.toLowerCase()}
          </p>
          <p className="w-full text-2xs font-medium capitalize text-gray-400">
            {currentPolicy?.address?.full.toLowerCase()}
          </p>
        </div>
      </div>

      <div className="no-scrollbar mt-0.5 flex flex-1 flex-col-reverse overflow-y-scroll py-4">
        {isTyping && (
          <p className="mt-2 px-6 text-2xs font-medium text-primaryText lg:text-xs xl:text-sm">Clarifi is typing....</p>
        )}
        <div id="listMessages" className="flex flex-col-reverse" ref={componentConversationPdfRef}>
          {refListMessages.current &&
            refListMessages.current.map((message, index) => (
              <MessageItem
                key={message.id}
                message={message}
                index={index}
                user={user!}
                currentPolicy={currentPolicy!}
                isShowPopupEndClarifi={isShowPopupEndClarifi}
                onChangePagePdf={onChangePagePdf}
                onshowPopupEndClarifi={onshowPopupEndClarifi}
                onThumbDownMessage={onThumbDownMessage}
                onThumbUpMessage={onThumbUpMessage}
              />
            ))}
        </div>
      </div>
      <form onSubmit={onSend} className="flex w-full flex-row bg-white px-6 pt-4">
        <input
          disabled={isTyping}
          value={valueChat}
          onChange={onChangeValueChat}
          className="flex-1 rounded-md border border-gray-200  bg-[#F4F7FF] text-xs font-normal text-gray-800 lg:text-sm xl:text-base"
          placeholder="Type something here..."
        />
        <button disabled={isTyping} type="submit" className="ml-4 rounded-md bg-primary p-2.5">
          <img alt="send" src={icons.send} />
        </button>
      </form>
      <div className="flex justify-center p-2 text-2xs font-normal text-gray-400 xl:text-xs">
        Clarifi can make mistakes. Consider checking important information.{' '}
      </div>
      <EndClarificationModal
        open={isShowPopupEndClarifi}
        onClose={onClosePopupEndClarifi}
        onYes={onEndClarification}
        checkedDownload={checkedDownload}
        onCheckedDownload={onCheckedDownload}
      />
      <FeedbackModal
        message={selectedMessage!}
        statusFeedback={statusFeedback}
        open={isShowPopupFeedback}
        onClose={onClosePopupFeedback}
      />
      <IdleQuestionModal open={isShowIdleQuestionModal} onContinue={onContinueAnswer} onDelete={onRemoveAnswer} />
      <EditPolicyForm open={isShowEditPolicyForm} onClose={onCloseEditPolicyForm} currentPolicy={currentPolicy} />
    </div>
  );
};

export default ClarifyChat;
