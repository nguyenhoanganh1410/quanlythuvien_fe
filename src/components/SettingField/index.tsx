import { FC } from 'react';

export type SettingFieldProps = {
  className?: string;
  label: string;
  value?: string;
  buttonLabel?: string;
  onUpdate?: () => void;
};

const SettingField: FC<SettingFieldProps> = ({ label, value, buttonLabel, className, onUpdate }) => {
  return (
    <div className={`flex flex-row flex-wrap items-start justify-between border-opacity-80 py-6 ${className || ''}`}>
      <div className="flex w-[50%] flex-col text-xl font-semibold text-secondary">
        <p>{label}</p>
        <p className="mt-6 w-full truncate font-normal">{value ?? ''}</p>
      </div>
      <button onClick={onUpdate} className="text-xl font-semibold text-primary">
        {buttonLabel}
      </button>
    </div>
  );
};

export default SettingField;
