import SettingHeader from './components/SettingHeader';
import { useSettingsHooks } from './hooks';
import SettingTab from './components/SettingTabs';
import ProfileSection from './components/ProfileSection';
import OrderHistory from './components/OrderHistory';
import PaymentMethods from './components/PaymentMethods';
import YourSeats from './components/YourSeats';

export const SettingPage: React.FC = () => {
  const { searchValue, selectedTab, onSelectTab, onChangeSearchValue } = useSettingsHooks();

  return (
    <div className="min-h-screen bg-bgPage py-8">
      <SettingHeader searchValue={searchValue} onChangeSearchValue={onChangeSearchValue} />
      <div className=" hidden h-[1px] w-full bg-borderGray xl:flex"></div>
      <div className="m-4 mt-16 flex h-full flex-col rounded-2xl border border-solid border-gray-300 md:m-14">
        <SettingTab selectedTab={selectedTab} onSelectTab={onSelectTab} />
        <div className=" rounded-bl-2xl rounded-br-2xl bg-white bg-opacity-30">
          {selectedTab === 0 && <ProfileSection />}
          {selectedTab === 1 && <YourSeats />}
          {selectedTab === 2 && <OrderHistory />}
          {selectedTab === 3 && <PaymentMethods />}
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
