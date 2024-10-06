import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/constants';
type Props = {
  onClose: () => void;
};

export const useUnlockPopupsHooks = ({ onClose }: Props) => {
  const navigate = useNavigate();

  const navFreeTrial = async () => {
    navigate(PATHS.CHECKOUT);
    onClose();
  };

  return {
    navFreeTrial,
  };
};
