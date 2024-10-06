import { IOption } from '@/interfaces';
import { ChangeEvent, FC, memo } from 'react';

interface IProps {
  name: string;
  label?: string;
  options: IOption[];
  value?: string;
  isRequired?: boolean;
  errorMessage?: string;
  touched?: boolean;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const Select: FC<IProps> = ({ errorMessage, touched, name, isRequired, options, value, label, onChange, onBlur }) => {
  return (
    <div className="relative flex w-full flex-col items-start">
      {label && (
        <div className="mb-2 font-Inter text-xs font-medium text-slate-600">
          {label} {isRequired ? '*' : ''}
        </div>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="lg:placeholder:text-accent h-10 w-full rounded border border-slate-300 bg-slate-50 text-sm font-normal text-black placeholder:text-slate-500 2xl:h-[50px] 2xl:text-lg"
      >
        {options.map((item) => {
          return (
            <option key={item.value} className="bg-white capitalize text-black" value={item.value}>
              {item.label}
            </option>
          );
        })}
        {options.length == 0 && <option>No data</option>}
      </select>
      {errorMessage && touched && <span className="mt-1 text-xs font-normal text-red-500">{errorMessage}</span>}
    </div>
  );
};

export default memo(Select);
