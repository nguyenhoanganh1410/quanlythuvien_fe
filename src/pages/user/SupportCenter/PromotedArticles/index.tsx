import AvatarIcon from '@/components/iconSvgs/AvatarIcon';
import SearchIcon from '@/components/iconSvgs/SearchIcon';
import RequestModal from '../component/RequestModal';
import { usePromotedArticlesHooks } from './hook';
import clsx from 'clsx';
import moment from 'moment';
interface IProps {}
const PromotedArticlesPage = ({}: IProps) => {
  const {
    getFullName,
    currentArticles,
    listSearchArticles,
    selectedArticle,
    getTitleArticle,
    isShowRequestModal,
    uerArticleHelpful,
    isSelectedArticle,
    onChangeSearchArticle,
    navPromotedArticles,
    goToSupportCenter,
    onClickRequestModel,
    onChangeSelectedArticle,
    handleCloseRequestModal,
    onSendHelpful,
  } = usePromotedArticlesHooks({});

  return (
    <>
      <div className="h-auto min-h-screen">
        <div className="z-10 w-full flex-row px-4 py-10 lg:px-32">
          <div className="flex flex-col">
            <div className="mt-10 flex flex-col items-center justify-between gap-5 sm:flex-row">
              <div className="flex items-center gap-1 lg:gap-3">
                <p
                  onClick={goToSupportCenter}
                  className="cursor-pointer text-xs font-medium hover:text-orange-500 sm:text-base"
                >
                  Clarifi Support{' '}
                </p>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.75 4.5L11.25 9L6.75 13.5"
                    stroke="#F26524"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-[12px] font-[500] sm:text-[16px]">{selectedArticle?.type} </p>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.75 4.5L11.25 9L6.75 13.5"
                    stroke="#F26524"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-[12px] font-[500] sm:text-[16px]">{getTitleArticle}</p>
              </div>
              <div className="relative w-full sm:w-auto">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                  <SearchIcon />
                </div>
                <input
                  type="search"
                  onChange={onChangeSearchArticle}
                  id="default-search"
                  className=" w-full rounded-3xl border border-orange-500 bg-white p-3 ps-12 text-sm text-gray-900 focus:border-orange-500 focus:ring-orange-500 sm:w-fit md:w-[500px]"
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
            <div className="mt-10 gap-10 sm:mt-20 sm:grid sm:grid-flow-col sm:grid-cols-3">
              <div className="col-span-1 mb-12 sm:mb-0">
                <p className="text-[20px] font-bold text-orange-500">Articles in this section</p>
                {currentArticles &&
                  currentArticles.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => onChangeSelectedArticle(item)}
                      className={clsx(
                        'mt-4 cursor-pointer text-base font-normal hover:text-orange-500',
                        isSelectedArticle(item.id) ? 'font-extrabold text-primary underline' : ''
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {isSelectedArticle(item.id) && (
                          <>
                            <svg
                              width="20"
                              height="19"
                              viewBox="0 0 20 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.7455 19C6.16734 19 2.44206 15.2846 2.44206 10.7186C2.44206 6.15257 6.16734 2.43714 10.7455 2.43714C13.3477 2.43714 15.7783 3.64764 17.3497 5.70226L18.4711 5.18578C16.6813 2.69699 13.8428 1.23148 10.7471 1.23148C5.57667 1.23148 1.35619 5.36655 1.23644 10.4926C1.2332 10.6169 1.13287 10.7186 1.00826 10.7186H0.229869C0.102024 10.7186 -0.00316381 10.6137 7.27481e-05 10.4862C0.12468 4.68221 4.89699 0 10.7455 0C14.5015 0 17.9209 1.90775 19.8985 5.10508C19.9535 5.19385 19.9923 5.29553 19.9988 5.40044C20.015 5.66514 19.8677 5.89917 19.6411 6.00408L17.4014 7.03381C17.1263 7.1597 16.7978 7.06932 16.6295 6.81592C15.3106 4.84523 13.1098 3.66862 10.7438 3.66862C6.8454 3.66862 3.67519 6.83206 3.67519 10.7186C3.67519 14.6051 6.84702 17.7685 10.7438 17.7685C12.8654 17.7685 14.8543 16.8211 16.1942 15.2039L15.0501 14.6777C13.838 15.9899 12.1113 16.6807 10.2891 16.5435C7.39562 16.3256 5.07015 13.9659 4.89537 11.0785C4.68985 7.69232 7.39238 4.87266 10.7438 4.87266C11.8087 4.87266 12.8525 5.16157 13.7619 5.70872C14.0192 5.86366 14.1309 6.17839 14.0241 6.45923L13.1292 8.79307C13.0871 8.90443 13.0175 9.00773 12.9204 9.07713C12.6793 9.25306 12.3637 9.23208 12.1501 9.05454C11.5271 8.52999 10.6322 8.37988 9.83598 8.73981C9.11423 9.06583 8.62227 9.77761 8.56887 10.5669C8.4831 11.8338 9.49129 12.8926 10.7438 12.8926C11.1889 12.8926 11.6242 12.7571 11.9867 12.5053C12.0838 12.4391 12.2149 12.4568 12.2893 12.5456L12.791 13.1396C12.8767 13.2413 12.8589 13.3962 12.7505 13.4737C12.1695 13.8949 11.4656 14.1241 10.7422 14.1241C8.85854 14.1241 7.32765 12.5957 7.32765 10.7186C7.32765 8.84149 8.86016 7.31303 10.7422 7.31303C11.2649 7.31303 11.7779 7.43247 12.2407 7.65843L12.6744 6.52863C12.0708 6.25102 11.4122 6.10576 10.7422 6.10576C8.10928 6.10576 5.98448 8.31048 6.12365 10.9655C6.24664 13.3058 8.16754 15.2136 10.5157 15.3249C12.0385 15.3976 13.469 14.7358 14.4012 13.5366C14.5743 13.3139 14.8834 13.2477 15.1391 13.3655L17.3804 14.3953C17.4791 14.4405 17.5697 14.505 17.6345 14.5922C17.7963 14.8101 17.7963 15.0941 17.6539 15.3056C16.1052 17.62 13.5208 19 10.7422 19H10.7455Z"
                                fill="url(#paint0_linear_2441_5305)"
                              />
                              <defs>
                                <linearGradient
                                  id="paint0_linear_2441_5305"
                                  x1="17.8571"
                                  y1="2.92308"
                                  x2="2.26051"
                                  y2="18.6443"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stopColor="#F9A01B" />
                                  <stop offset="1" stopColor="#F26524" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </>
                        )}

                        {item.title}
                      </div>
                    </div>
                  ))}
              </div>
              <div className="col-span-3">
                <p className="text-[25px] font-bold leading-[32px] sm:text-[32px]">{selectedArticle?.title}</p>
                <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AvatarIcon />
                    <div className="flex flex-col">
                      <p className="text-[16px] font-bold">{getFullName}</p>
                      <p className="text-[16px] font-normal text-gray-400">
                        {moment(selectedArticle?.createdAt).calendar()} · Updated
                      </p>
                    </div>
                  </div>
                  <button className="relative my-2 w-[92px] rounded-lg border border-primary bg-primary py-2 text-[12px] font-normal text-white">
                    Contact Us
                  </button>
                </div>
                <div className="mt-8 h-auto w-full border-l-4 border-l-orange-500 bg-[#F265241A] p-5">
                  <p className="text-[16px] font-bold">Note:</p>
                  <p className="text-start text-[14px] font-normal sm:text-[16px]">
                    If you are an existing Sideline subscriber, you can transfer your number and existing calls and
                    message history to Clarifi upon downloading and logging into Clarifi using your Sideline
                    information. There's no need to create a new account (which would cause you to lose your calls and
                    messages).
                  </p>
                </div>
                {selectedArticle && (
                  <div className="mt-4" id="word_html">
                    <div dangerouslySetInnerHTML={{ __html: selectedArticle?.content }} />
                  </div>
                )}

                <div className="mt-8 w-full border-y-2 border-y-gray-200 p-8">
                  <p className="text-center text-[16px] font-[500]">Was this article helpful?</p>
                  <div className="flex justify-center gap-3 ">
                    {uerArticleHelpful?.userHelpfulVote && uerArticleHelpful.userHelpfulVote.length > 0 ? (
                      <>
                        {uerArticleHelpful.userHelpfulVote[0]?.isHelpful ? (
                          <button
                            onClick={() => onSendHelpful(currentArticles[0]?.id, false)}
                            className="relative my-2 w-[92px] rounded-lg border border-primary bg-white py-2 text-[12px] font-[500] text-primary"
                          >
                            No
                          </button>
                        ) : (
                          <button
                            onClick={() => onSendHelpful(currentArticles[0]?.id, true)}
                            className="relative my-2 w-[92px] rounded-lg border border-primary bg-white py-2 text-[12px] font-[500] text-primary"
                          >
                            Yes
                          </button>
                        )}
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => onSendHelpful(currentArticles[0]?.id, true)}
                          className="relative my-2 w-[92px] rounded-lg border border-primary bg-white py-2 text-[12px] font-[500] text-primary"
                        >
                          Yes
                        </button>{' '}
                        <button
                          onClick={() => onSendHelpful(currentArticles[0]?.id, false)}
                          className="relative my-2 w-[92px] rounded-lg border border-primary bg-white py-2 text-[12px] font-[500] text-primary"
                        >
                          No
                        </button>
                      </>
                    )}
                  </div>
                  <p className="text-center text-[16px] font-[500]">
                    {uerArticleHelpful?.totalVotes} out of {uerArticleHelpful?.helpfulVotes} found this helpful
                  </p>
                  <p className="mt-4 text-center text-[16px] font-[500]">
                    Have more questions?{' '}
                    <span className="cursor-pointer text-primary" onClick={onClickRequestModel}>
                      {' '}
                      Submit a request
                    </span>
                  </p>
                </div>
                <p className="mt-8 text-[20px] font-bold text-orange-500">Articles in this section</p>
                <div className="mb-10 mt-2 grid grid-flow-col grid-cols-1 gap-x-10 sm:grid-cols-2">
                  <div className="col-span-1">
                    {currentArticles &&
                      currentArticles.map((item) => (
                        <div key={item.id} className="border-b border-[#0000001A] py-4 ">
                          <div className="flex justify-between">
                            <div className="flex flex-col">
                              <p className="text-[14px] font-normal sm:text-[16px]">{item.title}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RequestModal articleId={selectedArticle?.id} onClose={handleCloseRequestModal} open={isShowRequestModal} />
    </>
  );
};

export default PromotedArticlesPage;
