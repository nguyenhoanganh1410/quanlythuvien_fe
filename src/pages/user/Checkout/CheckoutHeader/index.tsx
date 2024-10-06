import { FC, useCallback } from 'react';
import { CHECKOUT_VALUES, useCheckoutHeader } from './hooks';

interface IProps {}

const CheckoutHeader: FC<IProps> = () => {
  const { checkOutStep } = useCheckoutHeader();

  const renderProgressView = useCallback(() => {
    return (
      <ul
        aria-label="Steps"
        className="flex h-12 w-full max-w-[600px] items-center font-normal uppercase text-gray-600 md:h-full"
      >
        {checkOutStep !== 0 && (
          <>
            <>
              {CHECKOUT_VALUES.map((item: string, idx: number) => (
                <li
                  key={item}
                  aria-current={checkOutStep == idx + 1 ? 'step' : false}
                  className="flex flex-1 flex-col gap-x-0"
                >
                  <div className="flex flex-1 flex-row items-center">
                    <hr
                      className={`block w-full border ${
                        idx == 0 ? 'border-none' : '' || checkOutStep >= idx + 1 ? 'border-orange-500' : ''
                      }`}
                    />
                    <div
                      className={`flex h-4 w-4 flex-none items-center justify-center rounded-full border-2 ${
                        checkOutStep > idx + 1
                          ? 'border-orange-500 bg-orange-500'
                          : '' || checkOutStep == idx + 1
                          ? 'border-orange-500'
                          : ''
                      }`}
                    >
                      <span
                        className={`h-2.5 w-2.5 rounded-full text-orange-500 ${
                          checkOutStep != idx + 1 ? 'hidden' : ''
                        }`}
                      ></span>
                      {checkOutStep > idx + 1 ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-5 w-5 text-white"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      ) : (
                        ''
                      )}
                    </div>
                    <hr
                      className={`h-auto w-full border ${
                        idx + 1 == CHECKOUT_VALUES.length
                          ? 'border-none'
                          : '' || checkOutStep > idx + 1
                          ? 'border-orange-500'
                          : ''
                      }`}
                    />
                  </div>
                  <div className="mt-3 flex h-auto items-center justify-center">
                    <span className={`text-2xs font-normal ${checkOutStep == idx + 1 ? 'text-orange-500' : ''}`}>
                      {item}
                    </span>
                  </div>
                </li>
              ))}
            </>
          </>
        )}
      </ul>
    );
  }, [checkOutStep]);

  return (
    <div className="flex flex-col">
      <div className="flex h-12 w-full items-center justify-start overflow-hidden border-b-2 border-gray-200 md:h-20">
        <div className="mx-auto flex w-full max-w-[80%] justify-start gap-x-36">
          <div className="font-Inter text-2xl font-semibold text-slate-700 md:text-3xl">Checkout</div>
          <div className="hidden w-full md:flex">{renderProgressView()}</div>
        </div>
      </div>
      {checkOutStep !== 0 && <div className="my-6 flex flex-row md:hidden">{renderProgressView()}</div>}
    </div>
  );
};
export default CheckoutHeader;
