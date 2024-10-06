import AIResponseHeader from './AIResponseHeader';
import { useAIResponseHooks } from './hooks';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '@/components/LoadingPage/Spinner';
import AIResponseItem from './AIResponseItem';
import { icons } from '@/constants';

const AIResponsePage: React.FC = () => {
  const { searchValue, onChangeSearchValue, onFetchMoreMessages, listMessages, messagesData } = useAIResponseHooks();

  return (
    <div className="h-auto min-h-screen bg-bgPage py-8">
      <AIResponseHeader searchValue={searchValue} onChangeSearchValue={onChangeSearchValue} />
      <div className="h-[1px] w-full bg-borderGray"></div>
      <div className="border-1 flex h-full w-full flex-col rounded-2xl border-solid border-gray-300 p-14">
        <div className="w-full">
          <div className="rounded-[14px]">
            <div
              className={`flex h-[65px] items-center justify-between ${'rounded-[14px]'}  border border-solid border-borderWhiteLight bg-bgHeaderCard px-[24px] py-[18px] text-center`}
            >
              <div className="justify-starts flex items-center">
                <img src={icons.policy} alt="policy" />
                <div className="ml-2 text-left">
                  <h3 className="text-lg font-semibold not-italic leading-[normal] tracking-[0.18px] text-secondary">
                    All Response
                  </h3>
                  <p className="text-[10px] font-medium not-italic leading-[normal] tracking-[0.1px] text-gray-400">
                    {messagesData?.totalCount ?? 0} response
                  </p>
                </div>
              </div>
            </div>
            {messagesData && listMessages.length > 0 && (
              <div
                id="scrollableMessages"
                className="max-h-[652px] overflow-y-auto rounded-[0px_0px_14px_14px] border-b border-l border-r border-solid border-x-borderWhiteLight border-b-borderWhiteLight"
              >
                <InfiniteScroll
                  className="no-scrollbar"
                  dataLength={listMessages.length}
                  next={onFetchMoreMessages}
                  hasMore={listMessages.length < messagesData.totalCount}
                  loader={
                    <div className="flex w-full items-center justify-center bg-white">
                      <Spinner className="" />
                    </div>
                  }
                  scrollableTarget="scrollableMessages"
                >
                  {listMessages.map((mes, index) => {
                    return <AIResponseItem key={mes.id} mess={mes} index={index} />;
                  })}
                </InfiniteScroll>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AIResponsePage;
