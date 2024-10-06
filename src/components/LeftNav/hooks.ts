import { PATHS } from '@/constants';
import { setLoadingProgress } from '@/features/app/appSlice';
import { logout } from '@/features/user/userActions';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useLeftNavHooks = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useAppSelector((state: RootState) => state.userStore);
  const [openMenu, setOpenMenu] = useState<boolean>(true);
  const [isShowMenu, setShowMenu] = useState<boolean>(false);

  const hasAuth = true;

  const onOpenMenuHandler = useCallback(() => {
    setOpenMenu(!openMenu);
  }, [openMenu]);

  const onShowMenu = useCallback(() => {
    setShowMenu(true);
  }, []);

  const onHideMenu = useCallback(() => {
    setShowMenu(false);
  }, []);

  useEffect(() => {
    if (!hasAuth) return;
    const fetch = async () => {
      await Promise.allSettled([]);
      dispatch(setLoadingProgress(100));
    };
    fetch();
  }, [dispatch, hasAuth]);

  const onLogout = useCallback(async () => {
    await dispatch(logout());
    setShowMenu(false);
    window.location.reload();
  }, [dispatch]);

  const navFreeTrial = async () => {
    navigate(PATHS.CHECKOUT);
    setShowMenu(false);
  };

  return {
    isShowMenu,
    openMenu,
    pathname,
    user,
    onOpenMenuHandler,
    onLogout,
    navFreeTrial,
    onShowMenu,
    onHideMenu,
  };
};

export default useLeftNavHooks;
