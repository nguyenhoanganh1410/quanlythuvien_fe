import { FC } from 'react';
import useHomeValuationHooks from './hooks';
import Spinner from '@/components/LoadingPage/Spinner';

const HomeValuationPage: FC = () => {
  const {
    homeValuationData,
    listAddressSuggestions,
    isSearching,
    valueAddress,
    onTryAgain,
    onChangeAddress,
    onGoClarifi,
    onSelectAddress,
  } = useHomeValuationHooks();

  return (
    <div className="flex min-h-screen flex-col gap-y-6 bg-bgPage py-8">
      <div className="px-10">
        <h1 className="px-6 text-3.5xl font-semibold not-italic leading-[normal] tracking-[0.16px] text-secondary  sm:px-16 xl:px-0">
          Home Valuation
        </h1>
      </div>
      <div className="hidden h-[1px] w-full bg-borderGray xl:flex"></div>
      <div className="mt-6 w-full self-center px-6 sm:mt-8 sm:max-w-4xl sm:px-10 xl:mt-0 xl:max-w-5xl">
        <div className="flex flex-col overflow-hidden rounded-2xl ">
          <div className="flex h-16 w-full items-center justify-center bg-bgHeaderCard">
            <p className="font-Inter text-lg font-semibold text-secondary lg:text-xl 2xl:text-2xl">
              How much is my home worth?
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-10 bg-white/[34%] px-6 py-14 sm:px-0">
            <div className="text-center text-base font-normal text-secondary sm:text-start lg:text-lg 2xl:text-xl">
              Enter your address to <p className="inline-block font-bold">Clarifi</p> your home's estimated value
            </div>
            <div className="relative flex w-full items-center justify-center sm:w-1/2 xl:w-1/3">
              <input
                value={valueAddress}
                onChange={onChangeAddress}
                placeholder="Enter your home address"
                className="w-full rounded-full border-none bg-white px-6 py-3 text-xs font-normal text-secondary placeholder:text-lightGray2 focus:ring-0 lg:text-sm 2xl:text-base"
              />
              {listAddressSuggestions && listAddressSuggestions.length > 0 && (
                <div className="overflow absolute top-12 z-20 flex max-h-32 w-full flex-col overflow-y-auto overflow-x-hidden rounded-lg bg-white 2xl:top-14">
                  {listAddressSuggestions.map((item, index) => (
                    <button
                      onClick={onSelectAddress(item.display)}
                      key={item.display + index}
                      className="w-full bg-white px-6 py-1.5 text-start hover:bg-black/10"
                    >
                      <p className="text-xs lg:text-sm 2xl:text-base">{item.display}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              disabled={isSearching}
              onClick={homeValuationData && homeValuationData.price ? onTryAgain : onGoClarifi}
              className="relative flex h-10 w-28 items-center justify-center rounded-lg bg-primary font-Lato text-sm font-bold text-white lg:text-base 2xl:text-lg"
            >
              {isSearching ? (
                <Spinner size="xs" />
              ) : (
                <p>{homeValuationData && homeValuationData.price ? 'Try again' : 'Go Clarifi'}</p>
              )}
            </button>
            {homeValuationData && homeValuationData.price && (
              <p className="font-Inter text-lg font-semibold text-secondary lg:text-xl 2xl:text-2xl">
                Your home value is
              </p>
            )}
            {homeValuationData && homeValuationData.price && (
              <p className="font-DMSans text-2xl font-bold text-primary lg:text-3xl xl:text-4xl 2xl:text-5xl">
                ${homeValuationData.price.toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeValuationPage;
