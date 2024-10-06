import { PATHS } from '@/constants';
import { IRequestSignIn, IResetPasswordFormValues } from '@/features/user/interfaces';
import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { forgotPassword, signIn } from '@/features/user/userActions';
import { RootState } from '@/store';
import { toast } from 'react-toastify';
import { useNavigateParams } from '@/hooks';

export const useLoginFormHooks = () => {
  const navigate = useNavigateParams();
  const dispatch = useAppDispatch();
  const { isLoading: isLoadingUser } = useAppSelector((state: RootState) => state.userStore);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isRequestingResetPassword, setRequestingResetPassword] = useState<boolean>(false);
  const initialValues: IRequestSignIn = {
    email: '',
    password: '',
  };

  const initialResetPasswordValues: IResetPasswordFormValues = {
    email: '',
  };

  const onClickSignUp = useCallback(() => {
    navigate(PATHS.SIGN_UP);
  }, []);

  const onSubmitForm = useCallback(async (values: IRequestSignIn) => {
    await dispatch(signIn(values));
  }, []);

  const onSubmitResetPasswordForm = useCallback(async (values: IResetPasswordFormValues) => {
    try {
      await dispatch(forgotPassword({ email: values.email }));
    } catch (error) {
      //@ts-ignore
      toast(error.message, {
        type: 'error',
        position: 'bottom-center',
        theme: 'light',
        autoClose: 500,
        hideProgressBar: true,
        closeButton: false,
        bodyClassName: 'toast-body',
      });
    } finally {
      onCloseResetPasswordForm();
      toast('Please check your email to reset password!', {
        type: 'success',
        position: 'bottom-center',
        theme: 'light',
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
        bodyClassName: 'toast-body',
      });
    }
  }, []);

  const onToggleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const onSelectForgotPassword = useCallback(() => {
    setRequestingResetPassword(true);
  }, []);

  const onCloseResetPasswordForm = useCallback(() => {
    setRequestingResetPassword(false);
  }, []);

  return {
    isLoadingUser,
    initialValues,
    showPassword,
    initialResetPasswordValues,
    isRequestingResetPassword,
    onSubmitResetPasswordForm,
    onClickSignUp,
    onSubmitForm,
    onToggleShowPassword,
    onSelectForgotPassword,
    onCloseResetPasswordForm,
  };
};
