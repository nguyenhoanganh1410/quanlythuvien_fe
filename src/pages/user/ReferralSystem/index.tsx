import Spinner from '@/components/LoadingPage/Spinner';
import ClarifiIcon from '@/components/iconSvgs/ClarifiIcon';
import { FC } from 'react';
import { useReferralSystemHooks } from './hooks';

interface IProps {}

const ReferralSystemPage: FC<IProps> = () => {
  const { formik, isLoading, navHome } = useReferralSystemHooks();
  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden">
      <div className="h-full w-full border border-gray-300 bg-[#F5F1EE]">
        <div className="flex h-20 w-full items-center justify-center gap-2 border border-b-gray-300 px-12">
          <div className="flex cursor-pointer items-center gap-3" onClick={navHome}>
            <ClarifiIcon />
            <p className="text-[34.56px] font-bold text-slate-700">Clarifi</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4 p-8">
          <div className="p-6">
            <svg width="73" height="73" viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M33.459 12.1663C21.6999 12.1663 12.1673 21.6989 12.1673 33.458C12.1673 45.2171 21.6999 54.7497 33.459 54.7497C39.1954 54.7497 44.402 52.4811 48.2305 48.7922C48.3106 48.6881 48.3983 48.588 48.4936 48.4926C48.589 48.3973 48.6891 48.3096 48.7932 48.2295C52.4821 44.401 54.7506 39.1944 54.7506 33.458C54.7506 21.6989 45.218 12.1663 33.459 12.1663ZM54.8477 50.5451C58.5939 45.862 60.834 39.9216 60.834 33.458C60.834 18.3392 48.5778 6.08301 33.459 6.08301C18.3402 6.08301 6.08398 18.3392 6.08398 33.458C6.08398 48.5768 18.3402 60.833 33.459 60.833C39.9226 60.833 45.8629 58.5929 50.5461 54.8467L61.7249 66.0255C62.9127 67.2133 64.8386 67.2133 66.0264 66.0255C67.2143 64.8376 67.2143 62.9117 66.0264 61.7239L54.8477 50.5451Z"
                fill="#396589"
              />
            </svg>
          </div>
          <div className="text-center text-3xl font-bold text-gray-800">Custom Clarifi Plan Review! </div>
          <div className="w-full max-w-[606px] text-center  text-sm font-medium leading-snug text-neutral-400">
            Please input your information below
          </div>
          <form className="flex w-full justify-center" onSubmit={formik.handleSubmit}>
            <div className="w-full max-w-[440px]">
              <input
                className="mt-10 w-full rounded-lg border border-gray-300 pr-10 text-base font-normal text-gray-800"
                name="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="What is your name?"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-xs text-red-500">{formik.errors.name}</div>
              )}
              <input
                className="mt-3 w-full rounded-lg border border-gray-300 pr-10 text-base font-normal text-gray-800"
                name="email"
                type="text"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="What is a email to reach you?"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-xs text-red-500">{formik.errors.email}</div>
              )}
              <input
                className="mt-3 w-full rounded-lg border border-gray-300 pr-10 text-base font-normal text-gray-800"
                name="phone"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.phone}
                placeholder="What is a good phone number to reach you?"
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="text-xs text-red-500">{formik.errors.phone}</div>
              )}
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
        </div>
      </div>
    </div>
  );
};

export default ReferralSystemPage;
