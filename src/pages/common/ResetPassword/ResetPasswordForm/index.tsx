import { Formik } from 'formik';
import { FC } from 'react';
import { useResetPasswordFormHooks } from './hooks';
import { ErrorMessageForm, LoadingPage } from '@/components';
import { resetPasswordValidator } from '@/core/utils';
import { icons } from '@/constants';

interface IProps {
  isPolicyHolder: boolean;
}

const ResetPasswordForm: FC<IProps> = ({ isPolicyHolder }) => {
  const {
    isLoading,
    initialValues,
    showPassword,
    showConfirmPassword,
    onSubmitForm,
    onToggleShowPassword,
    onToggleShowConfirmPassword,
  } = useResetPasswordFormHooks();

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
        <p className="text-[28px] font-bold text-gray-800 sm:text-[30px]">Reset Password</p>
        <div className="mt-12">
          <Formik
            validationSchema={resetPasswordValidator}
            initialValues={initialValues}
            validateOnMount={false}
            onSubmit={onSubmitForm}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <div>
                  <p className="text-sm font-medium text-gray-800">Enter Password</p>
                  <div className="relative mt-2 flex flex-row items-center justify-center">
                    <input
                      className="w-full rounded-lg border border-gray-300 pr-10 text-base font-normal text-gray-800"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.password}
                    />
                    <img
                      onClick={onToggleShowPassword}
                      alt="eye-icon"
                      src={showPassword ? icons.eye : icons.eyeSlash}
                      className="absolute right-4 cursor-pointer"
                    />
                  </div>
                  <ErrorMessageForm name="password" />
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
                <button type="submit" className="mt-12 h-11 w-full rounded-lg bg-primary">
                  <p className="text-base font-medium text-white">Save</p>
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
      {isLoading && <LoadingPage />}
    </div>
  );
};

export default ResetPasswordForm;
