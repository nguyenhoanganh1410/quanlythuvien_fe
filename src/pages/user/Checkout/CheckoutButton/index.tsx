import Spinner from '@/components/LoadingPage/Spinner';
import { FC } from 'react';
interface IProps {
  isLoading: boolean;
  onClick: () => void;
}

const CheckoutButton: FC<IProps> = ({ isLoading, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="relative mb-6 inline-flex h-[40px] w-[116px] cursor-pointer items-center justify-center gap-2.5 rounded-md bg-orange-500 p-2.5 hover:opacity-70"
    >
      {isLoading ? (
        <Spinner size="sm" />
      ) : (
        <div className="text-center font-Inter text-xs font-semibold text-white">Save & Continue</div>
      )}
    </div>
  );
};
export default CheckoutButton;
