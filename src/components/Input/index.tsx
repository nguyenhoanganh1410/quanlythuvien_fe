import { FC } from 'react';

type InputType = 'input' | 'select' | 'textArea';
interface IProps {
  name: string;
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: any;
  onBlur?: any;
  onToggleShowPassword?: any;
  showPassword?: boolean;
  passwordField?: boolean;
  typeElement?: InputType;
  label?: string;
  selectData?: { id: string; label: string }[];
  errorMessage?: string;
}

const Input: FC<IProps> = ({
  name,
  onBlur,
  onChange,
  type,
  placeholder,
  value,
  typeElement = 'input',
  label,
  errorMessage,
  selectData,
}) => {
  return (
    <div className="relative flex w-full flex-col items-start">
      {typeElement === 'select' && (
        <>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">{label}</label>
          <select
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option value="">Hãy chọn 1 mục</option>
            {selectData?.map((item) => <option value={item.id}>{item.label}</option>)}
          </select>
        </>
      )}
      {typeElement === 'textArea' && (
        <>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">{label}</label>
          <textarea
            onChange={onChange}
            name={name}
            onBlur={onBlur}
            value={value}
            rows={5}
            placeholder={placeholder}
            // className='resize-x rounded-md w-full'
            className={`lg:placeholder:text-accent w-full resize-x rounded-lg border border-slate-200 bg-white text-sm font-normal text-[#898989] placeholder:text-slate-500`}
          ></textarea>
        </>
      )}
      {typeElement === 'input' && (
        <>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">{label}</label>
          <input
            className={`lg:placeholder:text-accent h-11 w-full rounded-lg border border-slate-200 bg-white text-sm font-normal text-[#898989] placeholder:text-slate-500 2xl:h-12`}
            name={name}
            type={type}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            placeholder={placeholder}
          />
        </>
      )}
      {errorMessage && <span className="text-xs text-red-500 mt-1">{errorMessage}</span>}
    </div>
  );
};

export default Input;
