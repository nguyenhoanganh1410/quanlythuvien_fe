import React from 'react';
import { CardExpiryElement, CardNumberElement, CardCvcElement } from '@stripe/react-stripe-js';
import { usePaymentFormHooks } from './hooks';
import CardPaymentMethodIcon from '@/components/iconSvgs/CardPaymentMethodIcon';
import CardDateIcon from '@/components/iconSvgs/CardDateIcon';
import SecurityCodeIcon from '@/components/iconSvgs/SecurityCodeIcon';
import Spinner from '@/components/LoadingPage/Spinner';

type Props = {
  onOrderSummary: (newLoading: boolean, newCost: string) => void;
  handleOpenAgreementModal: () => void;
};

const PaymentForm = React.memo(({ onOrderSummary, handleOpenAgreementModal }: Props) => {
  const { isLoading, formik, onChangeCardNumber, onReadyCardNumber } = usePaymentFormHooks({
    onOrderSummary,
    handleOpenAgreementModal,
  });

  const cardElementOptions = {
    disableLink: true,
    showIcon: true,
    hidePostalCode: true,
    style: {
      base: {
        color: '#32325D',
        fontWeight: 500,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '16px',
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

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col">
        <div className="flex h-10 w-full rounded-md border border-solid border-[color:var(--Gray-300,#D1D5DB)] bg-white shadow-sm ">
          <div className="flex items-center justify-center border-r border-solid border-[color:var(--Gray-300,#D1D5DB)] px-4">
            <CardPaymentMethodIcon />
          </div>
          <div className="w-full p-[10px] pl-5 ">
            <CardNumberElement options={cardElementOptions} onChange={onChangeCardNumber} onReady={onReadyCardNumber} />
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          <div className="flex h-10 w-full rounded-md border border-solid border-[color:var(--Gray-300,#D1D5DB)] bg-white shadow-sm ">
            <div className="flex items-center justify-center border-r border-solid border-[color:var(--Gray-300,#D1D5DB)] px-4">
              <CardDateIcon />
            </div>
            <div className="w-full p-[10px] pl-5 ">
              <CardExpiryElement options={cardElementOptions} />
            </div>
          </div>
          <div className="flex h-10 w-full rounded-md border border-solid border-[color:var(--Gray-300,#D1D5DB)] bg-white shadow-sm ">
            <div className="flex items-center justify-center border-r border-solid border-[color:var(--Gray-300,#D1D5DB)] px-4">
              <SecurityCodeIcon />
            </div>
            <div className="w-full p-[10px] pl-5 ">
              <CardCvcElement options={cardElementOptions} />
            </div>
          </div>
        </div>
        <input
          type="text"
          id="promoCode"
          name="promoCode"
          placeholder="Promo code"
          maxLength={20}
          value={formik.values.promoCode}
          onChange={formik.handleChange}
          className="mt-4 w-full rounded-lg border border-solid border-[#D1D5DB] focus:border-[#D1D5DB] focus:outline-none focus:ring-0"
        />
        {formik.touched.promoCode && formik.errors.promoCode && (
          <div className="text-xs text-red-500">{formik.errors.promoCode}</div>
        )}
        <div className="mt-4 flex items-center gap-2">
          <input
            checked={formik.values.isPayAsYouGo}
            onChange={formik.handleChange}
            name="isPayAsYouGo"
            type="checkbox"
            className="rounded border border-secondary font-medium"
          />
          <p className="text-[15px] font-medium leading-normal text-gray-800">Enable Pay As You Go</p>
        </div>
        {!isLoading ? (
          <button
            type="submit"
            className="relative my-4 h-12 w-full rounded-lg border border-primary bg-primary py-2 font-bold text-white"
          >
            <p className="text-base font-medium uppercase">sign up</p>
          </button>
        ) : (
          <button
            type="button"
            className="relative my-4 h-12 w-full rounded-lg border border-primary bg-primary py-2 font-bold text-white"
          >
            <Spinner size="sm" />
          </button>
        )}
      </div>
    </form>
  );
});

export default PaymentForm;
