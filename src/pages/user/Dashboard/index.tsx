import { icons } from '@/constants';
import React from 'react';
import EditQuestionModal from './components/EditQuestionModal';
import FilterModal from './components/FilterModal';
import './styles.scss';
import { useDashboardHooks } from './hooks';
import UploadFileStatusModal from './components/UploadFileStatusModal';
import { Popover } from 'react-tiny-popover';
import { LoadingPage } from '@/components';
import CreateQuestionModal from './components/CreateQuestionModal';
import Confetti from 'react-confetti';
import InboundEmail from './components/InboundEmail';
import PresetQuestions from './components/PresetQuestions';
import PolicyItem from './components/PolicyItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '@/components/LoadingPage/Spinner';
import InCorrectPdfModal from './components/InCorrectPdfModal';
import ConfirmPopups from '@/components/ConfirmPopups';
import DropdownSearch from '@/components/DropdownSearch';
import FileSizeAlertModal from './components/FileSizeAlertModal';
import AgreementModal from './components/AgreementModal';

export const DashboardPage: React.FC = () => {
  const {
    listPolicies,
    isLoadingQuestions,
    listQuestions,
    isLoadingUser,
    isLoadingPolicies,
    uploadFileStatus,
    searchValue,
    policiesData,
    isUploadingFile,
    inputFilePolicy,
    open,
    user,
    openCreateQuestionModal,
    openFilter,
    selectedQuestion,
    renderUserName,
    renderInboundPortalEmail,
    currentStep,
    steps,
    isShowPopupInCorrectPdf,
    isOpenConfirmPopup,
    policyId,
    listUserOptions,
    titleConfirmPopup,
    fileSizeAlertPopup,
    onCopyInboundMail,
    handleOpenFilterModal,
    handleCloseFilterModal,
    handleCloseQuestionModal,
    onSelectEditQuestion,
    onChangeValueNewPolicy,
    onSelectAddNewPolicy,
    onViewChat,
    onChangeSearchValue,
    handleCloseCreateQuestionModal,
    onAddPresetQuestion,
    onFetchMorePolicies,
    handleCloseInCorrectPdfModal,
    onCloseConfirmPopup,
    onDeletePolicy,
    handleDeletePolicy,
    handleDropdownSearch,
    handleDropdownSelect,
    handleDropdownRemove,
    handleCloseFileSizeAlertModal,
    // onCopyRefLink,
  } = useDashboardHooks();

  return (
    <div className="h-auto min-h-screen bg-bgPage py-[32px]">
      <div className="mb-6 flex flex-row items-center justify-end px-6 md:mb-10 xl:hidden">
        {user && user.isStaff && (
          <button
            onClick={onSelectAddNewPolicy}
            className="second-step-mobile ml-4 box-border h-[40px] w-[140px] rounded-lg border-[0.5px] border-solid border-primary bg-primary px-[10px] py-[10px] text-center font-Lato text-sm font-bold not-italic leading-5 text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:bg-buttonSecondary hover:text-primary"
          >
            + Add New Policy
            <input
              ref={inputFilePolicy}
              onChange={onChangeValueNewPolicy}
              type="file"
              accept=".pdf"
              className="hidden"
            />
          </button>
        )}
      </div>
      <div className="mb-4 flex flex-wrap justify-between px-6 xl:px-[60px]">
        <div>
          <h1 className="text-[32px] font-semibold not-italic leading-[normal] tracking-[0.16px] text-secondary">
            Dashboard
          </h1>
          <p className="font-Lato text-base font-semibold not-italic leading-[normal] text-[color:var(--gray-400,#9CA3AF)]">
            Welcome, {renderUserName}! 👋
          </p>
        </div>
        <div className="hidden items-center gap-5 xl:flex">
          {/* <div className="flex h-fit flex-wrap items-center justify-between gap-3 gap-y-4 rounded-[14px] border border-solid border-borderWhiteLight bg-bgBodyCard px-[24px] py-[10px]	">
            <h3 className="truncate text-sm font-semibold not-italic leading-[normal] tracking-[0.14px] text-secondary">
              {user?.refId}
            </h3>
            <button
              onClick={onCopyRefLink}
              className="rounded-[999px] border border-solid border-gray-300 bg-gray-300 p-[6px] text-[10px] font-semibold not-italic leading-4 tracking-[0.05px] text-gray-800 hover:border-black"
            >
              Copy Link
            </button>
          </div> */}
          <div className="relative">
            <input
              value={searchValue}
              onChange={onChangeSearchValue}
              type="text"
              className="input-search h-[48px]  rounded-[55px] border-none bg-white pl-[40px] shadow-[0px_2px_20px_0px_rgba(0,0,0,0.05)] focus:border-none focus:border-current focus:outline-none focus:ring-0 active:outline-none md:w-[360px]"
              placeholder="Search for anything..."
            />
            <div className="absolute inset-y-0 left-[10px] top-[15px] flex h-fit items-center pr-3">
              <img src={icons.searchInput} alt="search-input" />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden h-[1px] w-full bg-borderGray xl:flex" />
      <div className="mt-6 hidden items-center justify-between px-[40px] text-center text-secondary xl:flex">
        <p className="text-[22px] font-medium not-italic leading-[normal] tracking-[0.22px]">Overview</p>
        {user && user.isStaff && (
          <button
            onClick={onSelectAddNewPolicy}
            className="second-step ml-4 box-border h-[40px] w-[140px] rounded-lg border-[0.5px] border-solid border-primary bg-primary px-[10px] py-[10px] text-center font-Lato text-sm font-bold not-italic leading-5 text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:bg-buttonSecondary hover:text-primary"
          >
            + Add New Policy
            <input
              ref={inputFilePolicy}
              onChange={onChangeValueNewPolicy}
              type="file"
              accept=".pdf"
              className="hidden"
            />
          </button>
        )}
      </div>
      {user && !user.isStaff && (
        <div className="grid grid-cols-5 gap-16 px-[24px]">
          <div className="col-span-3"></div>
          <div className="col-span-2">
            <DropdownSearch
              options={listUserOptions}
              onSearch={handleDropdownSearch}
              onSelect={handleDropdownSelect}
              onRemove={handleDropdownRemove}
            />
          </div>
        </div>
      )}
      <div className="mt-4 grid grid-cols-1 gap-6 p-6 md:grid-cols-7 md:gap-16 lg:grid-cols-5">
        <div className="md:col-span-4 lg:col-span-3">
          {/* All Policies */}
          <div className="rounded-[14px]">
            <div
              className={`flex h-[65px] items-center justify-between ${
                policiesData && policiesData.totalCount > 0 ? 'rounded-[14px_14px_0px_0px]' : 'rounded-[14px]'
              }  border border-solid border-borderWhiteLight bg-bgHeaderCard  px-6 py-[18px] text-center`}
            >
              <div className="justify-starts flex items-center">
                <img src={icons.policy} alt="policy" />
                <div className="ml-2 text-left">
                  <h3 className="text-sm font-semibold not-italic leading-[normal] tracking-[0.18px] text-secondary xl:text-lg">
                    All Policies
                  </h3>
                  <p className="text-[10px] font-medium not-italic leading-[normal] tracking-[0.1px] text-gray-400">
                    {policiesData?.totalCount ?? 0} policies
                  </p>
                </div>
              </div>
              <Popover
                onClickOutside={handleCloseFilterModal}
                isOpen={openFilter}
                align="end"
                positions={['bottom']}
                content={<FilterModal onClose={handleCloseFilterModal} />}
              >
                <div className="relative">
                  <button
                    onClick={handleOpenFilterModal}
                    className="four-step relative z-20 flex h-[22px] w-[58px] justify-evenly rounded-[999px] border border-solid border-gray-300 bg-gray-300 p-[3px] text-[10px] font-semibold not-italic tracking-[0.05px] text-gray-800 hover:border-black"
                  >
                    <img src={icons.filter} alt="filter" />
                    Filter
                  </button>
                  {openFilter && (
                    <div onClick={handleCloseFilterModal} className="fixed inset-0 bg-black bg-opacity-70" />
                  )}
                </div>
              </Popover>
            </div>
            {policiesData && listPolicies.length > 0 && (
              <div
                id="scrollablePolicies"
                className="max-h-[652px] overflow-y-auto rounded-[0px_0px_14px_14px] border-b border-l border-r border-solid border-x-borderWhiteLight border-b-borderWhiteLight"
              >
                <InfiniteScroll
                  className="no-scrollbar"
                  scrollThreshold={1}
                  dataLength={listPolicies.length}
                  next={onFetchMorePolicies}
                  hasMore={listPolicies.length < policiesData.totalCount}
                  loader={
                    <div className="flex w-full items-center justify-center bg-white">
                      <Spinner className="" />
                    </div>
                  }
                  scrollableTarget="scrollablePolicies"
                >
                  {listPolicies.map((policy, index) => {
                    return (
                      <PolicyItem
                        key={policy.id}
                        policy={policy}
                        index={index}
                        onViewChat={onViewChat}
                        onDeletePolicy={onDeletePolicy}
                      />
                    );
                  })}
                </InfiniteScroll>
              </div>
            )}
          </div>
        </div>
        <div className="md:col-span-3 lg:col-span-2">
          {/* <InboundEmail portalEmail={renderInboundPortalEmail} onClickCopy={onCopyInboundMail} /> */}
          <PresetQuestions
            listQuestions={listQuestions}
            onAddPresetQuestion={onAddPresetQuestion}
            onSelectEditQuestion={onSelectEditQuestion}
          />
        </div>
      </div>
      {((isLoadingPolicies && listPolicies.length <= 0) || isLoadingUser || isLoadingQuestions) && <LoadingPage />}
      <InCorrectPdfModal onClose={handleCloseInCorrectPdfModal} open={isShowPopupInCorrectPdf} />
      <UploadFileStatusModal status={uploadFileStatus} open={isUploadingFile} />
      <EditQuestionModal open={open} onClose={handleCloseQuestionModal} question={selectedQuestion} />
      <CreateQuestionModal open={openCreateQuestionModal} onClose={handleCloseCreateQuestionModal} />
      <ConfirmPopups
        open={isOpenConfirmPopup}
        onClose={onCloseConfirmPopup}
        onConfirm={handleDeletePolicy(policyId)}
        title={titleConfirmPopup}
      />
      <FileSizeAlertModal onClose={handleCloseFileSizeAlertModal} open={fileSizeAlertPopup} />
      <AgreementModal onClose={handleCloseFileSizeAlertModal} open={fileSizeAlertPopup} />
      {currentStep === steps.length - 1 && (
        <div className="fixed inset-0 z-50">
          <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={400} />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
