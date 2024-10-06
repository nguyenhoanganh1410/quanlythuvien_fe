import { FC } from 'react';
import { useBillingDetailsHooks } from './hooks';
import React from 'react';
import moment from 'moment';

interface IProps {
  isReviewOrder?: boolean;
}

const BillingDetails: FC<IProps> = ({ isReviewOrder }: IProps) => {
  const { isValidPromoCode, seats, onClickEdit } = useBillingDetailsHooks();

  return (
    <div className="flex flex-col items-end gap-4 lg:gap-8 2xl:gap-12">
      <div className="flex w-full flex-col border border-gray-200">
        {isReviewOrder && (
          <div className="flex flex-col">
            <div className="inline-flex h-9 items-center justify-start border-b border-gray-200 bg-slate-50 p-3">
              <div className="font-Inter text-xs font-semibold text-slate-600">Billing Details</div>
            </div>
            <div className="flex flex-col gap-4 px-3 py-6">
              <div className="flex flex-col gap-1">
                <div className="font-Inter text-xs font-semibold text-slate-600">Billing Cycle</div>
                <div className="h-3.5 text-xs font-normal text-gray-500">Billed annually</div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="font-Inter text-xs font-semibold text-slate-600">Commitment Term</div>
                <div className="h-3.5 text-xs font-normal text-gray-500">12 month commitment</div>
                <div className="mt-1 h-3.5 text-xs font-normal text-gray-500">
                  {moment().format('ll')} - {moment().add(1, 'years').format('ll')}
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          className={`${
            isReviewOrder ? 'border-t' : ''
          } inline-flex h-9 items-center justify-between border-b border-gray-200 bg-slate-50 p-3`}
        >
          <div className="font-Inter text-xs font-semibold text-slate-600">Products</div>
          <div className="flex cursor-pointer items-center justify-center rounded bg-slate-600 px-3 py-1 hover:opacity-75">
            <div onClick={onClickEdit} className="text-center font-Inter text-xs font-semibold text-white">
              Edit
            </div>
          </div>
        </div>

        <div className="flex flex-col px-3 py-6">
          <div className="flex items-center justify-between gap-1">
            <div className="font-Inter text-xs font-semibold text-slate-600">Sign Up Today</div>
            <div className="text-xs font-normal text-gray-500">${seats.price}</div>
          </div>
          {isValidPromoCode && (
            <div className="my-1.5 flex items-center justify-between">
              <div className="font-Inter text-xs font-semibold text-orange-500">Annual payment discount (15%)</div>
              <div className="text-right font-Inter text-xs font-semibold text-orange-500">-$22.35</div>
            </div>
          )}

          {isValidPromoCode && (
            <div className="flex items-center justify-between gap-1">
              <div className="font-Inter font-semibold text-orange-500"></div>
              <div className="text-right font-Inter text-xs font-semibold text-slate-600">${seats.priceDiscount}</div>
            </div>
          )}
          {/* <div className="ml-6 mt-6 flex flex-col gap-2">
            <div className="font-Inter text-xs font-semibold text-gray-500">Includes:</div>
            <div className="font-Inter text-xs font-normal text-gray-500">
              Marketing Hub Starter (Includes 1,ooo Marketing Contacts)
            </div>

            <div className="font-Inter text-xs font-normal text-gray-500">Sales Hub Starter</div>

            <div className="font-Inter text-xs font-normal text-gray-500">Service Hub Starter</div>

            <div className="font-Inter text-xs font-normal text-gray-500">Content Hub Starter</div>

            <div className="font-Inter text-xs font-normal text-gray-500">Operations Hub Starter</div>

            <div className="font-Inter text-xs font-normal text-gray-500">1 Core Seat</div>
          </div> */}
        </div>

        {/* <div className="flex flex-col border-b border-t border-gray-200 px-3 py-6">
          <div className="flex items-center justify-between gap-1">
            <div className="font-Inter text-xs font-semibold text-slate-600">1 Additional Core Seat (Starter)</div>
            <div className="text-xs font-normal text-gray-500">${seats.price}</div>
          </div>
          <div className="my-1.5 flex items-center justify-between">
            <div className="font-Inter text-xs font-semibold text-orange-500">Annual payment discount (15%)</div>
            <div className="text-right font-Inter text-xs font-semibold text-orange-500">-$22.35</div>
          </div>
          <div className="flex items-center justify-between gap-1">
            <div className="font-Inter font-semibold text-orange-500"></div>
            <div className="text-right font-Inter text-xs font-semibold text-slate-600">$126.65</div>
          </div>
        </div> */}

        {/* <div className="flex flex-col px-3 py-6">
          <div className="flex flex-col gap-1">
            <div className="font-Inter text-xs font-semibold text-slate-600">Total Seats</div>
            <div className="h-3.5 text-xs font-normal text-gray-500">2 Core Seats (Starter)</div>
          </div>
        </div> */}

        <div className="inline-flex h-9 items-center justify-start border-b border-t border-gray-200 bg-slate-50 p-3">
          <div className="font-Inter text-xs font-semibold text-slate-600">Summary</div>
        </div>

        {!isReviewOrder && (
          <React.Fragment>
            <div className="flex flex-col gap-4 px-3 py-6">
              <div className="flex items-center justify-between gap-1">
                <div className=" text-xs font-normal text-gray-500">Billed annually</div>
                <div className="text-right text-xs font-normal text-slate-600">${seats.price}</div>
              </div>

              <div className="flex items-center justify-between gap-1">
                <div className="font-['Inter'] text-xs font-normal text-slate-600">Sales tax</div>
                <div className="flex items-center justify-center gap-2.5 rounded bg-slate-700 p-2.5">
                  <div className="text-center text-2xs font-medium text-white xl:text-xs">NOT CALCULATED</div>
                </div>
              </div>

              {isValidPromoCode && (
                <div className="mt-4 flex items-center justify-between gap-1">
                  <div className=" text-sm font-normal text-slate-600">Order total (before tax)</div>
                  <div className="text-right text-xs font-semibold text-slate-600">${seats.priceDiscount}</div>
                </div>
              )}
              {isValidPromoCode && (
                <div className="flex items-center justify-between gap-1">
                  <div className="text-xs font-semibold text-orange-500">You save</div>
                  <div className="text-right text-xs font-semibold text-orange-500">$22.35</div>
                </div>
              )}
            </div>
          </React.Fragment>
        )}
        {isReviewOrder && (
          <div className="flex flex-col gap-4 px-3 py-6">
            <div className="flex items-center justify-between gap-1">
              <div className="h-4 w-[89px] font-['Inter'] text-xs font-normal text-gray-500">Billed annually</div>
              <div className="text-xs font-normal text-gray-500">
                ${isValidPromoCode ? seats.priceDiscount : seats.price}
              </div>
            </div>
          </div>
        )}
      </div>

      {!isReviewOrder && (
        <div className="cursor-pointer text-right text-xs font-medium text-cyan-600 hover:opacity-75">
          Manage Cookies
        </div>
      )}
    </div>
  );
};
export default BillingDetails;
