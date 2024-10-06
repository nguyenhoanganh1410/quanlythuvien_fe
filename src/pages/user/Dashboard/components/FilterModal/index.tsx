import React from 'react';
import { useFilterPolicyModalHooks } from './hooks';
import { icons } from '@/constants';

type Props = {
  onClose: () => void;
};

const FilterModal = React.memo(({ onClose }: Props) => {
  const { listOptions, onSaveFilter, onSelectFilter } = useFilterPolicyModalHooks({ onClose });

  return (
    <div className="mr-0 mt-2 flex items-end justify-center text-center sm:items-center">
      <div className="w-[255px] rounded-[14px] bg-white ">
        <div className="px-[15px] py-[18px]">
          {listOptions.map((option) => {
            return (
              <div key={option.id} className="grid h-[34px] grid-cols-8 gap-4">
                <div className="col-span-7 ">
                  <div className="flex h-full items-center text-center">
                    <img src={option.icons} alt="icon" />
                    <p className="ml-4 text-left text-[12.558px] font-medium not-italic leading-[18.838px] tracking-[0.063px] text-secondary">
                      {option.text}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <img
                    onClick={onSelectFilter(option)}
                    className="cursor-pointer"
                    alt="check-square"
                    src={option.isSelected ? icons.checkSquare : icons.emptyCheckSquare}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={onSaveFilter}
          className="box-border h-[40px] w-full rounded-[0px_0px_8px_8px] border-[0.5px] border-solid border-primary bg-primary px-[10px] py-[10px] text-center font-Lato text-sm font-bold not-italic leading-5 text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
        >
          Save
        </button>
      </div>
    </div>
  );
});
export default FilterModal;
