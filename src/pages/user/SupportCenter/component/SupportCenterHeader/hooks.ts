import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/constants';
import { useCallback, useState } from 'react';
import { logout } from '@/features/user/userActions';

export const useSupportCenterHeaderHooks = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [isShowRequestModal, setIsShowRequestModal] = useState(false);
  const { isLoading, user, isAuthentication } = useAppSelector((state: RootState) => state.userStore);

  const navigate = useNavigate();

  const onShowRequestModel = useCallback(() => {
    setIsShowRequestModal(true);
  }, []);

  const onCloseRequestModel = useCallback(() => {
    setIsShowRequestModal(false);
  }, []);

  const navLogin = useCallback(() => {
    navigate(PATHS.SIGN_IN);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const navHome = useCallback(() => {
    navigate(PATHS.HOME);
  }, []);

  const onLogout = useCallback(async () => {
    await dispatch(logout());
    navigate(PATHS.SIGN_IN);
  }, [dispatch]);

  const onClickOpenSubmit = useCallback(() => {
    if (!isAuthentication) {
      navLogin();
      return;
    }
    onShowRequestModel();
  }, [isAuthentication]);

  return {
    user,
    navHome,
    navLogin,
    onLogout,
    toggleMenu,
    isLoading,
    isMenuOpen,
    isShowRequestModal,
    onShowRequestModel,
    onCloseRequestModel,
    onClickOpenSubmit,
    isAuthentication,
  };
};
