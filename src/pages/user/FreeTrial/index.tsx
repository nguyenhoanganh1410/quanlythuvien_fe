import ClarifiIcon from '@/components/iconSvgs/ClarifiIcon';
import TrustedSiteIcon from '@/components/iconSvgs/TrustedSiteIcon';
import { FC } from 'react';
import { useFreeTrialHooks } from './hooks';
import PaymentForm from '@/pages/user/FreeTrial/PaymentForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import AgreementModal from '../Dashboard/components/AgreementModal';
import 'react-loading-skeleton/dist/skeleton.css';

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_STRIPE_KEY ?? '');
interface IProps {}

const FreeTrialPage: FC<IProps> = () => {
  const {
    isLoadingCost,
    cost,
    isAgreementModal,
    onOrderSummary,
    navHome,
    handleCloseAgreementModal,
    handleOpenAgreementModal,
  } = useFreeTrialHooks({});

  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden">
      <div className="h-full w-full border border-gray-300 bg-[#F5F1EE]">
        <div className="flex h-20 w-full items-center justify-center gap-2 border border-b-gray-300 px-12">
          <div className="flex items-center gap-3" onClick={navHome}>
            <ClarifiIcon />
            <p className="text-[34.56px] font-bold text-slate-700">Clarifi</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 p-8">
          <div className="text-3xl font-bold text-gray-800">Elevate Your Insurance Clarity </div>
          <div className="w-full max-w-[606px] text-center  text-sm font-medium leading-snug text-neutral-400">
            Spend less time searching and more time succeeding. With Clarifi Pro, you gain immediate, unlimited access
            to AI-powered policy analysis—no more manual digging for information. Get the full picture of your insurance
            coverage effortlessly with Clarifi.
          </div>
          <div className="mt-6 flex w-full justify-center gap-10">
            <div className="w-full max-w-[606px] bg-white">
              <div className="border border-l border-r border-t p-5 shadow-[0px_2px_10px_#0000001a] [border-left-style:solid] [border-right-style:solid] [border-top-style:solid] ">
                <p className="ml-3 text-xl font-bold leading-7 text-gray-800">Payment Method</p>
              </div>
              <div className="flex flex-col gap-6 p-8">
                <Elements stripe={stripePromise}>
                  <PaymentForm onOrderSummary={onOrderSummary} handleOpenAgreementModal={handleOpenAgreementModal} />
                </Elements>
              </div>
            </div>
            <div className="relative flex w-full max-w-[416px] flex-col items-start justify-start gap-2.5 rounded-[10px] border border-gray-300 bg-white bg-opacity-30 p-5">
              <div className="w-full border-b border-[#d6d6d6] [border-bottom-style:solid]">
                <p className="mb-6  text-xl font-bold leading-10 text-gray-800">Order Summary</p>
                {isLoadingCost ? (
                  <div className="mb-6">
                    <SkeletonTheme baseColor="#D1D0D6" highlightColor="#F5F1EE">
                      <section>
                        <Skeleton height={30} width={128} />
                      </section>
                    </SkeletonTheme>
                  </div>
                ) : (
                  !isLoadingCost && (
                    <p className="mb-6 text-[15px] font-medium leading-normal text-gray-800">Sign Up Today</p>
                  )
                )}
              </div>
              <div className="mb-5 w-full">
                {isLoadingCost ? (
                  <SkeletonTheme baseColor="#D1D0D6" highlightColor="#F5F1EE">
                    <section>
                      <Skeleton height={34} width={128} />
                    </section>
                  </SkeletonTheme>
                ) : (
                  !isLoadingCost && (
                    <p className="mt-2 h-[34.17px] text-xl font-bold leading-[34.17px] text-gray-800">{cost}</p>
                  )
                )}
              </div>
              <div className="absolute bottom-[-72px] left-0 flex w-full justify-center">
                <TrustedSiteIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
      <AgreementModal onClose={handleCloseAgreementModal} open={isAgreementModal} />
    </div>
  );
};
export default FreeTrialPage;
