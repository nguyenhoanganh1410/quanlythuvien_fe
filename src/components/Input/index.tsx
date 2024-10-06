import clsx from 'clsx';
import { FC, memo } from 'react';

interface IProps {
  name: string;
  label?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: any;
  onBlur?: any;
  showPassword?: boolean;
  passwordField?: boolean;
  labelImageUrl?: string;
  isRequired?: boolean;
  errorMessage?: string;
  touched?: boolean;
  maxLength?: number;
  uppercase?: boolean;
  isArea?: boolean;
}

const Input: FC<IProps> = ({
  name,
  touched,
  onBlur,
  onChange,
  type,
  isArea,
  errorMessage,
  placeholder,
  value,
  label,
  isRequired,
  maxLength,
  uppercase,
}) => {
  return (
    <div className="relative flex w-full flex-col items-start">
      <div className="flex items-end gap-2">
        <div className="mb-2 font-Inter text-xs font-medium text-slate-600">
          {label} {isRequired ? '*' : ''}
        </div>
      </div>
      {isArea ? (
        <textarea
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          rows={3}
          value={value}
          placeholder={placeholder}
        />
      ) : (
        <input
          className={clsx(
            'lg:placeholder:text-accent h-10 w-full rounded border border-slate-300 bg-slate-50 text-sm font-normal text-black placeholder:text-sm placeholder:text-slate-500 ',
            uppercase && 'uppercase'
          )}
          name={name}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      )}
      {errorMessage && touched && <span className="mt-1 text-xs font-normal text-red-500">{errorMessage}</span>}
    </div>
  );
};

export default memo(Input);
