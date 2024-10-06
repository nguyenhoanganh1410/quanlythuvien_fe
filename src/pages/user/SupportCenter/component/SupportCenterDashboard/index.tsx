import SearchIcon from '@/components/iconSvgs/SearchIcon';
import { IArticle } from '@/features/articles/interfaces';
import { SUPPORT_CENTER_DATA_01, SUPPORT_CENTER_DATA_02, useSupportCenterDashboardHooks } from './hooks';
interface IProps {
  onChangeTextSearch?: (arg0: string) => void;
  onSearchLeads?: () => void;
  listArticles?: IArticle[];
}
const SupportCenterDashboard = ({}: IProps) => {
  const {
    listArticles,
    currentArticles,
    listSearchArticles,
    selectedTypeArticle,
    onChangeSearchArticle,
    onChangeTypeArticle,
    navPromotedArticles,
  } = useSupportCenterDashboardHooks();

  function calculateTimeDifference(inputDateStr: string) {
    const providedDate = new Date(inputDateStr);
    const currentTime = new Date();
    const difference = currentTime.getTime() - providedDate.getTime();

    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;
    const oneMonth = 30.44 * oneDay;
    const oneYear = 365.24 * oneDay;

    const years = Math.floor(difference / oneYear);
    const months = Math.floor(difference / oneMonth);
    const weeks = Math.floor(difference / oneWeek);
    const days = Math.floor(difference / oneDay);
    const hours = Math.floor((difference % oneDay) / (60 * 60 * 1000));
    const mins = Math.floor((difference % (60 * 60 * 1000)) / (60 * 1000));
    const secs = Math.floor((difference % (60 * 1000)) / 1000);

    if (years > 0) {
      return `${years} year ago`;
    } else if (months > 0) {
      return `${months} month ago`;
    } else if (weeks > 0) {
      return `${weeks} week ago`;
    } else if (days > 0) {
      return `${days} day ago`;
    } else if (hours > 0) {
      return `${hours} hour ago`;
    } else if (mins > 0) {
      return `${mins} minute ago`;
    } else {
      return `${secs} second ago`;
    }
  }

  return (
    <div className="h-full w-full flex-row">
      <div className="z-10 w-full flex-row px-4 py-10 lg:px-32">
        <div className="flex flex-col">
          <p className="text-center text-[18px] font-bold text-orange-500 lg:text-[25px]">Clarifi Help Center</p>
          <p className="text-center text-[35px] font-bold leading-[50px] text-black lg:text-[50px]">How Can We Help?</p>
          <div className="mt-5 flex items-center justify-center sm:mt-10">
            <div className="relative w-full sm:w-[45%] md:w-[52%] lg:w-[65%] xl:w-[32%]">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                <SearchIcon />
              </div>
              <div>
                <input
                  onChange={onChangeSearchArticle}
                  type="search"
                  id="default-search"
                  className="w-full rounded-3xl border border-orange-500 bg-white p-3 ps-12 text-sm text-gray-900 focus:border-orange-500 focus:ring-orange-500"
                  placeholder="Search..."
                  required
                />
                {listSearchArticles && listSearchArticles.length > 0 && (
                  <div className="overflow absolute top-12 z-20 flex max-h-32 w-full flex-col overflow-y-auto overflow-x-hidden rounded-lg border border-solid bg-white 2xl:top-14">
                    {listSearchArticles.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => navPromotedArticles(item.type, item.id)}
                        className="w-full bg-white px-6 py-1.5 text-start hover:bg-black/10"
                      >
                        <div className="flex flex-col">
                          <p className=" text-sm font-bold lg:text-base">{item.type}</p>
                          <p className="text-xs lg:text-sm 2xl:text-base">{item.title}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-3">
            {SUPPORT_CENTER_DATA_01.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => onChangeTypeArticle(item.id)}
                  className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border border-orange-500 p-8 hover:opacity-50"
                >
                  <p className="text-[16px] font-bold text-orange-500 sm:text-[20px]">{item.title}</p>
                  <p className="text-center text-[13px] font-normal sm:text-[16px]">{item.content}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {SUPPORT_CENTER_DATA_02.map((item) => {
              return (
                <div
                  onClick={() => onChangeTypeArticle(item.id)}
                  key={item.id}
                  className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border border-orange-500 p-8 hover:opacity-50"
                >
                  <p className="text-[16px] font-bold text-orange-500 sm:text-[20px]">{item.title}</p>
                  <p className="text-center text-[13px] font-normal sm:text-[16px]">{item.content}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-12 text-[22px] font-bold text-orange-500">Promoted articles</p>
          <div className="mt-2 grid grid-cols-1 gap-x-10 sm:grid-cols-3">
            {currentArticles &&
              currentArticles.map((item) => (
                <div
                  key={item.id}
                  className="cursor-pointer border-b border-[#0000001A] py-4 text-[14px] sm:text-[16px]"
                  onClick={() => navPromotedArticles(selectedTypeArticle, item.id)}
                >
                  {item.title}{' '}
                </div>
              ))}
          </div>
          <p className="mt-12 text-center text-[22px] font-bold text-orange-500">Recent Activity</p>
          <div className="mb-10 mt-2 grid grid-cols-1 gap-x-10">
            {listArticles &&
              listArticles.map((item) => (
                <div key={item.id} className="border-b border-[#0000001A] py-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                    <div
                      className="flex cursor-pointer flex-col"
                      onClick={() => navPromotedArticles(selectedTypeArticle, item.id)}
                    >
                      <p className="text-[15px] font-bold sm:text-[18px]">{item.type}</p>
                      <p className="text-[13px] font-normal sm:text-[16px]">{item.title}</p>
                    </div>
                    <div className="flex items-end">
                      <div className="mr-4 text-[13px] font-bold sm:text-[16px]">
                        Article created {calculateTimeDifference(item.createdAt.toString())}
                      </div>
                      <div>
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M3.25 7.80004C3.25 6.58659 3.25 5.97987 3.48616 5.5164C3.69387 5.1087 4.02533 4.77725 4.43302 4.56953C4.89649 4.33337 5.50322 4.33337 6.71667 4.33337H19.2833C20.4968 4.33337 21.1036 4.33337 21.567 4.56953C21.9747 4.77725 22.3062 5.1087 22.5138 5.5164C22.75 5.97987 22.75 6.5866 22.75 7.80004V21.6667L19.1487 19.866C18.8757 19.7295 18.7392 19.6612 18.5961 19.6131C18.4691 19.5705 18.3383 19.5396 18.2056 19.521C18.0561 19.5 17.9035 19.5 17.5983 19.5H6.71667C5.50321 19.5 4.89649 19.5 4.43302 19.2639C4.02533 19.0562 3.69387 18.7247 3.48616 18.317C3.25 17.8536 3.25 17.2468 3.25 16.0334V7.80004Z"
                            stroke="#F26524"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <p className="ml-2 text-[13px] font-[500]  text-orange-500 sm:text-[16px]">
                        {item.feedbacksCount}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportCenterDashboard;
