import { FC } from 'react';
import HeaderChat from './Header';
import { useChatPageHooks } from './hooks';
import ClarifyChat from './ClarifyChat';
import PreviewPdf from './PreviewPdf';
import { LoadingPage } from '@/components';
import { EPolicyStatus } from '@/constants/enum';
import ContinueClarificationModal from './ContinueClarificationModal';
import clsx from 'clsx';
import HomeValuationModal from './HomeValuationModal';
import EmailView from './EmailView';
import ShareEmailPolicyModal from './ShareEmailPolicyModal';

const ChatPage: FC = () => {
  const {
    isShowShareEmailModal,
    isShowHomeValuationModal,
    currentPolicy,
    isLoadingCurrentPolicy,
    indexTab,
    pagePdf,
    indexTabMobile,
    componentConversationPdfRef,
    onSelectTab,
    onSelectTabMobile,
    onBack,
    onContinueClarifi,
    onCloseContinueClarifi,
    onChangePagePdf,
    onPrintInvoicePdf,
    onClickHomeValuationIcon,
    onCloseHomeValuationModal,
    onClickShareIcon,
    onCloseShareEmailModal,
  } = useChatPageHooks();

  return (
    <div className="h-full w-full bg-white">
      <HeaderChat
        onClickHomeValuationIcon={onClickHomeValuationIcon}
        indexTab={indexTab}
        onPrintInvoicePdf={onPrintInvoicePdf}
        onSelectTab={onSelectTab}
        onBack={onBack}
        onClickShareIcon={onClickShareIcon}
      />
      {indexTab === 0 && (
        <div className="flex h-12 flex-row items-center justify-between bg-lightWhite md:hidden">
          <button
            onClick={onSelectTabMobile(0)}
            className={clsx(
              'h-full w-full border-b  text-base ',
              indexTabMobile === 0
                ? 'border-b-primary font-medium text-primary'
                : 'border-b-gray-200 font-normal text-gray-400'
            )}
          >
            Start Clarifying!
          </button>
          <button
            onClick={onSelectTabMobile(1)}
            className={clsx(
              'h-full w-full border-b  text-base ',
              indexTabMobile === 1
                ? 'border-b-primary font-medium text-primary'
                : 'border-b-gray-200 font-normal text-gray-400'
            )}
          >
            Document view
          </button>
        </div>
      )}
      {isLoadingCurrentPolicy ? (
        <LoadingPage />
      ) : indexTab === 0 ? (
        <div className="flex h-[calc(100dvh-128px)] w-full flex-row overflow-y-hidden md:h-[calc(100dvh-64px)]">
          <div className="hidden w-full flex-row md:flex">
            <PreviewPdf currentPageNumber={pagePdf} />
            <ClarifyChat
              componentConversationPdfRef={componentConversationPdfRef}
              onPrintInvoicePdf={onPrintInvoicePdf}
              onBack={onBack}
              onChangePagePdf={onChangePagePdf}
            />
          </div>
          <div className="h-full w-full md:hidden">
            {indexTabMobile === 0 ? (
              <ClarifyChat
                componentConversationPdfRef={componentConversationPdfRef}
                onPrintInvoicePdf={onPrintInvoicePdf}
                onBack={onBack}
                onChangePagePdf={onChangePagePdf}
              />
            ) : (
              <PreviewPdf currentPageNumber={pagePdf} />
            )}
          </div>
        </div>
      ) : (
        <div className="flex h-[calc(100dvh-128px)] w-full flex-row overflow-hidden md:h-[calc(100dvh-64px)]">
          <EmailView currentPolicy={currentPolicy!} />
        </div>
      )}
      {currentPolicy && currentPolicy.status === EPolicyStatus.CLARIFIED && !isLoadingCurrentPolicy && (
        <ContinueClarificationModal open={true} onClose={onCloseContinueClarifi} onYes={onContinueClarifi} />
      )}
      {isShowHomeValuationModal && currentPolicy && (
        <HomeValuationModal
          homeValuations={currentPolicy.homeValues ?? []}
          open={isShowHomeValuationModal}
          onClose={onCloseHomeValuationModal}
        />
      )}
      {isShowShareEmailModal && currentPolicy && (
        <ShareEmailPolicyModal
          currentPolicy={currentPolicy}
          open={isShowShareEmailModal}
          onClose={onCloseShareEmailModal}
        />
      )}
    </div>
  );
};

export default ChatPage;
