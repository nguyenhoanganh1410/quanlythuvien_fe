import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { logout } from '@/features/user/userActions';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/constants';

export const useDropDownUserHooks = () => {
  const { isLoading, user, isAuthentication } = useAppSelector((state: RootState) => state.userStore);
  const dispatch = useAppDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef<any>(null);
  const navigate = useNavigate();
  const dropdown = useRef<any>(null);

  const getFullName = useMemo(() => {
    return user?.firstName + ' ' + user?.lastName;
  }, [user]);

  const getRoleName = useMemo(() => {
    return user?.role || "";
  }, [user]);
  
  const getFirstCharacter = useMemo(() => {
    const firstName = user?.firstName || '';
    return firstName.length > 0 ? firstName[0] : 'U';
  }, [user]);

  const onLogout = useCallback(async () => {
    await dispatch(logout());
    navigate(PATHS.SIGN_IN);
  }, [dispatch]);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return {
    user,
    trigger,
    onLogout,
    dropdown,
    getRoleName,
    dropdownOpen,
    isLoading,
    getFullName,
    getFirstCharacter,
    setDropdownOpen,
    isAuthentication,
  };
};
