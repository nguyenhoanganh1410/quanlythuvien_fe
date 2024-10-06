import { searchHomeValuation } from '@/features/homeValuation/homeValuationActions';
import { resetHomeValuationData } from '@/features/homeValuation/homeValuationSlice';
import { RootState } from '@/store';
import { useAppDispatch } from '@/store/hooks';
import axios from 'axios';
import { ChangeEvent, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

const API_SUGGEST_ZILLOW = 'https://www.zillowstatic.com/autocomplete/v3/suggestions';
const API_AB_KEY_ZILLOW = '374abcfd-0cd1-42b4-8aab-4bd193f7ab71';

interface ISuggestAddress {
  display: string;
  resultType: string;
}

const useHomeValuationHooks = () => {
  const dispatch = useAppDispatch();
  const { isSearching, homeValuationData } = useSelector((state: RootState) => state.homeValuationStore);
  const [valueAddress, setValueAddress] = useState<string>('');
  const [listAddressSuggestions, setListAddressSuggestions] = useState<ISuggestAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>('');

  const onSelectAddress = useCallback(
    (value: string) => () => {
      setSelectedAddress(value);
      setValueAddress(value);
      setListAddressSuggestions([]);
    },
    []
  );

  const onGoClarifi = useCallback(async () => {
    try {
      dispatch(
        searchHomeValuation({
          address: selectedAddress,
        })
      );
    } catch (error) {
      console.log('error when search home value: ', error);
    }
  }, [selectedAddress, dispatch]);

  const onTryAgain = useCallback(() => {
    setValueAddress('');
    dispatch(resetHomeValuationData());
  }, [dispatch]);

  const fetchListAddress = useCallback(async (value: string) => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: API_SUGGEST_ZILLOW,
        headers: {},
        params: {
          q: value,
          abKey: API_AB_KEY_ZILLOW,
          clientId: 'hops-homepage',
        },
      };
      const response = await axios.request(config);
      const data = response.data;
      const results = data.results;
      setListAddressSuggestions(results);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onChangeAddress = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (value) {
        fetchListAddress(value);
      } else {
        setListAddressSuggestions([]);
      }
      setValueAddress(value);
    },
    [fetchListAddress]
  );

  return {
    homeValuationData,
    listAddressSuggestions,
    isSearching,
    valueAddress,
    onChangeAddress,
    onGoClarifi,
    onTryAgain,
    onSelectAddress,
  };
};

export default useHomeValuationHooks;
