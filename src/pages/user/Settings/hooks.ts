import { ChangeEvent, useCallback, useState } from 'react';

export const useSettingsHooks = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const onChangeSearchValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setSearchValue(search);
  }, []);

  const onSelectTab = useCallback(
    (tabIndex: number) => () => {
      setSelectedTab(tabIndex);
    },
    []
  );

  return {
    selectedTab,
    searchValue,
    onSelectTab,
    onChangeSearchValue,
  };
};
