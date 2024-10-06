import { IOption } from '@/interfaces';
import { useCallback, useState } from 'react';
import { BiChevronDown, BiX } from 'react-icons/bi';

type DropdownSearchProps = {
  options: IOption[];
  onSearch: (searchTerm: string) => void;
  onSelect: (selectedOption: IOption) => void;
  onRemove: () => void;
};

const DropdownSearch: React.FC<DropdownSearchProps> = ({ options, onSearch, onSelect, onRemove }) => {
  const [inputValue, setInputValue] = useState('');
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);

  const handleSearch = useCallback(
    async (value: string) => {
      setInputValue(value);
      onSearch(value);
    },
    [onSearch, inputValue]
  );

  const handleSelect = useCallback(
    async (option: IOption) => {
      setSelected(option.label);
      setInputValue('');
      setOpen(false);
      onSelect(option);
    },
    [onSelect]
  );

  const handleRemove = useCallback(async () => {
    setInputValue('');
    setSelected('');
    onRemove();
  }, [onRemove, open]);

  return (
    <div className=" relative font-medium">
      <div
        onClick={() => setOpen(!open)}
        className={` flex h-[42px] w-full items-center justify-between rounded-lg border border-black bg-stone-100 p-2 shadow ${
          !selected && 'text-gray-700'
        }`}
      >
        {selected ? (
          <div className="flex w-full items-center justify-between">
            <span className="mr-2">{selected?.length > 25 ? selected?.substring(0, 25) + '...' : selected}</span>
            <BiX
              size={20}
              className="float-left cursor-pointer text-gray-500"
              onClick={() => {
                handleRemove();
              }}
            />
          </div>
        ) : (
          'All Users'
        )}
        <BiChevronDown size={20} className={`${open && 'rotate-180'}`} />
      </div>
      <ul className={`absolute mt-2 w-full overflow-y-auto rounded bg-white ${open ? 'max-h-60' : 'max-h-0'} `}>
        <div className="sticky top-0 flex w-full items-center justify-center bg-white px-2">
          <div className="w-full p-3">
            <div className="relative">
              <div className="rtl:inset-r-0 pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                <svg
                  className="h-4 w-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => handleSearch(e.target.value.toLowerCase())}
                placeholder="Enter name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        {options?.map((option) => (
          <li
            key={option?.label}
            className={`p-2 text-sm hover:bg-sky-600 hover:text-white
            ${option?.label?.toLowerCase() === selected?.toLowerCase() && 'bg-sky-600 text-white'}`}
            onClick={() => {
              if (option?.label?.toLowerCase() !== selected.toLowerCase()) {
                handleSelect(option);
              }
            }}
          >
            {option?.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownSearch;
