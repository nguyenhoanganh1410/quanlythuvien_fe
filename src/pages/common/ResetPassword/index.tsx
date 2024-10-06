import { FC } from 'react';
import { icons } from '@/constants';
import ResetPasswordForm from './ResetPasswordForm';

interface IProps {
  isPolicyHolder?: boolean;
}

const ResetPasswordPage: FC<IProps> = ({ isPolicyHolder = false }) => {
  return (
    <div className="relative flex h-screen w-full flex-row">
      <div className="z-10 flex w-full flex-row">
        <div className="flex h-full w-full flex-col items-center justify-center bg-transparent px-8 pb-8 lg:w-[50%] lg:bg-white">
          <ResetPasswordForm isPolicyHolder={isPolicyHolder} />
        </div>
        <div className="relative hidden h-full w-[50%] flex-col bg-secondary px-16 py-10 lg:flex">
          <div className="flex-[0.3]">
            <img src={icons.logoAuth} alt="logo-auth" className="h-20 w-20 2xl:h-[107px] 2xl:w-[115px]" />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <img src={icons.glassLookUp} alt="glass-look-up" className="lg:h-96 lg:w-96 2xl:h-[479px] 2xl:w-[439px] " />
          </div>
          <div className="flex flex-[0.3] flex-col justify-end">
            <p className="text-xl font-bold text-white 2xl:text-2xl">
              Experience Hassle-Free Contract Analysis with Clarifi.
            </p>
            <p className="mt-4 text-sm font-normal text-white 2xl:text-base">
              Clarifi is a cutting-edge platform powered by artificial intelligence that excels in extracting valuable
              information from insurance policies
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
