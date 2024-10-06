import { FC } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import BillingDetails from '../BillingDetails';
import { images } from '@/constants';
import CheckoutButton from '../CheckoutButton';
import useReviewOrderHooks from './hooks';
import { LoadingPage } from '@/components';

interface IProps {}

const ReviewOrder: FC<IProps> = () => {
  const {
    isValidPromoCode,
    listCards,
    isLoadingCheckout,
    isLoading,
    onCheckout,
    onGotoStep01,
    onGotoStep02,
    companyAddress,
    seats,
  } = useReviewOrderHooks();

  return (
    <div className="mx-auto flex w-full max-w-[80%] flex-col gap-0 py-6 md:flex-row md:gap-x-12 md:py-10 2xl:gap-x-20 2xl:py-16">
      <div className="flex w-full flex-col gap-4 md:w-2/4 xl:gap-6 2xl:gap-8">
        <div className="text-base font-semibold text-slate-600">Review your order</div>
        <BillingDetails isReviewOrder />

        <div className="mt-6 text-base font-semibold text-slate-600">Your auto-renewal details</div>
        <BillingDetails isReviewOrder />
      </div>

      <div className="mt-10 flex w-full flex-col gap-4 md:w-2/4">
        <div className="w-full border border-gray-200">
          <div className="flex flex-col p-8">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <div className="text-base font-semibold text-slate-600">Company Address</div>
                <div className="text-xs font-normal text-slate-600">
                  Used to calculate tax and will appear on billing documents.
                </div>
              </div>
              <div onClick={onGotoStep01} className="text-xs font-semibold text-orange-500">
                Change
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <div className="font-Inter text-xs font-semibold text-slate-600">Company name</div>
                <div className="font-Inter text-xs font-normal text-slate-600">{companyAddress.companyName}</div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="font-Inter text-xs font-semibold text-slate-600">Currency</div>
                <div className="font-Inter text-xs font-normal text-slate-600">USD $</div>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <div className="font-Inter text-xs font-semibold text-slate-600">Address</div>
              <div className="font-Inter text-xs font-normal text-slate-600">{companyAddress.addressLine1}</div>
              {companyAddress.addressLine2 && (
                <div className="font-Inter text-xs font-normal text-slate-600">{companyAddress.addressLine2}</div>
              )}
              <div className="font-Inter text-xs font-normal text-slate-600">
                {companyAddress.state} {companyAddress.city} {companyAddress.postalCode}
              </div>
              <div className="font-Inter text-xs font-normal text-slate-600">{companyAddress.country}</div>
            </div>
          </div>

          <div className="flex flex-col gap-6 border-t border-gray-200 p-8">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <div className="text-base font-semibold text-slate-600">Payment details</div>
              </div>
              <div onClick={onGotoStep02} className="text-xs font-semibold text-orange-500">
                Change
              </div>
            </div>
            {listCards && (
              <>
                <div className="flex items-center gap-4">
                  <div>
                    <img className="h-auto" src={images.masterCard} alt="Clarifi logo" />
                  </div>
                  <div className="flex flex-col">
                    <div>
                      <span className=" text-xs font-semibold text-slate-600">Mastercard</span>
                      <span className=" text-xs font-normal text-slate-600"> ending in </span>
                      <span className=" text-xs font-semibold text-slate-600">{listCards[0].last4}</span>
                    </div>
                    <div>
                      <span className="text-xs font-normal text-gray-500 ">Exp: </span>
                      <span className="text-xs font-semibold text-gray-500 ">
                        {listCards[0].expMonth}/{listCards[0].expYear}
                      </span>
                    </div>
                    <div className="mt-1 text-xs font-semibold text-slate-600">{listCards[0].name}</div>
                  </div>
                </div>
              </>
            )}{' '}
            <div className="mt-4 flex flex-col gap-2">
              <div className="font-Inter text-xs font-semibold text-slate-600">Billing address</div>
              <div className="font-Inter text-xs font-normal text-slate-600">Same as company address</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="text-base font-semibold text-black ">Ready to buy?</div>
          <div className="my-4 text-xs font-semibold text-black ">What you need to know</div>

          <div>
            <ul className="flex list-disc flex-col gap-2 pl-4">
              <li className="text-xs font-normal leading-normal  text-black">
                During the Subscription Term and any renewal terms, you may choose to cancel your subscription early,
                provided that, we will not provide any refunds and you will promptly pay all unpaid fees due through the
                end of the Subscription Term.
              </li>

              <li className="text-xs font-normal leading-normal  text-black">
                <span className="text-xs font-semibold leading-normal  text-black">We do not provide refunds </span> if
                you decide to stop using the HubSpot subscription during your Subscription Term.
              </li>

              <li className="text-xs font-normal leading-normal  text-black">
                Your Subscription Term will automatically renew for the period indicated above, unless you tell us that
                you don't want to renew by providing notice as required in the customer terms of service
              </li>

              <li className="text-xs font-normal leading-normal  text-black">
                Upon renewal, we may increase the fees to reflect future changes to our list prices. If this increase
                applies to you, we will notify you at least thirty (30) days in advance of your renewal. See the 'Fee
                Adjustments at Renewal' section of our Customer Terms of Service for more details.
              </li>

              <li className="text-xs font-normal leading-normal  text-black">
                If you add more Contacts than you purchased to your portal, we will automatically increase your Contact
                Limit and Subscription Fee based on the total number of Marketing Contacts in your account for the
                remainder of your current Subscription Term; you will also be charged the increased amount for each
                following Billing Period, even if you later reduce the number of Contacts. You can downgrade your
                Contact tier at your next renewal upon signing of a new
              </li>

              <li className="text-xs font-normal leading-normal  text-black">
                You can designate a Contact as a Marketing Contact at any time. But there are limitations on when you
                can designate a Contact as a Non-Marketing Contact. We recommend reviewing the designation of your
                Contacts regularly to avoid an unintended Contact tier upgrade fee.
              </li>
            </ul>

            <div className="mt-4 text-xs font-normal  leading-normal text-black">
              Your recurring fees are subject to increase based on usage. Fees are also subject to increase to reflect
              future changes to our list price, as documented in Product and Services Catalog. See the HubSpot Customer
              Terms of Service 2 for more detail.
              <br />
              <br />
              During the Subscription Term, your data will be stored in the following data hosting location: North
              America
              <br />
              <br />I have read, understand and accept the HubSpot Customer Terms of Service C, including the HubSpot
              Privacy Policy 2 and HubSpot Acceptable Use Policy 2. By clicking "Complete Purchase" below, I agree that
              HubSpot is authorized to charge me for all fees due during the Subscription Term and any renewal term. I
              certify that I am authorized to sign and enter into this binding legal contract for the company or
              organization making this purchase.
            </div>
          </div>
        </div>
        <div className="my-4 flex gap-2">
          <input type="checkbox" checked />
          <div className="text-xs font-normal text-black">I agree to these terms.</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="mb-4 text-xs font-semibold text-black">Order Summary</div>
          <div className="flex justify-between">
            <div className="text-xs font-normal text-gray-500">Billed annually</div>
            <div className="text-right text-xs font-normal text-black">${seats.price}</div>
          </div>

          <div className="flex justify-between">
            <div className="text-xs font-normal text-gray-500">Sales tax</div>
            <div className="text-right text-xs font-normal text-black">$0.00</div>
          </div>
          {isValidPromoCode && (
            <>
              <div className="mt-4 flex justify-between">
                <div className="text-xs font-normal text-gray-500">Order total (including tax)</div>
                <div className="text-right text-xs font-semibold text-black">${seats.priceDiscount}</div>
              </div>

              <div className="flex justify-between">
                <div className="text-xs font-semibold text-orange-500 ">You save</div>
                <div className="text-right text-xs font-semibold text-orange-500 ">$22.35</div>
              </div>
            </>
          )}
          <div className="mt-4 flex justify-between gap-x-4">
            <CheckoutButton isLoading={isLoading} onClick={onCheckout} />
            <div className="w-1/2 text-3xs font-normal text-gray-500 xl:text-2xs ">
              This charge will be processed through:
              <br />
              HubSpot Inc. 2 Canal Park, Cambridge, MA 02141 USA
            </div>
          </div>
        </div>
      </div>
      {isLoadingCheckout && <LoadingPage />}
    </div>
  );
};
export default ReviewOrder;
