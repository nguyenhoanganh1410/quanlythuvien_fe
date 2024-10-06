import PolicyChatIcon from '@/components/iconSvgs/PolicyChatIcon';
import { icons } from '@/constants';
import { EPolicyStatus } from '@/constants/enum';
import { IPolicy } from '@/features/policy/interfaces';
import clsx from 'clsx';
import moment from 'moment';
import React, { FC } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { BsTrash3 } from 'react-icons/bs';

interface Props {
  index: number;
  policy: IPolicy;
  onViewChat: (policyId: string) => () => void;
  onDeletePolicy: (policyId: string) => () => void;
}

const PolicyItem: FC<Props> = ({ index, policy, onViewChat, onDeletePolicy }) => {
  if (policy.status === EPolicyStatus.TRAINING) {
    return (
      <React.Fragment>
        <div
          className={clsx(
            'box-border flex h-auto min-h-[130px] flex-row space-x-4 px-3 py-[22px] sm:space-x-10 sm:px-[18px]',
            index % 2 === 0 ? 'bg-bgBodyCard' : 'bg-bgBodyCardSecond',
            index === 0 && 'three-step'
          )}
        >
          <div className="flex flex-1 flex-col items-start 2xl:flex-[0.3]">
            <div className="flex w-fit items-center gap-px self-stretch rounded-[999px]  bg-primary px-2.5 py-1.5 text-center text-3xs font-semibold uppercase not-italic leading-4 tracking-[0.05px] text-white lg:text-2xs">
              Clarifi in progress
            </div>
            <p className="mt-2.5 text-right text-3xs font-medium not-italic leading-[normal] text-gray-400">
              {moment(policy.date).format('MMM DD, YYYY, HH:mm A')}
            </p>
          </div>
          <div className="col-span-3 flex-1">
            <div className="items-cent relative flex h-[22px] w-[fit-content] justify-between py-[6px] text-3xs font-semibold not-italic leading-[10px] tracking-[0.05px] text-secondary lg:text-2xs">
              <img className="absolute -left-5 top-0.5 h-4 w-4 " src={icons.person} alt="person" />
              {policy.firstName + ' ' + policy.lastName}
            </div>
            <div className="text-3xs font-medium not-italic leading-[10px] tracking-[0.05px] text-secondary lg:text-2xs ">
              Policy Number: {policy.policyNumber}
            </div>
            {policy.address && policy.address.full && (
              <p className="mt-[10px] text-3xs font-medium not-italic leading-[normal] text-gray-500 lg:text-2xs">
                {policy.address.full}
              </p>
            )}
            {policy.provider && (
              <p className="mt-[5px] text-3xs font-medium not-italic leading-[normal] text-gray-500 lg:text-2xs">
                {policy.provider}
              </p>
            )}
          </div>
          <button onClick={onViewChat(policy.id)} className="flex items-center justify-center">
            <PolicyChatIcon status={policy.status} className="h-6 w-6 md:h-8 md:w-8" />
          </button>
        </div>
        <div className="h-[4px] w-full bg-primary" />
      </React.Fragment>
    );
  }

  if (policy.status === EPolicyStatus.CLARIFIED) {
    return (
      <React.Fragment>
        <div
          className={clsx(
            'box-border flex h-auto min-h-[130px] flex-row space-x-4 px-3 py-[22px] sm:space-x-10 sm:px-[18px]',
            index % 2 === 0 ? 'bg-bgBodyCard' : 'bg-bgBodyCardSecond',
            index === 0 && 'three-step'
          )}
        >
          <div className="flex flex-1 flex-col items-start 2xl:flex-[0.3]">
            <div className="flex w-fit items-center gap-px self-stretch rounded-[999px]  bg-secondary px-2.5 py-1.5 text-3xs font-semibold uppercase not-italic leading-4 tracking-[0.05px] text-white lg:text-2xs">
              <img className="mr-[4px]" src={icons.check} alt="icon" />
              Clarified
            </div>
            <p className="mt-[10px] text-right text-[8px] font-medium not-italic leading-[normal] text-gray-400">
              {moment(policy.date).format('MMM DD, YYYY, HH:mm A')}
            </p>
          </div>
          <div className="col-span-3 flex-1">
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <div className="items-cent relative flex h-[22px] w-[fit-content] justify-between py-[6px] text-3xs font-semibold not-italic leading-[10px] tracking-[0.05px] text-secondary lg:text-2xs">
                  <img className="absolute -left-5 top-0.5 h-4 w-4 " src={icons.person} alt="person" />
                  {policy.firstName + ' ' + policy.lastName}
                </div>
                <div className="mt-2 text-3xs font-medium not-italic leading-[10px] tracking-[0.05px] text-secondary lg:mt-0 lg:text-2xs ">
                  Policy Number: {policy.policyNumber}
                </div>
              </div>
              <button
                onClick={onDeletePolicy(policy.id)}
                className="flex h-[24px] w-[72px] flex-nowrap items-center gap-[0.82px] rounded-[817.364px] border-[0.82px] border-solid border-primary"
              >
                <div className="relative z-[1] flex w-full shrink-0 flex-nowrap items-center justify-center gap-1">
                  <BsTrash3 className=" h-[9.8px] w-[9.8px] text-primary" />
                  <span className="text-3xs font-semibold uppercase text-primary xl:text-2xs">Delete</span>
                </div>
              </button>
            </div>
            {policy.address && policy.address.full && (
              <p className="mt-[10px] text-3xs font-medium not-italic leading-[normal] text-gray-500 lg:text-2xs">
                {policy.address.full}
              </p>
            )}
            {policy.provider && (
              <p className="mt-[5px] text-3xs font-medium not-italic leading-[normal] text-gray-500 lg:text-2xs">
                {policy.provider}
              </p>
            )}
          </div>
          <button onClick={onViewChat(policy.id)} className="flex items-center justify-center">
            <PolicyChatIcon status={policy.status} className="h-6 w-6 md:h-8 md:w-8" />
          </button>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div
        className={clsx(
          'box-border flex h-auto min-h-[130px] flex-row  space-x-4  bg-lightGray px-3 py-[22px] sm:space-x-10 sm:px-[18px]',
          index === 0 && 'three-step'
        )}
      >
        <div className="flex flex-1 flex-col  items-start 2xl:flex-[0.3]">
          <div className="flex w-fit items-center gap-px self-stretch rounded-[999px]  bg-bgPending px-2.5 py-1.5 text-3xs font-semibold uppercase not-italic leading-4 tracking-[0.05px] text-secondary lg:text-2xs">
            <img className="mr-[4px]" src={icons.arrowCounter} alt="icon" />
            Pending
            {` (${(policy.progress ?? 0) + '%'})`}
          </div>
          <p className="mt-[10px] text-right text-[8px] font-medium not-italic leading-[normal] text-gray-400">
            {moment(policy.date).format('MMM DD, YYYY, HH:mm A')}
          </p>
        </div>
        <SkeletonTheme baseColor="#D1D0D6" highlightColor="#F5F1EE" borderRadius={8} duration={2}>
          <div className="col-span-3 flex-1">
            <div className="items-cent relative flex w-fit flex-col justify-between ">
              <div className="absolute -left-7 h-5 w-5 rounded-full">
                <Skeleton className="h-5 w-5 rounded-full" borderRadius={999} />
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <div className="h-[16px] w-20 xl:w-36">
                    <Skeleton height={12} />
                  </div>
                  <div className="w-w-20 xl:w-36">
                    <Skeleton height={12} />
                  </div>
                </div>
                {policy.status === EPolicyStatus.REJECTED && (
                  <button
                    onClick={onDeletePolicy(policy.id)}
                    className="flex h-[24px] w-[72px] flex-nowrap items-center gap-[0.82px] rounded-[817.364px] border-[0.82px] border-solid border-primary"
                  >
                    <div className="relative z-[1] flex w-full shrink-0 flex-nowrap items-center justify-center gap-1">
                      <BsTrash3 className=" h-[9.8px] w-[9.8px] text-primary" />
                      <span className="text-3xs font-semibold uppercase text-primary xl:text-2xs">Delete</span>
                    </div>
                  </button>
                )}
              </div>
            </div>
            <div className="mt-2 w-32 xl:w-64">
              <Skeleton height={12} />
            </div>
            <div className="-mt-2 w-28 xl:w-48">
              <Skeleton height={12} />
            </div>
          </div>
        </SkeletonTheme>
        <div className="flex items-center justify-center">
          <PolicyChatIcon status={EPolicyStatus.PENDING} className="h-6 w-6 md:h-8 md:w-8" />
        </div>
      </div>
      <div className="h-[4px] w-full  bg-gray-200">
        <div className="h-[4px] bg-secondary" style={{ width: `${policy.progress}%` }}></div>
        <div className="h-[4px] bg-gray-200" style={{ width: `${100 - policy.progress}%` }}></div>
      </div>
    </React.Fragment>
  );
};

export default PolicyItem;
