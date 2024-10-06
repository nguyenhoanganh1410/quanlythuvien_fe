import { useLocation, useNavigate } from 'react-router-dom';

export const useNavigateParams = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  return (routeName: string) => {
    navigate(routeName + search);
  };
};
