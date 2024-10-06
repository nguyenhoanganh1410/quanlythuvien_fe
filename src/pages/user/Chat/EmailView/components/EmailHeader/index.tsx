import { icons } from '@/constants';
import { IPolicy } from '@/features/policy/interfaces';
import moment from 'moment';
import { FC } from 'react';

type Props = {
  currentPolicy: IPolicy;
};

const EmailHeader: FC<Props> = ({ currentPolicy }) => {
  return (
    <div className="flex w-full flex-col space-y-3 border-b border-gray-200 bg-white px-4 py-4 md:flex-row md:space-y-0 xl:px-6">
      <div className="flex w-full flex-row space-x-2 md:justify-between md:space-x-4 xl:space-x-8">
        {/* Name */}
        <div className="flex h-fit flex-1 flex-row space-x-2 md:space-x-4">
          <div className="flex h-fit w-fit items-center justify-center rounded-lg bg-primary/10 p-2">
            <img alt="pdf-type" src={icons.pdfType} className="h-4 w-4 md:h-6 md:w-6" />
          </div>
          <div className="flex flex-col">
            <p className="text-xs font-bold capitalize text-primary lg:text-sm 2xl:text-base">
              {currentPolicy.firstName?.toLowerCase() + ' ' + currentPolicy.lastName?.toLowerCase()}
            </p>
            <p className="text-3xs font-medium text-gray-400 lg:text-3xs 2xl:text-2xs">
              {moment(currentPolicy?.date).format('MMM DD, YYYY, HH:mm A')}
            </p>
          </div>
        </div>
        {/*  Provider and Address */}
        <div className="hidden flex-[0.5] flex-col md:flex">
          <p className="text-xs font-medium capitalize text-gray-500 lg:text-sm 2xl:text-base">
            {currentPolicy.provider?.toLowerCase()}
          </p>
          <p className="text-3xs font-medium capitalize text-gray-400 lg:text-2xs 2xl:text-xs">
            {currentPolicy.address?.full.toLowerCase()}
          </p>
        </div>
        {/* Policy Number  */}
        <div className="relative flex flex-1 flex-row items-center justify-end space-x-2">
          <div className="flex w-full flex-col items-center justify-start rounded-full bg-primary/10  px-4 py-[6px] text-3xs font-bold text-primary sm:flex-row md:w-fit lg:text-2xs xl:text-xs">
            POLICY NUMBER: <p className="inline font-medium sm:mx-2">{currentPolicy.policyNumber}</p>
          </div>
          <div className="relative flex w-full flex-col items-center justify-start rounded-full bg-gray-800/10 px-4 py-[6px] text-3xs font-bold text-gray-800 sm:flex-row md:w-fit lg:text-2xs xl:text-xs">
            CLAIM NUMBER: <p className="inline font-medium sm:mx-2">{currentPolicy.claimNumber}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between md:hidden">
        <p className="w-full text-xs font-medium capitalize text-gray-500">{currentPolicy.provider?.toLowerCase()}</p>
        <p className="w-full text-2xs font-medium capitalize text-gray-400">
          {currentPolicy.address?.full.toLowerCase()}
        </p>
      </div>
    </div>
  );
};

export default EmailHeader;
