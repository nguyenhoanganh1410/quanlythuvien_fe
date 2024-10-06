import { PATHS } from '@/constants';
import { IRequestSignUp } from '@/features/user/interfaces';
import { signUp } from '@/features/user/userActions';
import { setShowPopupExistEmail } from '@/features/user/userSlice';
import { useNavigateParams } from '@/hooks';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useCallback, useMemo, useState } from 'react';

const SIGN_UP_STEPS = 3;
export const isNumberRegex = /\d/;
export const upperCharacterRegex = /[A-Z]/;
export const lowerCharacterRegex = /[a-z]/;
export const specialCharacterRegex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

export const useSignUpFormHooks = () => {
  const navigate = useNavigateParams();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const { isLoading: isLoadingUser, isShowPopupExistEmail } = useAppSelector((state: RootState) => state.userStore);
  const [isFocusedPassword, setFocusPassword] = useState<boolean>(false);
  const initialValues: IRequestSignUp = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  };

  const isLastStep = useMemo(() => step === SIGN_UP_STEPS, [step]);

  const renderTitleStep = useMemo(() => {
    if (step === 1) {
      return 'Your just 3 steps away from getting started';
    } else if (step === 2) {
      return 'What should we call you?';
    } else {
      return 'Create a password';
    }
  }, [step]);

  const onClickSignIn = useCallback(() => {
    navigate(PATHS.SIGN_IN);
  }, []);

  const onSubmitForm = useCallback(
    async (values: IRequestSignUp) => {
      if (step === SIGN_UP_STEPS) {
        const password = values.password;
        if (
          password.length >= 8 &&
          isNumberRegex.test(password) &&
          specialCharacterRegex.test(password) &&
          upperCharacterRegex.test(password) &&
          lowerCharacterRegex.test(password)
        ) {
          await dispatch(signUp(values));
        }
      } else {
        const nextStep = step + 1;
        setStep(nextStep);
      }
    },
    [step]
  );

  const onToggleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const onToggleShowConfirmPassword = useCallback(() => {
    setShowConfirmPassword(!showConfirmPassword);
  }, [showConfirmPassword]);

  const onCloseExistEmailPopup = useCallback(async () => {
    dispatch(setShowPopupExistEmail(false));
  }, []);

  const onGoToLogin = useCallback(async () => {
    dispatch(setShowPopupExistEmail(false));
    navigate(PATHS.SIGN_IN);
  }, []);

  return {
    isFocusedPassword,
    isShowPopupExistEmail,
    isLoadingUser,
    renderTitleStep,
    step,
    isLastStep,
    initialValues,
    showPassword,
    showConfirmPassword,
    onClickSignIn,
    onSubmitForm,
    onToggleShowPassword,
    onToggleShowConfirmPassword,
    onCloseExistEmailPopup,
    onGoToLogin,
    setFocusPassword,
  };
};
