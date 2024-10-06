import ProjectResponseHeader from './components/ProjectResponseHeader';
import { useProjectResponseHooks } from './hooks';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '@/components/LoadingPage/Spinner';
import ProjectResponseItem from './components/ProjectResponseItem';
import { icons } from '@/constants';

const ProjectResponsePage: React.FC = () => {
  const { searchValue, onChangeSearchValue, onFetchMoreFeekbacks, listFeekbacks, feedbacksData } =
    useProjectResponseHooks();

  return (
    <div className="h-auto min-h-screen bg-bgPage py-8">
      <ProjectResponseHeader searchValue={searchValue} onChangeSearchValue={onChangeSearchValue} />
      <div className="h-[1px] w-full bg-borderGray"></div>
      <div className=" border-1 flex h-full w-full flex-col rounded-2xl border-solid border-gray-300 p-14">
        <div className="w-full">
          {/* All Policies */}
          <div className="rounded-[14px]">
            <div
              className={`flex h-[65px] items-center justify-between ${
                feedbacksData && feedbacksData.totalCount > 0 ? 'rounded-[14px_14px_0px_0px]' : 'rounded-[14px]'
              }  border border-solid border-borderWhiteLight bg-bgHeaderCard px-[24px] py-[18px] text-center`}
            >
              <div className="justify-starts flex items-center">
                <img src={icons.policy} alt="policy" />
                <div className="ml-2 text-left">
                  <h3 className="text-lg font-semibold not-italic leading-[normal] tracking-[0.18px] text-secondary">
                    All Response
                  </h3>
                  <p className="text-[10px] font-medium not-italic leading-[normal] tracking-[0.1px] text-gray-400">
                    {feedbacksData?.totalCount ?? 0} response
                  </p>
                </div>
              </div>
            </div>
            {listFeekbacks.length > 0 && (
              <div
                id="scrollablePolicies"
                className="no-scrollbar h-[auto] max-h-[750px] overflow-y-auto rounded-[0px_0px_14px_14px] border-b border-l border-r border-solid border-x-borderWhiteLight border-b-borderWhiteLight"
              >
                <InfiniteScroll
                  className="h-auto max-h-[750px]"
                  scrollThreshold={1}
                  dataLength={listFeekbacks.length}
                  next={onFetchMoreFeekbacks}
                  hasMore={listFeekbacks.length < feedbacksData!.totalCount}
                  loader={
                    <div className="flex w-full items-center justify-center bg-white">
                      <Spinner className="" />
                    </div>
                  }
                  scrollableTarget="scrollablePolicies"
                >
                  {listFeekbacks.map((feedback, index) => {
                    return <ProjectResponseItem key={feedback.id} feedback={feedback} index={index} />;
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
export default ProjectResponsePage;
