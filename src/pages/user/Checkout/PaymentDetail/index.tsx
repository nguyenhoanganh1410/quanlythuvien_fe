import { Input } from '@/components';
import { FC } from 'react';
import BillingDetails from '../BillingDetails';
import usePaymentDetailHooks from './hooks';
import { CardExpiryElement, CardNumberElement, CardCvcElement } from '@stripe/react-stripe-js';
import CheckoutButton from '../CheckoutButton';
import Spinner from '@/components/LoadingPage/Spinner';
import { FaCheckCircle } from 'react-icons/fa';

const cardElementOptions = {
  disableLink: true,
  showIcon: false,
  hidePostalCode: true,
  style: {
    base: {
      color: '#000000',
      fontWeight: 400,
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSize: '14px',
      fontSmoothing: 'antialiased',

      '::placeholder': {
        color: '#CFD7DF',
      },
      ':-webkit-autofill': {
        color: '#e39f48',
      },
    },
    invalid: {
      color: '#E25950',

      '::placeholder': {
        color: '#FFCCA5',
      },
    },
  },
  classes: {
    focus: 'focused',
    empty: 'empty',
    invalid: 'invalid',
  },
};

interface Props {}

const PaymentDetail: FC<Props> = () => {
  const {
    isCheckingPromoCode,
    isValidPromoCode,
    companyAddress,
    formik,
    isLoading,
    onChangeAddress,
    onReadyCardNumber,
    onChangeCardNumber,
  } = usePaymentDetailHooks();

  return (
    <div className="mx-auto flex w-full max-w-[80%] flex-col gap-0 py-6 md:flex-row md:gap-x-12 md:py-10 2xl:gap-x-20 2xl:py-16">
      <div className="flex w-full flex-col gap-4 md:w-2/4 xl:gap-6 2xl:gap-8">
        <div>
          <div className="flex flex-row items-center justify-between">
            <div className="mb-2 font-Inter text-base font-semibold text-slate-600">Company Address</div>
            <p onClick={onChangeAddress} className="cursor-pointer text-xs font-semibold text-primary">
              Change
            </p>
          </div>
          <div className="font-Inter text-xs font-normal text-slate-600">
            Used to calculate tax and will appear on billing documents.
          </div>
          <div className="mt-6 flex flex-row items-center justify-between">
            <div className="flex flex-col gap-y-1">
              <p className="text-xs font-semibold">Company name</p>
              <p className="text-xs font-normal text-slate-600">{companyAddress.companyName}</p>
            </div>
            <div className="flex flex-col gap-y-1">
              <p className="text-xs font-semibold">Currency</p>
              <p className="text-xs font-normal text-slate-600">USD $</p>
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-y-1">
            <p className="text-xs font-semibold">Address</p>
            <p className="text-xs font-normal text-slate-600">{companyAddress.addressLine1}</p>
            <p className="text-xs font-normal text-slate-600">{companyAddress.city}</p>
            <p className="text-xs font-normal text-slate-600">{companyAddress.country}</p>
          </div>
        </div>
        <div className="mt-8">
          <div className="mb-2 font-Inter text-base font-semibold text-slate-600">Payment details</div>
          <div className="font-Inter text-xs font-normal text-slate-600">Add α debit or credit card</div>
        </div>
        <form className="flex flex-col gap-4" onSubmit={formik.submitForm}>
          <div className="relative flex w-full flex-col items-start">
            <div className="flex items-end gap-2">
              <div className="mb-2 font-Inter text-xs font-medium text-slate-600">Card number *</div>
            </div>
            <div className="h-auto w-full rounded border border-slate-300 bg-slate-50 text-sm font-normal text-black  2xl:text-lg">
              <CardNumberElement
                options={cardElementOptions}
                onChange={onChangeCardNumber}
                onReady={onReadyCardNumber}
                className="w-full px-4 py-2.5"
              />
            </div>
          </div>
          <div className="relative flex flex-row items-center justify-between">
            <Input
              uppercase
              name="promoCode"
              label="Promo Code"
              value={formik.values.promoCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.promoCode}
              errorMessage={formik.errors.promoCode}
              placeholder="example"
            />

            {(isCheckingPromoCode || isValidPromoCode) && (
              <div className="absolute bottom-2 right-2 h-6 w-6">
                {isCheckingPromoCode && <Spinner size="xs" />}
                {isValidPromoCode && !isCheckingPromoCode && <FaCheckCircle color="green" className="ml-1 mt-1" />}
              </div>
            )}
          </div>
          <div className="flex flex-row gap-x-8">
            <div className="relative flex w-full flex-col items-start">
              <div className="flex items-end gap-2">
                <div className="mb-2 font-Inter text-xs font-medium text-slate-600">Expiration date *</div>
              </div>
              <div className="h-auto w-full rounded border border-slate-300 bg-slate-50 text-sm font-normal text-black  2xl:text-lg">
                <CardExpiryElement options={cardElementOptions} className="w-full px-4 py-2.5 " />
              </div>
            </div>
            <div className="relative flex w-full flex-col items-start">
              <div className="flex items-end gap-2">
                <div className="mb-2 font-Inter text-xs font-medium text-slate-600">Security code *</div>
              </div>
              <div className="h-auto w-full rounded border border-slate-300 bg-slate-50 text-sm font-normal text-black  2xl:text-lg">
                <CardCvcElement options={cardElementOptions} className="w-full px-4 py-2.5 " />
              </div>
            </div>
          </div>
          <Input
            name="billingAddress"
            label="Billing address"
            isRequired
            value={formik.values.billingAddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.billingAddress}
            errorMessage={formik.errors.billingAddress}
          />
          <div className="mt-4">
            <CheckoutButton isLoading={isLoading} onClick={formik.submitForm} />
          </div>
        </form>
      </div>
      <div className="mt-8 w-full md:mt-0 md:w-2/4">
        <BillingDetails />
      </div>
    </div>
  );
};

export default PaymentDetail;
