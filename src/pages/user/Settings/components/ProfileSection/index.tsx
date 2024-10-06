import { FC } from 'react';
import UpdateProfilePopup from '../UpdateProfilePopup';
import { useProfileSectionHooks } from './hooks';
import { EUpdateProfileType } from '@/features/user/interfaces';
import { RadialChart } from 'react-vis';

const ProfileSection: FC = () => {
  const {
    user,
    updateType,
    isShowUpdateProfilePopup,
    paymentStatus,
    usageData,
    onCloseUpdateProfilePopup,
    onSelectUpdateProfile,
  } = useProfileSectionHooks();

  return (
    <div className="flex grid-cols-6 flex-col lg:grid">
      <div className="col-span-4 flex w-full flex-col space-y-6">
        <div className="border-r border-solid border-gray-300 py-5 pr-0">
          <div className="flex flex-row items-start justify-between border-b border-[#CDCDCD] border-opacity-80 px-5 py-6 md:px-10">
            <div className="flex flex-col text-sm font-semibold text-secondary md:text-base xl:text-xl">
              <p>Name</p>
              <p className="mt-6 font-normal">{user ? user.firstName + ' ' + user.lastName : ''}</p>
            </div>
            <button
              onClick={onSelectUpdateProfile(EUpdateProfileType.name)}
              className="text-sm font-semibold text-primary md:text-base xl:text-xl"
            >
              UPDATE INFO
            </button>
          </div>
          <div className="flex flex-row items-start justify-between border-b border-[#CDCDCD] border-opacity-80 px-5 py-6 md:px-10">
            <div className="flex flex-col text-sm font-semibold text-secondary md:text-base xl:text-xl">
              <p>Email</p>
              <p className="mt-6 font-normal">{user?.email ?? ''}</p>
            </div>
            <button
              onClick={onSelectUpdateProfile(EUpdateProfileType.email)}
              className="text-sm font-semibold  text-primary md:text-base xl:text-xl"
            >
              CHANGE EMAIL
            </button>
          </div>
          <div className="flex flex-row items-start justify-between border-b border-[#CDCDCD] border-opacity-80 px-5 py-6 md:px-10">
            <div className="flex flex-col text-sm font-semibold  text-secondary md:text-base xl:text-xl">
              <p>Pay as you go Mode</p>
              <p className="mt-6 font-normal">{user?.payAsYouGoMode ? 'ON' : 'OFF'}</p>
            </div>
            <button
              onClick={onSelectUpdateProfile(EUpdateProfileType.payAsYouGoMode)}
              className="text-sm font-semibold  text-primary md:text-base xl:text-xl"
            >
              CHANGE STATUS
            </button>
          </div>
          {Boolean(user?.payAsYouGoMode) && (
            <div className="flex flex-row items-start justify-between border-b border-[#CDCDCD] border-opacity-80 px-5 py-6 md:px-10">
              <div className="flex flex-col text-sm font-semibold  text-secondary md:text-base xl:text-xl">
                <p>Pay as you go cost</p>
                <p className="mt-6 font-normal">${paymentStatus?.payAsYouGoCost}</p>
              </div>
            </div>
          )}

          <div className="flex flex-row items-start justify-between px-5 py-6 md:px-10">
            <div className="flex flex-col text-sm font-semibold  text-secondary md:text-base xl:text-xl">
              <p>Password</p>
              <p className="mt-6 font-normal">••••••••••••</p>
            </div>
            <button
              onClick={onSelectUpdateProfile(EUpdateProfileType.password)}
              className="text-sm font-semibold  text-primary md:text-base xl:text-xl"
            >
              CHANGE PASSWORD
            </button>
          </div>
        </div>
        <UpdateProfilePopup
          user={user!}
          updateType={updateType}
          open={isShowUpdateProfilePopup}
          onClose={onCloseUpdateProfilePopup}
        />
      </div>
      <div className="col-span-2 flex h-full w-full flex-col items-center justify-center py-6">
        <p className="text-sm font-bold  md:text-base xl:text-xl">Ai Usage Limits</p>
        <div style={{ position: 'relative', width: '300px', height: '300px' }}>
          <RadialChart
            data={usageData}
            width={300}
            height={300}
            innerRadius={100}
            radius={120}
            colorRange={['#fff', '#F26524']}
          />
          <div
            className="absolute flex flex-col items-center font-Inter"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <p className="text-[12px] font-normal uppercase">Consumed</p>
            <p className="text-[45px] font-bold text-[#F26524]">{usageData[0]?.angle}%</p>
            <p className="text-sm font-bold  md:text-base xl:text-xl">Ai credits</p>
          </div>
        </div>
        <button className="h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-bold text-white">
          Top Up AI Credits
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;
