import { FC } from 'react';
import SignInForm from './SignInForm';
import { icons } from '@/constants';

interface IProps {
  isPolicyHolder?: boolean;
}

const SignInPage: FC<IProps> = () => {
  return (
    <div className="relative flex h-screen w-full flex-row">
      <div className="z-10 flex w-full flex-row">
        <div className="flex h-full w-full flex-col items-center justify-center bg-transparent px-8 pb-8 lg:w-[50%] lg:bg-white">
          <SignInForm />
        </div>
        <div className="relative hidden h-full w-[50%] flex-col bg-secondary px-16 py-10 lg:flex">
          <div className="flex flex-1 items-center justify-center">
            <img src={icons.glassLookUp} alt="glass-look-up" className="lg:h-96 lg:w-96 2xl:h-[479px] 2xl:w-[439px] " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
