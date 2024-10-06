import { icons } from '@/constants';
import { IFilterPolicyOption, EFilterType } from '@/features/policy/interfaces';
import { setValueFilterPolicy } from '@/features/policy/policySlice';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useCallback, useEffect, useState } from 'react';

const DEFAULT_OPTIONS: IFilterPolicyOption[] = [
  {
    id: EFilterType.all,
    icons: icons.collection,
    text: 'ALL',
  },
  {
    id: EFilterType.training,
    icons: icons.sun,
    text: 'Clarifi In Progress',
  },

  {
    id: EFilterType.clarified,
    icons: icons.moon,
    text: 'Clarifi Completed',
  },
];

type Props = {
  onClose: () => void;
};

export const useFilterPolicyModalHooks = ({ onClose }: Props) => {
  const dispatch = useAppDispatch();
  const [listOptions, setListOptions] = useState<IFilterPolicyOption[]>(DEFAULT_OPTIONS);
  const { filterPolicy } = useAppSelector((state: RootState) => state.policyStore);

  const onSaveFilter = useCallback(async () => {
    const selectedOption = listOptions.find((item) => item.isSelected);
    if (selectedOption) {
      onClose();
      await dispatch(setValueFilterPolicy(selectedOption.id));
    }
  }, [onClose, listOptions]);

  const onSelectFilter = useCallback(
    (filter: IFilterPolicyOption) => () => {
      const newListFilters = listOptions.map((item) => {
        if (item.id == filter.id) {
          return { ...item, isSelected: true };
        }
        return { ...item, isSelected: false };
      });
      setListOptions(newListFilters);
    },
    [listOptions]
  );

  useEffect(() => {
    if (filterPolicy) {
      const newListFilters = listOptions.map((item) => {
        if (item.id == filterPolicy) {
          return { ...item, isSelected: true };
        }
        return { ...item, isSelected: false };
      });
      setListOptions(newListFilters);
    }
  }, [filterPolicy]);

  return {
    listOptions,
    onSaveFilter,
    onSelectFilter,
  };
};
