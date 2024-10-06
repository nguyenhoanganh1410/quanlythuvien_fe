import { Navigate, useLocation } from 'react-router-dom';
import { FC } from 'react';
import { PATHS } from '@/constants';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';

interface IProps {
  children: JSX.Element;
  isAdminRequired?: boolean;
}

export const ProtectedRoute: FC<IProps> = ({ children, isAdminRequired }) => {
  const { search } = useLocation();
  const { isAuthentication, user } = useAppSelector((state: RootState) => state.userStore);

  if (!isAuthentication) {
    return <Navigate to={PATHS.SIGN_IN + search} />;
  }

  if (isAdminRequired && user?.isStaff === true) {
    return <Navigate to={PATHS.HOME + search} />;
  }

  return children;
};
