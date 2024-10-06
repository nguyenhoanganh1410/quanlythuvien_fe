import { useNavigate, useSearchParams } from 'react-router-dom';
import { PATHS } from '@/constants';
import { IRequestResetPassword } from '@/features/user/interfaces';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { resetPassword, verifyTokenResetPassword } from '@/features/user/userActions';
import { EVerifyTokenResetPasswordStatus } from '@/constants/enum';
import { toast } from 'react-toastify';

export const useResetPasswordFormHooks = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, statusVerifyTokenPassword } = useAppSelector((state: RootState) => state.userStore);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const initialValues: IRequestResetPassword = {
    token: '',
    password: '',
    confirmPassword: '',
  };

  const onClickSignIn = useCallback(() => {
    navigate(PATHS.SIGN_IN);
  }, []);

  const onSubmitForm = useCallback(
    async (values: IRequestResetPassword) => {
      if (token) {
        await dispatch(
          resetPassword({
            password: values.password,
            confirmPassword: values.confirmPassword,
            token: token,
          })
        );
        toast('Reset password success!', {
          type: 'success',
          position: 'bottom-center',
          theme: 'light',
          autoClose: 500,
          hideProgressBar: true,
          closeButton: false,
          bodyClassName: 'toast-body',
        });
        navigate(PATHS.SIGN_IN, { replace: true });
      }
    },
    [token]
  );

  const onToggleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const onToggleShowConfirmPassword = useCallback(() => {
    setShowConfirmPassword(!showConfirmPassword);
  }, [showConfirmPassword]);

  useEffect(() => {
    const verifyToken = async () => {
      await dispatch(
        verifyTokenResetPassword({
          token: token!,
        })
      );
    };
    if (token) {
      verifyToken();
    } else {
      navigate(PATHS.SIGN_IN, { replace: true });
    }
  }, [token]);

  useEffect(() => {
    if (statusVerifyTokenPassword === EVerifyTokenResetPasswordStatus.FAIL) {
      navigate(PATHS.SIGN_IN, { replace: true });
      toast('Token is not valid, please resend the request reset password!', {
        type: 'error',
        position: 'bottom-center',
        theme: 'light',
        autoClose: false,
        hideProgressBar: true,
        closeButton: false,
        bodyClassName: 'toast-body',
      });
    }
  }, [statusVerifyTokenPassword]);

  return {
    isLoading,
    initialValues,
    showPassword,
    showConfirmPassword,
    onClickSignIn,
    onSubmitForm,
    onToggleShowPassword,
    onToggleShowConfirmPassword,
  };
};
