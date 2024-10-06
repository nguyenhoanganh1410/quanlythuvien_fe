import { ErrorMessageForm, LoadingPage } from '@/components';
import { icons, userRole } from '@/constants';
import { signUpValidator } from '@/core/utils';
import clsx from 'clsx';
import { Formik } from 'formik';
import { FC } from 'react';
import ExistEmailPopup from '../ExistEmailPopup';
import {
  isNumberRegex,
  lowerCharacterRegex,
  specialCharacterRegex,
  upperCharacterRegex,
  useSignUpFormHooks,
} from './hooks';

interface IProps {
  role: string;
  isPolicyHolder: boolean;
}

const SignUpForm: FC<IProps> = ({ role, isPolicyHolder }) => {
  const {
    isFocusedPassword,
    isLoadingUser,
    renderTitleStep,
    step,
    isLastStep,
    initialValues,
    showPassword,
    showConfirmPassword,
    isShowPopupExistEmail,
    onCloseExistEmailPopup,
    onGoToLogin,
    onSubmitForm,
    onClickSignIn,
    setFocusPassword,
    onToggleShowPassword,
    onToggleShowConfirmPassword,
  } = useSignUpFormHooks();

  return (
    <div className="flex w-full max-w-sm flex-col">
      {isPolicyHolder && (
        <p className="font-Inter text-xl font-medium italic text-secondary sm:text-2xl">Policyholder</p>
      )}
      <div className="flex w-48 flex-row items-center lg:w-60">
        <img src={icons.logo} className="mr-2 h-10 w-10" alt="logo" />
        <p className="text-[28px] font-bold text-secondary sm:text-[30px]">Clarifi</p>
      </div>
      <div className="mt-8">
        <p className="text-[28px] font-bold text-gray-800 sm:text-[30px]">Welcome</p>
        <p className="text-base font-normal text-gray-800">{renderTitleStep}</p>
        <div className="mt-12">
          <Formik
            validationSchema={signUpValidator(step)}
            initialValues={initialValues}
            validateOnMount={false}
            onSubmit={onSubmitForm}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                {step === 1 && (
                  <>
                    <p className="text-sm font-medium text-gray-800">What’s your email address?</p>
                    <div className="relative mt-2 flex flex-row items-center justify-center">
                      <input
                        className="w-full rounded-lg border border-gray-300 pr-10 text-base font-normal text-gray-800"
                        name="email"
                        type="email"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.email}
                        placeholder="user@example.com"
                      />
                    </div>
                    <ErrorMessageForm name="email" />
                  </>
                )}
                {step === 2 && (
                  <>
                    <div>
                      <p className="text-sm font-medium text-gray-800">What’s your first name?</p>
                      <div className="relative mt-2 flex flex-row items-center justify-center">
                        <input
                          className="w-full rounded-lg border border-gray-300 pr-10 text-base font-normal text-gray-800"
                          name="firstName"
                          type="text"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.firstName}
                          placeholder="FirstName"
                        />
                      </div>
                      <ErrorMessageForm name="firstName" />
                    </div>
                    <div className="mt-5">
                      <p className="text-sm font-medium text-gray-800">What’s your Last name?</p>
                      <div className="relative mt-2 flex flex-row items-center justify-center">
                        <input
                          className="w-full rounded-lg border border-gray-300 pr-10 text-base font-normal text-gray-800"
                          name="lastName"
                          type="text"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.lastName}
                          placeholder="LastName"
                        />
                      </div>
                      <ErrorMessageForm name="lastName" />
                    </div>
                  </>
                )}
                {step === 3 && (
                  <>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Enter Password</p>
                      <div className="relative mt-2 flex flex-row items-center justify-center">
                        <input
                          className="w-full rounded-lg border border-gray-300 pr-10 text-base font-normal text-gray-800"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          onChange={props.handleChange}
                          value={props.values.password}
                          onBlur={() => setFocusPassword(false)}
                          onFocus={() => setFocusPassword(true)}
                        />
                        <img
                          onClick={onToggleShowPassword}
                          alt="eye-icon"
                          src={showPassword ? icons.eye : icons.eyeSlash}
                          className="absolute right-4 cursor-pointer"
                        />
                      </div>
                      {/* <ErrorMessageForm name="password" /> */}
                      {isFocusedPassword && (
                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-800">Password Strength Indicator:</p>
                          <ul className="mt-2 list-inside list-disc space-y-1 text-sm font-normal text-red-500">
                            <li className={clsx(props.values.password.length >= 8 && 'text-green-600')}>
                              At least 8 characters
                            </li>
                            <li className={clsx(upperCharacterRegex.test(props.values.password) && 'text-green-600')}>
                              Upper case letters (A-Z)
                            </li>
                            <li className={clsx(lowerCharacterRegex.test(props.values.password) && 'text-green-600')}>
                              Lower case letters (a-z)
                            </li>
                            <li className={clsx(isNumberRegex.test(props.values.password) && 'text-green-600')}>
                              Numbers (0-9)
                            </li>
                            <li className={clsx(specialCharacterRegex.test(props.values.password) && 'text-green-600')}>
                              Special characters (e.g., !, @, #, $)
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="mt-5">
                      <p className="text-sm font-medium text-gray-800">Confirm Password</p>
                      <div className="relative mt-2 flex flex-row items-center justify-center">
                        <input
                          className="w-full rounded-lg border border-gray-300 pr-10 text-base font-normal text-gray-800"
                          name="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.confirmPassword}
                        />
                        <img
                          onClick={onToggleShowConfirmPassword}
                          alt="eye-icon"
                          src={showConfirmPassword ? icons.eye : icons.eyeSlash}
                          className="absolute right-4 cursor-pointer"
                        />
                      </div>
                      <ErrorMessageForm name="confirmPassword" />
                    </div>
                  </>
                )}
                <button type="submit" className="mt-12 h-11 w-full rounded-lg bg-primary">
                  <p className="text-base font-medium text-white">
                    {isLastStep ? 'Finish' : 'Next'} ({step}/3)
                  </p>
                </button>
                {role !== userRole.superAdmin && (
                  <div className="mt-4 text-center text-sm font-normal text-gray-800">
                    Already have an account?
                    <p className="inline cursor-pointer font-semibold text-primary" onClick={onClickSignIn}>
                      {' '}
                      Sign In
                    </p>
                  </div>
                )}
              </form>
            )}
          </Formik>
        </div>
      </div>
      {isLoadingUser && <LoadingPage />}
      <ExistEmailPopup open={isShowPopupExistEmail} onClose={onCloseExistEmailPopup} onYes={onGoToLogin} />
    </div>
  );
};

export default SignUpForm;
